import React from 'react';
import { ContentProvider } from './context/ContentContext';
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

export function App() {
  return (
    <ContentProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
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

        {/* Live Admin Panel Dashboard */}
        <AdminPanel />
      </div>
    </ContentProvider>
  );
}

export default App;
