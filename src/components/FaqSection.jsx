import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const { content } = useContent();
  const header = content.faqHeader || {};
  const faqs = content.faqs || [];
  const brand = content.brand || {};

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="section-padding">
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          '@media (min-width: 992px)': { gridTemplateColumns: '0.9fr 1.1fr' }
        }} className="faq-grid">
          
          {/* Left Column Header */}
          <div>
            <span className="section-category">{header.category || 'FAQs'}</span>
            <h2 className="section-title">{header.headline || 'Frequently Asked Questions'}</h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
              {header.paragraph || 'Have questions about working with us? Here are answers to common questions about our services, campaign strategies, and client onboarding process.'}
            </p>
            
            <a href="#contact" className="btn-primary">
              <span>Have More Questions? Contact Us</span>
            </a>
          </div>

          {/* Right Column Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={faq.id || idx}
                  style={{
                    background: isOpen ? `linear-gradient(135deg, ${brand.primaryColor || '#173765'} 0%, rgba(17, 28, 48, 0.95) 100%)` : brand.surfaceBg || '#111c30',
                    border: `1px solid ${isOpen ? (brand.accentColor || '#edb403') : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'left',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: 700
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <HelpCircle size={20} style={{ color: brand.accentColor || '#edb403', shrink: 0 }} />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: brand.accentColor || '#edb403'
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.5rem 3.25rem',
                      color: '#94a3b8',
                      lineHeight: 1.7,
                      fontSize: '0.975rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '1rem'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .faq-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
