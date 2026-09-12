import React, { useState } from 'react';
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
  Upload,
  Key,
  Layers,
  Menu,
  Share2,
  ShieldCheck,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// Reusable Image Uploader with File Picker, URL input, Replace, Delete & Live Preview
const ImageUploader = ({ label, value, onChange, placeholder = "Paste Image URL or Upload File" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      {label && <label style={adminLabelStyle}>{label}</label>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {value && (
          <div style={{
            position: 'relative',
            width: '100%',
            maxHeight: '160px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(237, 180, 3, 0.35)',
            background: '#0B132B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem'
          }}>
            <img 
              src={value} 
              alt="Preview" 
              style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder}
            style={{ ...adminInputStyle, flex: 1, minWidth: '180px' }}
          />
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1rem',
            background: '#173765',
            color: '#EDB403',
            border: '1px solid #EDB403',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}>
            <Upload size={14} />
            <span>{value ? 'Replace Image' : 'Upload Image'}</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          {value && (
            <button 
              type="button" 
              onClick={() => onChange('')} 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.65rem 0.85rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const AdminPanel = ({ isStandalone = false, onExit = null }) => {
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
    navigateToView,
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
    addFaq,
    updateFaq,
    deleteFaq,
    addBlog,
    updateBlog,
    deleteBlog
  } = useContent();

  // Active tab state (Default: 'hero')
  const [activeTab, setActiveTab] = useState('hero');
  const [saveNotification, setSaveNotification] = useState(false);
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

  const handleExit = () => {
    setIsAdminOpen(false);
    if (onExit) onExit();
    else navigateToView('home');
  };

  if (!isAdminOpen && !isStandalone) return null;

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

  const handleSaveAll = () => {
    saveContent(content);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const updateSectionState = (sectionKey, updatedSectionData) => {
    const updated = {
      ...content,
      [sectionKey]: updatedSectionData
    };
    saveContent(updated);
  };

  /* ==========================================================================
     1. AUTHENTICATION LOCK SCREEN
     ========================================================================== */
  if (!isAuthenticated) {
    return (
      <div style={modalOverlayStyle}>
        <div style={authModalCardStyle}>
          <button onClick={() => setIsAdminOpen(false)} style={closeIconButtonStyle}>
            <X size={20} />
          </button>

          <div style={lockIconCircleStyle}>
            <Lock size={32} style={{ color: '#EDB403' }} />
          </div>

          <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.6rem', fontWeight: 400, color: '#ffffff', marginBottom: '0.35rem' }}>
            Inflix Marketing Solution
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
            Website Management System
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={adminLabelStyle}>ADMIN PASSWORD</label>
              <input 
                type="password"
                placeholder="Enter password (default: inflix2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={authInputStyle}
                autoFocus
              />
            </div>

            {authError && (
              <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 600 }}>
                {authError}
              </span>
            )}

            <button type="submit" className="btn-agatha-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
              UNLOCK DASHBOARD
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', fontSize: '0.785rem' }}>
            <button 
              onClick={() => setShowForgotModal(true)} 
              style={{ color: '#EDB403', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </button>
            <span style={{ color: '#64748b' }}>Default: <code style={{ color: '#EDB403' }}>inflix2026</code></span>
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
                <Key size={26} style={{ color: '#EDB403' }} />
              </div>

              <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.4rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                Password Recovery
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                Enter the security phrase (<code style={{ color: '#EDB403' }}>inflix</code> or <code style={{ color: '#EDB403' }}>agatha</code>) to reset.
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

                <button type="submit" className="btn-agatha-gold" style={{ width: '100%' }}>
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
     2. FULL CMS DASHBOARD WORKSPACE (Media Library & SEO Completely Removed)
     ========================================================================== */
  const sidebarNavItems = [
    { id: 'hero', label: 'Hero Section', icon: Layout },
    { id: 'logo', label: 'Logo & Brand Identity', icon: Palette },
    { id: 'about', label: 'About Section', icon: FileText },
    { id: 'services', label: `Services (${content.services?.length || 0})`, icon: Briefcase },
    { id: 'portfolio', label: `Portfolio (${content.portfolio?.length || 0})`, icon: Layers },
    { id: 'clients', label: `Clients (${content.clients?.length || 0})`, icon: Users },
    { id: 'testimonials', label: `Testimonials (${content.testimonials?.length || 0})`, icon: MessageSquare },
    { id: 'faqs', label: `FAQs (${content.faqs?.length || 0})`, icon: HelpCircle },
    { id: 'blogs', label: `Blogs (${content.blogs?.length || 0})`, icon: FileText },
    { id: 'social', label: 'Social Media Links', icon: Share2 },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'settings', label: 'Security & Settings', icon: Key }
  ];

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false); // Closes menu drawer automatically
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={dashboardContainerStyle}>
        
        {/* Fixed Top Header Navbar */}
        <div style={topNavbarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
              className="mobile-sidebar-toggle"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', padding: '0.35rem', cursor: 'pointer', flexShrink: 0 }}
              aria-label="Toggle Navigation Drawer"
            >
              <Menu size={22} />
            </button>

            <div style={headerLogoSquareStyle}>
              <Palette size={18} style={{ color: '#173765' }} />
            </div>

            <div style={{ overflow: 'hidden' }}>
              <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                Inflix Marketing
              </h2>
              <span style={{ fontSize: '0.55rem', color: '#EDB403', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginTop: '2px', whiteSpace: 'nowrap' }}>
                Website Management System
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {saveNotification && (
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap' }}>
                <CheckCircle size={14} /> SAVED!
              </span>
            )}

            <button onClick={handleSaveAll} className="admin-nav-btn" style={adminSaveBtnStyle}>
              <Save size={14} /> <span style={{ whiteSpace: 'nowrap' }}>SAVE ALL</span>
            </button>

            <button onClick={logout} style={logoutIconButtonStyle} title="Lock Admin Session">
              <LogOut size={15} />
            </button>

            <button onClick={handleExit} style={closeIconButtonStyle} title="Return to Website">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dashboard Main Workspace Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative', width: '100%', height: 'calc(100dvh - 60px)' }}>
          
          {/* Mobile Overlay Background */}
          {mobileSidebarOpen && (
            <div 
              onClick={() => setMobileSidebarOpen(false)} 
              className="admin-mobile-overlay"
            />
          )}

          {/* Left Sidebar Drawer (Starts strictly below 60px header) */}
          <aside className={`admin-sidebar-drawer ${mobileSidebarOpen ? 'open' : ''}`} style={sidebarContainerStyle}>
            {sidebarNavItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  style={{
                    ...sidebarNavButtonStyle,
                    background: isActive ? '#EDB403' : 'transparent',
                    color: isActive ? '#173765' : '#E5E7EB',
                    fontWeight: isActive ? 700 : 500,
                    borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent'
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? '#173765' : '#EDB403' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Right Main Content Area (Starts strictly below 65px header) */}
          <main style={mainContentAreaStyle}>
            
            {/* 1. HERO SECTION (Default Tab) */}
            {activeTab === 'hero' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Hero Section CMS</h2>

                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={adminLabelStyle}>TOP OUTLINE PILL TEXT</label>
                      <input 
                        type="text" 
                        value={content.hero?.capsuleOutline || ''} 
                        onChange={(e) => updateSectionState('hero', { ...content.hero, capsuleOutline: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>

                    <div>
                      <label style={adminLabelStyle}>BOTTOM SOLID PILL TEXT</label>
                      <input 
                        type="text" 
                        value={content.hero?.capsuleSolid || ''} 
                        onChange={(e) => updateSectionState('hero', { ...content.hero, capsuleSolid: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>MAIN TITLE HEADLINE</label>
                    <input 
                      type="text" 
                      value={content.hero?.titleMain || ''} 
                      onChange={(e) => updateSectionState('hero', { ...content.hero, titleMain: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>SUBHEADING DESCRIPTION</label>
                    <textarea 
                      rows={3} 
                      value={content.hero?.description || ''} 
                      onChange={(e) => updateSectionState('hero', { ...content.hero, description: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <ImageUploader 
                    label="Hero Background Image (Optional)"
                    value={content.hero?.heroBgImage || ''}
                    onChange={(url) => updateSectionState('hero', { ...content.hero, heroBgImage: url })}
                  />
                </div>
              </div>
            )}

            {/* 2. LOGO & BRAND IDENTITY */}
            {activeTab === 'logo' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Logo & Brand Identity</h2>
                
                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <ImageUploader 
                    label="Website Header & Footer Logo Image"
                    value={content.brand?.logoUrl || ''}
                    onChange={(url) => updateSectionState('brand', { ...content.brand, logoUrl: url })}
                    placeholder="Paste Logo URL or Upload File"
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={adminLabelStyle}>SITE NAME</label>
                      <input 
                        type="text" 
                        value={content.brand?.siteName || ''} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, siteName: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>TAGLINE / SLOGAN</label>
                      <input 
                        type="text" 
                        value={content.brand?.tagline || ''} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, tagline: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-glass">
                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff', marginBottom: '1rem' }}>
                    Brand Colors & Contact Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={adminLabelStyle}>PRIMARY COLOR (GOLD)</label>
                      <input 
                        type="color" 
                        value={content.brand?.primaryColor || '#EDB403'} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, primaryColor: e.target.value })}
                        style={{ ...adminInputStyle, height: '42px', padding: '0.2rem' }}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>SECONDARY COLOR (NAVY)</label>
                      <input 
                        type="color" 
                        value={content.brand?.secondaryColor || '#173765'} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, secondaryColor: e.target.value })}
                        style={{ ...adminInputStyle, height: '42px', padding: '0.2rem' }}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>CONTACT EMAIL</label>
                      <input 
                        type="text" 
                        value={content.brand?.contactEmail || ''} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, contactEmail: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>CONTACT PHONE</label>
                      <input 
                        type="text" 
                        value={content.brand?.contactPhone || ''} 
                        onChange={(e) => updateSectionState('brand', { ...content.brand, contactPhone: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT SECTION */}
            {activeTab === 'about' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>About Section CMS</h2>

                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <ImageUploader 
                    label="About Section Feature Image"
                    value={content.about?.aboutImage || ''}
                    onChange={(url) => updateSectionState('about', { ...content.about, aboutImage: url })}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={adminLabelStyle}>CATEGORY LABEL</label>
                      <input 
                        type="text" 
                        value={content.about?.category || ''} 
                        onChange={(e) => updateSectionState('about', { ...content.about, category: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>

                    <div>
                      <label style={adminLabelStyle}>MAIN HEADLINE</label>
                      <input 
                        type="text" 
                        value={content.about?.headline || ''} 
                        onChange={(e) => updateSectionState('about', { ...content.about, headline: e.target.value })}
                        style={adminInputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>HIGHLIGHTED TEXT</label>
                    <textarea 
                      rows={2} 
                      value={content.about?.highlight || ''} 
                      onChange={(e) => updateSectionState('about', { ...content.about, highlight: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>BODY PARAGRAPH</label>
                    <textarea 
                      rows={3} 
                      value={content.about?.body || ''} 
                      onChange={(e) => updateSectionState('about', { ...content.about, body: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. SERVICES CMS */}
            {activeTab === 'services' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>Services Management ({content.services?.length || 0})</h2>
                  <button onClick={() => addService({ title: 'New Growth Service' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New Service
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.services || []).map((serv, index) => (
                    <div key={serv.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>#{index + 1}: {serv.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => duplicateService(index)} style={actionIconBtnStyle} title="Duplicate">
                            <Copy size={15} /> Duplicate
                          </button>
                          <button onClick={() => deleteService(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <ImageUploader 
                        label="Service Cover Image / Icon"
                        value={serv.imageUrl || ''}
                        onChange={(url) => updateService(index, { imageUrl: url })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>SERVICE TITLE</label>
                          <input 
                            type="text" 
                            value={serv.title || ''} 
                            onChange={(e) => updateService(index, { title: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>SHORT SUMMARY</label>
                          <input 
                            type="text" 
                            value={serv.shortDesc || ''} 
                            onChange={(e) => updateService(index, { shortDesc: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PORTFOLIO CMS */}
            {activeTab === 'portfolio' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>Portfolio Project Manager ({content.portfolio?.length || 0})</h2>
                  <button onClick={() => addPortfolio({ title: 'New Portfolio Project' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add Portfolio Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.portfolio || []).map((port, index) => (
                    <div key={port.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>{port.category}: {port.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button 
                            onClick={() => toggleFeaturedPortfolio(index)} 
                            style={{
                              ...actionIconBtnStyle,
                              color: port.featured ? '#EDB403' : '#94a3b8'
                            }}
                          >
                            <Eye size={15} /> {port.featured ? 'Featured' : 'Standard'}
                          </button>
                          <button onClick={() => deletePortfolio(index)} style={deleteButtonStyle}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>

                      <ImageUploader 
                        label="Portfolio Project Image"
                        value={port.imageUrl || ''}
                        onChange={(url) => updatePortfolio(index, { imageUrl: url })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>PROJECT TITLE</label>
                          <input 
                            type="text" 
                            value={port.title || ''} 
                            onChange={(e) => updatePortfolio(index, { title: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>CATEGORY</label>
                          <input 
                            type="text" 
                            value={port.category || ''} 
                            onChange={(e) => updatePortfolio(index, { category: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CLIENTS CMS */}
            {activeTab === 'clients' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>Client Brands Manager ({content.clients?.length || 0})</h2>
                  <button onClick={() => addClient({ name: 'New Client Brand' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add Client Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.clients || []).map((cli, index) => (
                    <div key={cli.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>Brand: {cli.name}</div>
                        <button onClick={() => deleteClient(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <ImageUploader 
                        label="Client Logo Image"
                        value={cli.logoUrl || ''}
                        onChange={(url) => updateClient(index, { logoUrl: url })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>BRAND NAME</label>
                          <input 
                            type="text" 
                            value={cli.name || ''} 
                            onChange={(e) => updateClient(index, { name: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>CASE DESCRIPTION</label>
                          <input 
                            type="text" 
                            value={cli.desc || ''} 
                            onChange={(e) => updateClient(index, { desc: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. TESTIMONIALS CMS */}
            {activeTab === 'testimonials' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>Client Reviews & Testimonials ({content.testimonials?.length || 0})</h2>
                  <button onClick={() => addTestimonial({ name: 'New Reviewer' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add Testimonial
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.testimonials || []).map((t, index) => (
                    <div key={t.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>{t.name} ({t.title})</div>
                        <button onClick={() => deleteTestimonial(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <ImageUploader 
                        label="Testimonial Avatar Image"
                        value={t.avatarUrl || ''}
                        onChange={(url) => updateTestimonial(index, { avatarUrl: url })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>NAME</label>
                          <input 
                            type="text" 
                            value={t.name || ''} 
                            onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>ROLE / CLINIC TITLE</label>
                          <input 
                            type="text" 
                            value={t.title || ''} 
                            onChange={(e) => updateTestimonial(index, { title: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={adminLabelStyle}>QUOTE CONTENT</label>
                        <textarea 
                          rows={2} 
                          value={t.quote || ''} 
                          onChange={(e) => updateTestimonial(index, { quote: e.target.value })}
                          style={adminInputStyle}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. FAQS CMS */}
            {activeTab === 'faqs' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>FAQs Manager ({content.faqs?.length || 0})</h2>
                  <button onClick={() => addFaq({ question: 'New Question?' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add FAQ Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.faqs || []).map((f, index) => (
                    <div key={f.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>FAQ #{index + 1}</div>
                        <button onClick={() => deleteFaq(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={adminLabelStyle}>QUESTION</label>
                        <input 
                          type="text" 
                          value={f.question || ''} 
                          onChange={(e) => updateFaq(index, { question: e.target.value })}
                          style={adminInputStyle}
                        />
                      </div>

                      <div>
                        <label style={adminLabelStyle}>ANSWER</label>
                        <textarea 
                          rows={2} 
                          value={f.answer || ''} 
                          onChange={(e) => updateFaq(index, { answer: e.target.value })}
                          style={adminInputStyle}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. BLOGS CMS */}
            {activeTab === 'blogs' && (
              <div>
                <div style={tabHeaderRowStyle}>
                  <h2 style={tabHeaderTitleStyle}>Blog Posts Manager ({content.blogs?.length || 0})</h2>
                  <button onClick={() => addBlog({ title: 'New Marketing Article' })} style={addButtonHeaderStyle}>
                    <Plus size={16} /> Add New Blog Post
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(content.blogs || []).map((b, index) => (
                    <div key={b.id || index} style={itemCardContainerStyle}>
                      <div style={itemCardHeaderRowStyle}>
                        <div style={{ fontWeight: 600, color: '#EDB403' }}>{b.title}</div>
                        <button onClick={() => deleteBlog(index)} style={deleteButtonStyle}>
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>

                      <ImageUploader 
                        label="Blog Featured Image"
                        value={b.imageUrl || ''}
                        onChange={(url) => updateBlog(index, { imageUrl: url })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>ARTICLE TITLE</label>
                          <input 
                            type="text" 
                            value={b.title || ''} 
                            onChange={(e) => updateBlog(index, { title: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>PUBLISH DATE</label>
                          <input 
                            type="text" 
                            value={b.date || ''} 
                            onChange={(e) => updateBlog(index, { date: e.target.value })}
                            style={adminInputStyle}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={adminLabelStyle}>EXCERPT SUMMARY</label>
                        <textarea 
                          rows={2} 
                          value={b.excerpt || ''} 
                          onChange={(e) => updateBlog(index, { excerpt: e.target.value })}
                          style={adminInputStyle}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. SOCIAL MEDIA & FOOTER LOGO CMS */}
            {activeTab === 'social' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Social Media & Global Controls</h2>

                {/* Coming Soon Toggle */}
                <div className="card-glass" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                      Global Coming Soon Page Mode
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
                      When enabled, Detail pages (Services, Portfolio, Blogs) will render a high-converting "Coming Soon" screen.
                    </p>
                  </div>
                  <button
                    onClick={() => updateSectionState('comingSoonMode', !content.comingSoonMode)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      background: content.comingSoonMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: content.comingSoonMode ? '#f87171' : '#10b981',
                      border: content.comingSoonMode ? '1px solid #f87171' : '1px solid #10b981',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {content.comingSoonMode ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    {content.comingSoonMode ? 'Coming Soon ACTIVE' : 'Standard Mode'}
                  </button>
                </div>

                {/* Footer Logo Uploader */}
                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <ImageUploader 
                    label="Footer Specific Logo Image (Optional)"
                    value={content.brand?.footerLogoUrl || ''}
                    onChange={(url) => updateSectionState('brand', { ...content.brand, footerLogoUrl: url })}
                    placeholder="Paste Footer Logo URL or Upload File"
                  />
                </div>

                {/* Social Media Links Form */}
                <div className="card-glass">
                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                    Social Media Profiles & URLs
                  </h3>
                  
                  {['facebook', 'instagram', 'linkedin', 'twitter', 'youtube', 'whatsapp'].map((platform) => {
                    const currentObj = content.brand?.socialLinks?.[platform] || { url: '', enabled: true };
                    return (
                      <div key={platform} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#EDB403', fontSize: '0.85rem' }}>
                          {platform}
                        </span>
                        <input
                          type="text"
                          value={currentObj.url || ''}
                          onChange={(e) => {
                            const updatedLinks = {
                              ...content.brand?.socialLinks,
                              [platform]: { ...currentObj, url: e.target.value }
                            };
                            updateSectionState('brand', { ...content.brand, socialLinks: updatedLinks });
                          }}
                          placeholder={`Enter ${platform} profile URL`}
                          style={adminInputStyle}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedLinks = {
                              ...content.brand?.socialLinks,
                              [platform]: { ...currentObj, enabled: !currentObj.enabled }
                            };
                            updateSectionState('brand', { ...content.brand, socialLinks: updatedLinks });
                          }}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '6px',
                            background: currentObj.enabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                            color: currentObj.enabled ? '#10b981' : '#94a3b8',
                            border: currentObj.enabled ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(148, 163, 184, 0.3)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {currentObj.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 11. PRIVACY POLICY CMS */}
            {activeTab === 'privacy' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Privacy Policy Page CMS</h2>

                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>PAGE TITLE</label>
                    <input 
                      type="text" 
                      value={content.privacyPolicy?.title || ''} 
                      onChange={(e) => updateSectionState('privacyPolicy', { ...content.privacyPolicy, title: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>SEO TITLE</label>
                    <input 
                      type="text" 
                      value={content.privacyPolicy?.seoTitle || ''} 
                      onChange={(e) => updateSectionState('privacyPolicy', { ...content.privacyPolicy, seoTitle: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>SEO DESCRIPTION</label>
                    <input 
                      type="text" 
                      value={content.privacyPolicy?.seoDesc || ''} 
                      onChange={(e) => updateSectionState('privacyPolicy', { ...content.privacyPolicy, seoDesc: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div>
                    <label style={adminLabelStyle}>PRIVACY POLICY DOCUMENT BODY</label>
                    <textarea 
                      rows={12} 
                      value={content.privacyPolicy?.content || ''} 
                      onChange={(e) => updateSectionState('privacyPolicy', { ...content.privacyPolicy, content: e.target.value })}
                      style={{ ...adminInputStyle, lineHeight: 1.6 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 12. TERMS OF SERVICE CMS */}
            {activeTab === 'terms' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Terms of Service Page CMS</h2>

                <div className="card-glass" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>PAGE TITLE</label>
                    <input 
                      type="text" 
                      value={content.termsOfService?.title || ''} 
                      onChange={(e) => updateSectionState('termsOfService', { ...content.termsOfService, title: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>SEO TITLE</label>
                    <input 
                      type="text" 
                      value={content.termsOfService?.seoTitle || ''} 
                      onChange={(e) => updateSectionState('termsOfService', { ...content.termsOfService, seoTitle: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={adminLabelStyle}>SEO DESCRIPTION</label>
                    <input 
                      type="text" 
                      value={content.termsOfService?.seoDesc || ''} 
                      onChange={(e) => updateSectionState('termsOfService', { ...content.termsOfService, seoDesc: e.target.value })}
                      style={adminInputStyle}
                    />
                  </div>

                  <div>
                    <label style={adminLabelStyle}>TERMS OF SERVICE DOCUMENT BODY</label>
                    <textarea 
                      rows={12} 
                      value={content.termsOfService?.content || ''} 
                      onChange={(e) => updateSectionState('termsOfService', { ...content.termsOfService, content: e.target.value })}
                      style={{ ...adminInputStyle, lineHeight: 1.6 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 13. SECURITY & SETTINGS */}
            {activeTab === 'settings' && (
              <div>
                <h2 style={tabHeaderTitleStyle}>Security & Password Settings</h2>

                <div className="card-glass" style={{ maxWidth: '500px' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const res = changePassword(oldPassInput, newPassInput);
                    if (res.success) {
                      setPassChangeStatus('Password updated successfully!');
                      setOldPassInput('');
                      setNewPassInput('');
                    } else {
                      setPassChangeStatus(res.error);
                    }
                  }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={adminLabelStyle}>CURRENT PASSWORD</label>
                      <input 
                        type="password" 
                        value={oldPassInput} 
                        onChange={(e) => setOldPassInput(e.target.value)}
                        style={adminInputStyle}
                        placeholder="Current password"
                      />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={adminLabelStyle}>NEW PASSWORD</label>
                      <input 
                        type="password" 
                        value={newPassInput} 
                        onChange={(e) => setNewPassInput(e.target.value)}
                        style={adminInputStyle}
                        placeholder="New admin password"
                      />
                    </div>

                    {passChangeStatus && (
                      <div style={{
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                        color: passChangeStatus.includes('successfully') ? '#10b981' : '#f87171',
                        fontWeight: 600
                      }}>
                        {passChangeStatus}
                      </div>
                    )}

                    <button type="submit" className="btn-agatha-gold">
                      UPDATE PASSWORD
                    </button>
                  </form>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

/* ==========================================================================
   STYLING OBJECTS FOR ADMIN CMS
   ========================================================================== */
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(11, 19, 43, 0.96)',
  backdropFilter: 'blur(16px)',
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0'
};

const authModalCardStyle = {
  background: '#173765',
  border: '1px solid rgba(237, 180, 3, 0.35)',
  borderRadius: '24px',
  maxWidth: '440px',
  width: '90%',
  padding: '2.5rem',
  position: 'relative',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
  textAlign: 'center'
};

const lockIconCircleStyle = {
  width: '68px',
  height: '68px',
  borderRadius: '50%',
  background: 'rgba(237, 180, 3, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem auto',
  border: '1px solid rgba(237, 180, 3, 0.35)'
};

const closeIconButtonStyle = {
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  flexShrink: 0
};

const logoutIconButtonStyle = {
  color: '#ffffff',
  background: 'rgba(239, 68, 68, 0.2)',
  border: '1px solid rgba(239, 68, 68, 0.4)',
  borderRadius: '8px',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0
};

const authInputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: '1px solid rgba(237, 180, 3, 0.3)',
  background: 'rgba(11, 19, 43, 0.7)',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const dashboardContainerStyle = {
  width: '100%',
  height: '100dvh',
  maxHeight: '100dvh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#0B132B',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 3000
};

const topNavbarStyle = {
  height: '60px',
  minHeight: '60px',
  background: '#173765',
  borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
  padding: '0 0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  zIndex: 3100,
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  boxSizing: 'border-box'
};

const adminSaveBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.35rem',
  background: '#EDB403',
  color: '#173765',
  height: '34px',
  padding: '0 0.75rem',
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(237, 180, 3, 0.3)'
};

const headerLogoSquareStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  background: '#EDB403',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#173765',
  flexShrink: 0
};

const sidebarContainerStyle = {
  width: '240px',
  background: '#173765',
  borderRight: '1px solid rgba(237, 180, 3, 0.2)',
  padding: '1.25rem 0.85rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  overflowY: 'auto',
  height: '100%'
};

const sidebarNavButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  fontSize: '0.825rem',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  width: '100%',
  border: 'none'
};

const mainContentAreaStyle = {
  flex: 1,
  padding: '1.75rem 1.5rem',
  overflowY: 'auto',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%'
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
  color: '#EDB403'
};

const adminInputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid rgba(237, 180, 3, 0.25)',
  background: 'rgba(11, 19, 43, 0.6)',
  color: '#ffffff',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const addButtonHeaderStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.55rem 1.1rem',
  background: '#EDB403',
  color: '#173765',
  borderRadius: '8px',
  fontSize: '0.825rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 15px rgba(237, 180, 3, 0.35)',
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
  color: '#E5E7EB',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  fontSize: '0.785rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const itemCardContainerStyle = {
  border: '1px solid rgba(237, 180, 3, 0.25)',
  borderRadius: '12px',
  padding: '1.25rem',
  background: 'rgba(23, 55, 101, 0.3)',
  boxSizing: 'border-box',
  width: '100%'
};

const itemCardHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.85rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
};
