import React from 'react';
import { useContent } from '../context/ContentContext';
import { Clock, ArrowLeft } from 'lucide-react';

export const ComingSoonOverlay = ({ title, message, imageUrl }) => {
  const { navigateToView } = useContent();

  return (
    <div style={{
      background: '#0B132B',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '650px',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(23, 55, 101, 0.4)',
        border: '1px solid rgba(237, 180, 3, 0.35)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Clock Icon Circle */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(237, 180, 3, 0.15)',
          border: '1.5px solid #EDB403',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: '#EDB403'
        }}>
          <Clock size={36} />
        </div>

        <span className="section-category" style={{ marginBottom: '1rem' }}>
          COMING SOON
        </span>

        <h1 style={{
          fontFamily: "'Ancola', 'Tenor Sans', serif",
          fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '1rem',
          lineHeight: 1.15
        }}>
          {title || "Feature Under Development"}
        </h1>

        <p style={{
          color: '#E5E7EB',
          fontSize: '1.05rem',
          lineHeight: 1.65,
          marginBottom: '2rem'
        }}>
          {message || "We are currently finalizing this strategic service offering to ensure maximum performance and business impact. Check back soon for the official launch!"}
        </p>

        {imageUrl && (
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            maxHeight: '220px',
            marginBottom: '2rem',
            border: '1px solid rgba(237, 180, 3, 0.25)'
          }}>
            <img src={imageUrl} alt="Coming Soon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <button 
          onClick={() => navigateToView('home')}
          className="btn-agatha-gold"
          style={{ padding: '0.75rem 2rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> RETURN TO HOME
        </button>
      </div>
    </div>
  );
};
