import React from 'react';
import { useContent } from '../context/ContentContext';

export const AboutSection = () => {
  const { content } = useContent();
  const about = content.about || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';
  const secondaryColor = brand.secondaryColor || '#173765';

  return (
    <section id="about" className="section-padding" style={{
      background: '#ffffff',
      color: '#000000',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '2.5rem',
          '@media (min-width: 992px)': { gridTemplateColumns: '0.9fr 1.1fr' }
        }} className="about-grid">
          
          {/* Left Title + Button */}
          <div>
            <span style={{ fontSize: '0.9rem', color: secondaryColor, fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              {about.category || 'About Us'}
            </span>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.25,
              marginBottom: '1.5rem',
              fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif"
            }}>
              {about.headline || 'We Use Our Experience To Get Clients'}
            </h2>

            <a href="#services" className="btn-agatha-navy" style={{ display: 'inline-flex' }}>
              <span>LEARN MORE →</span>
            </a>
          </div>

          {/* Right Highlight Copy & Paragraph */}
          <div>
            <p style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: secondaryColor,
              lineHeight: 1.6,
              marginBottom: '1.25rem',
              fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif"
            }}>
              {about.highlight || 'We Are A Creative Agency That Specializes In Web Design, Branding Identity, And Social Media Management.'}
            </p>

            <div style={{ width: '100%', height: '2px', background: primaryColor, margin: '1.25rem 0' }} />

            <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.65 }}>
              {about.body || 'At Inflix Marketing Solutions, we turn complex digital marketing challenges into clear growth strategies.'}
            </p>
          </div>

        </div>

        {/* Dual Cards + Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.75rem',
          alignItems: 'stretch',
          '@media (min-width: 992px)': { gridTemplateColumns: '0.9fr 1.1fr' }
        }} className="about-cards-grid">
          
          {/* Left Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card-light-gray" style={{ borderLeft: `4px solid ${primaryColor}` }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: secondaryColor, marginBottom: '0.5rem', fontFamily: "'Ancola', sans-serif" }}>
                {about.philosophyTitle || 'Our Philosophy'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {about.philosophy || 'We believe marketing should be transparent, data-led, and obsessively focused on ROI.'}
              </p>
            </div>

            <div className="card-light-gray" style={{ borderLeft: `4px solid ${secondaryColor}` }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: secondaryColor, marginBottom: '0.5rem', fontFamily: "'Ancola', sans-serif" }}>
                {about.goalsTitle || 'Our Goals'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {about.goals || 'Our goal is to empower ambitious brands to scale seamlessly by providing high-impact digital strategies.'}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="img-hover-container" style={{ borderRadius: '16px', minHeight: '260px', maxHeight: '400px' }}>
            <img 
              src={about.aboutImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"} 
              alt="About Inflix Marketing Solutions"
              style={{ borderRadius: '16px', width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid, .about-cards-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
