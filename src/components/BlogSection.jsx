import React from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const BlogSection = () => {
  const { content } = useContent();
  const header = content.blogHeader || {};
  const blogs = content.blogs || [];
  const brand = content.brand || {};

  return (
    <section className="section-padding" style={{
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
          <div style={{ maxWidth: '650px' }}>
            <span className="section-category">{header.category || 'Our Blog'}</span>
            <h2 className="section-title">{header.headline || 'Read Our Latest Blogs & Insights'}</h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7 }}>
              {header.paragraph || 'Stay updated with proven marketing strategies, digital trends, and actionable insights. Learn how to optimize your ad spend, build brand authority, and turn online engagement into measurable business growth.'}
            </p>
          </div>

          <a href="#contact" className="btn-secondary">
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
              background: `linear-gradient(145deg, rgba(23, 38, 66, 0.8) 0%, rgba(10, 17, 30, 0.9) 100%)`
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.825rem',
                  color: '#94a3b8'
                }}>
                  <span style={{
                    background: 'rgba(237, 180, 3, 0.12)',
                    color: brand.accentColor || '#edb403',
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

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                  {b.title}
                </h3>

                <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                  {b.excerpt}
                </p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: brand.accentColor || '#edb403'
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
