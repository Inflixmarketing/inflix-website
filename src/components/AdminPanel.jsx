import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  RotateCcw, 
  Download, 
  Upload, 
  Palette, 
  Layout, 
  Briefcase, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Sparkles,
  CheckCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    content, 
    updateBrand, 
    updateSection, 
    resetToDefaults, 
    exportConfig, 
    importConfig, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useContent();

  const [activeTab, setActiveTab] = useState('brand');
  const [saveNotification, setSaveNotification] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  if (!isAdminOpen) return null;

  const brand = content.brand || {};
  const hero = content.hero || {};
  const about = content.about || {};
  const whyUs = content.whyUs || {};

  const handleSaveNotify = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    if (importConfig(importJsonText)) {
      setImportJsonText('');
      handleSaveNotify();
    }
  };

  const downloadJsonFile = () => {
    const jsonStr = exportConfig();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inflix_brand_content_config.json';
    a.click();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 10, 20, 0.94)',
      backdropFilter: 'blur(16px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0'
    }}>
      <div style={{
        background: '#0d1626',
        border: '1px solid rgba(237, 180, 3, 0.4)',
        borderRadius: '0',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden'
      }} className="admin-container">
        {/* Top Header Bar */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'rgba(23, 38, 66, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: brand.primaryColor || '#edb403',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0c1421'
            }}>
              <Palette size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                Inflix Admin Panel
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Primary: #edb403 | Secondary: #173765
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {saveNotification && (
              <span style={{
                color: '#10b981',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <CheckCircle size={14} /> Saved!
              </span>
            )}

            <button 
              onClick={() => { resetToDefaults(); handleSaveNotify(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.75rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: 600
              }}
            >
              <RotateCcw size={13} /> Reset
            </button>

            <button 
              onClick={() => setIsAdminOpen(false)}
              style={{
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar Tabs + Editor Workspace */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }} className="admin-body">
          
          {/* Sidebar Tabs */}
          <div style={{
            width: '220px',
            background: 'rgba(10, 17, 30, 0.85)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1rem 0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            overflowY: 'auto'
          }} className="admin-sidebar">
            <TabButton id="brand" label="Brand & Colors" icon={Palette} active={activeTab} onClick={setActiveTab} />
            <TabButton id="hero" label="Hero Section" icon={Sparkles} active={activeTab} onClick={setActiveTab} />
            <TabButton id="about" label="About Us & Image" icon={Layout} active={activeTab} onClick={setActiveTab} />
            <TabButton id="services" label="Services & Covers" icon={Briefcase} active={activeTab} onClick={setActiveTab} />
            <TabButton id="portfolio" label="Portfolio Images" icon={ImageIcon} active={activeTab} onClick={setActiveTab} />
            <TabButton id="clients" label="Client Logos" icon={Users} active={activeTab} onClick={setActiveTab} />
            <TabButton id="testimonials" label="Testimonials" icon={MessageSquare} active={activeTab} onClick={setActiveTab} />
            <TabButton id="faqs" label="FAQ Accordion" icon={HelpCircle} active={activeTab} onClick={setActiveTab} />
            <TabButton id="blogs" label="Blog Articles" icon={FileText} active={activeTab} onClick={setActiveTab} />
            <TabButton id="json" label="Export / Import" icon={Download} active={activeTab} onClick={setActiveTab} />
          </div>

          {/* Editor Workspace */}
          <div style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            background: '#0d1626'
          }} className="admin-workspace">
            
            {/* TAB 1: BRAND & LOGO UPLOAD */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  Brand Specs & Palette
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Primary: #edb403 | Secondary: #173765
                </p>

                <div className="card-glass" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <ImageUploadField 
                    label="Upload Brand Logo Image (PNG / SVG)"
                    value={brand.logoUrl}
                    onChange={(newUrl) => {
                      updateBrand('logoUrl', newUrl);
                      handleSaveNotify();
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div className="card-glass" style={{ padding: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                      Primary Color (#edb403)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input 
                        type="color" 
                        value={brand.primaryColor || '#edb403'} 
                        onChange={(e) => { updateBrand('primaryColor', e.target.value); handleSaveNotify(); }}
                        style={{ width: '42px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                      />
                      <input 
                        type="text" 
                        value={brand.primaryColor || '#edb403'} 
                        onChange={(e) => { updateBrand('primaryColor', e.target.value); handleSaveNotify(); }}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="card-glass" style={{ padding: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                      Secondary Color (#173765)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input 
                        type="color" 
                        value={brand.secondaryColor || '#173765'} 
                        onChange={(e) => { updateBrand('secondaryColor', e.target.value); handleSaveNotify(); }}
                        style={{ width: '42px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                      />
                      <input 
                        type="text" 
                        value={brand.secondaryColor || '#173765'} 
                        onChange={(e) => { updateBrand('secondaryColor', e.target.value); handleSaveNotify(); }}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HERO SECTION */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Edit Hero Section
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Outlined Capsule Text</label>
                      <input 
                        type="text" 
                        value={hero.capsuleOutline || ''} 
                        onChange={(e) => { updateSection('hero', { ...hero, capsuleOutline: e.target.value }); handleSaveNotify(); }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Display Word Highlight</label>
                      <input 
                        type="text" 
                        value={hero.displayHighlight || ''} 
                        onChange={(e) => { updateSection('hero', { ...hero, displayHighlight: e.target.value }); handleSaveNotify(); }}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Main Title</label>
                    <input 
                      type="text" 
                      value={hero.titleMain || ''} 
                      onChange={(e) => { updateSection('hero', { ...hero, titleMain: e.target.value }); handleSaveNotify(); }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Description</label>
                    <textarea 
                      rows={3}
                      value={hero.description || ''} 
                      onChange={(e) => { updateSection('hero', { ...hero, description: e.target.value }); handleSaveNotify(); }}
                      style={textareaStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ABOUT */}
            {activeTab === 'about' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Edit About Us Section
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="card-glass" style={{ padding: '1.25rem' }}>
                    <ImageUploadField 
                      label="Upload About Section Image"
                      value={about.aboutImage}
                      onChange={(newUrl) => {
                        updateSection('about', { ...about, aboutImage: newUrl });
                        handleSaveNotify();
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Headline</label>
                    <input 
                      type="text" 
                      value={about.headline || ''} 
                      onChange={(e) => { updateSection('about', { ...about, headline: e.target.value }); handleSaveNotify(); }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Highlight Copy</label>
                    <textarea 
                      rows={3}
                      value={about.highlight || ''} 
                      onChange={(e) => { updateSection('about', { ...about, highlight: e.target.value }); handleSaveNotify(); }}
                      style={textareaStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SERVICES */}
            {activeTab === 'services' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Manage Services
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.services || []).map((svc, index) => (
                    <div key={svc.id} className="card-glass" style={{ padding: '1.25rem' }}>
                      <ImageUploadField 
                        label={`Cover Image: ${svc.title}`}
                        value={svc.imageUrl}
                        onChange={(newUrl) => {
                          const newServices = [...content.services];
                          newServices[index].imageUrl = newUrl;
                          updateSection('services', newServices);
                          handleSaveNotify();
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Manage Portfolio
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.portfolio || []).map((p, i) => (
                    <div key={p.id} className="card-glass" style={{ padding: '1.25rem' }}>
                      <ImageUploadField 
                        label={`Project Image: ${p.title}`}
                        value={p.imageUrl}
                        onChange={(newUrl) => {
                          const newP = [...content.portfolio];
                          newP[i].imageUrl = newUrl;
                          updateSection('portfolio', newP);
                          handleSaveNotify();
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JSON */}
            {activeTab === 'json' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Export / Import JSON
                </h3>

                <button 
                  onClick={downloadJsonFile}
                  className="btn-agatha-gold"
                  style={{ marginBottom: '1.5rem' }}
                >
                  <Download size={16} /> Download Backup
                </button>

                <div className="card-glass" style={{ padding: '1.25rem' }}>
                  <textarea 
                    rows={6}
                    placeholder="Paste JSON configuration..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    style={{ ...textareaStyle, fontFamily: 'monospace', fontSize: '0.8rem' }}
                  />

                  <button 
                    onClick={handleImportSubmit}
                    className="btn-agatha-navy"
                    style={{ marginTop: '1rem' }}
                  >
                    <Upload size={14} /> Import Config
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-container {
            width: 90% !important;
            height: 90vh !important;
            border-radius: 20px !important;
          }
        }
        @media (max-width: 767px) {
          .admin-body {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding: 0.5rem !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          }
          .admin-sidebar button {
            white-space: nowrap !important;
            padding: 0.4rem 0.75rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const ImageUploadField = ({ label, value, onChange }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
        {label}
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
        {value ? (
          <div style={{ position: 'relative', width: '70px', height: '55px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', background: '#000' }}>
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button 
              onClick={() => onChange('')}
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: 'rgba(239, 68, 68, 0.85)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div style={{
            width: '70px',
            height: '55px',
            borderRadius: '8px',
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}>
            <ImageIcon size={20} />
          </div>
        )}

        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              background: '#edb403',
              color: '#0c1421',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}>
              <Upload size={13} />
              <span>Choose File</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                style={{ display: 'none' }} 
              />
            </label>
          </div>

          <input 
            type="text" 
            placeholder="https://example.com/image.jpg"
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ id, label, icon: Icon, active, onClick }) => {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        width: '100%',
        padding: '0.6rem 0.85rem',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: isActive ? 700 : 500,
        textAlign: 'left',
        background: isActive ? 'rgba(237, 180, 3, 0.2)' : 'transparent',
        color: isActive ? '#edb403' : 'rgba(255, 255, 255, 0.65)',
        border: `1px solid ${isActive ? 'rgba(237, 180, 3, 0.4)' : 'transparent'}`
      }}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.85rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '0.85rem',
  outline: 'none'
};

const textareaStyle = {
  width: '100%',
  padding: '0.6rem 0.85rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '0.85rem',
  outline: 'none',
  resize: 'vertical'
};
