import React from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { PortfolioPage } from './components/PortfolioPage';
import { PortfolioDetailPage } from './components/PortfolioDetailPage';
import { ProcessPage } from './components/ProcessPage';
import { ReviewsPage } from './components/ReviewsPage';
import { BlogsPage } from './components/BlogsPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactModal } from './components/ContactModal';
import { FloatingCta } from './components/FloatingCta';

function MainAppContent() {
  const { activeView } = useContent();

  // Standalone Admin Dashboard (Completely unmounts website DOM to prevent background scroll)
  if (activeView === 'admin') {
    return <AdminDashboard />;
  }

  // Render Page Content based on Active SEO Route
  const renderPageComponent = () => {
    switch (activeView) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'portfolio-detail':
        return <PortfolioDetailPage />;
      case 'process':
        return <ProcessPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms-of-service':
        return <TermsOfServicePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: '75px' }}>
        {renderPageComponent()}
      </main>
      <Footer />

      {/* Unified Lead Contact Modal */}
      <ContactModal />

      {/* Persistent Floating Action CTA (Call, WhatsApp, Form) */}
      <FloatingCta />
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
