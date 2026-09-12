import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Layers, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export const PortfolioPage = () => {
  const { content, navigateToView } = useContent();
  const banner = content.portfolioPageBanner || content.portfolioHeader || {};
  const portfolioList = content.portfolio || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#EDB403';

  // Read URL page parameter ?page=X
  const getUrlPage = () => {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page'), 10);
    return !isNaN(p) && p > 0 ? p : 1;
  };

  const [currentPage, setCurrentPage] = useState(getUrlPage);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getUrlPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updatePage = (newPage) => {
    setCurrentPage(newPage);
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage);
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Categories Filter
  const categories = ['ALL', ...new Set(portfolioList.map(p => p.category).filter(Boolean))];

  const filteredPortfolio = activeCategory === 'ALL'
    ? portfolioList
    : portfolioList.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filteredPortfolio.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredPortfolio.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      {/* Page Banner */}
      <section style={{
        padding: '5rem 0 3.5rem 0',
        background: 'linear-gradient(180deg, #173765 0%, #0B132B 100%)',
        borderBottom: '1px solid rgba(237, 180, 3, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-category" style={{ justifyContent: 'center' }}>
            <Layers size={14} style={{ color: primaryColor }} />
            <span>{banner.category || 'Portfolio Showcase'}</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            {banner.headline || banner.title || 'Check Out Our Latest Projects'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.7
          }}>
            {banner.paragraph || banner.subDescription || 'Explore how we combine strategy, design, and performance marketing to deliver measurable growth for our clients.'}
          </p>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <section className="section-padding">
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  updatePage(1);
                }}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: activeCategory === cat ? '1px solid #EDB403' : '1px solid rgba(255,255,255,0.15)',
                  background: activeCategory === cat ? '#EDB403' : 'rgba(23, 55, 101, 0.4)',
                  color: activeCategory === cat ? '#173765' : '#E5E7EB'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}>
            {paginatedItems.map((port) => (
              <article 
                key={port.id} 
                className="card-glass" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => navigateToView('portfolio-detail', port.slug || port.id)}
              >
                <div>
                  <div className="img-hover-container" style={{ borderRadius: '12px', height: '220px', marginBottom: '1.5rem' }}>
                    <img 
                      src={port.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} 
                      alt={port.title} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"; }}
                    />
                  </div>

                  <div style={{ marginBottom: '0.85rem' }}>
                    <span style={{
                      background: 'rgba(237, 180, 3, 0.12)',
                      color: primaryColor,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {port.category}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', fontWeight: 400, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                    {port.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {port.desc}
                  </p>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: primaryColor
                }}>
                  <Eye size={16} />
                  <span>View Project Case Study</span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <button
                disabled={currentPage === 1}
                onClick={() => updatePage(currentPage - 1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(23, 55, 101, 0.6)',
                  border: '1px solid rgba(237, 180, 3, 0.3)',
                  color: '#ffffff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.4 : 1
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => updatePage(pageNum)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: isActive ? '#EDB403' : 'rgba(23, 55, 101, 0.6)',
                      border: isActive ? '1px solid #EDB403' : '1px solid rgba(237, 180, 3, 0.3)',
                      color: isActive ? '#173765' : '#ffffff',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => updatePage(currentPage + 1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(23, 55, 101, 0.6)',
                  border: '1px solid rgba(237, 180, 3, 0.3)',
                  color: '#ffffff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.4 : 1
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
