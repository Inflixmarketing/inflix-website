import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowUpRight, TrendingUp, Award, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { content } = useContent();
  const hero = content.hero || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section id="home" className="agatha-grid-bg" style={{
      position: 'relative',
      paddingTop: '4rem',
      paddingBottom: '5rem',
      overflow: 'hidden'
    }}>
      {/* Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, rgba(237, 180, 3, 0.15) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(40px)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="hero-main-grid">
          
          {/* Left Hero Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Top Category Badge Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className="section-category">
                <Sparkles size={14} style={{ color: primaryColor }} />
                <span>Driven by Strategy. Powered by Creativity.</span>
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 style={{
              fontFamily: brand.headingFont ? `'${brand.headingFont}', sans-serif` : "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5.8vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              color: '#ffffff',
              letterSpacing: '-0.03em'
            }}>
              Next-Gen <span className="text-gold-gradient">Digital Marketing</span> & Creative Agency
            </h1>

            {/* Description Paragraph */}
            <p style={{
              fontSize: '1.15rem',
              color: '#cbd5e1',
              lineHeight: 1.7,
              maxWidth: '640px'
            }}>
              {hero.description || 'We help ambitious brands scale faster through data-driven performance marketing, high-converting content, and strategic brand positioning.'}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }} className="hero-btn-group">
              <a href="#contact" className="btn-agatha-gold">
                <span>Explore Our Services</span>
                <ArrowUpRight size={18} />
              </a>
              <a href="#portfolio" className="btn-agatha-navy">
                <span>View Recent Work</span>
              </a>
            </div>

            {/* Social Proof Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block', lineHeight: 1 }}>+340%</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Avg. ROAS Growth</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: primaryColor, display: 'block', lineHeight: 1 }}>4.9 / 5</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Client Satisfaction</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block', lineHeight: 1 }}>100+</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Campaigns Launched</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-main-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .hero-btn-group {
            flex-direction: column !important;
          }
          .hero-btn-group a {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
