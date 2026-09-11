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
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, rgba(103, 82, 236, 0.25) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(50px)'
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
                <Sparkles size={14} style={{ color: '#a394ff' }} />
                <span>Creative Portfolio & Agency</span>
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 style={{
              fontFamily: "'Ancola', 'Tenor Sans', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '0.01em'
            }}>
              Creative Portfolio <br /> & <span className="text-purple-gradient">Digital Agency</span>
            </h1>

            {/* Description Paragraph */}
            <p style={{
              fontSize: '1.15rem',
              color: '#cbd5e1',
              lineHeight: 1.7,
              maxWidth: '640px'
            }}>
              {hero.description || 'We craft high-impact brand identities, converting digital experiences, and strategic marketing campaigns that elevate ambitious companies.'}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }} className="hero-btn-group">
              <a href="#contact" className="btn-agatha-purple">
                <span>GET STARTED NOW</span>
                <ArrowUpRight size={18} />
              </a>
              <a href="#portfolio" className="btn-agatha-outline">
                <span>VIEW PORTFOLIO</span>
              </a>
            </div>

            {/* Social Proof Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(103, 82, 236, 0.2)',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', color: '#ffffff', display: 'block', lineHeight: 1 }}>+340%</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '6px', display: 'block' }}>Avg. ROAS Growth</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(103, 82, 236, 0.3)' }} />
              <div>
                <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', color: '#a394ff', display: 'block', lineHeight: 1 }}>4.9 / 5</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '6px', display: 'block' }}>Client Satisfaction</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(103, 82, 236, 0.3)' }} />
              <div>
                <span style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', color: '#ffffff', display: 'block', lineHeight: 1 }}>100+</span>
                <span style={{ fontSize: '0.785rem', color: '#94a3b8', marginTop: '6px', display: 'block' }}>Projects Delivered</span>
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
