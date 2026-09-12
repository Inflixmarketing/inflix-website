import React from 'react';
import { useContent } from '../context/ContentContext';
import { TestimonialsSection } from './TestimonialsSection';
import { Star, ArrowRight } from 'lucide-react';

export const ReviewsPage = () => {
  const { content, openContactModal } = useContent();
  const banner = content.testimonialsHeader || {};
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
            <Star size={14} style={{ color: primaryColor }} />
            <span>CLIENT REVIEWS & REPUTATION</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            {banner.headline || 'What Our Clients Say About Inflix'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.7
          }}>
            Read verified reviews from clinic founders, B2B directors, and enterprise clients who have scaled their revenue with Inflix Marketing Solutions.
          </p>

          <button onClick={openContactModal} className="btn-agatha-gold">
            <span>Become Our Next Growth Case Study</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Main Reviews Grid */}
      <TestimonialsSection />
    </div>
  );
};
