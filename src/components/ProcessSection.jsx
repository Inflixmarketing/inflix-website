import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Play, X, CheckCircle2 } from 'lucide-react';

export const ProcessSection = () => {
  const { content } = useContent();
  const header = content.processHeader || {};
  const steps = content.process || [];

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="process" className="section-padding" style={{
      background: 'rgba(23, 55, 101, 0.25)',
      position: 'relative',
      borderTop: '1px solid rgba(237, 180, 3, 0.15)',
      borderBottom: '1px solid rgba(237, 180, 3, 0.15)'
    }}>
      <div className="container">
        
        {/* Process Header & Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="process-grid">
          
          {/* Header & Watch Video Button */}
          <div className="process-header-col">
            <span className="section-category">
              {header.category || 'Process'}
            </span>

            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Our Smooth Workflow'}
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#E5E7EB', lineHeight: 1.7, marginBottom: '2rem' }}>
              {header.paragraph || 'We follow a structured, step-by-step methodology to ensure every marketing campaign is executed seamlessly.'}
            </p>

            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="btn-agatha-gold"
            >
              <Play size={16} fill="#173765" />
              <span>{header.videoButtonText || 'WATCH VIDEO'}</span>
            </button>
          </div>

          {/* 4 Step Glass Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }} className="process-steps-col">
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
                  borderLeft: `4px solid ${idx === 0 ? '#EDB403' : 'rgba(237, 180, 3, 0.3)'}`
                }}
              >
                <div style={{
                  fontFamily: "'Ancola', 'Tenor Sans', serif",
                  fontSize: '1.5rem',
                  color: '#EDB403',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{st.num || `0${idx + 1}.`}</span>
                  <CheckCircle2 size={18} style={{ color: '#EDB403' }} />
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "'Ancola', 'Tenor Sans', serif",
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginBottom: '0.35rem'
                  }}>
                    {st.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
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
          backgroundColor: 'rgba(11, 19, 43, 0.95)',
          backdropFilter: 'blur(16px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#173765',
            border: '1px solid rgba(237, 180, 3, 0.35)',
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

            <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', fontWeight: 400, marginBottom: '1rem', color: '#ffffff' }}>
              Inflix Workflow Overview
            </h3>
            <p style={{ color: '#E5E7EB', lineHeight: 1.65, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Watch how our team conducts discovery research, develops high-converting brand identity assets, deploys performance campaigns, and optimizes CAC continuously.
            </p>

            <button onClick={() => setIsVideoModalOpen(false)} className="btn-agatha-gold">
              Close Showcase
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .process-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
};
