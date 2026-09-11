import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Play, X } from 'lucide-react';

export const ProcessSection = () => {
  const { content } = useContent();
  const header = content.processHeader || {};
  const steps = content.process || [];
  const brand = content.brand || {};

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="process" className="section-padding" style={{ background: '#ffffff', color: '#000000', position: 'relative' }}>
      <div className="container">
        
        {/* Process Header & Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center',
          '@media (min-width: 992px)': { gridTemplateColumns: '1fr 1fr' }
        }} className="process-grid">
          
          {/* Left Column: 4 Grid Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {steps.map((st, idx) => {
              const isFirstDark = idx === 0;
              return (
                <div 
                  key={idx} 
                  className={isFirstDark ? "card-dark-grid" : "card-light-gray"}
                  style={{
                    minHeight: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isFirstDark ? '#ffffff' : '#000000',
                    fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif'
                  }}>
                    {st.num}
                  </div>

                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: isFirstDark ? '#ffffff' : '#000000',
                    fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif',
                    lineHeight: 1.3
                  }}>
                    {st.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Category, Headline, Paragraph & Watch Video Button */}
          <div>
            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              {header.category || 'Process'}
            </span>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.25,
              marginBottom: '1.25rem',
              fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif'
            }}>
              {header.headline || 'Our Smooth Workflow'}
            </h2>

            <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.65, marginBottom: '2rem' }}>
              {header.paragraph || 'We follow a structured, step-by-step methodology to ensure every marketing campaign is executed seamlessly.'}
            </p>

            <button 
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#000000',
                textTransform: 'uppercase'
              }}
            >
              <span>{header.videoButtonText || 'WATCH VIDEO'}</span>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000'
              }}>
                <Play size={16} fill="#000000" />
              </div>
            </button>
          </div>

        </div>

      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#ffffff',
            color: '#000000',
            borderRadius: '20px',
            maxWidth: '650px',
            width: '100%',
            padding: '2rem',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#000000',
                padding: '0.5rem'
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Inflix Smooth Workflow Video
            </h3>
            <p style={{ color: '#64748b', lineHeight: 1.65, marginBottom: '1.75rem', fontSize: '0.9rem' }}>
              Watch how our team conducts discovery research, develops high-converting ad copy, deploys performance campaigns, and optimizes CAC continuously.
            </p>

            <button onClick={() => setIsVideoModalOpen(false)} className="btn-agatha-navy">
              Close Video Showcase
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
