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
  CheckCircle,
  FileText,
  Save,
  Image as ImageIcon,
  Sun,
  Moon
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    content, 
    saveContent,
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
  const [localContent, setLocalContent] = useState(content);

  if (!isAdminOpen) return null;

  const handleSaveAll = async () => {
    saveContent(localContent);
    setSaveNotification(true);

    // Sync to Node.js backend if active
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localContent)
      });
    } catch (err) {
      console.log('Local save completed (Backend sync optional)');
    }

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

  const handleThemeToggle = (mode) => {
    let updated;
    if (mode === 'bright') {
      updated = {
        ...localContent,
        brand: {
          ...localContent.brand,
          darkBg: '#f8fafc',
          surfaceBg: '#ffffff',
          secondaryColor: '#0f172a'
        }
      };
    } else {
      updated = {
        ...localContent,
        brand: {
          ...localContent.brand,
          darkBg: '#0b0c10',
          surfaceBg: '#173765',
          secondaryColor: '#173765'
        }
      };
    }
    setLocalContent(updated);
    saveContent(updated);
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
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        color: '#0f172a',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1200px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        
        {/* Admin Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: '#0f172a',
          color: '#ffffff',
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
              color: '#0f172a'
            }}>
              <Palette size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Inflix Live Admin Panel
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Full Customization & Real-Time Website Editor
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {saveNotification && (
              <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={16} /> Changes Saved Live!
              </span>
            )}

            {/* Bright / Dark Mode Toggle */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '0.25rem', borderRadius: '8px', gap: '0.25rem' }}>
              <button 
                onClick={() => handleThemeToggle('bright')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  background: localContent.brand?.darkBg === '#f8fafc' ? '#edb403' : 'transparent',
                  color: localContent.brand?.darkBg === '#f8fafc' ? '#0f172a' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Sun size={14} /> Bright Mode
              </button>
              <button 
                onClick={() => handleThemeToggle('dark')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  background: localContent.brand?.darkBg === '#0b0c10' ? '#edb403' : 'transparent',
                  color: localContent.brand?.darkBg === '#0b0c10' ? '#0f172a' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Moon size={14} /> Dark Mode
              </button>
            </div>

            {/* Save All Changes Button */}
            <button 
              onClick={handleSaveAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.25rem',
                background: '#edb403',
                color: '#0f172a',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(237, 180, 3, 0.4)'
              }}
            >
              <Save size={16} />
              <span>SAVE CHANGES</span>
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
            background: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
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
                    background: isActive ? '#0f172a' : 'transparent',
                    color: isActive ? '#ffffff' : '#475569',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? '#edb403' : '#64748b' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Editor Form View */}
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#ffffff' }}>
            
            {/* BRAND & LOGO TAB */}
            {activeTab === 'brand' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
                  Brand Identity & Uploadable Logo
                </h3>
                
                {/* Uploadable Logo Section */}
                <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '2rem', background: '#f8fafc' }}>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Website Logo Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {localContent.brand?.logoUrl ? (
                      <img src={localContent.brand.logoUrl} alt="Logo Preview" style={{ height: '50px', objectFit: 'contain', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '6px', background: '#ffffff' }} />
                    ) : (
                      <div style={{ padding: '0.5rem 1rem', background: '#e2e8f0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Text Mark Active</div>
                    )}
                    
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      style={{ fontSize: '0.85rem' }} 
                    />
                  </div>
                  <small style={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>Upload any PNG/SVG/JPG logo from your computer. It will update live across the header, footer, and brand touchpoints.</small>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Site Name</label>
                    <input 
                      type="text" 
                      value={localContent.brand?.siteName || ''} 
                      onChange={(e) => updateLocalBrand('siteName', e.target.value)}
                      style={adminInputStyle} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Tagline</label>
                    <input 
                      type="text" 
                      value={localContent.brand?.tagline || ''} 
                      onChange={(e) => updateLocalBrand('tagline', e.target.value)}
                      style={adminInputStyle} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Contact Email</label>
                    <input 
                      type="text" 
                      value={localContent.brand?.contactEmail || ''} 
                      onChange={(e) => updateLocalBrand('contactEmail', e.target.value)}
                      style={adminInputStyle} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.85rem' }}>Contact Phone</label>
                    <input 
                      type="text" 
                      value={localContent.brand?.contactPhone || ''} 
                      onChange={(e) => updateLocalBrand('contactPhone', e.target.value)}
                      style={adminInputStyle} 
                    />
                  </div>
                </div>

                <button onClick={handleSaveAll} style={saveBtnStyle}>
                  <Save size={16} /> Save Brand Settings
                </button>
              </div>
            )}

            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Hero Banner Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={adminLabelStyle}>Capsule Outline Pill</label>
                    <input type="text" value={localContent.hero?.capsuleOutline || ''} onChange={(e) => updateLocalSection('hero', 'capsuleOutline', e.target.value)} style={adminInputStyle} />
                  </div>
                  <div>
                    <label style={adminLabelStyle}>Capsule Solid Pill</label>
                    <input type="text" value={localContent.hero?.capsuleSolid || ''} onChange={(e) => updateLocalSection('hero', 'capsuleSolid', e.target.value)} style={adminInputStyle} />
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
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save Hero Changes</button>
              </div>
            )}

            {/* ABOUT US TAB */}
            {activeTab === 'about' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>About Us Section</h3>
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
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save About Us Changes</button>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Services Cards Management (8 Services)</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {(localContent.services || []).map((serv, index) => (
                    <div key={serv.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', background: '#f8fafc' }}>
                      <div style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#edb403' }}>Service #{index + 1}: {serv.title}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={adminLabelStyle}>Title</label>
                          <input type="text" value={serv.title} onChange={(e) => {
                            const updatedServices = [...localContent.services];
                            updatedServices[index].title = e.target.value;
                            setLocalContent({ ...localContent, services: updatedServices });
                          }} style={adminInputStyle} />
                        </div>
                        <div>
                          <label style={adminLabelStyle}>Short Description</label>
                          <input type="text" value={serv.shortDesc} onChange={(e) => {
                            const updatedServices = [...localContent.services];
                            updatedServices[index].shortDesc = e.target.value;
                            setLocalContent({ ...localContent, services: updatedServices });
                          }} style={adminInputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save All Services</button>
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Portfolio Projects (9 Projects)</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.portfolio || []).map((port, index) => (
                    <div key={port.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', background: '#f8fafc' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>{port.category}: {port.title}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                        <input type="text" placeholder="Category" value={port.category} onChange={(e) => {
                          const updated = [...localContent.portfolio];
                          updated[index].category = e.target.value;
                          setLocalContent({ ...localContent, portfolio: updated });
                        }} style={adminInputStyle} />
                        <input type="text" placeholder="Title" value={port.title} onChange={(e) => {
                          const updated = [...localContent.portfolio];
                          updated[index].title = e.target.value;
                          setLocalContent({ ...localContent, portfolio: updated });
                        }} style={adminInputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save Portfolio Changes</button>
              </div>
            )}

            {/* CLIENTS TAB */}
            {activeTab === 'clients' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Client Brands & Case Studies (8 Clients)</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.clients || []).map((cli, index) => (
                    <div key={cli.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', background: '#f8fafc' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Brand: {cli.name}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <input type="text" placeholder="Brand Name" value={cli.name} onChange={(e) => {
                          const updated = [...localContent.clients];
                          updated[index].name = e.target.value;
                          setLocalContent({ ...localContent, clients: updated });
                        }} style={adminInputStyle} />
                        <input type="text" placeholder="Category" value={cli.category} onChange={(e) => {
                          const updated = [...localContent.clients];
                          updated[index].category = e.target.value;
                          setLocalContent({ ...localContent, clients: updated });
                        }} style={adminInputStyle} />
                      </div>
                      <textarea rows={2} placeholder="Description" value={cli.desc} onChange={(e) => {
                        const updated = [...localContent.clients];
                        updated[index].desc = e.target.value;
                        setLocalContent({ ...localContent, clients: updated });
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save Clients Changes</button>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Testimonials Reviews (5 Reviews)</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.testimonials || []).map((t, index) => (
                    <div key={t.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', background: '#f8fafc' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>{t.name} ({t.title})</div>
                      <textarea rows={2} value={t.quote} onChange={(e) => {
                        const updated = [...localContent.testimonials];
                        updated[index].quote = e.target.value;
                        setLocalContent({ ...localContent, testimonials: updated });
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save Testimonials</button>
              </div>
            )}

            {/* FAQS TAB */}
            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {(localContent.faqs || []).map((f, index) => (
                    <div key={f.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', background: '#f8fafc' }}>
                      <label style={adminLabelStyle}>Q{index + 1}: Question</label>
                      <input type="text" value={f.question} onChange={(e) => {
                        const updated = [...localContent.faqs];
                        updated[index].question = e.target.value;
                        setLocalContent({ ...localContent, faqs: updated });
                      }} style={{ ...adminInputStyle, marginBottom: '0.5rem' }} />
                      <label style={adminLabelStyle}>Answer</label>
                      <textarea rows={2} value={f.answer} onChange={(e) => {
                        const updated = [...localContent.faqs];
                        updated[index].answer = e.target.value;
                        setLocalContent({ ...localContent, faqs: updated });
                      }} style={adminInputStyle} />
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveAll} style={saveBtnStyle}><Save size={16} /> Save FAQs</button>
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
  color: '#0f172a'
};

const adminInputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  color: '#0f172a',
  fontSize: '0.9rem',
  fontFamily: 'inherit'
};

const saveBtnStyle = {
  marginTop: '1.5rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  background: '#edb403',
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '0.85rem',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(237, 180, 3, 0.4)'
};
