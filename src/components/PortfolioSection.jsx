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
      background: 'rgba(15, 23, 42, 0.4)',
      position: 'relative',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginBottom: '3rem'
        }} className="portfolio-header-grid">
          <div>
            <span className="section-category">
              {header.category || 'Portfolio'}
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Check Out Our Latest Projects'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, maxWidth: '700px' }}>
              {header.paragraph || 'Explore how we combine strategy, design, and performance marketing to deliver measurable growth, strong brand identities, and high-converting digital assets.'}
            </p>
          </div>
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
                background: '#090d16'
              }}>
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"} 
                  alt={item.title} 
                />
              </div>

              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
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
