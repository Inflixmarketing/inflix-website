import React from 'react';
import { useContent } from '../context/ContentContext';
import { ExternalLink } from 'lucide-react';

export const PortfolioSection = () => {
  const { content } = useContent();
  const header = content.portfolioHeader || {};
  const items = content.portfolio || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section id="portfolio" className="section-padding" style={{
      background: 'rgba(12, 10, 29, 0.6)',
      position: 'relative',
      borderTop: '1px solid rgba(103, 82, 236, 0.15)',
      borderBottom: '1px solid rgba(103, 82, 236, 0.15)'
    }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }} className="portfolio-header-grid">
          <div>
            <span className="section-category">
              {header.category || 'Agatha Portfolio'}
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Check Out Our Latest Creative Work'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, maxWidth: '700px' }}>
              {header.paragraph || 'Explore how we combine strategic thinking, brand design, and performance engineering to deliver high-converting digital assets.'}
            </p>
          </div>
        </div>

        {/* Portfolio Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {['ALL', 'BRANDING', 'WEB DESIGN', 'MARKETING', 'MEDIA'].map((filter, index) => (
            <button
              key={filter}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                background: index === 0 ? '#6752ec' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: index === 0 ? '1px solid #6752ec' : '1px solid rgba(103, 82, 236, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {items.map((item) => (
            <div key={item.id} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="img-hover-container" style={{
                borderRadius: '12px',
                height: '220px',
                background: '#02010c'
              }}>
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"} 
                  alt={item.title} 
                />
              </div>

              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#a394ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontFamily: "'Ancola', 'Tenor Sans', serif",
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .portfolio-header-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
