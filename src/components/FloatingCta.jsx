import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Phone, MessageSquare, Send, X, MessageCircle } from 'lucide-react';

export const FloatingCta = () => {
  const { content, openContactModal } = useContent();
  const brand = content.brand || {};
  const [expanded, setExpanded] = useState(false);

  const phone = brand.contactPhone || '+91 98765 43210';
  const whatsapp = brand.socialLinks?.whatsapp?.url || `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
  const ctaText = brand.floatingCtaText || 'Quick Growth Contact';
  const primaryColor = brand.primaryColor || '#EDB403';

  return (
    <div style={floatingContainerStyle}>
      {/* Expanded Menu Stack */}
      {expanded && (
        <div style={expandedContainerStyle}>
          <a 
            href={`tel:${phone}`} 
            style={actionItemStyle}
            title="Call Now"
          >
            <div style={{ ...iconSquareStyle, background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              <Phone size={18} />
            </div>
            <span style={actionTextStyle}>Call Us Directly</span>
          </a>

          <a 
            href={whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            style={actionItemStyle}
            title="WhatsApp Chat"
          >
            <div style={{ ...iconSquareStyle, background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.4)' }}>
              <MessageSquare size={18} />
            </div>
            <span style={actionTextStyle}>Chat on WhatsApp</span>
          </a>

          <button 
            onClick={() => {
              setExpanded(false);
              openContactModal();
            }} 
            style={actionItemStyle}
            title="Request Consultation"
          >
            <div style={{ ...iconSquareStyle, background: 'rgba(237, 180, 3, 0.2)', color: primaryColor, borderColor: 'rgba(237, 180, 3, 0.4)' }}>
              <Send size={18} />
            </div>
            <span style={actionTextStyle}>Request Consultation</span>
          </button>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setExpanded(!expanded)} 
        style={mainButtonStyle}
        aria-label="Toggle Quick Contact Menu"
      >
        {expanded ? (
          <X size={22} style={{ color: '#173765' }} />
        ) : (
          <MessageCircle size={24} style={{ color: '#173765' }} />
        )}
      </button>
    </div>
  );
};

const floatingContainerStyle = {
  position: 'fixed',
  bottom: '1.75rem',
  right: '1.75rem',
  zIndex: 3500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.75rem'
};

const expandedContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  background: 'rgba(23, 55, 101, 0.95)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(237, 180, 3, 0.35)',
  borderRadius: '16px',
  padding: '0.75rem',
  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
  animation: 'fadeInUp 0.2s ease-out'
};

const actionItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '10px',
  color: '#ffffff',
  textDecoration: 'none',
  background: 'rgba(11, 19, 43, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontSize: '0.825rem',
  fontWeight: 600
};

const iconSquareStyle = {
  width: '34px',
  height: '34px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid transparent',
  flexShrink: 0
};

const actionTextStyle = {
  fontSize: '0.825rem',
  fontWeight: 600,
  color: '#ffffff'
};

const mainButtonStyle = {
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  background: '#EDB403',
  border: '2px solid #ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 8px 25px rgba(237, 180, 3, 0.5)',
  transition: 'transform 0.2s ease'
};
