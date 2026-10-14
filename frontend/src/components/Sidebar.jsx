import React from 'react';

/**
 * Sidebar navigation component
 *
 * @param {Object} props
 * @param {string} props.currentView - Active view key
 * @param {Function} props.onNavigate - Navigation callback
 * @param {boolean} props.isOpen - Mobile open state
 * @param {Function} props.onClose - Mobile close callback
 * @param {number} props.savedCount - Number of saved research items
 */
export default function Sidebar({
  currentView,
  onNavigate,
  isOpen,
  onClose,
  savedCount = 0
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      id: 'research',
      label: 'Product Research',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    },
    {
      id: 'timeline',
      label: 'Evolution Timeline',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <line x1="12" y1="2" x2="12" y2="22" />
          <circle cx="12" cy="6" r="3" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="18" r="3" />
        </svg>
      )
    },
    {
      id: 'explorer',
      label: 'Design Solution Explorer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      )
    },
    {
      id: 'studio',
      label: 'Redesign Studio',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    },
    {
      id: 'saved',
      label: 'Saved Research',
      badge: savedCount > 0 ? savedCount : null,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ff-nav-icon">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )
    }
  ];

  return (
    <aside className={`ff-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="ff-sidebar-header">
        <a
          href="#dashboard"
          className="ff-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('dashboard');
            onClose();
          }}
        >
          <div className="ff-brand-icon">F</div>
          <div>
            <div className="ff-brand-title">FormForge AI</div>
            <span className="ff-brand-sub">Design Research Lab</span>
          </div>
        </a>

        <div className="ff-tagline-box">
          Explore the past. Discover better solutions. Design the future.
        </div>
      </div>

      <nav className="ff-sidebar-nav" aria-label="Main Navigation">
        <div className="ff-nav-section-label">Workspace</div>
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`ff-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="ff-nav-item-left">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== null && item.badge !== undefined && (
                <span className="ff-nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="ff-sidebar-footer">
        <div className="ff-footer-status">
          <span className="ff-status-dot" aria-hidden="true"></span>
          <span>Demo Mode (Local)</span>
        </div>
        <div>v0.9.4 • Academic & Studio Edition</div>
      </div>
    </aside>
  );
}
