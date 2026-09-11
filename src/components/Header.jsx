import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Menu, X, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { content, setIsAdminOpen, isAdminOpen, activeTab, setActiveTab } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';
  const secondaryColor = brand.secondaryColor || '#0f172a';

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
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--header-bg, rgba(255, 255, 255, 0.95))',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color, rgba(0, 0, 0, 0.08))',
      padding: '0.85rem 0',
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
            <img src={brand.logoUrl} alt={brand.siteName} style={{ height: '42px', maxWidth: '180px', objectFit: 'contain' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                boxShadow: `0 4px 15px rgba(237, 180, 3, 0.3)`
              }}>
                <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                  <rect x="15" y="35" width="16" height="50" rx="4" fill="#0f172a" />
                  <circle cx="23" cy="20" r="8" fill="#0f172a" />
                  <path d="M40 85 L75 20 L85 20 L85 30 L50 85 Z" fill="#0f172a" />
                  <path d="M45 20 L80 85 L70 85 L35 20 Z" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <span style={{
                  fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--logo-text-color, #0f172a)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}>
                  Inflix
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  color: primaryColor,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: '2px'
                }}>
                  MARKETING SOLUTIONS
                </span>
              </div>
            </div>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <a href="#home" onClick={() => handleNavClick('home', '#home')} style={navLinkStyle(activeTab === 'home', primaryColor)}>HOME</a>
          <a href="#about" onClick={() => handleNavClick('about', '#about')} style={navLinkStyle(activeTab === 'about', primaryColor)}>ABOUT</a>
          
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <a 
              href="#services" 
              onClick={() => handleNavClick('services', '#services')} 
              style={{ ...navLinkStyle(activeTab === 'services', primaryColor), display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <span>SERVICES</span>
              <ChevronDown size={14} />
            </a>

            {servicesDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: '12px',
                padding: '1rem',
                minWidth: '200px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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

          <a href="#portfolio" onClick={() => handleNavClick('portfolio', '#portfolio')} style={navLinkStyle(activeTab === 'portfolio', primaryColor)}>PORTFOLIO</a>
          <a href="#process" onClick={() => handleNavClick('process', '#process')} style={navLinkStyle(activeTab === 'process', primaryColor)}>PROCESS</a>
          <a href="#testimonials" onClick={() => handleNavClick('testimonials', '#testimonials')} style={navLinkStyle(activeTab === 'testimonials', primaryColor)}>REVIEWS</a>
          <a href="#contact" onClick={() => handleNavClick('contact', '#contact')} style={navLinkStyle(activeTab === 'contact', primaryColor)}>CONTACT</a>
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
              background: 'rgba(0, 0, 0, 0.05)',
              color: 'var(--logo-text-color, #0f172a)',
              border: `1px solid ${primaryColor}`,
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            <Settings size={14} style={{ color: primaryColor }} />
            <span>Admin</span>
          </button>

          {/* Primary CTA Button */}
          <a 
            href="#contact" 
            className="btn-agatha-gold desktop-cta"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}
          >
            <span>{content.hero?.primaryCta || 'Get Started Today →'}</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--logo-text-color, #0f172a)', padding: '0.4rem' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--header-bg, #ffffff)',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
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
          
          <div style={{ paddingTop: '0.75rem' }}>
            <button 
              onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
              className="btn-agatha-gold"
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
      `}</style>
    </header>
  );
};

const navLinkStyle = (isActive, primaryColor) => ({
  color: isActive ? primaryColor : 'var(--logo-text-color, #0f172a)',
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
  color: '#000000',
  textTransform: 'uppercase'
};

const mobileNavLinkStyle = {
  color: 'var(--logo-text-color, #0f172a)',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.4rem 0',
  borderBottom: '1px solid rgba(0,0,0,0.05)'
};
