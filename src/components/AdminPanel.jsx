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
  RefreshCw
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    content, 
    saveContent,
    resetToDefaults, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useContent();

  const [activeTab, setActiveTab] = useState('brand');
  const [saveNotification, setSaveNotification] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('inflix_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default Admin Passwords: inflix2026 or admin
    if (passwordInput === 'inflix2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('inflix_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect Admin Password! Try: inflix2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('inflix_admin_auth');
    setIsAdminOpen(false);
  };

  const handleSaveAll = async () => {
    saveContent(localContent);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target.result;
      const updated = {
        ...localContent,
        brand: { ...localContent.brand, logoUrl: base64Url }
      };
      setLocalContent(updated);
      saveContent(updated);
    };
    reader.readAsDataURL(file);
  };

  const updateLocalSection = (sectionKey, fieldKey, value) => {
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

  const updateLocalBrand = (fieldKey, value) => {
    const updated = {
      ...localContent,
      brand: {
        ...localContent.brand,
        [fieldKey]: value
      }
    };
    setLocalContent(updated);
    saveContent(updated);
  };

  /* ==========================================================================
     1. ADMIN AUTH LOCK SCREEN MODAL
     ========================================================================== */
  if (!isAuthenticated) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(9, 13, 22, 0.92)',
        backdropFilter: 'blur(16px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{
          background: '#0f172a',
          border: '1px solid rgba(237, 180, 3, 0.35)',
          borderRadius: '20px',
          maxWidth: '420px',
          width: '100%',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)',
          position: 'relative'
        }}>
          <button 
            onClick={() => setIsAdminOpen(false)}
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8' }}
          >
            <X size={22} />
          </button>

          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(237, 180, 3, 0.15)',
            color: '#edb403',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            border: '1px solid rgba(237, 180, 3, 0.3)'
          }}>
            <Lock size={26} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: '#ffffff' }}>
            Admin Access Required
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
            Enter your admin password to access live website controls.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '0.95rem',
                textAlign: 'center',
                letterSpacing: '0.1em'
              }}
              autoFocus
            />

            {authError && (
              <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 600 }}>
                {authError}
              </span>
            )}

            <button type="submit" className="btn-agatha-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
              UNLOCK ADMIN PANEL
            </button>
          </form>

          <small style={{ display: 'block', marginTop: '1.25rem', color: '#64748b', fontSize: '0.75rem' }}>
            Default Password: <code style={{ color: '#edb403' }}>inflix2026</code>
          </small>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     2. FULL ADMIN PANEL WORKSPACE
     ========================================================================== */
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(9, 13, 22, 0.9)',
      backdropFilter: 'blur(16px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#0f172a',
        color: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1200px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        border: '1px solid rgba(237, 180, 3, 0.3)'
      }}>
        
        {/* Admin Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: '#090d16',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#edb403',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#090d16'
            }}>
              <Palette size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Inflix Live Admin Panel
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Real-Time Website & Brand Editor
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {saveNotification && (
              <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={16} /> Reflected Live!
              </span>
            )}

            {/* Reset Defaults Button */}
            <button 
              onClick={() => { resetToDefaults(); setSaveNotification(true); setTimeout(() => setSaveNotification(false), 2000); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.5rem 0.85rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <RefreshCw size={14} /> Reset Defaults
            </button>

            {/* Save All Button */}
            <button 
              onClick={handleSaveAll}
              className="btn-agatha-gold"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Save size={16} />
              <span>SAVE & APPLY LIVE</span>
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.5rem 0.85rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <LogOut size={14} /> Logout
            </button>

            <button 
              onClick={() => setIsAdminOpen(false)}
              style={{ color: '#ffffff', padding: '0.4rem' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main Admin Workspace */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Navigation Sidebar */}
          <div style={{
            width: '240px',
            background: '#090d16',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1.25rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {[
              { id: 'brand', label: 'Brand & Logo', icon: Palette },
              { id: 'hero', label: 'Hero Banner', icon: Layout },
              { id: 'about', label: 'About Us', icon: FileText },
              { id: 'services', label: 'Services (8)', icon: Briefcase },
              { id: 'portfolio', label: 'Portfolio (9)', icon: Briefcase },
              { id: 'clients', label: 'Clients (8)', icon: Users },
              { id: 'testimonials', label: 'Testimonials (5)', icon: MessageSquare },
              { id: 'faqs', label: 'FAQs (4)', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(237, 180, 3, 0.15)' : 'transparent',
                    color: isActive ? '#edb403' : '#94a3b8',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    border: isActive ? '1px solid rgba(237, 180, 3, 0.3)' : '1px solid transparent'
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? '#edb403' : '#64748b' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Editor Form View */}
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#0f172a' }}>
            
            {/* BRAND & LOGO TAB */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>
                  Brand Identity & Uploadable Logo
                </h3>
                
                {/* Uploadable Logo Section */}
                <div style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', marginBottom: '2rem', background: 'rgba(255,255,255,0.03)' }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: '#edb403' }}>Upload Custom Website Logo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {localContent.brand?.logoUrl ? (
                      <img src={localContent.brand.logoUrl} alt="Logo Preview" style={{ height: '50px', objectFit: 'contain', border: '1px solid rgba(255,255,255,0.2)', padding: '4px', borderRadius: '6px', background: '#ffffff' }} />
                    ) : (
                      <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Default Text Mark Active</div>
                    )}
                    
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      style={{ fontSize: '0.85rem' }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={adminLabelStyle}>Site Name</label>
                    <input type="text" value={localContent.brand?.siteName || ''} onChange={(e) => updateLocalBrand('siteName', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Tagline</label>
                    <input type="text" value={localContent.brand?.tagline || ''} onChange={(e) => updateLocalBrand('tagline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Contact Email</label>
                    <input type="text" value={localContent.brand?.contactEmail || ''} onChange={(e) => updateLocalBrand('contactEmail', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Contact Phone</label>
                    <input type="text" value={localContent.brand?.contactPhone || ''} onChange={(e) => updateLocalBrand('contactPhone', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Hero Banner Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Badge Pill Text</label>
                    <input type="text" value={localContent.hero?.capsuleOutline || ''} onChange={(e) => updateLocalSection('hero', 'capsuleOutline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Main Title Headline</label>
                    <input type="text" value={localContent.hero?.titleMain || ''} onChange={(e) => updateLocalSection('hero', 'titleMain', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Description</label>
                    <textarea rows={3} value={localContent.hero?.description || ''} onChange={(e) => updateLocalSection('hero', 'description', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Primary CTA Text</label>
                    <input type="text" value={localContent.hero?.primaryCta || ''} onChange={(e) => updateLocalSection('hero', 'primaryCta', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Secondary CTA Text</label>
                    <input type="text" value={localContent.hero?.secondaryCta || ''} onChange={(e) => updateLocalSection('hero', 'secondaryCta', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT US TAB */}
            {activeTab === 'about' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>About Us Section</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={adminLabelStyle}>Section Category</label>
                    <input type="text" value={localContent.about?.category || ''} onChange={(e) => updateLocalSection('about', 'category', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Headline</label>
                    <input type="text" value={localContent.about?.headline || ''} onChange={(e) => updateLocalSection('about', 'headline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Top Highlight Text</label>
                    <textarea rows={3} value={localContent.about?.highlight || ''} onChange={(e) => updateLocalSection('about', 'highlight', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={adminLabelStyle}>Right Body Paragraph</label>
                    <textarea rows={3} value={localContent.about?.body || ''} onChange={(e) => updateLocalSection('about', 'body', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Left Box 1: Our Philosophy</label>
                    <textarea rows={3} value={localContent.about?.philosophy || ''} onChange={(e) => updateLocalSection('about', 'philosophy', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Left Box 2: Our Goals</label>
                    <textarea rows={3} value={localContent.about?.goals || ''} onChange={(e) => updateLocalSection('about', 'goals', e.target.value)} style={adminInputStyle} />
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Services Cards Management (8 Services)</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.services || []).map((serv, index) => (
                    <div key={serv.id} style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#edb403' }}>Service #{index + 1}: {serv.title}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Title</label>
                          <input type="text" value={serv.title} onChange={(e) => {
                            const updatedServices = [...localContent.services];
                            updatedServices[index].title = e.target.value;
                            const newCont = { ...localContent, services: updatedServices };
                            setLocalContent(newCont);
                            saveContent(newCont);
                          }} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Short Description</label>
                          <input type="text" value={serv.shortDesc} onChange={(e) => {
                            const updatedServices = [...localContent.services];
                            updatedServices[index].shortDesc = e.target.value;
                            const newCont = { ...localContent, services: updatedServices };
                            setLocalContent(newCont);
                            saveContent(newCont);
                          }} style={adminInputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Portfolio Projects (9 Projects)</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.portfolio || []).map((port, index) => (
                    <div key={port.id} style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800, color: '#edb403', marginBottom: '0.4rem' }}>{port.category}: {port.title}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                        <input type="text" placeholder="Category" value={port.category} onChange={(e) => {
                          const updated = [...localContent.portfolio];
                          updated[index].category = e.target.value;
                          const newCont = { ...localContent, portfolio: updated };
                          setLocalContent(newCont);
                          saveContent(newCont);
                        }} style={adminInputStyle} />
                        <input type="text" placeholder="Title" value={port.title} onChange={(e) => {
                          const updated = [...localContent.portfolio];
                          updated[index].title = e.target.value;
                          const newCont = { ...localContent, portfolio: updated };
                          setLocalContent(newCont);
                          saveContent(newCont);
                        }} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLIENTS TAB */}
            {activeTab === 'clients' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Client Brands & Case Studies</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.clients || []).map((cli, index) => (
                    <div key={cli.id} style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800, color: '#edb403', marginBottom: '0.4rem' }}>Brand: {cli.name}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <input type="text" placeholder="Brand Name" value={cli.name} onChange={(e) => {
                          const updated = [...localContent.clients];
                          updated[index].name = e.target.value;
                          const newCont = { ...localContent, clients: updated };
                          setLocalContent(newCont);
                          saveContent(newCont);
                        }} style={adminInputStyle} />
                        <input type="text" placeholder="Category" value={cli.category} onChange={(e) => {
                          const updated = [...localContent.clients];
                          updated[index].category = e.target.value;
                          const newCont = { ...localContent, clients: updated };
                          setLocalContent(newCont);
                          saveContent(newCont);
                        }} style={adminInputStyle} />
                      </div>
                      <textarea rows={2} placeholder="Description" value={cli.desc} onChange={(e) => {
                        const updated = [...localContent.clients];
                        updated[index].desc = e.target.value;
                        const newCont = { ...localContent, clients: updated };
                        setLocalContent(newCont);
                        saveContent(newCont);
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Testimonials Reviews</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.testimonials || []).map((t, index) => (
                    <div key={t.id} style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800, color: '#edb403', marginBottom: '0.4rem' }}>{t.name} ({t.title})</div>
                      <textarea rows={2} value={t.quote} onChange={(e) => {
                        const updated = [...localContent.testimonials];
                        updated[index].quote = e.target.value;
                        const newCont = { ...localContent, testimonials: updated };
                        setLocalContent(newCont);
                        saveContent(newCont);
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQS TAB */}
            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.faqs || []).map((f, index) => (
                    <div key={f.id} style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                      <label style={adminLabelStyle}>Q{index + 1}: Question</label>
                      <input type="text" value={f.question} onChange={(e) => {
                        const updated = [...localContent.faqs];
                        updated[index].question = e.target.value;
                        const newCont = { ...localContent, faqs: updated };
                        setLocalContent(newCont);
                        saveContent(newCont);
                      }} style={{ ...adminInputStyle, marginBottom: '0.5rem' }} />
                      <label style={adminLabelStyle}>Answer</label>
                      <textarea rows={2} value={f.answer} onChange={(e) => {
                        const updated = [...localContent.faqs];
                        updated[index].answer = e.target.value;
                        const newCont = { ...localContent, faqs: updated };
                        setLocalContent(newCont);
                        saveContent(newCont);
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

const adminLabelStyle = {
  display: 'block',
  fontWeight: 700,
  fontSize: '0.85rem',
  marginBottom: '0.35rem',
  color: '#edb403'
};

const adminInputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  background: 'rgba(0, 0, 0, 0.25)',
  color: '#ffffff',
  fontSize: '0.9rem',
  fontFamily: 'inherit'
};
