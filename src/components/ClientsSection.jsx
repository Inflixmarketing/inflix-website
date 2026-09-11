import React from 'react';
import { useContent } from '../context/ContentContext';
import { Building2, CheckCircle2 } from 'lucide-react';

export const ClientsSection = () => {
  const { content } = useContent();
  const header = content.clientsHeader || {};
  const clients = content.clients || [];
  const brand = content.brand || {};

  return (
    <section id="clients" className="section-padding" style={{
      background: brand.surfaceBg || '#111c30',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <span className="section-category">{header.category || 'Our Clients'}</span>
          <h2 className="section-title">{header.headline || 'Our Clients Are Leading Companies And Brands'}</h2>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7 }}>
            {header.paragraph || 'We partner with visionary founders, clinics, and businesses to accelerate digital market authority and patient/customer acquisitions.'}
          </p>
        </div>

        {/* Client Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {clients.map((cli) => (
            <div key={cli.id} className="card-glass" style={{
              background: `linear-gradient(145deg, rgba(23, 38, 66, 0.9) 0%, rgba(10, 17, 30, 0.95) 100%)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.75rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(237, 180, 3, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: brand.accentColor || '#edb403'
                  }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                      {cli.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: brand.accentColor || '#edb403', fontWeight: 600 }}>
                      {cli.category}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {cli.desc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: '#10b981',
                fontWeight: 600,
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <CheckCircle2 size={15} />
                <span>Verified Client Partnership</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
