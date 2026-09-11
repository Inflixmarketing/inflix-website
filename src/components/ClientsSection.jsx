import React from 'react';
import { useContent } from '../context/ContentContext';
import { Building2, Award } from 'lucide-react';

export const ClientsSection = () => {
  const { content } = useContent();
  const header = content.clientsHeader || {};
  const clients = content.clients || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

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
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            {header.paragraph || 'We partner with visionary founders, clinics, and businesses to accelerate digital market authority and patient/customer acquisitions.'}
          </p>
        </div>

        {/* 6 to 8 Grid Client Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {clients.map((cli) => (
            <div key={cli.id} className="card-glass" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(237, 180, 3, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: primaryColor,
                    border: '1px solid rgba(237, 180, 3, 0.25)'
                  }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                      {cli.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: primaryColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {cli.category}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65 }}>
                  {cli.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
