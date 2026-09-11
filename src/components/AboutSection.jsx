import React from 'react';
import { useContent } from '../context/ContentContext';
import { Target, Compass, ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const { content } = useContent();
  const about = content.about || {};

  return (
    <section id="about" className="section-padding" style={{
      background: 'rgba(23, 55, 101, 0.25)',
      position: 'relative',
      borderTop: '1px solid rgba(237, 180, 3, 0.15)',
      borderBottom: '1px solid rgba(237, 180, 3, 0.15)'
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
              {about.category || 'About Us'}
            </span>

            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              {about.headline || 'We Use Our Experience To Get Clients Results'}
            </h2>

            <p style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: '#EDB403',
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}>
              {about.highlight || 'We Are A Digital Agency That Specializes In Web Design, Branding Identity, And Social Media Management.'}
            </p>

            <p style={{ fontSize: '1rem', color: '#E5E7EB', lineHeight: 1.7, marginBottom: '2rem' }}>
              {about.body || 'At Inflix Marketing Solutions, we turn complex digital marketing challenges into clear growth strategies.'}
            </p>

            <a href="#services" className="btn-agatha-gold">
              <span>EXPLORE SERVICES</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Dual Glass Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Left Box 1: Philosophy */}
            <div className="card-glass" style={{ borderLeft: `4px solid #EDB403` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Compass size={22} style={{ color: '#EDB403' }} />
                <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', color: '#ffffff' }}>
                  {about.philosophyTitle || 'Our Philosophy'}
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#E5E7EB', lineHeight: 1.65 }}>
                {about.philosophy || 'We believe marketing should be transparent, data-led, and obsessively focused on ROI.'}
              </p>
            </div>

            {/* Left Box 2: Goals */}
            <div className="card-glass" style={{ borderLeft: `4px solid #EDB403` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Target size={22} style={{ color: '#EDB403' }} />
                <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', color: '#ffffff' }}>
                  {about.goalsTitle || 'Our Goals'}
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#E5E7EB', lineHeight: 1.65 }}>
                {about.goals || 'Our goal is to empower ambitious brands to scale seamlessly by providing high-impact digital strategies.'}
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
