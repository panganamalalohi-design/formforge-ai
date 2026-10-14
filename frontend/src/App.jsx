import React, { useState, useEffect } from 'react';
import { getProducts, getProductById } from './data/products';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductResearch from './components/ProductResearch';
import EvolutionTimeline from './components/EvolutionTimeline';
import SolutionExplorer from './components/SolutionExplorer';
import RedesignStudio from './components/RedesignStudio';
import SavedResearch from './components/SavedResearch';

const STORAGE_KEY = 'formforge_saved_products';

function loadSavedProductIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
  }
  // Safe default: pre-bookmark the sample Water Bottle so user sees working persistence immediately
  return ['water-bottle'];
}

export default function App() {
  const products = getProducts();

  // Navigation & Product Selection State
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProductId, setSelectedProductId] = useState('water-bottle');
  const [selectedEntryId, setSelectedEntryId] = useState('wb-05');
  const [savedProductIds, setSavedProductIds] = useState(loadSavedProductIds);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [preloadExplorerQuestion, setPreloadExplorerQuestion] = useState('');

  // Persist savedProductIds safely to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProductIds));
    } catch (err) {
      console.warn('Error writing to localStorage:', err);
    }
  }, [savedProductIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleToggleSave = (productId) => {
    setSavedProductIds((prev) => {
      const isSaved = prev.includes(productId);
      const updated = isSaved ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(isSaved ? 'Removed from Saved Research' : 'Saved to Workspace');
      return updated;
    });
  };

  const handleRemoveSaved = (productId) => {
    setSavedProductIds((prev) => prev.filter((id) => id !== productId));
    showToast('Removed from Saved Research');
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    const prod = getProductById(productId);
    if (prod && prod.timeline && prod.timeline.length > 0) {
      setSelectedEntryId(prod.timeline[0].id);
    }
  };

  const handleLaunchExplorerWithEntry = (entryId) => {
    setSelectedEntryId(entryId);
    setCurrentView('explorer');
  };

  const currentProduct = getProductById(selectedProductId) || products[0];

  return (
    <div className="ff-layout">
      {/* Mobile Top App Bar */}
      <div className="ff-mobile-bar">
        <button
          type="button"
          className="ff-mobile-menu-btn"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          FormForge <span style={{ color: 'var(--accent-orange)' }}>AI</span>
        </div>

        <button
          type="button"
          className="ff-btn ff-btn-subtle ff-btn-sm"
          onClick={() => setCurrentView('saved')}
          aria-label="Saved research"
        >
          ★ {savedProductIds.length}
        </button>
      </div>

      {/* Main Responsive Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        savedCount={savedProductIds.length}
      />

      {/* Main Workspace Area */}
      <main className="ff-main">
        {currentView === 'dashboard' && (
          <Dashboard
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={setCurrentView}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentView === 'research' && (
          <ProductResearch
            product={currentProduct}
            selectedEntryId={selectedEntryId}
            onSelectEntry={setSelectedEntryId}
            onNavigate={setCurrentView}
            isSaved={savedProductIds.includes(currentProduct.id)}
            onToggleSave={handleToggleSave}
            onLaunchExplorerWithEntry={handleLaunchExplorerWithEntry}
          />
        )}

        {currentView === 'timeline' && (
          <EvolutionTimeline
            product={currentProduct}
            selectedEntryId={selectedEntryId}
            onSelectEntry={setSelectedEntryId}
            onNavigate={setCurrentView}
            onLaunchExplorerWithEntry={handleLaunchExplorerWithEntry}
          />
        )}

        {currentView === 'explorer' && (
          <SolutionExplorer
            product={currentProduct}
            selectedEntryId={selectedEntryId}
            onSelectEntry={setSelectedEntryId}
            preloadQuestion={preloadExplorerQuestion}
          />
        )}

        {currentView === 'studio' && (
          <RedesignStudio
            product={currentProduct}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'saved' && (
          <SavedResearch
            products={products}
            savedProductIds={savedProductIds}
            onRemoveSaved={handleRemoveSaved}
            onSelectProduct={handleSelectProduct}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Ephemeral Toast Notification */}
      {toastMessage && (
        <div className="ff-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
