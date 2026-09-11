import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const { content } = useContent();
  const header = content.faqHeader || {};
  const faqs = content.faqs || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding" style={{
      background: 'rgba(15, 23, 42, 0.4)',
      position: 'relative',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }} className="faq-grid">
          
          {/* Left Title */}
          <div>
            <span className="section-category">
              <HelpCircle size={14} style={{ color: primaryColor }} />
              <span>{header.category || 'FAQs'}</span>
            </span>

            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Frequently Asked Questions'}
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
              {header.paragraph || 'Have questions about working with us? Here are answers to common questions about our services, campaign strategies, and client onboarding process.'}
            </p>

            <a href="#contact" className="btn-agatha-gold">
              <span>HAVE MORE QUESTIONS? CONTACT US</span>
            </a>
          </div>

          {/* Right Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={faq.id}
                  className="card-glass"
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    borderColor: isOpen ? primaryColor : 'rgba(255, 255, 255, 0.08)'
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <h3 style={{
                      fontFamily: "'Ancola', 'Tenor Sans', serif",
                      fontSize: '1.2rem',
                      fontWeight: 400,
                      color: isOpen ? '#a394ff' : '#ffffff',
                      lineHeight: 1.35
                    }}>
                      {faq.question}
                    </h3>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? primaryColor : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#090d16' : '#ffffff',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      <ChevronDown size={18} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.7 }}>
                        {faq.answer}
                      </p>
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
