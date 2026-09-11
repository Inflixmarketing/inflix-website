import React from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ClientsSection } from './components/ClientsSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { AdminPanel } from './components/AdminPanel';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { BlogDetailPage } from './components/BlogDetailPage';

function MainAppContent() {
  const { activeView } = useContent();

  const isAdminRoute = activeView === 'admin' || window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  if (activeView === 'about') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <AboutSection />
          <WhyUsSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'services') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <ServicesSection />
        </main>
        <Footer />
        <ServiceModal />
      </div>
    );
  }

  if (activeView === 'portfolio') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <PortfolioSection />
          <ClientsSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'process') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <ProcessSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'testimonials') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <TestimonialsSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'blog') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <BlogSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'contact') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <FaqSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (activeView === 'service-detail') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <ServiceDetailPage />
        </main>
        <Footer />
        <ServiceModal />
      </div>
    );
  }

  if (activeView === 'blog-detail') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <BlogDetailPage />
        </main>
        <Footer />
      </div>
    );
  }

  // Home Page View: Full agency landing page experience
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: '76px' }}>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <PortfolioSection />
        <ClientsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <BlogSection />
      </main>
      <Footer />

      {/* Dynamic Service Breakdown Modal */}
      <ServiceModal />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Runtime Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0F172A',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <h1 style={{ color: '#EDB403', fontSize: '2rem', marginBottom: '1rem' }}>
            Inflix Marketing Solutions
          </h1>
          <p style={{ color: '#94A3B8', marginBottom: '1.5rem', maxWidth: '500px' }}>
            Something went wrong while rendering the site content. Please refresh the page or reset content cache.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: '12px 28px',
              backgroundColor: '#EDB403',
              color: '#0F172A',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Clear Cache & Reload Site
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <MainAppContent />
      </ContentProvider>
    </ErrorBoundary>
  );
}

export default App;
