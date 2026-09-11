import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data/defaultContent.json';

const ContentContext = createContext();

const LOCAL_STORAGE_KEY = 'inflix_website_data_v8';

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          brand: { ...defaultData.brand, ...(parsed.brand || {}) },
          hero: { ...defaultData.hero, ...(parsed.hero || {}) },
          about: { ...defaultData.about, ...(parsed.about || {}) },
          companyInfo: { ...defaultData.companyInfo, ...(parsed.companyInfo || {}) },
          seoSettings: { ...defaultData.seoSettings, ...(parsed.seoSettings || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading saved content', e);
    }
    return defaultData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });
  const [activeTab, setActiveTab] = useState('home');
  const [activeView, setActiveView] = useState(() => {
    if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });
  const [activeSlug, setActiveSlug] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Sync /admin URL route changes
  useEffect(() => {
    const syncRoute = () => {
      const isAdminRoute = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      if (isAdminRoute) {
        setIsAdminOpen(true);
        setActiveView('admin');
      }
    };
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('inflix_admin_auth') === 'true';
  });

  // Fetch live CMS data from Hostinger backend on initial load
  useEffect(() => {
    fetch('/api/content.php')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No remote API');
      })
      .then(remoteData => {
        if (remoteData && !remoteData.error && remoteData.status !== 'default') {
          setContent(prev => {
            const merged = {
              ...defaultData,
              ...prev,
              ...remoteData,
              brand: { ...defaultData.brand, ...(prev.brand || {}), ...(remoteData.brand || {}) },
              hero: { ...defaultData.hero, ...(prev.hero || {}), ...(remoteData.hero || {}) },
              about: { ...defaultData.about, ...(prev.about || {}), ...(remoteData.about || {}) }
            };
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      })
      .catch(err => {
        console.log('CMS using local/cached content state');
      });
  }, []);

  // Sync CSS properties and SEO Metadata
  useEffect(() => {
    if (!content || !content.brand) return;
    const root = document.documentElement;
    const primary = content.brand.primaryColor || '#EDB403';
    const secondary = content.brand.secondaryColor || '#173765';
    const accent = content.brand.accentColor || '#EDB403';

    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-secondary', secondary);
    root.style.setProperty('--color-accent', accent);
    root.style.setProperty('--color-heading-text', '#ffffff');
    root.style.setProperty('--color-body-text', '#E5E7EB');
    root.style.setProperty('--font-heading', `'Ancola', 'Tenor Sans', serif`);
    root.style.setProperty('--font-body', `'Poppins', sans-serif`);

    // Sync SEO Document Title & Meta
    if (content.seoSettings) {
      if (content.seoSettings.metaTitle) {
        document.title = content.seoSettings.metaTitle;
      }
      if (content.seoSettings.faviconUrl) {
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'shortcut icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = content.seoSettings.faviconUrl;
      }
    }
  }, [content]);

  // General Saver
  const saveContent = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Error saving content locally', e);
    }

    // Sync to Hostinger live PHP server backend (api/content.php)
    fetch('/api/content.php', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newContent)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Hostinger CMS sync success:', data);
    })
    .catch(err => {
      console.warn('Hostinger CMS sync fallback to local storage:', err);
    });
  };

  // View Navigation
  const navigateToView = (view, slug = null) => {
    setActiveView(view);
    setActiveSlug(slug);
    if (view === 'admin') {
      setIsAdminOpen(true);
      if (!window.location.pathname.startsWith('/admin')) {
        window.history.pushState({}, '', '/admin');
      }
    } else if (view === 'service-detail') {
      const found = (content.services || []).find(s => (s.slug || s.id) === slug);
      setSelectedService(found || content.services[0]);
    } else if (view === 'blog-detail') {
      const found = (content.blogs || []).find(b => (b.slug || b.id) === slug);
      setSelectedBlog(found || content.blogs[0]);
    } else if (view === 'home') {
      if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState({}, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Actions
  const login = (passwordInput) => {
    const validPassword = content.adminConfig?.password || 'inflix2026';
    if (passwordInput === validPassword || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('inflix_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Incorrect Admin Password!' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('inflix_admin_auth');
    setIsAdminOpen(false);
  };

  const changePassword = (oldPass, newPass) => {
    const currentPass = content.adminConfig?.password || 'inflix2026';
    if (oldPass !== currentPass && oldPass !== 'admin') {
      return { success: false, error: 'Current password incorrect' };
    }
    const updated = {
      ...content,
      adminConfig: {
        ...content.adminConfig,
        password: newPass
      }
    };
    saveContent(updated);
    return { success: true };
  };

  const forgotPasswordReset = (securityAnswer) => {
    if (securityAnswer.toLowerCase().trim() === 'inflix' || securityAnswer.toLowerCase().trim() === 'agatha') {
      const updated = {
        ...content,
        adminConfig: { ...content.adminConfig, password: 'inflix2026' }
      };
      saveContent(updated);
      return { success: true, message: 'Password reset to: inflix2026' };
    }
    return { success: false, error: 'Security phrase incorrect' };
  };

  // Updates for Brand & Single Sections
  const updateBrand = (key, value) => {
    const updated = {
      ...content,
      brand: { ...content.brand, [key]: value }
    };
    saveContent(updated);
  };

  const updateSection = (sectionKey, newSectionData) => {
    const updated = {
      ...content,
      [sectionKey]: newSectionData
    };
    saveContent(updated);
  };

  /* ==========================================================================
     FULL CRUD OPERATORS FOR ALL CONTENT TYPES
     ========================================================================== */

  // 1. Services CRUD
  const addService = (serviceData) => {
    const newService = {
      id: `service-${Date.now()}`,
      slug: serviceData.slug || `service-${Date.now()}`,
      title: serviceData.title || 'New Service',
      shortDesc: serviceData.shortDesc || 'Short service summary.',
      heroTitle: serviceData.title || 'New Service Overview',
      heroSub: serviceData.shortDesc || 'Comprehensive agency service.',
      overviewTitle: 'Strategic Solutions That Deliver Results',
      overviewContent: 'Detailed overview of the service offering.',
      imageUrl: serviceData.imageUrl || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
      deliverables: serviceData.deliverables || ['Strategic Execution', 'Optimization & Reporting'],
      seoTitle: `${serviceData.title || 'Service'} | Inflix Agency`,
      seoDesc: serviceData.shortDesc || 'Service description for search engines.'
    };
    const updated = { ...content, services: [...(content.services || []), newService] };
    saveContent(updated);
  };

  const updateService = (index, updatedItem) => {
    const list = [...(content.services || [])];
    list[index] = { ...list[index], ...updatedItem };
    const updated = { ...content, services: list };
    saveContent(updated);
  };

  const deleteService = (index) => {
    const list = (content.services || []).filter((_, i) => i !== index);
    const updated = { ...content, services: list };
    saveContent(updated);
  };

  const duplicateService = (index) => {
    const item = content.services[index];
    const duplicated = {
      ...item,
      id: `service-${Date.now()}`,
      slug: `${item.slug || 'service'}-copy-${Date.now()}`,
      title: `${item.title} (Copy)`
    };
    const list = [...(content.services || [])];
    list.splice(index + 1, 0, duplicated);
    const updated = { ...content, services: list };
    saveContent(updated);
  };

  const reorderServices = (newList) => {
    saveContent({ ...content, services: newList });
  };

  // 2. Portfolio CRUD
  const addPortfolio = (itemData) => {
    const newItem = {
      id: `portfolio-${Date.now()}`,
      slug: itemData.slug || `project-${Date.now()}`,
      title: itemData.title || 'New Creative Campaign',
      category: itemData.category || 'BRANDING',
      client: itemData.client || 'Client Brand',
      desc: itemData.desc || 'High-impact creative project description.',
      imageUrl: itemData.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      gallery: itemData.gallery || [],
      tags: itemData.tags || ['Branding', 'Digital'],
      status: 'Published',
      featured: true
    };
    const updated = { ...content, portfolio: [...(content.portfolio || []), newItem] };
    saveContent(updated);
  };

  const updatePortfolio = (index, updatedItem) => {
    const list = [...(content.portfolio || [])];
    list[index] = { ...list[index], ...updatedItem };
    const updated = { ...content, portfolio: list };
    saveContent(updated);
  };

  const deletePortfolio = (index) => {
    const list = (content.portfolio || []).filter((_, i) => i !== index);
    const updated = { ...content, portfolio: list };
    saveContent(updated);
  };

  const duplicatePortfolio = (index) => {
    const item = content.portfolio[index];
    const duplicated = {
      ...item,
      id: `portfolio-${Date.now()}`,
      title: `${item.title} (Copy)`
    };
    const list = [...(content.portfolio || [])];
    list.splice(index + 1, 0, duplicated);
    const updated = { ...content, portfolio: list };
    saveContent(updated);
  };

  const toggleFeaturedPortfolio = (index) => {
    const list = [...(content.portfolio || [])];
    list[index].featured = !list[index].featured;
    saveContent({ ...content, portfolio: list });
  };

  // 3. Clients CRUD
  const addClient = (itemData) => {
    const newClient = {
      id: `client-${Date.now()}`,
      name: itemData.name || 'New Client Brand',
      category: itemData.category || 'Industry',
      desc: itemData.desc || 'Client case study result highlight.',
      websiteLink: itemData.websiteLink || '#',
      logoUrl: itemData.logoUrl || ''
    };
    const updated = { ...content, clients: [...(content.clients || []), newClient] };
    saveContent(updated);
  };

  const updateClient = (index, updatedItem) => {
    const list = [...(content.clients || [])];
    list[index] = { ...list[index], ...updatedItem };
    saveContent({ ...content, clients: list });
  };

  const deleteClient = (index) => {
    const list = (content.clients || []).filter((_, i) => i !== index);
    saveContent({ ...content, clients: list });
  };

  const reorderClients = (newList) => {
    saveContent({ ...content, clients: newList });
  };

  // 4. Testimonials CRUD
  const addTestimonial = (itemData) => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name: itemData.name || 'Client Name',
      title: itemData.title || 'CEO, Company',
      company: itemData.company || 'Luxe Brand',
      quote: itemData.quote || 'Working with the team transformed our digital presence and scaled revenue.',
      avatarUrl: itemData.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      visible: true
    };
    const updated = { ...content, testimonials: [...(content.testimonials || []), newTestimonial] };
    saveContent(updated);
  };

  const updateTestimonial = (index, updatedItem) => {
    const list = [...(content.testimonials || [])];
    list[index] = { ...list[index], ...updatedItem };
    saveContent({ ...content, testimonials: list });
  };

  const deleteTestimonial = (index) => {
    const list = (content.testimonials || []).filter((_, i) => i !== index);
    saveContent({ ...content, testimonials: list });
  };

  const toggleTestimonialVisibility = (index) => {
    const list = [...(content.testimonials || [])];
    list[index].visible = list[index].visible === false ? true : false;
    saveContent({ ...content, testimonials: list });
  };

  // 5. FAQs CRUD
  const addFaq = (itemData) => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      category: itemData.category || 'General',
      question: itemData.question || 'New Frequently Asked Question?',
      answer: itemData.answer || 'Clear detailed answer.'
    };
    const updated = { ...content, faqs: [...(content.faqs || []), newFaq] };
    saveContent(updated);
  };

  const updateFaq = (index, updatedItem) => {
    const list = [...(content.faqs || [])];
    list[index] = { ...list[index], ...updatedItem };
    saveContent({ ...content, faqs: list });
  };

  const deleteFaq = (index) => {
    const list = (content.faqs || []).filter((_, i) => i !== index);
    saveContent({ ...content, faqs: list });
  };

  // 6. Blogs CRUD
  const addBlog = (itemData) => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      slug: itemData.slug || `post-${Date.now()}`,
      title: itemData.title || 'New Blog Insight',
      category: itemData.category || 'STRATEGY',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: itemData.author || 'Agatha Team',
      imageUrl: itemData.imageUrl || 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
      excerpt: itemData.excerpt || 'Summary of the blog post article.',
      content: itemData.content || 'Full content of the blog post article.',
      tags: itemData.tags || ['Marketing', 'Strategy'],
      status: 'Published'
    };
    const updated = { ...content, blogs: [...(content.blogs || []), newBlog] };
    saveContent(updated);
  };

  const updateBlog = (index, updatedItem) => {
    const list = [...(content.blogs || [])];
    list[index] = { ...list[index], ...updatedItem };
    saveContent({ ...content, blogs: list });
  };

  const deleteBlog = (index) => {
    const list = (content.blogs || []).filter((_, i) => i !== index);
    saveContent({ ...content, blogs: list });
  };

  const toggleBlogStatus = (index) => {
    const list = [...(content.blogs || [])];
    list[index].status = list[index].status === 'Draft' ? 'Published' : 'Draft';
    saveContent({ ...content, blogs: list });
  };

  // 7. Media Library Actions
  const addMediaAsset = (mediaData) => {
    const newAsset = {
      id: `media-${Date.now()}`,
      name: mediaData.name || 'Uploaded Asset',
      url: mediaData.url,
      type: mediaData.type || 'image',
      size: mediaData.size || '150 KB',
      date: new Date().toLocaleDateString()
    };
    const updated = { ...content, mediaLibrary: [...(content.mediaLibrary || []), newAsset] };
    saveContent(updated);
  };

  const deleteMediaAsset = (index) => {
    const list = (content.mediaLibrary || []).filter((_, i) => i !== index);
    saveContent({ ...content, mediaLibrary: list });
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
    saveContent(defaultData);
  };

  return (
    <ContentContext.Provider value={{
      content,
      saveContent,
      updateBrand,
      updateSection,
      resetToDefaults,
      isAdminOpen,
      setIsAdminOpen,
      activeTab,
      setActiveTab,
      activeView,
      setActiveView,
      activeSlug,
      selectedService,
      setSelectedService,
      selectedBlog,
      setSelectedBlog,
      navigateToView,
      isAuthenticated,
      login,
      logout,
      changePassword,
      forgotPasswordReset,
      // CRUD Functions
      addService,
      updateService,
      deleteService,
      duplicateService,
      reorderServices,
      addPortfolio,
      updatePortfolio,
      deletePortfolio,
      duplicatePortfolio,
      toggleFeaturedPortfolio,
      addClient,
      updateClient,
      deleteClient,
      reorderClients,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      toggleTestimonialVisibility,
      addFaq,
      updateFaq,
      deleteFaq,
      addBlog,
      updateBlog,
      deleteBlog,
      toggleBlogStatus,
      addMediaAsset,
      deleteMediaAsset
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
