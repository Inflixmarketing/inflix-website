import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const { content, navigateToView } = useContent();
  const policy = content.privacyPolicy || {};

  useEffect(() => {
    document.title = policy.seoTitle || "Privacy Policy | Inflix Marketing Solutions";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [policy]);

  const paragraphs = (policy.content || '').split('\n\n');

  return (
    <div style={{ background: '#0B132B', minHeight: '80vh', padding: '4rem 0 6rem 0' }}>
      <div className="container">
        
        {/* Back Button */}
        <button 
          onClick={() => navigateToView('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#EDB403',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Page Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-category">
            <ShieldCheck size={14} /> Legal Documentation
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            {policy.title || 'Privacy Policy'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Last Updated: March 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="card-glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
          {paragraphs.map((p, index) => (
            <p 
              key={index}
              style={{
                fontSize: '1rem',
                color: '#E5E7EB',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                whiteSpace: 'pre-line'
              }}
            >
              {p}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};
