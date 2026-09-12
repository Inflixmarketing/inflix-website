import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage = () => {
  const { content } = useContent();
  const brand = content.brand || {};
  const services = content.services || [];
  const primaryColor = brand.primaryColor || '#EDB403';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    budget: '$1,000 - $5,000',
    message: '',
    referral: 'Google Search'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
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
    }, 3000);
  };

  return (
    <div>
      {/* Banner */}
      <section style={{
        padding: '5rem 0 3.5rem 0',
        background: 'linear-gradient(180deg, #173765 0%, #0B132B 100%)',
        borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-category" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} style={{ color: primaryColor }} />
            <span>CONTACT US</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            Let's Build Something Exceptional Together
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Have questions or ready to launch your next performance marketing campaign? Reach out to our strategists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'flex-start'
          }}>
            
            {/* Left Column: Direct Agency Contact Info */}
            <div>
              <h2 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                Contact Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={infoCardStyle}>
                  <div style={iconBoxStyle}>
                    <Mail size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <span style={infoLabelStyle}>EMAIL ADDRESS</span>
                    <a href={`mailto:${brand.contactEmail || 'contact@inflixmarketing.com'}`} style={infoValueStyle}>
                      {brand.contactEmail || 'contact@inflixmarketing.com'}
                    </a>
                  </div>
                </div>

                <div style={infoCardStyle}>
                  <div style={iconBoxStyle}>
                    <Phone size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <span style={infoLabelStyle}>PHONE NUMBER</span>
                    <a href={`tel:${brand.contactPhone || '+91 98765 43210'}`} style={infoValueStyle}>
                      {brand.contactPhone || '+91 98765 43210'}
                    </a>
                  </div>
                </div>

                <div style={infoCardStyle}>
                  <div style={iconBoxStyle}>
                    <MapPin size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <span style={infoLabelStyle}>AGENCY HEADQUARTERS</span>
                    <p style={{ ...infoValueStyle, margin: 0 }}>
                      {brand.location || 'Hyderabad, Telangana, India'}
                    </p>
                  </div>
                </div>

                <div style={infoCardStyle}>
                  <div style={iconBoxStyle}>
                    <Clock size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <span style={infoLabelStyle}>BUSINESS HOURS</span>
                    <p style={{ ...infoValueStyle, margin: 0 }}>
                      Monday – Saturday: 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Unified Contact Form */}
            <div className="card-glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={successIconStyle}>
                    <CheckCircle2 size={48} style={{ color: primaryColor }} />
                  </div>
                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.75rem' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Thank you! Our growth strategists will review your inquiry and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.25rem' }}>
                    Send Us A Message
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>FULL NAME *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>COMPANY NAME</label>
                      <input 
                        type="text" 
                        placeholder="Company or Clinic Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="email@company.com"
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>SERVICE INTERESTED IN</label>
                      <select 
                        value={formData.service} 
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        style={selectStyle}
                      >
                        <option value="" style={{ background: '#0B132B' }}>Select Service</option>
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
                        <option value="Under $1,000" style={{ background: '#0B132B' }}>Under $1,000 / mo</option>
                        <option value="$1,000 - $5,000" style={{ background: '#0B132B' }}>$1,000 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000" style={{ background: '#0B132B' }}>$5,000 - $10,000 / mo</option>
                        <option value="$10,000+" style={{ background: '#0B132B' }}>$10,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>MESSAGE / CAMPAIGN REQUIREMENTS</label>
                    <textarea 
                      rows={4} 
                      placeholder="Share your goals, timeline, or key inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <button type="submit" className="btn-agatha-gold" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                    <Send size={16} /> SUBMIT INQUIRY
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

const infoCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.25rem',
  borderRadius: '16px',
  background: 'rgba(23, 55, 101, 0.4)',
  border: '1px solid rgba(237, 180, 3, 0.2)'
};

const iconBoxStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'rgba(237, 180, 3, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};

const infoLabelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  color: '#EDB403',
  fontWeight: 700,
  letterSpacing: '0.05em',
  marginBottom: '2px'
};

const infoValueStyle = {
  fontSize: '0.95rem',
  color: '#ffffff',
  fontWeight: 600,
  textDecoration: 'none'
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
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: '1px solid rgba(237, 180, 3, 0.25)',
  background: 'rgba(11, 19, 43, 0.7)',
  color: '#ffffff',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer'
};

const successIconStyle = {
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
