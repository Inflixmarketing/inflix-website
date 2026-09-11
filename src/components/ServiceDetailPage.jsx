import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { ComingSoonOverlay } from './ComingSoonOverlay';

export const ServiceDetailPage = () => {
  const { selectedService, navigateToView } = useContent();

  if (!selectedService) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', color: '#ffffff' }}>
        <h2>Service Not Found</h2>
        <button onClick={() => navigateToView('home')} className="btn-agatha-gold" style={{ marginTop: '1.5rem' }}>
          Back To Home
        </button>
      </div>
    );
  }

  if (selectedService.comingSoon?.enabled) {
    return (
      <ComingSoonOverlay 
        title={selectedService.title} 
        message={selectedService.comingSoon?.message} 
        imageUrl={selectedService.comingSoon?.imageUrl || selectedService.imageUrl} 
      />
    );
  }

  const s = selectedService;

  return (
    <div style={{ backgroundColor: '#0B132B', minHeight: '100vh', color: '#ffffff', paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="container">
        
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
          <ArrowLeft size={18} /> Back to All Services
        </button>

        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(23, 55, 101, 0.6) 0%, rgba(11, 19, 43, 0.95) 100%)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          border: '1px solid rgba(237, 180, 3, 0.3)',
          marginBottom: '3.5rem'
        }}>
          <span className="section-category">
            <span>SERVICE OVERVIEW</span>
          </span>

          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 400,
            marginTop: '0.75rem',
            marginBottom: '1rem',
            color: '#ffffff',
            lineHeight: 1.15
          }}>
            {s.heroTitle || s.title}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#E5E7EB',
            maxWidth: '750px',
            lineHeight: 1.7
          }}>
            {s.heroSub || s.shortDesc}
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem'
        }} className="service-detail-grid">
          
          {/* Main Column */}
          <div>
            <div className="img-hover-container" style={{
              borderRadius: '20px',
              height: '380px',
              marginBottom: '2.5rem',
              border: '1px solid rgba(237, 180, 3, 0.2)'
            }}>
              <img 
                src={s.imageUrl || "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80"} 
                alt={s.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <h2 style={{
              fontFamily: "'Ancola', 'Tenor Sans', serif",
              fontSize: '2rem',
              fontWeight: 400,
              marginBottom: '1.25rem',
              color: '#ffffff'
            }}>
              {s.overviewTitle || 'Strategic Execution & Approach'}
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: '#E5E7EB',
              lineHeight: 1.8,
              marginBottom: '3rem'
            }}>
              {s.overviewContent || s.shortDesc}
            </p>

            {/* Deliverables Grid */}
            {s.deliverables && s.deliverables.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontFamily: "'Ancola', 'Tenor Sans', serif",
                  fontSize: '1.6rem',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  color: '#ffffff'
                }}>
                  Key Features & Deliverables
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {s.deliverables.map((item, idx) => (
                    <div key={idx} className="card-glass" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                        <CheckCircle2 size={22} style={{ color: '#EDB403', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.6 }}>
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Quick Contact Card */}
            <div className="card-glass" style={{ borderLeft: '4px solid #EDB403' }}>
              <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
                Ready to Scale?
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#E5E7EB', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Schedule a 1-on-1 strategy call with our agency team to analyze your brand goals.
              </p>
              <a href="#contact" onClick={() => navigateToView('home')} className="btn-agatha-gold" style={{ width: '100%' }}>
                <span>BOOK A STRATEGY CALL</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Value Props */}
            <div className="card-glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ShieldCheck size={24} style={{ color: '#EDB403' }} />
                <h4 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.2rem', color: '#ffffff' }}>Guaranteed Performance</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                Every campaign is continuously monitored, A/B tested, and optimized to protect your ROI.
              </p>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .service-detail-grid {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
      `}</style>
    </div>
  );
};
