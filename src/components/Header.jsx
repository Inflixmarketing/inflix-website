import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Menu, X, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { 
    content, 
    setIsAdminOpen, 
    isAdminOpen, 
    activeTab, 
    setActiveTab, 
    activeView,
    navigateToView, 
    selectedService 
  } = useContent();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const brand = content?.brand || {};
  const services = content?.services || [];

  const handleNavClick = (viewName) => {
    navigateToView(viewName);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleServiceSelect = (svc) => {
    navigateToView('service-detail', svc.slug || svc.id);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: 'rgba(11, 19, 43, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
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
        <a href="/" onClick={(e) => { e.preventDefault(); navigateToView('home'); }} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none'
        }}>
          <img 
            src={brand.logoUrl || '/logo.png'} 
            alt={brand.siteName || "Inflix Marketing Solutions"} 
            style={{ height: '42px', maxWidth: '180px', objectFit: 'contain' }}
            onError={(e) => { e.target.src = '/logo.png'; }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={navLinkStyle(activeView === 'home', '#EDB403')}>HOME</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={navLinkStyle(activeView === 'about', '#EDB403')}>ABOUT</a>
          
          {/* Services Dynamic Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <a 
              href="/services" 
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} 
              style={{ ...navLinkStyle(activeView === 'services', '#EDB403'), display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <span>SERVICES</span>
              <ChevronDown size={14} style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
            </a>

            {servicesDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#173765',
                border: '1px solid rgba(237, 180, 3, 0.35)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '0.75rem 0.5rem',
                minWidth: '250px',
                maxWidth: '300px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                marginTop: '0.5rem',
                zIndex: 500,
                maxHeight: '75vh',
                overflowY: 'auto'
              }}>
                <div style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#EDB403',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
                  marginBottom: '0.35rem'
                }}>
                  Core Agency Services
                </div>

                <a 
                  href="/services" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} 
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#E5E7EB',
                    display: 'block',
                    transition: 'all 0.2s ease',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  All Services Overview →
                </a>

                {services.map((svc) => {
                  const isActive = selectedService && (selectedService.id === svc.id || selectedService.slug === svc.slug);
                  return (
                    <button
                      key={svc.id}
                      onClick={() => handleServiceSelect(svc)}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.825rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#173765' : '#ffffff',
                        backgroundColor: isActive ? '#EDB403' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'block',
                        width: '100%',
                        border: 'none'
                      }}
                    >
                      {svc.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <a href="/portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} style={navLinkStyle(activeView === 'portfolio', '#EDB403')}>PORTFOLIO</a>
          <a href="/process" onClick={(e) => { e.preventDefault(); handleNavClick('process'); }} style={navLinkStyle(activeView === 'process', '#EDB403')}>PROCESS</a>
          <a href="/testimonials" onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }} style={navLinkStyle(activeView === 'testimonials', '#EDB403')}>REVIEWS</a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }} style={navLinkStyle(activeView === 'blog', '#EDB403')}>BLOG</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={navLinkStyle(activeView === 'contact', '#EDB403')}>CONTACT</a>
        </nav>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Desktop Only CTA - Inflix Gold Pill Button */}
          <a 
            href="/contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="desktop-cta"
            style={{
              padding: '0.65rem 1.6rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: '#EDB403',
              color: '#173765',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(237, 180, 3, 0.35)'
            }}
          >
            <span>LET'S TALK →</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#ffffff', padding: '0.4rem', cursor: 'pointer' }}
            className="mobile-toggle"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#0B132B',
          borderTop: '1px solid rgba(237, 180, 3, 0.2)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}>
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={mobileNavLinkStyle}>HOME</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={mobileNavLinkStyle}>ABOUT</a>
          
          <div style={{ padding: '0.4rem 0' }}>
            <span style={{ fontSize: '0.75rem', color: '#EDB403', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>SERVICES</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(237, 180, 3, 0.3)' }}>
              {services.map(svc => (
                <button 
                  key={svc.id} 
                  onClick={() => handleServiceSelect(svc)}
                  style={{
                    color: '#E5E7EB',
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  {svc.title}
                </button>
              ))}
            </div>
          </div>

          <a href="/portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} style={mobileNavLinkStyle}>PORTFOLIO</a>
          <a href="/process" onClick={(e) => { e.preventDefault(); handleNavClick('process'); }} style={mobileNavLinkStyle}>PROCESS</a>
          <a href="/testimonials" onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }} style={mobileNavLinkStyle}>REVIEWS</a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }} style={mobileNavLinkStyle}>BLOG</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={mobileNavLinkStyle}>CONTACT</a>
          
          <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              className="btn-agatha-gold"
              style={{ width: '100%' }}
            >
              LET'S TALK →
            </a>
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
  color: isActive ? primaryColor : '#E5E7EB',
  fontWeight: isActive ? 700 : 600,
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  transition: 'all 0.2s ease',
  borderBottom: isActive ? `2px solid ${primaryColor}` : '2px solid transparent',
  paddingBottom: '2px'
});

const mobileNavLinkStyle = {
  color: '#ffffff',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.4rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};
