import React from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, Youtube, MessageCircle, Lock } from 'lucide-react';

export const Footer = () => {
  const { content, navigateToView, openContactModal } = useContent();
  const brand = content.brand || {};
  const cta = content.ctaBanner || {};
  const socialLinks = brand.socialLinks || {};
  const footerLogo = brand.footerLogoUrl || brand.logoUrl;

  const socialMap = [
    { key: 'facebook', icon: Facebook, label: 'Facebook', defaultUrl: 'https://facebook.com/inflixmarketing' },
    { key: 'instagram', icon: Instagram, label: 'Instagram', defaultUrl: 'https://instagram.com/inflixmarketing' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', defaultUrl: 'https://linkedin.com/company/inflixmarketing' },
    { key: 'twitter', icon: Twitter, label: 'Twitter / X', defaultUrl: 'https://twitter.com/inflixmarketing' },
    { key: 'youtube', icon: Youtube, label: 'YouTube', defaultUrl: 'https://youtube.com/@inflixmarketing' },
    { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', defaultUrl: 'https://wa.me/919876543210' }
  ];

  return (
    <footer style={{
      backgroundColor: '#0B132B',
      color: '#ffffff',
      position: 'relative',
      borderTop: '1px solid rgba(237, 180, 3, 0.2)'
    }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        
        {/* CTA Banner */}
        <div style={{
          padding: '3rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '4rem',
          borderRadius: '20px',
          background: 'rgba(23, 55, 101, 0.6)',
          border: '1px solid rgba(237, 180, 3, 0.3)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.25,
              fontFamily: "'Ancola', 'Tenor Sans', serif"
            }}>
              {cta.headline || "Have A Project In Mind? Let's Start Working Together!"}
            </h2>
          </div>

          {/* Right Circular CTA Button */}
          <button 
            onClick={openContactModal}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: '#EDB403',
              color: '#173765',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              textTransform: 'uppercase',
              boxShadow: '0 15px 40px rgba(237, 180, 3, 0.4)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}
            className="circle-cta-hover"
          >
            <span>{cta.buttonText || 'CONTACT US'}</span>
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand Info & Footer Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {footerLogo ? (
                <img 
                  src={footerLogo} 
                  alt={brand.siteName || "Inflix Marketing Solutions"} 
                  style={{ height: '42px', maxWidth: '180px', objectFit: 'contain' }} 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.6rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  Inflix
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.875rem', color: '#E5E7EB', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Inflix Marketing Solutions specializing in performance marketing, brand identity, web development, SEO, and high-converting creative media.
            </p>

            {/* Social Icons List */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {socialMap.map(({ key, icon: Icon, label, defaultUrl }) => {
                const item = socialLinks[key] || {};
                const isEnabled = item.enabled !== false;
                const linkUrl = item.url || defaultUrl;

                if (!isEnabled) return null;

                return (
                  <a 
                    key={key} 
                    href={linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(237, 180, 3, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EDB403',
                      border: '1px solid rgba(237, 180, 3, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#E5E7EB', padding: 0 }}>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateToView('home'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/about" onClick={(e) => { e.preventDefault(); navigateToView('about'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateToView('services'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Services</a></li>
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); navigateToView('portfolio'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Portfolio</a></li>
              <li><a href="/process" onClick={(e) => { e.preventDefault(); navigateToView('process'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Process</a></li>
              <li><a href="/reviews" onClick={(e) => { e.preventDefault(); navigateToView('reviews'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Reviews</a></li>
              <li><a href="/blogs" onClick={(e) => { e.preventDefault(); navigateToView('blogs'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Blogs & Insights</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); navigateToView('contact'); }} style={{ color: '#E5E7EB', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Core Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#E5E7EB', padding: 0 }}>
              <li>Performance Marketing & Paid Ads</li>
              <li>Branding Identity & Design</li>
              <li>Web Development & SEO</li>
              <li>Social Media Growth & Reels</li>
              <li>Copywriting & Content Strategy</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{ fontFamily: "'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#E5E7EB', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} style={{ color: '#EDB403' }} />
                <span>{brand.contactEmail || 'contact@inflixmarketing.com'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} style={{ color: '#EDB403' }} />
                <span>{brand.contactPhone || '+91 98765 43210'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={16} style={{ color: '#EDB403' }} />
                <span>{brand.location || 'Hyderabad, India'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(237, 180, 3, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.825rem',
          color: '#94a3b8'
        }}>
          <div>
            © {new Date().getFullYear()} Inflix Marketing Solutions. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateToView('privacy-policy'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); navigateToView('terms-of-service'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
            <a 
              href="/admin" 
              onClick={(e) => { e.preventDefault(); navigateToView('admin'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#EDB403', textDecoration: 'none' }}
            >
              <Lock size={12} /> Admin Portal
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .circle-cta-hover:hover {
          transform: scale(1.08);
          background: #fcd34d !important;
          box-shadow: 0 20px 45px rgba(237, 180, 3, 0.6) !important;
        }
      `}</style>
    </footer>
  );
};
