import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { 
    content, 
    activeView, 
    navigateToView, 
    selectedService,
    openContactModal
  } = useContent();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesAccordion, setMobileServicesAccordion] = useState(false);

  const brand = content.brand || {};
  const services = content.services || [];

  const handleNavClick = (view) => {
    navigateToView(view);
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
      backgroundColor: 'rgba(11, 19, 43, 0.94)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(237, 180, 3, 0.25)',
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
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            background: 'rgba(23, 55, 101, 0.45)',
            border: '1px solid rgba(237, 180, 3, 0.3)'
          }}
        >
          {brand.logoUrl ? (
            <img 
              src={brand.logoUrl} 
              alt={brand.siteName || "Inflix Marketing Solutions"} 
              style={{ height: '40px', maxWidth: '170px', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #EDB403 0%, #fcd34d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#173765',
                boxShadow: `0 4px 20px rgba(237, 180, 3, 0.4)`
              }}>
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                  <rect x="15" y="35" width="16" height="50" rx="4" fill="#173765" />
                  <circle cx="23" cy="20" r="8" fill="#173765" />
                  <path d="M40 85 L75 20 L85 20 L85 30 L50 85 Z" fill="#173765" />
                  <path d="M45 20 L80 85 L70 85 L35 20 Z" fill="#EDB403" />
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
                  Inflix
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  color: '#EDB403',
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
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={navLinkStyle(activeView === 'home', '#EDB403')}>HOME</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={navLinkStyle(activeView === 'about', '#EDB403')}>ABOUT</a>
          
          {/* Services Dynamic Dropdown - ONLY actual services from CMS */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <a 
              href="/services" 
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} 
              style={{ ...navLinkStyle(activeView === 'services' || activeView === 'service-detail', '#EDB403'), display: 'flex', alignItems: 'center', gap: '0.3rem' }}
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
                minWidth: '260px',
                maxWidth: '320px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
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

          <a href="/portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} style={navLinkStyle(activeView === 'portfolio' || activeView === 'portfolio-detail', '#EDB403')}>PORTFOLIO</a>
          <a href="/process" onClick={(e) => { e.preventDefault(); handleNavClick('process'); }} style={navLinkStyle(activeView === 'process', '#EDB403')}>PROCESS</a>
          <a href="/reviews" onClick={(e) => { e.preventDefault(); handleNavClick('reviews'); }} style={navLinkStyle(activeView === 'reviews', '#EDB403')}>REVIEWS</a>
          <a href="/blogs" onClick={(e) => { e.preventDefault(); handleNavClick('blogs' || activeView === 'blog-detail', '#EDB403')}>BLOGS</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={navLinkStyle(activeView === 'contact', '#EDB403')}>CONTACT</a>
        </nav>

        {/* Header Action Buttons (Admin Button Removed completely) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={openContactModal}
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
              boxShadow: '0 4px 20px rgba(237, 180, 3, 0.35)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span>LET'S TALK →</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#ffffff', padding: '0.4rem', cursor: 'pointer', background: 'none', border: 'none' }}
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
          borderTop: '1px solid rgba(237, 180, 3, 0.25)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}>
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={mobileNavLinkStyle}>HOME</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={mobileNavLinkStyle}>ABOUT</a>
          
          {/* Mobile Services Accordion */}
          <div style={{ padding: '0.4rem 0' }}>
            <button 
              onClick={() => setMobileServicesAccordion(!mobileServicesAccordion)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#EDB403',
                background: 'none',
                border: 'none',
                padding: '0.4rem 0',
                cursor: 'pointer'
              }}
            >
              <span>SERVICES</span>
              <ChevronDown size={18} style={{ transform: mobileServicesAccordion ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }} />
            </button>

            {mobileServicesAccordion && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: '0.5rem',
                paddingLeft: '0.85rem',
                borderLeft: '2px solid rgba(237, 180, 3, 0.35)',
                animation: 'heroFadeUp 0.3s ease forwards'
              }}>
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
                      padding: '0.35rem 0',
                      cursor: 'pointer'
                    }}
                  >
                    {svc.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} style={mobileNavLinkStyle}>PORTFOLIO</a>
          <a href="/process" onClick={(e) => { e.preventDefault(); handleNavClick('process'); }} style={mobileNavLinkStyle}>PROCESS</a>
          <a href="/reviews" onClick={(e) => { e.preventDefault(); handleNavClick('reviews'); }} style={mobileNavLinkStyle}>REVIEWS</a>
          <a href="/blogs" onClick={(e) => { e.preventDefault(); handleNavClick('blogs'); }} style={mobileNavLinkStyle}>BLOGS</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={mobileNavLinkStyle}>CONTACT</a>
          
          <div style={{ paddingTop: '0.75rem' }}>
            <button 
              onClick={() => { setMobileMenuOpen(false); openContactModal(); }}
              className="btn-agatha-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              LET'S TALK →
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
  color: isActive ? primaryColor : '#E5E7EB',
  fontWeight: isActive ? 700 : 600,
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  transition: 'all 0.2s ease',
  borderBottom: isActive ? `2px solid ${primaryColor}` : '2px solid transparent',
  paddingBottom: '2px',
  textDecoration: 'none'
});

const mobileNavLinkStyle = {
  color: '#ffffff',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.4rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  textDecoration: 'none'
};
