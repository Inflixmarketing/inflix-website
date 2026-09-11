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
      paddingTop: '6.5rem',
      paddingBottom: '6.5rem',
      overflow: 'hidden',
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Top Right Soft Gold Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '0%',
        width: '650px',
        height: '650px',
        background: `radial-gradient(circle, rgba(237, 180, 3, 0.22) 0%, rgba(11, 19, 43, 0) 70%)`,
        pointerEvents: 'none',
        filter: 'blur(50px)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Main Headline Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Row 1: Outline Pill (#EDB403 Border & Text) + Next-Gen */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }} className="agatha-hero-row">
            
            {/* Top Outline Pill: Border #EDB403, Text #EDB403 */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 2.4rem',
              border: '1.5px solid #EDB403',
              borderRadius: '9999px',
              background: 'rgba(237, 180, 3, 0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }} className="agatha-hero-pill-outline">
              <span style={{
                fontFamily: "'Ancola', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
                fontWeight: 300,
                color: '#EDB403',
                lineHeight: 1.1,
                letterSpacing: '0.01em'
              }}>
                {outlineText}
              </span>
            </div>

            {/* Next-Gen / Creative Text */}
            <span style={{
              fontFamily: "'Ancola', 'Tenor Sans', serif",
              fontSize: 'clamp(3.2rem, 7.5vw, 6.2rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '0.01em'
            }}>
              Next-Gen
            </span>
          </div>

          {/* Row 2: Gold Arrow Button + Main Title Text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginTop: '0.25rem'
          }} className="agatha-hero-row">
            
            {/* Circular Arrow Button in Gold */}
            <a 
              href="#portfolio" 
              style={{
                width: '74px',
                height: '74px',
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
              className="agatha-hero-arrow-btn"
              aria-label="Explore Portfolio"
            >
              <ArrowUp size={34} style={{ transform: 'rotate(45deg)', color: '#173765', strokeWidth: 2.5 }} />
            </a>

            <h1 style={{
              fontFamily: "'Ancola', 'Tenor Sans', serif",
              fontSize: 'clamp(3.2rem, 7.5vw, 6.2rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
              margin: 0,
              display: 'inline'
            }}>
              Digital Marketing & Creative Agency
            </h1>
          </div>

        </div>

        {/* Row 3: Sub-description on Left, Solid Gold Pill on Right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginTop: '3.5rem'
        }} className="agatha-hero-bottom">
          
          {/* Subheading / Description */}
          <div style={{ maxWidth: '480px' }}>
            <p style={{
              fontSize: '1.05rem',
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
              padding: '1.1rem 3.4rem',
              borderRadius: '9999px',
              boxShadow: '0 15px 35px rgba(237, 180, 3, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} 
            className="agatha-hero-pill-solid"
          >
            <span style={{
              fontFamily: "'Ancola', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
              fontWeight: 700,
              color: '#173765',
              lineHeight: 1,
              letterSpacing: '0.01em'
            }}>
              {solidText}
            </span>
          </a>

        </div>

      </div>

      <style>{`
        .agatha-hero-arrow-btn:hover {
          transform: scale(1.1) rotate(10deg) !important;
          background-color: #fcd34d !important;
          box-shadow: 0 15px 40px rgba(237, 180, 3, 0.6) !important;
        }
        .agatha-hero-pill-solid:hover {
          transform: translateY(-4px) scale(1.02) !important;
          background-color: #fcd34d !important;
          box-shadow: 0 20px 45px rgba(237, 180, 3, 0.6) !important;
        }
        @media (max-width: 768px) {
          .agatha-hero-row {
            gap: 0.75rem !important;
          }
          .agatha-hero-pill-outline {
            padding: 0.35rem 1.4rem !important;
          }
          .agatha-hero-arrow-btn {
            width: 54px !important;
            height: 54px !important;
          }
          .agatha-hero-pill-solid {
            padding: 0.85rem 2rem !important;
            width: 100% !important;
          }
          .agatha-hero-bottom {
            margin-top: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
