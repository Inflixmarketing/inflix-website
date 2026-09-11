import React from 'react';
import { useContent } from '../context/ContentContext';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServiceModal = () => {
  const { selectedService, setSelectedService, content } = useContent();
  const brand = content.brand || {};

  if (!selectedService) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#0c0a1d',
        border: '1px solid rgba(103, 82, 236, 0.35)',
        borderRadius: '24px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
      }}>
        {/* Close Button */}
        <button 
          onClick={() => setSelectedService(null)}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Hero Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(103, 82, 236, 0.25) 0%, rgba(12, 10, 29, 0.95) 100%)',
          padding: '3rem 2.5rem 2.5rem 2.5rem',
          borderBottom: '1px solid rgba(103, 82, 236, 0.2)'
        }}>
          <span style={{
            fontSize: '0.825rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a394ff',
            marginBottom: '0.5rem',
            display: 'block'
          }}>
            AGATHA SERVICE DETAILS
          </span>

          <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 400, color: '#ffffff', marginBottom: '0.75rem' }}>
            {selectedService.heroTitle || selectedService.title}
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
            {selectedService.heroSub || selectedService.shortDesc}
          </p>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '2.5rem' }}>
          
          <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.35rem', fontWeight: 400, color: '#ffffff', marginBottom: '1rem' }}>
            {selectedService.overviewTitle || 'Overview & Strategy'}
          </h3>

          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            {selectedService.overviewContent || selectedService.shortDesc}
          </p>

          {/* Key Deliverables */}
          {selectedService.deliverables && selectedService.deliverables.length > 0 && (
            <div>
              <h4 style={{
                fontFamily: "'Ancola', 'Tenor Sans', serif",
                fontSize: '1.1rem',
                fontWeight: 400,
                color: '#a394ff',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Key Features & Deliverables
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}>
                {selectedService.deliverables.map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(103, 82, 236, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <CheckCircle2 size={20} style={{ color: '#6752ec', shrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.925rem', color: '#ffffff', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Action */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(103, 82, 236, 0.2)'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Ready to implement this service?</div>
              <div style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.1rem', fontWeight: 400, color: '#ffffff' }}>Request A Customized Growth Proposal</div>
            </div>

            <a 
              href="#contact" 
              onClick={() => setSelectedService(null)} 
              className="btn-agatha-purple"
              style={{ padding: '0.85rem 1.8rem' }}
            >
              <span>Get Started Now →</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
