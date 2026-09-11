import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Layers, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { ComingSoonOverlay } from './ComingSoonOverlay';

export const PortfolioDetailPage = () => {
  const { content, activeSlug, navigateToView } = useContent();
  const portfolioList = content.portfolio || [];
  
  const item = portfolioList.find(p => (p.slug || p.id) === activeSlug) || portfolioList[0] || {};

  useEffect(() => {
    document.title = `${item.title || 'Project'} | Inflix Portfolio`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item]);

  if (item.comingSoon?.enabled) {
    return (
      <ComingSoonOverlay 
        title={item.title} 
        message={item.comingSoon?.message} 
        imageUrl={item.comingSoon?.imageUrl || item.imageUrl} 
      />
    );
  }

  return (
    <div style={{ background: '#0B132B', minHeight: '85vh', padding: '4rem 0 6rem 0' }}>
      <div className="container">
        
        {/* Back Button */}
        <button 
          onClick={() => navigateToView('portfolio')}
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
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        {/* Hero Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-category">
            <Layers size={14} /> {item.category || 'Portfolio Case Study'}
          </span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            {item.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E5E7EB', maxWidth: '750px', lineHeight: 1.7 }}>
            {item.desc}
          </p>
        </div>

        {/* Feature Image */}
        {item.imageUrl && (
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            maxHeight: '450px',
            border: '1px solid rgba(237, 180, 3, 0.3)',
            marginBottom: '3rem',
            background: '#173765'
          }}>
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Overview Box */}
        <div className="card-glass" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Campaign Strategy & Results
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            At Inflix Marketing Solutions, we executed a data-driven performance campaign for {item.title}. Our team deployed targeted visual creatives, precise audience segmentation, and continuous conversion optimization to lower acquisition costs and maximize client ROI.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
            <div style={{ background: 'rgba(237, 180, 3, 0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(237, 180, 3, 0.3)' }}>
              <span style={{ fontSize: '0.75rem', color: '#EDB403', fontWeight: 700, textTransform: 'uppercase' }}>Strategy</span>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginTop: '0.25rem' }}>Direct Response Ads</h3>
            </div>
            <div style={{ background: 'rgba(237, 180, 3, 0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(237, 180, 3, 0.3)' }}>
              <span style={{ fontSize: '0.75rem', color: '#EDB403', fontWeight: 700, textTransform: 'uppercase' }}>Focus</span>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginTop: '0.25rem' }}>ROAS & Lead Gen</h3>
            </div>
            <div style={{ background: 'rgba(237, 180, 3, 0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(237, 180, 3, 0.3)' }}>
              <span style={{ fontSize: '0.75rem', color: '#EDB403', fontWeight: 700, textTransform: 'uppercase' }}>Status</span>
              <h3 style={{ fontSize: '1.1rem', color: '#10b981', marginTop: '0.25rem' }}>Completed & Scaled</h3>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#contact" onClick={() => navigateToView('contact')} className="btn-agatha-gold">
            <span>GET SIMILAR RESULTS FOR YOUR BRAND</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};
