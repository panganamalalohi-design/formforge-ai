import React, { useState } from 'react';

/**
 * Dashboard View
 *
 * @param {Object} props
 * @param {Array} props.products - Available products
 * @param {Function} props.onSelectProduct - Product selection handler
 * @param {Function} props.onNavigate - View navigation handler
 * @param {Array} props.savedProductIds - Saved product IDs for bookmark state
 * @param {Function} props.onToggleSave - Save/unsave handler
 */
export default function Dashboard({
  products,
  onSelectProduct,
  onNavigate,
  savedProductIds = [],
  onToggleSave
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const featuredProduct = products.find((p) => p.isSample && p.id === 'water-bottle');
  const suggestionProducts = products.filter((p) => ['water-bottle', 'chair', 'lamp', 'bicycle'].includes(p.id));

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery.trim());
  };

  const handleSuggestionClick = (prod) => {
    setSearchQuery(prod.name);
    setSubmittedQuery(prod.name);
  };

  // Determine filtered items or empty state
  const activeSearch = submittedQuery.toLowerCase();
  const searchMatches = activeSearch
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(activeSearch) ||
          p.category.toLowerCase().includes(activeSearch) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(activeSearch)))
      )
    : null;

  return (
    <div className="ff-view-container">
      {/* Editorial Dashboard Header */}
      <header className="ff-dash-header">
        <div className="ff-dash-kicker">Industrial Research & Synthesis</div>
        <h1 className="ff-dash-title">Understand products. Discover possibilities.</h1>
        <p className="ff-dash-desc">
          Trace how technical constraints, material breakthroughs, and cultural shifts shaped everyday objects.
          Interrogate past design choices, identify unresolved trade-offs, and engineer grounded redesign concepts.
        </p>
      </header>

      {/* Product Search & Suggestions */}
      <section className="ff-search-section" aria-label="Product Search">
        <form onSubmit={handleSearchSubmit} className="ff-search-bar">
          <div className="ff-search-input-wrap">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ff-search-icon"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="ff-search-input"
              placeholder="Search product taxonomy (e.g., Water Bottle, Chair, Lamp, Bicycle)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className="ff-search-clear"
                onClick={() => {
                  setSearchQuery('');
                  setSubmittedQuery('');
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="ff-btn ff-btn-primary">
            Search Taxonomy
          </button>
        </form>

        <div className="ff-suggestion-row">
          <span className="ff-suggestion-label">Suggested Products:</span>
          {suggestionProducts.map((prod) => {
            const isSelected = submittedQuery.toLowerCase() === prod.name.toLowerCase();
            return (
              <button
                key={prod.id}
                type="button"
                className={`ff-suggestion-chip ${isSelected ? 'active' : ''}`}
                onClick={() => handleSuggestionClick(prod)}
              >
                <span className={`ff-chip-indicator ${prod.isSample ? '' : 'empty'}`} />
                <span>{prod.name}</span>
                {prod.isSample && <span className="ff-badge ff-badge-sample">Sample Ready</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Search Result or Empty State */}
      {submittedQuery && (
        <section className="ff-search-results" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div className="ff-section-heading">
            <h2 className="ff-section-title">Search Results for "{submittedQuery}"</h2>
            <button
              type="button"
              className="ff-btn ff-btn-subtle ff-btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSubmittedQuery('');
              }}
            >
              Reset Search
            </button>
          </div>

          {searchMatches && searchMatches.length > 0 ? (
            searchMatches.map((prod) => {
              if (prod.isSample) {
                const isSaved = savedProductIds.includes(prod.id);
                return (
                  <div key={prod.id} className="ff-featured-card">
                    <div className="ff-card-header">
                      <div>
                        <div className="ff-card-category">{prod.category}</div>
                        <h3 className="ff-card-title">{prod.name}</h3>
                        <p className="ff-card-desc">{prod.overview}</p>
                        <div className="ff-tag-list">
                          {prod.tags.map((tag) => (
                            <span key={tag} className="ff-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <span className="ff-badge ff-badge-sample">Verified Sample Data</span>
                        <button
                          type="button"
                          className="ff-btn ff-btn-subtle ff-btn-sm"
                          onClick={() => onToggleSave(prod.id)}
                          title={isSaved ? 'Remove from Saved' : 'Save for Later'}
                        >
                          {isSaved ? '★ Saved' : '☆ Save'}
                        </button>
                      </div>
                    </div>

                    <div className="ff-card-actions">
                      <button
                        type="button"
                        className="ff-btn ff-btn-primary"
                        onClick={() => {
                          onSelectProduct(prod.id);
                          onNavigate('research');
                        }}
                      >
                        Open Product Research →
                      </button>
                      <button
                        type="button"
                        className="ff-btn ff-btn-secondary"
                        onClick={() => {
                          onSelectProduct(prod.id);
                          onNavigate('timeline');
                        }}
                      >
                        View Evolution Timeline
                      </button>
                      <button
                        type="button"
                        className="ff-btn ff-btn-secondary"
                        onClick={() => {
                          onSelectProduct(prod.id);
                          onNavigate('explorer');
                        }}
                      >
                        Ask Solution Explorer
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={prod.id} className="ff-empty-state">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ff-empty-icon"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                    <h3 className="ff-empty-title">Dataset Not Compiled: {prod.name}</h3>
                    <p className="ff-empty-desc">
                      In this demonstration build, sample research is strictly provided for the{' '}
                      <strong>Portable Water Bottle</strong>. To preserve research integrity, datasets for{' '}
                      <strong>{prod.name}</strong> are not fabricated.
                    </p>
                    <button
                      type="button"
                      className="ff-btn ff-btn-primary"
                      onClick={() => {
                        onSelectProduct('water-bottle');
                        onNavigate('research');
                      }}
                    >
                      Explore Water Bottle Research Instead →
                    </button>
                  </div>
                );
              }
            })
          ) : (
            <div className="ff-empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ff-empty-icon"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3 className="ff-empty-title">No Product Matches Found</h3>
              <p className="ff-empty-desc">
                No taxonomy entries matched "{submittedQuery}". Try searching for "Water Bottle" to inspect our verified sample evolution data.
              </p>
              <button
                type="button"
                className="ff-btn ff-btn-secondary"
                onClick={() => {
                  setSearchQuery('Water Bottle');
                  setSubmittedQuery('Water Bottle');
                }}
              >
                View Water Bottle Sample
              </button>
            </div>
          )}
        </section>
      )}

      {/* Featured Research Project (Water Bottle) */}
      {!submittedQuery && featuredProduct && (
        <section aria-label="Featured Research Project">
          <div className="ff-section-heading">
            <div>
              <h2 className="ff-section-title">Featured Research Project</h2>
              <div className="ff-section-subtitle">Comprehensive industrial evolution case study</div>
            </div>
            <span className="ff-badge ff-badge-sample">Full Dataset Loaded</span>
          </div>

          <div className="ff-featured-card">
            <div className="ff-card-header">
              <div>
                <div className="ff-card-category">{featuredProduct.category}</div>
                <h3 className="ff-card-title">{featuredProduct.name}</h3>
                <p className="ff-card-desc">{featuredProduct.overview}</p>
                <div className="ff-tag-list">
                  {featuredProduct.tags.map((tag) => (
                    <span key={tag} className="ff-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="ff-btn ff-btn-secondary ff-btn-sm"
                onClick={() => onToggleSave(featuredProduct.id)}
              >
                {savedProductIds.includes(featuredProduct.id) ? '★ Saved to Workspace' : '☆ Save for Later'}
              </button>
            </div>

            <div className="ff-card-meta-grid">
              <div>
                <div className="ff-meta-item-label">Timeline Scope</div>
                <div className="ff-meta-item-value">6 Historical Eras (Antiquity to Present)</div>
              </div>
              <div>
                <div className="ff-meta-item-label">Current Dominant Alloy</div>
                <div className="ff-meta-item-value">{featuredProduct.stats.primaryMaterialNow}</div>
              </div>
              <div>
                <div className="ff-meta-item-label">Core Design Tension</div>
                <div className="ff-meta-item-value">{featuredProduct.stats.coreChallenge}</div>
              </div>
            </div>

            <div className="ff-card-actions">
              <button
                type="button"
                className="ff-btn ff-btn-primary"
                onClick={() => {
                  onSelectProduct(featuredProduct.id);
                  onNavigate('research');
                }}
              >
                Open Research Dossier →
              </button>
              <button
                type="button"
                className="ff-btn ff-btn-secondary"
                onClick={() => {
                  onSelectProduct(featuredProduct.id);
                  onNavigate('timeline');
                }}
              >
                View Evolution Timeline
              </button>
              <button
                type="button"
                className="ff-btn ff-btn-secondary"
                onClick={() => {
                  onSelectProduct(featuredProduct.id);
                  onNavigate('explorer');
                }}
              >
                Explore Design Solutions
              </button>
              <button
                type="button"
                className="ff-btn ff-btn-subtle"
                onClick={() => {
                  onSelectProduct(featuredProduct.id);
                  onNavigate('studio');
                }}
              >
                Start Redesign Studio ↗
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
