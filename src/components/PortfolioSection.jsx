import React from 'react';
import { useContent } from '../context/ContentContext';

export const PortfolioSection = () => {
  const { content } = useContent();
  const header = content.portfolioHeader || {};
  const items = content.portfolio || [];
  const brand = content.brand || {};

  return (
    <section id="portfolio" className="section-padding" style={{ background: '#ffffff', color: '#000000' }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              {header.category || 'Portfolio'}
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.2,
              fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif'
            }}>
              {header.headline || 'Check Out Our Latest Projects'}
            </h2>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="img-hover-container" style={{
                borderRadius: '16px',
                height: '240px',
                background: '#f1f5f9',
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)'
              }}>
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"} 
                  alt={item.title} 
                />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#000000',
                  marginTop: '0.2rem',
                  fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif'
                }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
