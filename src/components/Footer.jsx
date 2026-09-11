import React from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const { content, setActiveTab } = useContent();
  const brand = content.brand || {};
  const cta = content.ctaBanner || {};

  return (
    <footer id="contact" style={{
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
          <a 
            href={`mailto:${brand.contactEmail || 'contact@inflixmarketing.com'}`}
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
              textDecoration: 'none',
              flexShrink: 0
            }}
            className="circle-cta-hover"
          >
            <span>{cta.buttonText || 'CONTACT US'}</span>
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.6rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                Inflix
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#E5E7EB', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Inflix Marketing Solutions specializing in performance marketing, brand identity, web development, SEO, and high-converting creative media.
            </p>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(237, 180, 3, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EDB403',
                  border: '1px solid rgba(237, 180, 3, 0.3)'
                }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
              <li><a href="#home" onClick={() => setActiveTab('home')}>Home</a></li>
              <li><a href="#about" onClick={() => setActiveTab('about')}>About Us</a></li>
              <li><a href="#services" onClick={() => setActiveTab('services')}>Services</a></li>
              <li><a href="#portfolio" onClick={() => setActiveTab('portfolio')}>Portfolio</a></li>
              <li><a href="#process" onClick={() => setActiveTab('process')}>Process</a></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Core Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
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
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
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

        {/* Copyright */}
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
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
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
