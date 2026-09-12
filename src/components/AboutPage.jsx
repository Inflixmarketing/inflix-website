import React from 'react';
import { AboutSection } from './AboutSection';
import { WhyUsSection } from './WhyUsSection';
import { useContent } from '../context/ContentContext';
import { Award, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { content, openContactModal } = useContent();
  const banner = content.aboutPageBanner || content.about || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#EDB403';

  return (
    <div>
      {/* Banner */}
      <section style={{
        padding: '5rem 0 3.5rem 0',
        background: 'linear-gradient(180deg, #173765 0%, #0B132B 100%)',
        borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-category" style={{ justifyContent: 'center' }}>
            <Award size={14} style={{ color: primaryColor }} />
            <span>{banner.category || 'About Inflix'}</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            {banner.headline || banner.title || 'Driven By Strategy. Powered By Creativity.'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.7
          }}>
            {banner.subParagraph || banner.description || 'We help ambitious brands scale faster through data-driven performance marketing, high-converting content, and strategic brand positioning.'}
          </p>

          <button onClick={openContactModal} className="btn-agatha-gold">
            <span>Work With Our Team</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* About Main Section */}
      <AboutSection />

      {/* Why Us Section */}
      <WhyUsSection />
    </div>
  );
};
