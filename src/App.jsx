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

  // Home Page View: Hero, Services, and Contact Us
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: '76px' }}>
        <Hero />
        <ServicesSection />
      </main>
      <Footer />
      <ServiceModal />
    </div>
  );
}

export function App() {
  return (
    <ContentProvider>
      <MainAppContent />
    </ContentProvider>
  );
}

export default App;
