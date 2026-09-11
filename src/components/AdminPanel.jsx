import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  Palette, 
  Layout, 
  Briefcase, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle,
  FileText,
  Save,
  Lock,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Star,
  Search,
  Upload,
  Image as ImageIcon,
  Key,
  Globe,
  Activity,
  Layers,
  Menu,
  ChevronRight,
  Shield,
  Clock
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    content, 
    saveContent,
    resetToDefaults, 
    isAdminOpen, 
    setIsAdminOpen,
    isAuthenticated,
    login,
    logout,
    changePassword,
    forgotPasswordReset,
    // CRUD Operators
    addService,
    updateService,
    deleteService,
    duplicateService,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    duplicatePortfolio,
    toggleFeaturedPortfolio,
    addClient,
    updateClient,
    deleteClient,
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
    deleteMediaAsset,
    navigateToView
  } = useContent();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveNotification, setSaveNotification] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auth Modal State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotAnswer, setForgotAnswer] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  // Change Password Form State
  const [oldPassInput, setOldPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [passChangeStatus, setPassChangeStatus] = useState('');

  // Media Library Search State
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(passwordInput);
    if (res.success) {
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError(res.error);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const res = forgotPasswordReset(forgotAnswer);
    if (res.success) {
      setForgotMsg(res.message);
    } else {
      setForgotMsg(res.error);
    }
  };

  const handleChangePassSubmit = (e) => {
    e.preventDefault();
    const res = changePassword(oldPassInput, newPassInput);
    if (res.success) {
      setPassChangeStatus('Password successfully updated!');
      setOldPassInput('');
      setNewPassInput('');
      setTimeout(() => setPassChangeStatus(''), 3000);
    } else {
      setPassChangeStatus(`Error: ${res.error}`);
    }
  };

  const handleSaveAll = () => {
    saveContent(localContent);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Url = ev.target.result;
      callback(base64Url, file.name);
    };
    reader.readAsDataURL(file);
  };

  const updateLocalSectionField = (sectionKey, fieldKey, value) => {
    const updated = {
      ...localContent,
      [sectionKey]: {
        ...localContent[sectionKey],
        [fieldKey]: value
      }
    };
    setLocalContent(updated);
    saveContent(updated);
  };

  /* ==========================================================================
     1. AUTHENTICATION LOCK & FORGOT PASSWORD MODALS
     ========================================================================== */
  if (!isAuthenticated) {
    return (
      <div style={modalOverlayStyle}>
        <div style={authModalCardStyle}>
          <button onClick={() => setIsAdminOpen(false)} style={closeIconButtonStyle}>
            <X size={20} />
          </button>

          <div style={lockIconCircleStyle}>
            <Lock size={26} />
          </div>

          <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.5rem', marginBottom: '0.4rem', color: '#ffffff' }}>
            Agatha CMS Admin Login
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
            Enter your password to access your live website dashboard.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={authInputStyle}
              autoFocus
            />

            {authError && (
              <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 600 }}>
                {authError}
              </span>
            )}

            <button type="submit" className="btn-agatha-purple" style={{ width: '100%', marginTop: '0.5rem' }}>
              UNLOCK DASHBOARD
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', fontSize: '0.785rem' }}>
            <button 
              onClick={() => setShowForgotModal(true)} 
              style={{ color: '#a394ff', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </button>
            <span style={{ color: '#64748b' }}>Default: <code style={{ color: '#a394ff' }}>inflix2026</code></span>
          </div>
        </div>

        {/* Forgot Password Reset Prompt */}
        {showForgotModal && (
          <div style={modalOverlayStyle}>
            <div style={authModalCardStyle}>
              <button onClick={() => setShowForgotModal(false)} style={closeIconButtonStyle}>
                <X size={20} />
              </button>

              <div style={lockIconCircleStyle}>
                <Key size={26} />
              </div>

              <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.4rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                Password Recovery
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                Enter the security phrase (<code style={{ color: '#a394ff' }}>inflix</code> or <code style={{ color: '#a394ff' }}>agatha</code>) to reset.
              </p>

              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Security Phrase" 
                  value={forgotAnswer}
                  onChange={(e) => setForgotAnswer(e.target.value)}
                  style={authInputStyle}
                />

                {forgotMsg && (
                  <span style={{ fontSize: '0.8rem', color: forgotMsg.includes('reset') ? '#10b981' : '#f87171', fontWeight: 600 }}>
                    {forgotMsg}
                  </span>
                )}

                <button type="submit" className="btn-agatha-purple" style={{ width: '100%' }}>
                  RESET PASSWORD
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ==========================================================================
     2. FULL CMS DASHBOARD WORKSPACE
     ========================================================================== */
  const sidebarNavItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Activity },
    { id: 'hero', label: 'Hero Section', icon: Layout },
    { id: 'about', label: 'About Section', icon: FileText },
    { id: 'services', label: `Services (${localContent.services?.length || 0})`, icon: Briefcase },
    { id: 'portfolio', label: `Portfolio (${localContent.portfolio?.length || 0})`, icon: Layers },
    { id: 'clients', label: `Clients (${localContent.clients?.length || 0})`, icon: Users },
    { id: 'testimonials', label: `Testimonials (${localContent.testimonials?.length || 0})`, icon: MessageSquare },
    { id: 'faqs', label: `FAQs (${localContent.faqs?.length || 0})`, icon: HelpCircle },
    { id: 'blogs', label: `Blogs (${localContent.blogs?.length || 0})`, icon: FileText },
    { id: 'media', label: `Media Library (${localContent.mediaLibrary?.length || 0})`, icon: ImageIcon },
    { id: 'seo', label: 'SEO & Meta Settings', icon: Globe },
    { id: 'settings', label: 'Security & Settings', icon: Key }
  ];

  return (
    <div style={modalOverlayStyle}>
      <div style={dashboardContainerStyle}>
        
        {/* Top Navbar */}
        <div style={topNavbarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
              className="mobile-sidebar-toggle"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', padding: '0.35rem' }}
            >
              <Menu size={22} />
            </button>

            <div style={headerLogoSquareStyle}>
              <Palette size={20} />
            </div>

            <div>
              <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                Agatha CMS Suite
              </h2>
              <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                Full Site Control Panel
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {saveNotification && (
              <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={15} /> Saved Live!
              </span>
            )}

            <button 
              onClick={() => { resetToDefaults(); setSaveNotification(true); setTimeout(() => setSaveNotification(false), 2000); }}
              style={resetButtonStyle}
            >
              <RefreshCw size={14} /> Reset Defaults
            </button>

            <button onClick={handleSaveAll} className="btn-agatha-purple" style={{ padding: '0.5rem 1.1rem', fontSize: '0.8rem' }}>
              <Save size={15} />
              <span>SAVE ALL</span>
            </button>

            <button onClick={logout} style={logoutButtonStyle}>
              <LogOut size={14} /> Logout
            </button>

            <button onClick={() => setIsAdminOpen(false)} style={{ color: '#ffffff', padding: '0.35rem' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
          
          {/* Sidebar Navigation */}
          <div className={`admin-sidebar ${mobileSidebarOpen ? 'sidebar-open' : ''}`} style={sidebarContainerStyle}>
            {sidebarNavItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileSidebarOpen(false); }}
                  style={{
                    ...sidebarNavButtonStyle,
                    background: isActive ? 'rgba(103, 82, 236, 0.2)' : 'transparent',
                    color: isActive ? '#a394ff' : '#94a3b8',
                    border: isActive ? '1px solid rgba(103, 82, 236, 0.4)' : '1px solid transparent'
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? '#a394ff' : '#64748b' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Editor Body */}
          <div style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', background: '#0c0a1d' }}>
            
            {/* ===================================================================
               1. DASHBOARD OVERVIEW TAB
               =================================================================== */}
            {activeTab === 'dashboard' && (
              <div>
                <h3 style={tabHeaderTitleStyle}>Website Performance & Content Overview</h3>

                {/* Counter Metric Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  {[
                    { label: 'Total Projects', count: localContent.portfolio?.length || 0, color: '#6752ec', icon: Layers },
                    { label: 'Total Services', count: localContent.services?.length || 0, color: '#a394ff', icon: Briefcase },
                    { label: 'Testimonials', count: localContent.testimonials?.length || 0, color: '#10b981', icon: MessageSquare },
                    { label: 'Blog Posts', count: localContent.blogs?.length || 0, color: '#f59e0b', icon: FileText },
                    { label: 'FAQs', count: localContent.faqs?.length || 0, color: '#ec4899', icon: HelpCircle }
                  ].map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={i} className="card-glass" style={{ padding: '1.25rem', borderLeft: `4px solid ${stat.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{stat.label}</span>
                          <StatIcon size={18} style={{ color: stat.color }} />
                        </div>
                        <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '2rem', color: '#ffffff', display: 'block', marginTop: '0.5rem' }}>
                          {stat.count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions & Website Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="dashboard-grid-split">
                  <div className="card-glass" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff', marginBottom: '1rem' }}>
                      Quick Actions
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <button onClick={() => { addService({ title: 'New Service' }); setActiveTab('services'); }} style={quickActionBtnStyle}>
                        <Plus size={16} /> Add New Service Page
                      </button>
                      <button onClick={() => { addPortfolio({ title: 'New Project' }); setActiveTab('portfolio'); }} style={quickActionBtnStyle}>
                        <Plus size={16} /> Add Portfolio Project
                      </button>
                      <button onClick={() => { addBlog({ title: 'New Article' }); setActiveTab('blogs'); }} style={quickActionBtnStyle}>
                        <Plus size={16} /> Draft New Blog Article
                      </button>
                    </div>
                  </div>

                  <div className="card-glass" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff', marginBottom: '1rem' }}>
                      Website System Status
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.9rem', color: '#ffffff' }}>System Online & Synchronized</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                        Current Theme: <strong style={{ color: '#a394ff' }}>Agatha Creative Portfolio</strong><br />
                        Heading Font: <strong style={{ color: '#a394ff' }}>Ancola Regular/Italic</strong><br />
                        Data Version: <strong style={{ color: '#a394ff' }}>v5 Dynamic Store</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================
               2. HERO MANAGER TAB
               =================================================================== */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={tabHeaderTitleStyle}>Hero Section Manager</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={adminLabelStyle}>Top Badge Capsule</label>
                    <input type="text" value={localContent.hero?.capsuleOutline || ''} onChange={(e) => updateLocalSectionField('hero', 'capsuleOutline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Main Title Headline</label>
                    <input type="text" value={localContent.hero?.titleMain || ''} onChange={(e) => updateLocalSectionField('hero', 'titleMain', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Description Paragraph</label>
                    <textarea rows={3} value={localContent.hero?.description || ''} onChange={(e) => updateLocalSectionField('hero', 'description', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Primary CTA Text</label>
                    <input type="text" value={localContent.hero?.primaryCta || ''} onChange={(e) => updateLocalSectionField('hero', 'primaryCta', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Secondary CTA Text</label>
                    <input type="text" value={localContent.hero?.secondaryCta || ''} onChange={(e) => updateLocalSectionField('hero', 'secondaryCta', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================
               3. ABOUT MANAGER TAB
               =================================================================== */}
            {activeTab === 'about' && (
              <div>
                <h3 style={tabHeaderTitleStyle}>About Section Manager</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={adminLabelStyle}>Category Badge</label>
                    <input type="text" value={localContent.about?.category || ''} onChange={(e) => updateLocalSectionField('about', 'category', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Headline</label>
                    <input type="text" value={localContent.about?.headline || ''} onChange={(e) => updateLocalSectionField('about', 'headline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Highlight Paragraph</label>
                    <textarea rows={3} value={localContent.about?.highlight || ''} onChange={(e) => updateLocalSectionField('about', 'highlight', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Body Narrative</label>
                    <textarea rows={3} value={localContent.about?.body || ''} onChange={(e) => updateLocalSectionField('about', 'body', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Philosophy Section</label>
                    <textarea rows={3} value={localContent.about?.philosophy || ''} onChange={(e) => updateLocalSectionField('about', 'philosophy', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Goals Section</label>
                    <textarea rows={3} value={localContent.about?.goals || ''} onChange={(e) => updateLocalSectionField('about', 'goals', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================
               4. SERVICES MANAGER (Full CRUD + Duplicate + Reorder)
               =================================================================== */}
            {activeTab === 'services' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Services Management ({localContent.services?.length || 0})
                  </h3>
                  <button onClick={() => addService({ title: 'New Service' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New Service
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.services || []).map((serv, index) => (
                    <div key={serv.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>#{index + 1}: {serv.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => duplicateService(index)} style={actionIconBtnStyle} title="Duplicate">
                            <Copy size={15} /> Duplicate
                          </button>
                          <button onClick={() => deleteService(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Title</label>
                          <input type="text" value={serv.title} onChange={(e) => updateService(index, { title: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Slug</label>
                          <input type="text" value={serv.slug || ''} onChange={(e) => updateService(index, { slug: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={adminLabelStyle}>Short Description</label>
                          <input type="text" value={serv.shortDesc} onChange={(e) => updateService(index, { shortDesc: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={adminLabelStyle}>Overview Strategy Content</label>
                          <textarea rows={3} value={serv.overviewContent || ''} onChange={(e) => updateService(index, { overviewContent: e.target.value })} style={adminInputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               5. PORTFOLIO MANAGER (Full CRUD + Multi-Image + Featured Toggle)
               =================================================================== */}
            {activeTab === 'portfolio' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Portfolio Projects ({localContent.portfolio?.length || 0})
                  </h3>
                  <button onClick={() => addPortfolio({ title: 'New Creative Project' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add Portfolio Project
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.portfolio || []).map((port, index) => (
                    <div key={port.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>{port.category}: {port.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button 
                            onClick={() => toggleFeaturedPortfolio(index)} 
                            style={{
                              ...actionIconBtnStyle,
                              background: port.featured ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                              color: port.featured ? '#f59e0b' : '#94a3b8'
                            }}
                          >
                            <Star size={14} fill={port.featured ? '#f59e0b' : 'none'} /> {port.featured ? 'Featured' : 'Standard'}
                          </button>
                          <button onClick={() => duplicatePortfolio(index)} style={actionIconBtnStyle}>
                            <Copy size={15} /> Duplicate
                          </button>
                          <button onClick={() => deletePortfolio(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Category</label>
                          <input type="text" value={port.category} onChange={(e) => updatePortfolio(index, { category: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Project Title</label>
                          <input type="text" value={port.title} onChange={(e) => updatePortfolio(index, { title: e.target.value })} style={adminInputStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={adminLabelStyle}>Image URL</label>
                        <input type="text" value={port.imageUrl || ''} onChange={(e) => updatePortfolio(index, { imageUrl: e.target.value })} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               6. CLIENTS MANAGER (Full CRUD + Reorder)
               =================================================================== */}
            {activeTab === 'clients' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Client Brands ({localContent.clients?.length || 0})
                  </h3>
                  <button onClick={() => addClient({ name: 'New Client Brand' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New Client
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.clients || []).map((cli, index) => (
                    <div key={cli.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>Brand: {cli.name}</div>
                        <button onClick={() => deleteClient(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Brand Name</label>
                          <input type="text" value={cli.name} onChange={(e) => updateClient(index, { name: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Industry Category</label>
                          <input type="text" value={cli.category} onChange={(e) => updateClient(index, { category: e.target.value })} style={adminInputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={adminLabelStyle}>Case Study Highlight</label>
                        <textarea rows={2} value={cli.desc} onChange={(e) => updateClient(index, { desc: e.target.value })} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               7. TESTIMONIALS MANAGER (Full CRUD + Show/Hide Toggle)
               =================================================================== */}
            {activeTab === 'testimonials' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Testimonials ({localContent.testimonials?.length || 0})
                  </h3>
                  <button onClick={() => addTestimonial({ name: 'Client Review' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add Testimonial
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.testimonials || []).map((t, index) => (
                    <div key={t.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>{t.name} ({t.title})</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => toggleTestimonialVisibility(index)}
                            style={{
                              ...actionIconBtnStyle,
                              color: t.visible !== false ? '#10b981' : '#94a3b8'
                            }}
                          >
                            {t.visible !== false ? <Eye size={14} /> : <EyeOff size={14} />} {t.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                          <button onClick={() => deleteTestimonial(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Client Name</label>
                          <input type="text" value={t.name} onChange={(e) => updateTestimonial(index, { name: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Designation / Title</label>
                          <input type="text" value={t.title} onChange={(e) => updateTestimonial(index, { title: e.target.value })} style={adminInputStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={adminLabelStyle}>Review Quote</label>
                        <textarea rows={2} value={t.quote} onChange={(e) => updateTestimonial(index, { quote: e.target.value })} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               8. FAQ MANAGER (Full CRUD + Category)
               =================================================================== */}
            {activeTab === 'faqs' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Frequently Asked Questions ({localContent.faqs?.length || 0})
                  </h3>
                  <button onClick={() => addFaq({ question: 'New Question?' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New FAQ
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.faqs || []).map((f, index) => (
                    <div key={f.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>FAQ #{index + 1}</div>
                        <button onClick={() => deleteFaq(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <div style={{ marginBottom: '0.75rem' }}>
                        <label style={adminLabelStyle}>Question</label>
                        <input type="text" value={f.question} onChange={(e) => updateFaq(index, { question: e.target.value })} style={adminInputStyle} />
                      </div>
                      <div>
                        <label style={adminLabelStyle}>Answer</label>
                        <textarea rows={2} value={f.answer} onChange={(e) => updateFaq(index, { answer: e.target.value })} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               9. BLOG MANAGER (Full CRUD + Draft/Publish)
               =================================================================== */}
            {activeTab === 'blogs' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>
                    Blog Posts & Insights ({localContent.blogs?.length || 0})
                  </h3>
                  <button onClick={() => addBlog({ title: 'New Article' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New Article
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.blogs || []).map((b, index) => (
                    <div key={b.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#a394ff' }}>{b.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => toggleBlogStatus(index)}
                            style={{
                              ...actionIconBtnStyle,
                              color: b.status === 'Published' ? '#10b981' : '#f59e0b'
                            }}
                          >
                            {b.status === 'Published' ? 'Published' : 'Draft'}
                          </button>
                          <button onClick={() => deleteBlog(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Title</label>
                          <input type="text" value={b.title} onChange={(e) => updateBlog(index, { title: e.target.value })} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Category</label>
                          <input type="text" value={b.category} onChange={(e) => updateBlog(index, { category: e.target.value })} style={adminInputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '0.75rem' }}>
                        <label style={adminLabelStyle}>Image URL</label>
                        <input type="text" value={b.imageUrl || ''} onChange={(e) => updateBlog(index, { imageUrl: e.target.value })} style={adminInputStyle} />
                      </div>

                      <div>
                        <label style={adminLabelStyle}>Full Article Content</label>
                        <textarea rows={4} value={b.content || b.excerpt || ''} onChange={(e) => updateBlog(index, { content: e.target.value })} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               10. MEDIA LIBRARY TAB
               =================================================================== */}
            {activeTab === 'media' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h3 style={{ ...tabHeaderTitleStyle, margin: 0 }}>Centralized Media Library</h3>
                  
                  <label style={{ ...addButtonHeaderStyle, cursor: 'pointer' }}>
                    <Upload size={16} /> Upload New Asset
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, (url, name) => addMediaAsset({ url, name }))}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  {(localContent.mediaLibrary || []).map((m, index) => (
                    <div key={m.id || index} style={{ ...itemCardContainerStyle, padding: '1rem', textAlign: 'center' }}>
                      <img src={m.url} alt={m.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />
                      <div style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.name}
                      </div>
                      <button onClick={() => deleteMediaAsset(index)} style={{ ...deleteButtonStyle, marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================
               11. SEO & META SETTINGS TAB
               =================================================================== */}
            {activeTab === 'seo' && (
              <div>
                <h3 style={tabHeaderTitleStyle}>SEO Manager & Metadata Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Global Meta Title</label>
                    <input type="text" value={localContent.seoSettings?.metaTitle || ''} onChange={(e) => updateLocalSectionField('seoSettings', 'metaTitle', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Global Meta Description</label>
                    <textarea rows={3} value={localContent.seoSettings?.metaDescription || ''} onChange={(e) => updateLocalSectionField('seoSettings', 'metaDescription', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Canonical URL</label>
                    <input type="text" value={localContent.seoSettings?.canonicalUrl || ''} onChange={(e) => updateLocalSectionField('seoSettings', 'canonicalUrl', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Open Graph Image URL</label>
                    <input type="text" value={localContent.seoSettings?.ogImage || ''} onChange={(e) => updateLocalSectionField('seoSettings', 'ogImage', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================
               12. SECURITY & SETTINGS TAB
               =================================================================== */}
            {activeTab === 'settings' && (
              <div>
                <h3 style={tabHeaderTitleStyle}>Admin Security & Password Management</h3>
                <div className="card-glass" style={{ padding: '1.75rem', maxWidth: '500px' }}>
                  <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                    Change Admin Password
                  </h4>

                  <form onSubmit={handleChangePassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={adminLabelStyle}>Current Password</label>
                      <input type="password" value={oldPassInput} onChange={(e) => setOldPassInput(e.target.value)} style={adminInputStyle} required />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>New Password</label>
                      <input type="password" value={newPassInput} onChange={(e) => setNewPassInput(e.target.value)} style={adminInputStyle} required />
                    </div>

                    {passChangeStatus && (
                      <span style={{ fontSize: '0.825rem', color: passChangeStatus.includes('successfully') ? '#10b981' : '#f87171', fontWeight: 600 }}>
                        {passChangeStatus}
                      </span>
                    )}

                    <button type="submit" className="btn-agatha-purple" style={{ marginTop: '0.5rem' }}>
                      UPDATE PASSWORD
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

/* Styles */
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(2, 1, 12, 0.94)',
  backdropFilter: 'blur(16px)',
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
};

const authModalCardStyle = {
  background: '#0c0a1d',
  border: '1px solid rgba(103, 82, 236, 0.35)',
  borderRadius: '20px',
  maxWidth: '420px',
  width: '100%',
  padding: '2.5rem 2rem',
  color: '#ffffff',
  textAlign: 'center',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
  position: 'relative'
};

const closeIconButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: '#94a3b8',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const lockIconCircleStyle = {
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  background: 'rgba(103, 82, 236, 0.15)',
  color: '#a394ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.25rem auto',
  border: '1px solid rgba(103, 82, 236, 0.3)'
};

const authInputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '10px',
  border: '1px solid rgba(103, 82, 236, 0.3)',
  background: 'rgba(0, 0, 0, 0.3)',
  color: '#ffffff',
  fontSize: '0.95rem',
  textAlign: 'center',
  letterSpacing: '0.1em'
};

const dashboardContainerStyle = {
  background: '#0c0a1d',
  color: '#ffffff',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '1280px',
  height: '92vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
  overflow: 'hidden',
  border: '1px solid rgba(103, 82, 236, 0.35)'
};

const topNavbarStyle = {
  padding: '1rem 1.5rem',
  background: '#02010c',
  borderBottom: '1px solid rgba(103, 82, 236, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '1rem'
};

const headerLogoSquareStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: '#6752ec',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff'
};

const resetButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.5rem 0.85rem',
  background: 'rgba(239, 68, 68, 0.15)',
  color: '#f87171',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const logoutButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.5rem 0.85rem',
  background: 'rgba(255, 255, 255, 0.08)',
  color: '#94a3b8',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer'
};

const sidebarContainerStyle = {
  width: '240px',
  background: '#02010c',
  borderRight: '1px solid rgba(103, 82, 236, 0.2)',
  padding: '1.25rem 0.85rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  overflowY: 'auto'
};

const sidebarNavButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.7rem 0.85rem',
  borderRadius: '8px',
  fontSize: '0.825rem',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const tabHeaderTitleStyle = {
  fontFamily: "'Ancola', 'Tenor Sans', serif",
  fontSize: '1.4rem',
  fontWeight: 400,
  marginBottom: '1.5rem',
  color: '#ffffff'
};

const tabHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
  gap: '1rem'
};

const adminLabelStyle = {
  display: 'block',
  fontWeight: 600,
  fontSize: '0.825rem',
  marginBottom: '0.35rem',
  color: '#a394ff'
};

const adminInputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid rgba(103, 82, 236, 0.25)',
  background: 'rgba(0, 0, 0, 0.3)',
  color: '#ffffff',
  fontSize: '0.875rem',
  fontFamily: 'inherit'
};

const addButtonHeaderStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.55rem 1.1rem',
  background: '#6752ec',
  color: '#ffffff',
  borderRadius: '8px',
  fontSize: '0.825rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 15px rgba(103, 82, 236, 0.3)',
  border: 'none'
};

const deleteButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.35rem 0.75rem',
  background: 'rgba(239, 68, 68, 0.15)',
  color: '#f87171',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '6px',
  fontSize: '0.785rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const actionIconBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.35rem 0.75rem',
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#cbd5e1',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  fontSize: '0.785rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const itemCardContainerStyle = {
  border: '1px solid rgba(103, 82, 236, 0.25)',
  borderRadius: '12px',
  padding: '1.25rem',
  background: 'rgba(255,255,255,0.02)'
};

const itemCardHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.85rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const quickActionBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.7rem 1rem',
  background: 'rgba(103, 82, 236, 0.15)',
  color: '#ffffff',
  border: '1px solid rgba(103, 82, 236, 0.3)',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'left'
};
