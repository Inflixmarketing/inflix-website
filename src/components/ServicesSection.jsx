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

  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '3rem'
        }} className="services-header-grid">
          <div>
            <span className="section-category">
              {header.category || 'Services'}
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {header.headline || 'What Services We Offer You ?'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7 }}>
              {header.paragraph || 'At Inflix Marketing Solutions, we deliver end-to-end performance marketing and strategic digital management.'}
            </p>
          </div>
        </div>

        {/* 8-Card Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((svc) => {
            const IconComponent = iconMap[svc.id] || Palette;

            return (
              <div 
                key={svc.id}
                className="card-glass"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '270px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedService(svc)}
              >
                <div>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(237, 180, 3, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: primaryColor,
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(237, 180, 3, 0.25)'
                  }}>
                    <IconComponent size={26} strokeWidth={1.75} />
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#ffffff'
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontSize: '0.925rem',
                    lineHeight: 1.6,
                    color: '#94a3b8'
                  }}>
                    {svc.shortDesc}
                  </p>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: primaryColor,
                  marginTop: '1.5rem',
                  textTransform: 'uppercase'
                }}>
                  <span>View Breakdown</span>
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
        }
      `}</style>
    </section>
  );
};
