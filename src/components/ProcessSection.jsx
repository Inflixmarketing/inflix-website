import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Play, X, CheckCircle2 } from 'lucide-react';

export const ProcessSection = () => {
  const { content } = useContent();
  const header = content.processHeader || {};
  const steps = content.process || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="process" className="section-padding" style={{
      background: 'rgba(15, 23, 42, 0.4)',
      position: 'relative',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        {/* Process Header & Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="process-grid">
          
          {/* Left Column: 4 Step Glass Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            {steps.map((st, idx) => (
              <div 
                key={idx} 
                className="card-glass"
                style={{
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  borderLeft: `4px solid ${idx === 0 ? primaryColor : 'rgba(255, 255, 255, 0.2)'}`
                }}
              >
                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{st.num}</span>
                  <CheckCircle2 size={18} style={{ color: primaryColor }} />
                </div>

                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginBottom: '0.35rem'
                  }}>
                    {st.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Header & Watch Video Button */}
          <div>
            <span className="section-category">
              {header.category || 'Process'}
            </span>

            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Our Smooth Workflow'}
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
              {header.paragraph || 'We follow a structured, step-by-step methodology to ensure every marketing campaign is executed seamlessly, optimized in real-time, and built to achieve maximum profitability.'}
            </p>

            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="btn-agatha-gold"
            >
              <Play size={16} fill="#090d16" />
              <span>{header.videoButtonText || 'WATCH VIDEO'}</span>
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
          backgroundColor: 'rgba(9, 13, 22, 0.9)',
          backdropFilter: 'blur(16px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(237, 180, 3, 0.3)',
            color: '#ffffff',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '100%',
            padding: '2.25rem',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                color: '#ffffff',
                padding: '0.4rem'
              }}
            >
              <X size={24} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: primaryColor }}>
              Inflix Smooth Workflow Video
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.65, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Watch how our team conducts discovery research, develops high-converting ad copy, deploys performance campaigns, and optimizes CAC continuously.
            </p>

            <button onClick={() => setIsVideoModalOpen(false)} className="btn-agatha-gold">
              Close Video Showcase
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .process-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
};
