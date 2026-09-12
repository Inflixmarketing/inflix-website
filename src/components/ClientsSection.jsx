import React from 'react';
import { useContent } from '../context/ContentContext';
import { Award, ArrowRight } from 'lucide-react';

export const ClientsSection = () => {
  const { content, navigateToView } = useContent();
  const header = content.clientsHeader || {};
  const clients = content.clients || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#EDB403';

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '750px',
          margin: '0 auto 3.5rem auto'
        }}>
          <span className="section-category" style={{ justifyContent: 'center' }}>
            <Award size={14} style={{ color: primaryColor }} />
            <span>{header.category || 'Our Clients'}</span>
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            {header.headline || 'Our Clients Are Leading Companies And Brands'}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#E5E7EB', lineHeight: 1.7 }}>
            {header.paragraph || 'We partner with visionary founders, clinics, and businesses to accelerate digital market authority and patient/customer acquisitions.'}
          </p>
        </div>

        {/* Client Cards Grid - Blog Image Card Style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {clients.map((cli) => {
            const displayImage = cli.imageUrl || cli.logoUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";

            return (
              <article 
                key={cli.id} 
                className="card-glass" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigateToView && navigateToView('contact')}
              >
                <div>
                  {/* Blog-Style Image Container with Hover Zoom */}
                  <div className="img-hover-container" style={{ borderRadius: '12px', height: '200px', marginBottom: '1.5rem', position: 'relative' }}>
                    <img 
                      src={displayImage} 
                      alt={cli.name} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"; }}
                    />

                    {/* Logo Overlay Badge if logo is uploaded */}
                    {cli.logoUrl && cli.imageUrl && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(11, 19, 43, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(237, 180, 3, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        zIndex: 2
                      }}>
                        <img src={cli.logoUrl} alt={cli.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>

                  {/* Category Tag */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.825rem',
                    color: '#94a3b8'
                  }}>
                    <span style={{
                      background: 'rgba(237, 180, 3, 0.12)',
                      color: primaryColor,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}>
                      {cli.category || 'Client Partner'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', fontWeight: 400, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                    {cli.name}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {cli.desc}
                  </p>
                </div>

                {/* Bottom Action CTA Link */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: primaryColor
                }}>
                  <span>Work With Us</span>
                  <ArrowRight size={16} />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
