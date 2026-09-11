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

  if (activeView === 'service-detail') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <ServiceDetailPage />
        </main>
        <Footer />
        <AdminPanel />
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
        <AdminPanel />
      </div>
    );
  }

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

      {/* Live SaaS Admin Panel Dashboard */}
      <AdminPanel />
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
