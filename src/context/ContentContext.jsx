import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data/defaultContent.json';

const ContentContext = createContext();

const LOCAL_STORAGE_KEY = 'inflix_website_data_v3';

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
          about: { ...defaultData.about, ...(parsed.about || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading saved content', e);
    }
    return defaultData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);

  // Fetch live saved content from Hostinger PHP/MySQL API on mount
  useEffect(() => {
    const fetchHostingerContent = async () => {
      try {
        const res = await fetch('/api/content.php');
        if (res.ok) {
          const data = await res.json();
          if (data && data.brand) {
            setContent(prev => ({ ...defaultData, ...prev, ...data }));
          }
        }
      } catch (err) {
        // Fallback to defaultData & localStorage
      }
    };
    fetchHostingerContent();
  }, []);

  // Sync CSS properties
  useEffect(() => {
    if (!content || !content.brand) return;
    const root = document.documentElement;
    const primary = content.brand.primaryColor || '#edb403';
    const secondary = content.brand.secondaryColor || '#0f172a';
    const accent = content.brand.accentColor || '#edb403';

    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-secondary', secondary);
    root.style.setProperty('--color-accent', accent);
    root.style.setProperty('--color-heading-text', '#ffffff');
    root.style.setProperty('--color-body-text', '#cbd5e1');
    root.style.setProperty('--font-heading', `'Syne', 'Plus Jakarta Sans', sans-serif`);
    root.style.setProperty('--font-body', `'Plus Jakarta Sans', sans-serif`);
  }, [content]);

  // Save changes to state, localStorage & Hostinger live API
  const saveContent = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Error saving content', e);
    }

    // Sync to Hostinger live PHP/MySQL API
    fetch('/api/content.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent)
    }).catch(() => {});
  };

  const updateBrand = (key, value) => {
    const updated = {
      ...content,
      brand: {
        ...content.brand,
        [key]: value
      }
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

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
    saveContent(defaultData);
  };

  const exportConfig = () => {
    return JSON.stringify(content, null, 2);
  };

  const importConfig = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      saveContent(parsed);
      return true;
    } catch (e) {
      alert('Invalid JSON configuration string');
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      saveContent,
      updateBrand,
      updateSection,
      resetToDefaults,
      exportConfig,
      importConfig,
      isAdminOpen,
      setIsAdminOpen,
      activeTab,
      setActiveTab,
      selectedService,
      setSelectedService
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
