import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Menu, X, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { content, setIsAdminOpen, isAdminOpen, activeTab, setActiveTab } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  const handleNavClick = (tabId, hash) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: 'rgba(2, 1, 12, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(103, 82, 236, 0.18)',
      padding: '0.9rem 0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <a href="#home" onClick={() => handleNavClick('home', '#home')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none'
        }}>
          {brand.logoUrl ? (
            <img src={brand.logoUrl} alt={brand.siteName} style={{ height: '38px', maxWidth: '160px', objectFit: 'contain' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6752ec 0%, #a394ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: `0 4px 20px rgba(103, 82, 236, 0.4)`
              }}>
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                  <rect x="15" y="35" width="16" height="50" rx="4" fill="#ffffff" />
                  <circle cx="23" cy="20" r="8" fill="#ffffff" />
                  <path d="M40 85 L75 20 L85 20 L85 30 L50 85 Z" fill="#ffffff" />
                  <path d="M45 20 L80 85 L70 85 L35 20 Z" fill="#02010c" />
                </svg>
              </div>
              <div>
                <span style={{
                  fontFamily: "'Ancola', 'Tenor Sans', serif",
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                  lineHeight: 1
                }}>
                  Agatha
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  color: '#a394ff',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: '2px'
                }}>
                  CREATIVE AGENCY
                </span>
              </div>
            </div>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          gap: '2.25rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <a href="#home" onClick={() => handleNavClick('home', '#home')} style={navLinkStyle(activeTab === 'home', '#a394ff')}>HOME</a>
          <a href="#about" onClick={() => handleNavClick('about', '#about')} style={navLinkStyle(activeTab === 'about', '#a394ff')}>ABOUT</a>
          
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <a 
              href="#services" 
              onClick={() => handleNavClick('services', '#services')} 
              style={{ ...navLinkStyle(activeTab === 'services', '#a394ff'), display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <span>SERVICES</span>
              <ChevronDown size={14} />
            </a>

            {servicesDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#0c0a1d',
                border: '1px solid rgba(103, 82, 236, 0.3)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '1rem',
                minWidth: '210px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '0.5rem',
                zIndex: 200
              }}>
                <a href="#services" onClick={() => handleNavClick('services', '#services')} style={dropdownItemStyle}>
                  ALL SERVICES
                </a>
              </div>
            )}
          </div>

          <a href="#portfolio" onClick={() => handleNavClick('portfolio', '#portfolio')} style={navLinkStyle(activeTab === 'portfolio', '#a394ff')}>PORTFOLIO</a>
          <a href="#process" onClick={() => handleNavClick('process', '#process')} style={navLinkStyle(activeTab === 'process', '#a394ff')}>PROCESS</a>
          <a href="#testimonials" onClick={() => handleNavClick('testimonials', '#testimonials')} style={navLinkStyle(activeTab === 'testimonials', '#a394ff')}>REVIEWS</a>
          <a href="#contact" onClick={() => handleNavClick('contact', '#contact')} style={navLinkStyle(activeTab === 'contact', '#a394ff')}>CONTACT</a>
        </nav>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Admin Panel Trigger */}
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: `1px solid rgba(103, 82, 236, 0.5)`,
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <Settings size={14} style={{ color: '#a394ff' }} />
            <span>Admin</span>
          </button>

          {/* Desktop Only CTA (Hidden on Mobile view to avoid clutter) */}
          <a 
            href="#contact" 
            className="btn-agatha-purple desktop-cta"
            style={{ padding: '0.65rem 1.6rem', fontSize: '0.8rem' }}
          >
            <span>GET STARTED →</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#ffffff', padding: '0.4rem' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#02010c',
          borderTop: '1px solid rgba(103, 82, 236, 0.2)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <a href="#home" onClick={() => handleNavClick('home', '#home')} style={mobileNavLinkStyle}>HOME</a>
          <a href="#about" onClick={() => handleNavClick('about', '#about')} style={mobileNavLinkStyle}>ABOUT</a>
          <a href="#services" onClick={() => handleNavClick('services', '#services')} style={mobileNavLinkStyle}>SERVICES</a>
          <a href="#portfolio" onClick={() => handleNavClick('portfolio', '#portfolio')} style={mobileNavLinkStyle}>PORTFOLIO</a>
          <a href="#process" onClick={() => handleNavClick('process', '#process')} style={mobileNavLinkStyle}>PROCESS</a>
          <a href="#testimonials" onClick={() => handleNavClick('testimonials', '#testimonials')} style={mobileNavLinkStyle}>REVIEWS</a>
          <a href="#contact" onClick={() => handleNavClick('contact', '#contact')} style={mobileNavLinkStyle}>CONTACT</a>
          
          <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-agatha-purple"
              style={{ width: '100%' }}
            >
              LET'S TALK →
            </a>
            <button 
              onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
              className="btn-agatha-outline"
              style={{ width: '100%' }}
            >
              OPEN ADMIN PANEL
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
};

const navLinkStyle = (isActive, primaryColor) => ({
  color: isActive ? primaryColor : '#cbd5e1',
  fontWeight: isActive ? 700 : 600,
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  transition: 'all 0.2s ease',
  borderBottom: isActive ? `2px solid ${primaryColor}` : '2px solid transparent',
  paddingBottom: '2px'
});

const dropdownItemStyle = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.05em',
  color: '#ffffff',
  textTransform: 'uppercase'
};

const mobileNavLinkStyle = {
  color: '#ffffff',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.4rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};
