import React from 'react';

/**
 * Dedicated Evolution Timeline View
 *
 * @param {Object} props
 * @param {Object} props.product - Current product
 * @param {string} props.selectedEntryId - Selected entry ID
 * @param {Function} props.onSelectEntry - Selection handler
 * @param {Function} props.onNavigate - Navigation handler
 * @param {Function} props.onLaunchExplorerWithEntry - Explorer launch handler
 */
export default function EvolutionTimeline({
  product,
  selectedEntryId,
  onSelectEntry,
  onNavigate,
  onLaunchExplorerWithEntry
}) {
  if (!product || !product.isSample) {
    return (
      <div className="ff-view-container">
        <div className="ff-empty-state">
          <h2 className="ff-empty-title">No Timeline Data Loaded</h2>
          <p className="ff-empty-desc">
            Historical evolution timelines are currently compiled for the Portable Water Bottle.
          </p>
          <button
            type="button"
            className="ff-btn ff-btn-primary"
            onClick={() => onNavigate('dashboard')}
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  const entries = product.timeline || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="ff-badge ff-badge-verified">Verified</span>;
      case 'approximate':
        return <span className="ff-badge ff-badge-approximate">Approximate</span>;
      default:
        return <span className="ff-badge ff-badge-unverified">Unverified</span>;
    }
  };

  return (
    <div className="ff-view-container">
      {/* Notice */}
      <div className="ff-notice-banner" role="alert">
        <div className="ff-notice-content">
          <span className="ff-notice-tag">Sample Data</span>
          <span>
            <strong>SAMPLE DATA - verify before citing.</strong> Chronological markers indicate evolutionary milestones in containment mechanics.
          </span>
        </div>
        <button
          type="button"
          className="ff-btn ff-btn-subtle ff-btn-sm"
          onClick={() => onNavigate('research')}
        >
          View Research Dossier →
        </button>
      </div>

      <header className="ff-dash-header">
        <div className="ff-dash-kicker">Chronological Milestone Analysis</div>
        <h1 className="ff-dash-title">{product.name}: Evolution Timeline</h1>
        <p className="ff-dash-desc">
          Follow the trajectory of materials, sealing mechanisms, and manufacturing tolerances from pre-industrial
          gourds and military field canteens to double-wall vacuum stainless vessels.
        </p>
      </header>

      {/* Chronological Rail Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', position: 'relative' }}>
        {entries.map((entry, index) => {
          const isSelected = selectedEntryId === entry.id;
          return (
            <article
              key={entry.id}
              className={`ff-featured-card ${isSelected ? 'active' : ''}`}
              style={{
                borderLeftWidth: isSelected ? '6px' : '4px',
                borderColor: isSelected ? 'var(--accent-orange)' : 'var(--border-medium)',
                boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-card)'
              }}
            >
              <div className="ff-card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--accent-orange)'
                      }}
                    >
                      Milestone 0{index + 1}
                    </span>
                    <span className="ff-entry-period">{entry.period.label}</span>
                    {getStatusBadge(entry.period.status)}
                  </div>
                  <h2 className="ff-card-title" style={{ fontSize: '1.35rem' }}>{entry.title}</h2>
                  <p className="ff-card-desc">{entry.development}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    type="button"
                    className="ff-btn ff-btn-secondary ff-btn-sm"
                    onClick={() => {
                      onSelectEntry(entry.id);
                      if (onLaunchExplorerWithEntry) {
                        onLaunchExplorerWithEntry(entry.id);
                      } else {
                        onNavigate('explorer');
                      }
                    }}
                  >
                    Explore in Explorer ↗
                  </button>
                </div>
              </div>

              {/* Grid of Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-md)',
                  paddingTop: 'var(--space-md)',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>
                    Materials & Architecture
                  </div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '4px' }}>
                    {entry.materialsAndCharacteristics}
                  </p>
                </div>

                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>
                    Problem Addressed
                  </div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '4px' }}>
                    {entry.problemAddressed}
                  </p>
                </div>

                <div>
                  <div className="ff-section-label" style={{ fontSize: '0.6875rem' }}>
                    Solution Introduced
                  </div>
                  <p style={{ fontSize: '0.8125rem', marginTop: '4px' }}>
                    {entry.solutionIntroduced}
                  </p>
                </div>
              </div>

              {/* Advantages vs Limitations pills */}
              <div className="ff-two-col" style={{ marginTop: 'var(--space-xs)' }}>
                <div className="ff-pro-box" style={{ padding: '8px 12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-verified-text)' }}>
                    Advantages:
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {entry.advantages}
                  </p>
                </div>
                <div className="ff-con-box" style={{ padding: '8px 12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-unverified-text)' }}>
                    Limitations:
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {entry.limitations}
                  </p>
                </div>
              </div>

              {/* Verified Sources note */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Verified Sources: No verified sources added yet.
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
