import React from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const { content, setActiveTab } = useContent();
  const brand = content.brand || {};
  const cta = content.ctaBanner || {};

  return (
    <footer id="contact" style={{
      backgroundColor: '#02010c',
      color: '#ffffff',
      position: 'relative',
      borderTop: '1px solid rgba(103, 82, 236, 0.2)'
    }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        
        {/* Agatha CTA Banner */}
        <div style={{
          padding: '3rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '4rem',
          borderRadius: '20px',
          background: 'rgba(14, 11, 33, 0.85)',
          border: '1px solid rgba(103, 82, 236, 0.3)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.25,
              fontFamily: "'Ancola', 'Tenor Sans', serif"
            }}>
              {cta.headline || "Have A Creative Project In Mind? Let's Build It Together!"}
            </h2>
          </div>

          {/* Right Circular CTA Button */}
          <a 
            href={`mailto:${brand.contactEmail || 'contact@agathaagency.com'}`}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6752ec 0%, #a394ff 100%)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              textTransform: 'uppercase',
              boxShadow: '0 15px 40px rgba(103, 82, 236, 0.4)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              textDecoration: 'none',
              flexShrink: 0
            }}
            className="circle-cta-hover"
          >
            <span>{cta.buttonText || 'GET IN TOUCH'}</span>
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
                Agatha
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Agatha Creative Portfolio & Digital Agency specializing in brand identity, high-converting digital products, and strategic media acquisition.
            </p>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  border: '1px solid rgba(103, 82, 236, 0.2)'
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
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <li><a href="#home" onClick={() => setActiveTab('home')}>Home</a></li>
              <li><a href="#about" onClick={() => setActiveTab('about')}>About Agatha</a></li>
              <li><a href="#services" onClick={() => setActiveTab('services')}>Our Services</a></li>
              <li><a href="#portfolio" onClick={() => setActiveTab('portfolio')}>Portfolio</a></li>
              <li><a href="#process" onClick={() => setActiveTab('process')}>Our Process</a></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Core Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <li>Brand Identity Design</li>
              <li>Web Development</li>
              <li>UI/UX Experience Design</li>
              <li>Performance Marketing</li>
              <li>Creative Video Production</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{ fontFamily: "'Tenor Sans', serif", fontSize: '1.05rem', fontWeight: 400, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} style={{ color: '#a394ff' }} />
                <span>{brand.contactEmail || 'contact@agathaagency.com'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} style={{ color: '#a394ff' }} />
                <span>{brand.contactPhone || '+1 800 555 0199'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={16} style={{ color: '#a394ff' }} />
                <span>{brand.location || 'New York, USA'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(103, 82, 236, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.825rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Agatha Creative Agency. All Rights Reserved.
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
          background: #7b68f5 !important;
        }
      `}</style>
    </footer>
  );
};
