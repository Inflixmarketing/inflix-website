import React from 'react';
import { useContent } from '../context/ContentContext';
import { Target, Compass, ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const { content } = useContent();
  const about = content.about || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section id="about" className="section-padding" style={{
      background: 'rgba(12, 10, 29, 0.6)',
      position: 'relative',
      borderTop: '1px solid rgba(103, 82, 236, 0.15)',
      borderBottom: '1px solid rgba(103, 82, 236, 0.15)'
    }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }} className="about-grid">
          
          {/* Left Headline */}
          <div>
            <span className="section-category">
              {about.category || 'About Agatha'}
            </span>

            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              {about.headline || 'We Use Experience To Create Iconic Digital Solutions'}
            </h2>

            <p style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: '#a394ff',
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}>
              {about.highlight || 'We Are A Creative Digital Agency Specializing In Web Design, Brand Identity, & High-Growth Strategy.'}
            </p>

            <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
              {about.body || 'At Agatha, we translate complex creative and marketing challenges into elegant, high-converting digital products.'}
            </p>

            <a href="#services" className="btn-agatha-purple">
              <span>EXPLORE SERVICES</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Dual Glass Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Left Box 1: Philosophy */}
            <div className="card-glass" style={{ borderLeft: `4px solid #6752ec` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Compass size={22} style={{ color: '#a394ff' }} />
                <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', color: '#ffffff' }}>
                  {about.philosophyTitle || 'Our Creative Philosophy'}
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                {about.philosophy || 'We believe design and performance marketing should be seamless, data-driven, and focused on tangible business ROI.'}
              </p>
            </div>

            {/* Left Box 2: Goals */}
            <div className="card-glass" style={{ borderLeft: `4px solid #a394ff` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Target size={22} style={{ color: '#a394ff' }} />
                <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', color: '#ffffff' }}>
                  {about.goalsTitle || 'Our Mission & Vision'}
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                {about.goals || 'Our mission is to empower visionaries with world-class digital tools and marketing strategies that scale effortlessly.'}
              </p>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};
