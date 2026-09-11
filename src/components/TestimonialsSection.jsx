import React from 'react';
import { useContent } from '../context/ContentContext';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const { content } = useContent();
  const header = content.testimonialsHeader || {};
  const testimonials = content.testimonials || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section id="testimonials" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <span className="section-category">{header.category || 'Testimonials'}</span>
            <h2 className="section-title" style={{ marginBottom: 0, marginTop: '0.5rem' }}>
              {header.headline || 'What Our Clients Say About Inflix'}
            </h2>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(237, 180, 3, 0.1)',
            border: '1px solid rgba(237, 180, 3, 0.3)',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px'
          }}>
            <div style={{ display: 'flex', gap: '3px', color: primaryColor }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={primaryColor} stroke="none" />
              ))}
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
              {header.rating || '4.9'} Average Rating
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t) => (
            <div key={t.id} className="card-glass" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
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
                      <Star key={i} size={16} fill={primaryColor} stroke="none" />
                    ))}
                  </div>
                  <Quote size={28} style={{ opacity: 0.25, color: primaryColor }} />
                </div>

                <p style={{
                  fontSize: '1rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}>
                {t.avatarUrl && (
                  <img 
                    src={t.avatarUrl} 
                    alt={t.name} 
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(237, 180, 3, 0.35)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: primaryColor, fontWeight: 600, marginTop: '2px' }}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
