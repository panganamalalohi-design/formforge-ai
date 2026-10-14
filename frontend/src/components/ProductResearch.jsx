import React, { useState } from 'react';

/**
 * Product Research View
 *
 * @param {Object} props
 * @param {Object} props.product - Current active product object
 * @param {string} props.selectedEntryId - Current selected timeline entry ID
 * @param {Function} props.onSelectEntry - Entry selection callback
 * @param {Function} props.onNavigate - View navigation handler
 * @param {boolean} props.isSaved - Saved state
 * @param {Function} props.onToggleSave - Save/unsave handler
 * @param {Function} props.onLaunchExplorerWithEntry - Jump to Solution Explorer with entry context
 */
export default function ProductResearch({
  product,
  selectedEntryId,
  onSelectEntry,
  onNavigate,
  isSaved,
  onToggleSave,
  onLaunchExplorerWithEntry
}) {
  const [activeTab, setActiveTab] = useState('evolution'); // 'evolution' | 'materials' | 'solutions' | 'limitations'

  // Safety fallback if no product or empty product
  if (!product || !product.isSample) {
    return (
      <div className="ff-view-container">
        <div className="ff-empty-state">
          <h2 className="ff-empty-title">Product Dataset Not Compiled</h2>
          <p className="ff-empty-desc">
            No verified research dataset is currently loaded for this selection. In Demo Mode,
            comprehensive historical and engineering research is provided for the Portable Water Bottle.
          </p>
          <button
            type="button"
            className="ff-btn ff-btn-primary"
            onClick={() => onNavigate('dashboard')}
          >
            ← Back to Product Dashboard
          </button>
        </div>
      </div>
    );
  }

  const timelineEntries = product.timeline || [];
  const activeEntry = timelineEntries.find((e) => e.id === selectedEntryId) || timelineEntries[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="ff-badge ff-badge-verified">Verified Era</span>;
      case 'approximate':
        return <span className="ff-badge ff-badge-approximate">Approximate Era</span>;
      case 'unverified':
      default:
        return <span className="ff-badge ff-badge-unverified">Unverified Period</span>;
    }
  };

  return (
    <div className="ff-view-container">
      {/* Sample Data Notice Banner - Required */}
      <div className="ff-notice-banner" role="alert">
        <div className="ff-notice-content">
          <span className="ff-notice-tag">Sample Data</span>
          <span>
            <strong>SAMPLE DATA - verify before citing.</strong> Historical developments and mechanical interpretations are presented for academic synthesis and demonstration.
          </span>
        </div>
        <span className="ff-badge ff-badge-neutral">Draft v1.2</span>
      </div>

      {/* Product Research Header */}
      <header className="ff-research-header">
        <div className="ff-product-title-row">
          <div>
            <div className="ff-card-category">{product.category}</div>
            <h1 className="ff-product-title">{product.name}</h1>
          </div>
          <div className="ff-research-actions">
            <button
              type="button"
              className="ff-btn ff-btn-secondary ff-btn-sm"
              onClick={() => onToggleSave(product.id)}
            >
              {isSaved ? '★ Saved to Workspace' : '☆ Save Research'}
            </button>
            <button
              type="button"
              className="ff-btn ff-btn-primary ff-btn-sm"
              onClick={() => {
                if (onLaunchExplorerWithEntry && activeEntry) {
                  onLaunchExplorerWithEntry(activeEntry.id);
                } else {
                  onNavigate('explorer');
                }
              }}
            >
              Explore in Solution Explorer →
            </button>
            <button
              type="button"
              className="ff-btn ff-btn-subtle ff-btn-sm"
              onClick={() => onNavigate('studio')}
            >
              Redesign in Studio ↗
            </button>
          </div>
        </div>
        <p className="ff-product-overview">{product.overview}</p>
      </header>

      {/* Tabs */}
      <nav className="ff-tabs" aria-label="Research Tabs">
        <button
          type="button"
          className={`ff-tab-btn ${activeTab === 'evolution' ? 'active' : ''}`}
          onClick={() => setActiveTab('evolution')}
        >
          Evolution Timeline ({timelineEntries.length})
        </button>
        <button
          type="button"
          className={`ff-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          Material Taxonomy ({product.materials?.length || 0})
        </button>
        <button
          type="button"
          className={`ff-tab-btn ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          Design Solutions ({product.designSolutions?.length || 0})
        </button>
        <button
          type="button"
          className={`ff-tab-btn ${activeTab === 'limitations' ? 'active' : ''}`}
          onClick={() => setActiveTab('limitations')}
        >
          Current Limitations ({product.limitations?.length || 0})
        </button>
      </nav>

      {/* TAB 1: EVOLUTION TIMELINE & ENTRY DETAIL */}
      {activeTab === 'evolution' && (
        <section className="ff-timeline-layout" aria-label="Evolution Timeline">
          {/* Left Selection Rail */}
          <div className="ff-timeline-rail">
            <div className="ff-section-label" style={{ marginBottom: '8px' }}>
              Historical Eras
            </div>
            {timelineEntries.map((entry) => {
              const isSelected = activeEntry && activeEntry.id === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`ff-timeline-entry-card ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelectEntry(entry.id)}
                  aria-pressed={isSelected}
                >
                  <div className="ff-entry-era-row">
                    <span className="ff-entry-period">{entry.period.label}</span>
                    {getStatusBadge(entry.period.status)}
                  </div>
                  <h3 className="ff-entry-title">{entry.title}</h3>
                  <p className="ff-entry-preview">{entry.development}</p>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          {activeEntry && (
            <div className="ff-detail-panel">
              <div className="ff-detail-header">
                <div className="ff-detail-meta-row">
                  <span className="ff-entry-period" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                    Era: {activeEntry.period.label}
                  </span>
                  {getStatusBadge(activeEntry.period.status)}
                </div>
                <h2 className="ff-detail-title">{activeEntry.title}</h2>
                <p className="ff-detail-development">{activeEntry.development}</p>
              </div>

              <div className="ff-detail-grid">
                {/* Materials & Characteristics */}
                <div className="ff-detail-section">
                  <div className="ff-section-label">Materials & Characteristics</div>
                  <p className="ff-section-text">{activeEntry.materialsAndCharacteristics}</p>
                </div>

                {/* Problem Addressed */}
                <div className="ff-detail-section">
                  <div className="ff-section-label">Problem Addressed</div>
                  <p className="ff-section-text">{activeEntry.problemAddressed}</p>
                </div>

                {/* Solution Introduced */}
                <div className="ff-detail-section">
                  <div className="ff-section-label">Solution Introduced</div>
                  <p className="ff-section-text">{activeEntry.solutionIntroduced}</p>
                </div>

                {/* Advantages vs Limitations (Two Columns) */}
                <div className="ff-two-col">
                  <div className="ff-pro-box">
                    <div className="ff-section-label" style={{ color: 'var(--status-verified-text)', marginBottom: '4px' }}>
                      Demonstrated Advantages
                    </div>
                    <p className="ff-section-text" style={{ fontSize: '0.8125rem' }}>
                      {activeEntry.advantages}
                    </p>
                  </div>

                  <div className="ff-con-box">
                    <div className="ff-section-label" style={{ color: 'var(--status-unverified-text)', marginBottom: '4px' }}>
                      Recorded Limitations
                    </div>
                    <p className="ff-section-text" style={{ fontSize: '0.8125rem' }}>
                      {activeEntry.limitations}
                    </p>
                  </div>
                </div>

                {/* Sources Section - Must show cautious wording & no fake citations */}
                <div className="ff-detail-section">
                  <div className="ff-section-label">Verified Historical Sources</div>
                  <div className="ff-sources-box">
                    {activeEntry.sources && activeEntry.sources.length > 0 ? (
                      <ul>
                        {activeEntry.sources.map((s, idx) => (
                          <li key={idx}>
                            <a href={s.url} target="_blank" rel="noreferrer">
                              {s.title}
                            </a>{' '}
                            - {s.note}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No verified sources added yet.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detail Panel Actions */}
              <div className="ff-detail-actions">
                <button
                  type="button"
                  className="ff-btn ff-btn-primary"
                  onClick={() => {
                    if (onLaunchExplorerWithEntry) {
                      onLaunchExplorerWithEntry(activeEntry.id);
                    } else {
                      onNavigate('explorer');
                    }
                  }}
                >
                  Analyze "{activeEntry.title}" in Solution Explorer →
                </button>
                <button
                  type="button"
                  className="ff-btn ff-btn-secondary"
                  onClick={() => onNavigate('timeline')}
                >
                  Expand Fullscreen Timeline
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 2: MATERIALS TAXONOMY */}
      {activeTab === 'materials' && (
        <section aria-label="Materials Taxonomy">
          <div className="ff-section-heading">
            <div>
              <h2 className="ff-section-title">Evolution of Vessel Materials</h2>
              <p className="ff-section-subtitle">Progression of containment polymers, ceramics, and alloys</p>
            </div>
          </div>

          <div className="ff-cards-grid">
            {product.materials.map((mat, idx) => (
              <div key={idx} className="ff-info-card">
                <div className="ff-info-card-header">
                  <div className="ff-info-card-era">{mat.era}</div>
                  <h3 className="ff-info-card-title">{mat.name}</h3>
                </div>
                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>Characteristics</div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '2px' }}>{mat.characteristics}</p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--status-verified-text)', fontWeight: 600 }}>
                    Advantage:
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{mat.advantages}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--status-unverified-text)', fontWeight: 600, marginTop: '4px' }}>
                    Limitation:
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{mat.limitations}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: DESIGN SOLUTIONS */}
      {activeTab === 'solutions' && (
        <section aria-label="Design Solutions">
          <div className="ff-section-heading">
            <div>
              <h2 className="ff-section-title">Engineering & Ergonomic Breakthroughs</h2>
              <p className="ff-section-subtitle">Mechanical solutions developed to resolve fluid containment hurdles</p>
            </div>
          </div>

          <div className="ff-cards-grid">
            {product.designSolutions.map((sol, idx) => (
              <div key={idx} className="ff-info-card">
                <div className="ff-info-card-header">
                  <span className="ff-badge ff-badge-sample">Mechanical Solution</span>
                  <h3 className="ff-info-card-title" style={{ marginTop: '6px' }}>{sol.title}</h3>
                </div>
                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>Core Challenge</div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '2px' }}>{sol.problem}</p>
                </div>
                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>Implemented Solution</div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '2px' }}>{sol.solution}</p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-orange)' }}>
                    Design Impact:
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sol.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: LIMITATIONS & REDESIGN OPPORTUNITIES */}
      {activeTab === 'limitations' && (
        <section aria-label="Product Limitations">
          <div className="ff-section-heading">
            <div>
              <h2 className="ff-section-title">Contemporary Design Limitations</h2>
              <p className="ff-section-subtitle">Unresolved usability, manufacturing, and lifecycle pain points</p>
            </div>
          </div>

          <div className="ff-cards-grid" style={{ marginBottom: 'var(--space-2xl)' }}>
            {product.limitations.map((lim, idx) => (
              <div key={idx} className="ff-info-card" style={{ borderLeft: '3px solid var(--status-unverified-text)' }}>
                <div className="ff-info-card-header">
                  <h3 className="ff-info-card-title">{lim.area}</h3>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.55' }}>{lim.description}</p>
              </div>
            ))}
          </div>

          {/* Redesign Opportunities Bridge */}
          <div className="ff-featured-card" style={{ backgroundColor: 'var(--bg-surface-subtle)' }}>
            <div className="ff-section-heading">
              <div>
                <h3 className="ff-section-title">Identified Redesign Vectors</h3>
                <p className="ff-section-subtitle">Actionable starting points for the Redesign Studio</p>
              </div>
              <button
                type="button"
                className="ff-btn ff-btn-primary"
                onClick={() => onNavigate('studio')}
              >
                Synthesize in Redesign Studio →
              </button>
            </div>

            <div className="ff-cards-grid">
              {product.redesignOpportunities.map((opp, idx) => (
                <div key={idx} className="ff-info-card">
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-orange)' }}>
                    {opp.opportunity}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{opp.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
