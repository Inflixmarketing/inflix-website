import React from 'react';
import { useContent } from '../context/ContentContext';
import { Star, Quote, ArrowRight } from 'lucide-react';

export const TestimonialsSection = () => {
  const { content } = useContent();
  const header = content.testimonialsHeader || {};
  const testimonials = content.testimonials || [];
  const brand = content.brand || {};

  return (
    <section id="testimonials" className="section-padding" style={{
      background: brand.surfaceBg || '#111c30',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div>
            <span className="section-category">{header.category || 'Testimonials'}</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {header.headline || 'What Our Clients Say About Inflix'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(237, 180, 3, 0.12)',
              border: '1px solid rgba(237, 180, 3, 0.3)',
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px'
            }}>
              <div style={{ display: 'flex', gap: '2px', color: brand.accentColor || '#edb403' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={brand.accentColor || '#edb403'} />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
                {header.rating || '4.9'} Rating
              </span>
            </div>

            <a href="#contact" className="btn-secondary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
              <span>{header.ctaText || 'VIEW ALL →'}</span>
            </a>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t) => (
            <div key={t.id} className="card-glass" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: `linear-gradient(145deg, rgba(23, 38, 66, 0.8) 0%, rgba(10, 17, 30, 0.9) 100%)`
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill={brand.accentColor || '#edb403'} color={brand.accentColor || '#edb403'} />
                    ))}
                  </div>
                  <Quote size={28} style={{ opacity: 0.2, color: brand.accentColor || '#edb403' }} />
                </div>

                <p style={{
                  fontSize: '1rem',
                  color: '#e2e8f0',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{t.name}</h4>
                <p style={{ fontSize: '0.85rem', color: brand.accentColor || '#edb403', fontWeight: 500 }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
