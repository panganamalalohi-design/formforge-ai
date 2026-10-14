import React from 'react';

/**
 * Saved Research View
 *
 * @param {Object} props
 * @param {Array} props.products - Full list of products
 * @param {Array} props.savedProductIds - IDs of saved products
 * @param {Function} props.onRemoveSaved - Remove callback
 * @param {Function} props.onSelectProduct - Select callback
 * @param {Function} props.onNavigate - Navigation callback
 */
export default function SavedResearch({
  products,
  savedProductIds = [],
  onRemoveSaved,
  onSelectProduct,
  onNavigate
}) {
  const savedProducts = products.filter((p) => savedProductIds.includes(p.id));

  return (
    <div className="ff-view-container">
      <header className="ff-dash-header">
        <div className="ff-dash-kicker">Saved Dossiers</div>
        <h1 className="ff-dash-title">Bookmarked Research Projects</h1>
        <p className="ff-dash-desc">
          Your curated collection of active product research dossiers and historical timeline explorations.
          Stored locally in your browser workspace.
        </p>
      </header>

      {savedProducts.length > 0 ? (
        <div className="ff-saved-grid">
          {savedProducts.map((prod) => (
            <article key={prod.id} className="ff-saved-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="ff-card-category">{prod.category}</span>
                  {prod.isSample ? (
                    <span className="ff-badge ff-badge-sample">Sample Dataset</span>
                  ) : (
                    <span className="ff-badge ff-badge-neutral">Draft</span>
                  )}
                </div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
                  {prod.name}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {prod.overview}
                </p>

                <div className="ff-tag-list" style={{ marginTop: '12px' }}>
                  {prod.tags &&
                    prod.tags.map((t) => (
                      <span key={t} className="ff-tag">
                        {t}
                      </span>
                    ))}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-md)',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: 'var(--space-sm)'
                }}
              >
                <button
                  type="button"
                  className="ff-btn ff-btn-primary ff-btn-sm"
                  onClick={() => {
                    onSelectProduct(prod.id);
                    onNavigate('research');
                  }}
                >
                  Open Research Dossier →
                </button>
                <button
                  type="button"
                  className="ff-btn ff-btn-subtle ff-btn-sm"
                  style={{ color: 'var(--status-unverified-text)' }}
                  onClick={() => onRemoveSaved(prod.id)}
                  aria-label={`Remove ${prod.name} from saved`}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
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
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h2 className="ff-empty-title">No Saved Products Yet</h2>
          <p className="ff-empty-desc">
            You haven't bookmarked any product research yet. You can save products from the Dashboard
            or while reviewing the Product Research dossier to access them quickly here.
          </p>
          <button
            type="button"
            className="ff-btn ff-btn-primary"
            onClick={() => onNavigate('dashboard')}
          >
            Browse Products on Dashboard →
          </button>
        </div>
      )}
    </div>
  );
}
