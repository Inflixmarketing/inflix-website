import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Palette, 
  Code, 
  Layout, 
  Image as ImageIcon, 
  TrendingUp, 
  Video, 
  FileText, 
  Share2, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  'branding-identity': Palette,
  'web-development': Code,
  'ui-ux-design': Layout,
  'graphic-design': ImageIcon,
  'performance-marketing': TrendingUp,
  'video-creation-reels': Video,
  'copywriting-content': FileText,
  'social-media-management': Share2
};

export const ServicesSection = () => {
  const { content, setSelectedService } = useContent();
  const header = content.servicesHeader || {};
  const services = content.services || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#edb403';
  const secondaryColor = brand.secondaryColor || '#173765';

  return (
    <section id="services" className="section-padding" style={{ background: '#ffffff', color: '#000000', position: 'relative' }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '2.5rem',
          '@media (min-width: 992px)': { gridTemplateColumns: '1fr 1fr' }
        }} className="services-header-grid">
          <div>
            <span style={{ fontSize: '0.9rem', color: secondaryColor, fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              {header.category || 'Services'}
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.2,
              fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif"
            }}>
              {header.headline || 'What Services We Offer You ?'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="services-header-right">
            <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.65, maxWidth: '500px' }}>
              {header.paragraph || 'At Inflix Marketing Solutions, we deliver end-to-end performance marketing and strategic digital management.'}
            </p>
            
            <div>
              <a href="#services" className="btn-agatha-gold" style={{ display: 'inline-flex' }}>
                <span>ALL SERVICES →</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Card Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {services.map((svc, index) => {
            const IconComponent = iconMap[svc.id] || Palette;
            const isFirstDark = index === 0;

            return (
              <div 
                key={svc.id}
                className={isFirstDark ? "card-dark-grid" : "card-light-gray"}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  cursor: 'pointer',
                  borderTop: isFirstDark ? `4px solid ${primaryColor}` : `4px solid ${secondaryColor}`
                }}
                onClick={() => setSelectedService(svc)}
              >
                <div>
                  <div style={{
                    marginBottom: '1.75rem',
                    color: isFirstDark ? primaryColor : secondaryColor
                  }}>
                    <IconComponent size={38} strokeWidth={1.5} />
                  </div>

                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: isFirstDark ? '#ffffff' : '#000000',
                    fontFamily: "'Ancola', 'Outfit', 'Syne', sans-serif"
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: isFirstDark ? 'rgba(255, 255, 255, 0.75)' : '#64748b'
                  }}>
                    {svc.shortDesc}
                  </p>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: isFirstDark ? primaryColor : secondaryColor,
                  marginTop: '1.25rem',
                  textTransform: 'uppercase'
                }}>
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .services-header-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .services-header-right {
            align-items: flex-end !important;
          }
        }
        @media (max-width: 991px) {
          .services-header-right {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
