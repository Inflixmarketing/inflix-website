import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { BookOpen, Calendar, ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export const BlogsPage = () => {
  const { content, navigateToView } = useContent();
  const banner = content.blogHeader || {};
  const blogList = content.blogs || [];
  const brand = content.brand || {};
  const primaryColor = brand.primaryColor || '#EDB403';

  // Read URL page parameter ?page=X
  const getUrlPage = () => {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page'), 10);
    return !isNaN(p) && p > 0 ? p : 1;
  };

  const [currentPage, setCurrentPage] = useState(getUrlPage);

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

  const totalPages = Math.ceil(blogList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = blogList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            <BookOpen size={14} style={{ color: primaryColor }} />
            <span>{banner.category || 'Marketing Insights'}</span>
          </span>
          <h1 style={{
            fontFamily: "'Ancola', 'Tenor Sans', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            {banner.headline || 'Read Our Latest Blogs & Insights'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.7
          }}>
            {banner.paragraph || 'Stay updated with proven marketing strategies, digital trends, and actionable insights to turn online engagement into measurable revenue.'}
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="section-padding">
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}>
            {paginatedBlogs.map((b) => (
              <article 
                key={b.id} 
                className="card-glass" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }} 
                onClick={() => navigateToView('blog-detail', b.slug || b.id)}
              >
                <div>
                  <div className="img-hover-container" style={{ borderRadius: '12px', height: '200px', marginBottom: '1.5rem' }}>
                    <img 
                      src={b.imageUrl || "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80"} 
                      alt={b.title} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80"; }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.825rem',
                    color: '#94a3b8'
                  }}>
                    <span style={{
                      background: 'rgba(237, 180, 3, 0.12)',
                      color: primaryColor,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}>
                      {b.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      {b.date}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Ancola', 'Tenor Sans', serif", fontSize: '1.3rem', fontWeight: 400, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                    {b.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {b.excerpt}
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
                  <span>Read Full Article</span>
                  <ArrowRight size={16} />
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
