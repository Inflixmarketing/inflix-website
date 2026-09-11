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
      paddingTop: '3rem',
      paddingBottom: '4.5rem',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, rgba(237, 180, 3, 0.12) 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Top Badges / Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          <span className="capsule-outline" style={{ borderColor: primaryColor }}>
            {hero.capsuleOutline || 'Driven by Strategy.'}
          </span>
          <span className="capsule-solid" style={{ background: primaryColor, color: '#0f172a' }}>
            {hero.capsuleSolid || 'Powered by Creativity.'}
          </span>
        </div>

        {/* Main Hero Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#portfolio" className="circle-arrow-btn" style={{ background: primaryColor }}>
              <ArrowUp size={24} style={{ color: '#000000' }} />
            </a>

            <h1 style={{
              fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : 'sans-serif',
              fontSize: 'clamp(2rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--color-heading-text, #ffffff)',
              letterSpacing: '-0.02em',
              maxWidth: '950px'
            }}>
              {hero.titleMain || 'Next-Gen Digital Marketing & Creative Agency'}
            </h1>
          </div>
        </div>

        {/* Sub-description & Responsive CTA Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.75rem',
          alignItems: 'center',
          maxWidth: '900px'
        }} className="hero-sub-grid">
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-body-text, #94a3b8)',
            lineHeight: 1.7
          }}>
            {hero.description || 'We help ambitious brands scale faster through data-driven performance marketing, high-converting content, and strategic brand positioning.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }} className="hero-cta-wrapper">
            <a href="#contact" className="btn-agatha-gold">
              <span>{hero.primaryCta || 'Get Started Today →'}</span>
            </a>
            <a href="#services" className="btn-agatha-navy">
              <span>{hero.secondaryCta || 'Explore Our Services'}</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-sub-grid {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .hero-cta-wrapper {
            flex-direction: column !important;
          }
          .hero-cta-wrapper a {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
