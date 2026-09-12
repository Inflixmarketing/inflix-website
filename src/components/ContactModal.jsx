import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Send, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';

export const ContactModal = () => {
  const { isContactModalOpen, closeContactModal, contactPresetService, content } = useContent();
  const brand = content.brand || {};
  const services = content.services || [];
  const primaryColor = brand.primaryColor || '#EDB403';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: contactPresetService || '',
    budget: '$1,000 - $5,000',
    message: '',
    referral: 'Google Search'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isContactModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeContactModal();
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        service: '',
        budget: '$1,000 - $5,000',
        message: '',
        referral: 'Google Search'
      });
    }, 2500);
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalCardStyle} className="card-glass">
        
        {/* Close Button */}
        <button 
          onClick={closeContactModal} 
          style={closeIconButtonStyle}
          aria-label="Close Contact Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={successIconContainerStyle}>
              <CheckCircle2 size={48} style={{ color: primaryColor }} />
            </div>
            <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Inquiry Received!
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto' }}>
              Thank you for reaching out to <strong>Inflix Marketing Solutions</strong>. Our growth team will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="section-category" style={{ fontSize: '0.75rem' }}>
                <Sparkles size={13} style={{ color: primaryColor }} />
                <span>GROWTH CONSULTATION</span>
              </span>
              <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.6rem', color: '#ffffff', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
                Let's Scale Your Business
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Fill out the form below to request a strategic consultation or proposal.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>FULL NAME *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>COMPANY NAME</label>
                  <input 
                    type="text" 
                    placeholder="Acme Corp / Clinic Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>PHONE NUMBER *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>SERVICE INTERESTED IN</label>
                  <select 
                    value={formData.service} 
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="" style={{ background: '#0B132B' }}>Select a Service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} style={{ background: '#0B132B' }}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>ESTIMATED BUDGET</label>
                  <select 
                    value={formData.budget} 
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="Under $1,000" style={{ background: '#0B132B' }}>Under $1,000 / month</option>
                    <option value="$1,000 - $5,000" style={{ background: '#0B132B' }}>$1,000 - $5,000 / month</option>
                    <option value="$5,000 - $10,000" style={{ background: '#0B132B' }}>$5,000 - $10,000 / month</option>
                    <option value="$10,000+" style={{ background: '#0B132B' }}>$10,000+ / month</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>PROJECT DETAILS & REQUIREMENTS</label>
                <textarea 
                  rows={3} 
                  placeholder="Tell us about your goals, current challenges, or target timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>HOW DID YOU HEAR ABOUT US? (OPTIONAL)</label>
                <select 
                  value={formData.referral} 
                  onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                  style={selectStyle}
                >
                  <option value="Google Search" style={{ background: '#0B132B' }}>Google Search</option>
                  <option value="Instagram / Meta Ads" style={{ background: '#0B132B' }}>Instagram / Meta Ads</option>
                  <option value="LinkedIn" style={{ background: '#0B132B' }}>LinkedIn</option>
                  <option value="Client Recommendation" style={{ background: '#0B132B' }}>Client Recommendation</option>
                  <option value="Other" style={{ background: '#0B132B' }}>Other</option>
                </select>
              </div>

              <button type="submit" className="btn-agatha-gold" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                <Send size={16} /> SUBMIT REQUEST
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(11, 19, 43, 0.88)',
  backdropFilter: 'blur(12px)',
  zIndex: 4000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
};

const modalCardStyle = {
  background: '#173765',
  border: '1px solid rgba(237, 180, 3, 0.35)',
  borderRadius: '20px',
  maxWidth: '560px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: '2rem',
  position: 'relative',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
};

const closeIconButtonStyle = {
  position: 'absolute',
  top: '1.25rem',
  right: '1.25rem',
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  zIndex: 10
};

const successIconContainerStyle = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  background: 'rgba(237, 180, 3, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem auto',
  border: '1px solid rgba(237, 180, 3, 0.35)'
};

const labelStyle = {
  display: 'block',
  fontWeight: 600,
  fontSize: '0.75rem',
  marginBottom: '0.35rem',
  color: '#EDB403',
  letterSpacing: '0.04em'
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid rgba(237, 180, 3, 0.25)',
  background: 'rgba(11, 19, 43, 0.7)',
  color: '#ffffff',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer'
};
