import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const BlogDetailPage = () => {
  const { selectedBlog, navigateToView } = useContent();

  if (!selectedBlog) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', color: '#ffffff' }}>
        <h2>Blog Post Not Found</h2>
        <button onClick={() => navigateToView('home')} className="btn-agatha-gold" style={{ marginTop: '1.5rem' }}>
          Back To Home
        </button>
      </div>
    );
  }

  const b = selectedBlog;

  return (
    <div style={{ backgroundColor: '#0B132B', minHeight: '100vh', color: '#ffffff', paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => navigateToView('home')} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#EDB403',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '2rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} /> Back to Articles & Insights
        </button>

        {/* Category Pill */}
        <span className="section-category">
          <span>{b.category || 'MARKETING'}</span>
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Ancola', 'Tenor Sans', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 400,
          marginTop: '0.75rem',
          marginBottom: '1.25rem',
          color: '#ffffff',
          lineHeight: 1.18
        }}>
          {b.title}
        </h1>

        {/* Metadata Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.875rem',
          color: '#cbd5e1',
          paddingBottom: '2rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={15} style={{ color: '#EDB403' }} /> {b.author || 'Inflix Marketing'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={15} style={{ color: '#EDB403' }} /> {b.date}
          </span>
        </div>

        {/* Featured Cover Image */}
        <div className="img-hover-container" style={{
          borderRadius: '20px',
          height: '420px',
          marginBottom: '3rem',
          border: '1px solid rgba(237, 180, 3, 0.2)'
        }}>
          <img 
            src={b.imageUrl || "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80"} 
            alt={b.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Article Body */}
        <div style={{
          fontSize: '1.1rem',
          color: '#E5E7EB',
          lineHeight: 1.85,
          whiteSpace: 'pre-line'
        }}>
          {b.content || b.excerpt}
        </div>

      </div>
    </div>
  );
};
