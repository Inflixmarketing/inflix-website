import React from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const BlogSection = () => {
  const { content, navigateToView } = useContent();
  const header = content.blogHeader || {};
  const blogs = content.blogs || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
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
          <div style={{ maxWidth: '650px' }}>
            <span className="section-category">
              <BookOpen size={14} style={{ color: primaryColor }} />
              <span>{header.category || 'Our Blog'}</span>
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'Read Our Latest Blogs & Insights'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7 }}>
              {header.paragraph || 'Stay updated with proven marketing strategies, digital trends, and actionable insights.'}
            </p>
          </div>

          <a href="#contact" className="btn-agatha-gold">
            <span>{header.ctaText || 'VIEW ALL →'}</span>
          </a>
        </div>

        {/* Blogs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {blogs.map((b) => (
            <article key={b.id} className="card-glass" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} onClick={() => navigateToView('blog-detail', b.slug || b.id)}>
              <div>
                <div className="img-hover-container" style={{ borderRadius: '12px', height: '200px', marginBottom: '1.5rem' }}>
                  <img 
                    src={b.imageUrl || "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80"} 
                    alt={b.title} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80"; }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  fontSize: '0.825rem',
                  color: '#94a3b8'
                }}>
                  <span style={{
                    background: 'rgba(237, 180, 3, 0.12)',
                    color: primaryColor,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontWeight: 700
                  }}>
                    {b.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    {b.date}
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', fontWeight: 400, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                  {b.title}
                </h3>

                <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                  {b.excerpt}
                </p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: primaryColor
              }}>
                <span>Read Full Article</span>
                <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
