import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowUp } from 'lucide-react';

export const Hero = () => {
  const { content } = useContent();
  const hero = content.hero || {};

  const outlineText = hero.capsuleOutline || "Driven by Strategy.";
  const solidText = hero.capsuleSolid || "Powered by Creativity.";
  const description = hero.description || "We help ambitious brands scale faster through data-driven performance marketing, high-converting content, and strategic brand positioning.";

  return (
    <section id="home" className="agatha-grid-bg" style={{
      position: 'relative',
      paddingTop: '6rem',
      paddingBottom: '5.5rem',
      overflow: 'hidden',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Top Right Soft Gold Glow Effect */}
      <div 
        className="animate-glow-pulse"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '0%',
          width: '550px',
          height: '550px',
          background: `radial-gradient(circle, rgba(237, 180, 3, 0.25) 0%, rgba(11, 19, 43, 0) 70%)`,
          pointerEvents: 'none',
          filter: 'blur(55px)'
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Main Headline Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Row 1: Outline Pill + Arrow + Main Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }} className="agatha-hero-row">
            
            {/* Top Outline Pill: Border #EDB403, Text #EDB403 */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.45rem 1.8rem',
              border: '1.5px solid #EDB403',
              borderRadius: '9999px',
              background: 'rgba(237, 180, 3, 0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              maxWidth: '100%'
            }} className="agatha-hero-pill-outline animate-fade-up animate-float">
              <span style={{
                fontFamily: "'Ancola', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3.2vw, 2.5rem)',
                fontWeight: 300,
                color: '#EDB403',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap'
              }}>
                {outlineText}
              </span>
            </div>

            {/* Circular Arrow Button in Gold */}
            <a 
              href="#portfolio" 
              style={{
                width: 'clamp(48px, 8vw, 68px)',
                height: 'clamp(48px, 8vw, 68px)',
                borderRadius: '50%',
                backgroundColor: '#EDB403',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#173765',
                flexShrink: 0,
                boxShadow: '0 10px 30px rgba(237, 180, 3, 0.4)',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
              className="agatha-hero-arrow-btn animate-fade-up animate-float"
              aria-label="Explore Portfolio"
            >
              <ArrowUp size={28} style={{ transform: 'rotate(45deg)', color: '#173765', strokeWidth: 2.5 }} />
            </a>

            {/* Main Headline Title rendered dynamically from CMS */}
            <h1 
              className="animate-fade-up"
              style={{
                fontFamily: "'Ancola', 'Tenor Sans', serif",
                fontSize: 'clamp(2rem, 5.5vw, 4.8rem)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.08,
                letterSpacing: '0.01em',
                margin: 0,
                display: 'inline',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {hero.titleMain || "Next-Gen Digital Marketing & Creative Agency"}
            </h1>
          </div>

        </div>

        {/* Row 3: Sub-description on Left, Solid Gold Pill on Right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
          marginTop: '3rem'
        }} className="agatha-hero-bottom">
          
          {/* Subheading / Description */}
          <div style={{ maxWidth: '480px' }} className="animate-fade-up">
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              color: '#E5E7EB',
              lineHeight: 1.65,
              margin: 0
            }}>
              {description}
            </p>
          </div>

          {/* Bottom Solid Pill: Background #EDB403, Text #173765 */}
          <a 
            href="#contact"
            style={{
              backgroundColor: '#EDB403',
              color: '#173765',
              padding: '0.9rem 2.8rem',
              borderRadius: '9999px',
              boxShadow: '0 15px 35px rgba(237, 180, 3, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              maxWidth: '100%'
            }} 
            className="agatha-hero-pill-solid animate-fade-up animate-shimmer"
          >
            <span style={{
              fontFamily: "'Ancola', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.25rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: '#173765',
              lineHeight: 1,
              letterSpacing: '0.01em',
              textAlign: 'center'
            }}>
              {solidText}
            </span>
          </a>

        </div>

      </div>

      <style>{`
        .agatha-hero-arrow-btn:hover {
          transform: scale(1.08) rotate(10deg) !important;
          background-color: #fcd34d !important;
          box-shadow: 0 15px 40px rgba(237, 180, 3, 0.6) !important;
        }
        .agatha-hero-pill-solid:hover {
          transform: translateY(-3px) scale(1.02) !important;
          background-color: #fcd34d !important;
          box-shadow: 0 20px 45px rgba(237, 180, 3, 0.6) !important;
        }
        @media (max-width: 768px) {
          .agatha-hero-row {
            gap: 0.65rem !important;
          }
          .agatha-hero-pill-outline {
            padding: 0.35rem 1.2rem !important;
          }
          .agatha-hero-pill-solid {
            padding: 0.75rem 1.5rem !important;
            width: 100% !important;
          }
          .agatha-hero-bottom {
            margin-top: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
