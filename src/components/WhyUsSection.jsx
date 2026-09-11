import React from 'react';
import { useContent } from '../context/ContentContext';
import { Lightbulb, Award, Eye, Check } from 'lucide-react';

const icons = [Lightbulb, Award, Eye];

export const WhyUsSection = () => {
  const { content } = useContent();
  const whyUs = content.whyUs || {};
  const brand = content.brand || {};
  const points = whyUs.points || [];

  return (
    <section className="section-padding" style={{
      background: brand.surfaceBg || '#111c30',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          '@media (min-width: 992px)': { gridTemplateColumns: '0.9fr 1.1fr' }
        }} className="why-us-grid">
          
          {/* Left Column Header */}
          <div>
            <span className="section-category">{whyUs.category || 'Why Us ?'}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
              {whyUs.headline || 'Because We Are The Best Creative Agency!'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.75, marginTop: '1.5rem' }}>
              {whyUs.paragraph || 'At Inflix Marketing Solutions, we combine data-backed strategies with compelling storytelling to maximize your marketing investment.'}
            </p>
          </div>

          {/* Right Column 3 Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {points.map((pt, idx) => {
              const IconComp = icons[idx % icons.length];
              return (
                <div 
                  key={pt.id || idx}
                  className="card-glass"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    padding: '1.75rem',
                    background: `linear-gradient(135deg, rgba(23, 38, 66, 0.8) 0%, rgba(10, 17, 30, 0.9) 100%)`
                  }}
                >
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: brand.accentColor || '#edb403',
                    fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif',
                    minWidth: '50px'
                  }}>
                    {pt.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>
                      {pt.title}
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.6 }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .why-us-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
      `}</style>
    </section>
  );
};
