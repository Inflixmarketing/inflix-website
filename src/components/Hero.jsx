import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowUp } from 'lucide-react';

export const Hero = () => {
  const { content } = useContent();
  const hero = content.hero || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section id="home" className="agatha-grid-bg" style={{
      position: 'relative',
      paddingTop: '3.5rem',
      paddingBottom: '5rem',
      overflow: 'hidden'
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, rgba(237, 180, 3, 0.1) 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Mixed Typography Hero Display */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.25rem',
          marginBottom: '3rem',
          width: '100%'
        }}>
          
          {/* Row 1: Outlined Capsule + "Creative" */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            width: '100%'
          }}>
            <span className="capsule-outline" style={{ borderColor: primaryColor, color: '#ffffff' }}>
              {hero.capsuleOutline || 'Identity'}
            </span>

            <span style={{
              fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 7.5vw, 6.5rem)',
              fontWeight: 400,
              color: primaryColor,
              lineHeight: 1
            }}>
              {hero.displayHighlight || 'Creative'}
            </span>
          </div>

          {/* Row 2: Circle Arrow Button + "Portfolio Agency" */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem',
            width: '100%'
          }}>
            <a href="#portfolio" className="circle-arrow-btn" style={{ background: primaryColor }}>
              <ArrowUp size={28} style={{ color: '#000000' }} />
            </a>

            <h1 style={{
              fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif",
              fontSize: 'clamp(2.5rem, 8.5vw, 7.5rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              wordBreak: 'break-word'
            }}>
              {hero.titleMain || 'Portfolio Agency'}
            </h1>
          </div>

          {/* Row 3: Solid Gold Capsule */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            paddingRight: '0'
          }} className="hero-row3">
            <span className="capsule-solid" style={{ background: primaryColor, color: '#0c1421' }}>
              {hero.capsuleSolid || 'Promotions'}
            </span>
          </div>

        </div>

        {/* Sub-description & Action Buttons Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.75rem',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          '@media (min-width: 768px)': { gridTemplateColumns: '1.5fr 1fr' }
        }} className="hero-sub-grid">
          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.65
          }}>
            {hero.description || 'We help ambitious brands scale faster through data-driven performance marketing, high-converting content, and strategic brand positioning.'}
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', width: '100%' }} className="hero-cta-wrapper">
            <a href="#contact" className="btn-agatha-gold">
              <span>{hero.primaryCta || "LET'S TALK →"}</span>
            </a>
            <a href="#services" className="btn-agatha-navy">
              <span>{hero.secondaryCta || "EXPLORE SERVICES"}</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-sub-grid {
            grid-template-columns: 1.4fr 1fr !important;
          }
          .hero-row3 {
            padding-right: 4rem !important;
          }
        }
        @media (max-width: 767px) {
          .hero-cta-wrapper {
            flex-direction: column !important;
          }
          .hero-cta-wrapper a {
            width: 100% !important;
          }
          .hero-row3 {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
