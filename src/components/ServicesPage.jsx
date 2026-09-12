import React from 'react';
import { useContent } from '../context/ContentContext';
import { ServicesSection } from './ServicesSection';
import { Briefcase, ArrowRight } from 'lucide-react';

export const ServicesPage = () => {
  const { content, openContactModal } = useContent();
  const banner = content.servicesPageBanner || content.servicesHeader || {};
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
            <Briefcase size={14} style={{ color: primaryColor }} />
            <span>{banner.category || 'Agency Services'}</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            {banner.headline || banner.title || 'What Services We Offer You ?'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.7
          }}>
            {banner.paragraph || banner.subDescription || 'Comprehensive digital marketing solutions engineered to accelerate brand visibility, drive qualified leads, and maximize long-term business ROI.'}
          </p>

          <button onClick={openContactModal} className="btn-agatha-gold">
            <span>Request Custom Service Package</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection isPreview={false} />
    </div>
  );
};
