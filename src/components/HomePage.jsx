import React from 'react';
import { Hero } from './Hero';
import { ServicesSection } from './ServicesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ClientsSection } from './ClientsSection';
import { useContent } from '../context/ContentContext';
import { ArrowRight, Sparkles, Send } from 'lucide-react';

// Contact CTA Section Component for Homepage
const ContactCtaSection = () => {
  const { content, openContactModal, navigateToView } = useContent();
  const cta = content.ctaBanner || {};
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#EDB403';

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div className="card-glass" style={{
          padding: '3.5rem 2rem',
          borderRadius: '24px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(23, 55, 101, 0.8) 0%, rgba(11, 19, 43, 0.9) 100%)',
          border: '1px solid rgba(237, 180, 3, 0.35)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
        }}>
          <span className="section-category" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} style={{ color: primaryColor }} />
            <span>LET'S WORK TOGETHER</span>
          </span>
          <h2 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
            fontWeight: 400,
            color: '#ffffff',
            maxWidth: '750px',
            margin: '0.75rem auto 1.5rem auto',
            lineHeight: 1.25
          }}>
            {cta.headline || "Have A Project In Mind? Let's Start Working Together!"}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 2.25rem auto', lineHeight: 1.6 }}>
            Reach out to our agency strategists today for a custom growth plan, ad audit, or web consultation.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={openContactModal} 
              className="btn-agatha-gold"
            >
              <Send size={16} />
              <span>{cta.buttonText || 'CONTACT US TODAY'}</span>
            </button>
            
            <button 
              onClick={() => navigateToView('contact')} 
              className="btn-agatha-outline"
            >
              <span>Explore Contact Page</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Preview */}
      <ServicesSection isPreview={true} />

      {/* 3. Testimonials */}
      <TestimonialsSection isPreview={true} />

      {/* 4. Clients / Reviews */}
      <ClientsSection isPreview={true} />

      {/* 5. Contact CTA Section */}
      <ContactCtaSection />
    </div>
  );
};
