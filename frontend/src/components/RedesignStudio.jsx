import React, { useState } from 'react';
import { generateBrief } from '../api/client';

/**
 * Redesign Studio View
 *
 * @param {Object} props
 * @param {Object} props.product - Active product
 * @param {Function} props.onNavigate - Navigation handler
 */
export default function RedesignStudio({ product, onNavigate }) {
  // Form State
  const [productName, setProductName] = useState(product?.name || 'Portable Water Bottle');
  const [inspiration, setInspiration] = useState('Bauhaus Functionalism & Aerospace Metallurgy');
  const [targetUsers, setTargetUsers] = useState('Urban Commuters & Studio Designers');
  const [selectedMaterials, setSelectedMaterials] = useState([
    '18/8 Austenitic Stainless Steel',
    'Platinum-Cured Food-Grade Silicone'
  ]);
  const [colourSelection, setColourSelection] = useState('Raw Brushed Titanium & Burnt Umber');
  const [functionalRequirements, setFunctionalRequirements] = useState(
    'Leak-proof 360-degree drink cap with modular tool-free disassembly and internal volume graduations'
  );
  const [designConstraints, setDesignConstraints] = useState(
    'Must be 100% dishwasher safe with zero inaccessible crevice geometry, under 320g tare weight'
  );

  const [formErrors, setFormErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [brief, setBrief] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Curated industrial materials options
  const materialOptions = [
    '18/8 Austenitic Stainless Steel',
    '316L Marine-Grade Stainless Steel',
    'Platinum-Cured Food-Grade Silicone',
    'Anodized Aerospace Aluminum 6061',
    'Bio-based Polyhydroxyalkanoate (PHA)',
    'High-Density Borosilicate Glass',
    'Recycled Polypropylene (Ocean Bound)',
    'Agglomerated Natural Cork Compound'
  ];

  // Curated industrial colour palettes
  const colourOptions = [
    'Raw Brushed Titanium & Burnt Umber',
    'Matte Charcoal & Signal Orange',
    'Bone White & Anodized Olive',
    'Deep Navy & Sandblasted Steel',
    'Warm Basalt & Raw Copper'
  ];

  const handleToggleMaterial = (mat) => {
    if (selectedMaterials.includes(mat)) {
      if (selectedMaterials.length > 1) {
        setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
      }
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const validate = () => {
    const errors = {};
    if (!productName.trim()) errors.productName = 'Product name is required';
    if (!inspiration.trim()) errors.inspiration = 'Design inspiration is required';
    if (!targetUsers.trim()) errors.targetUsers = 'Target user specification is required';
    if (!selectedMaterials.length) errors.materials = 'Select at least one material system';
    if (!functionalRequirements.trim()) errors.functionalRequirements = 'Functional requirements are required';
    if (!designConstraints.trim()) errors.designConstraints = 'Design constraints are required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    setBrief(null);

    try {
      const generated = await generateBrief({
        productName,
        inspiration,
        targetUsers,
        materials: selectedMaterials,
        colourScheme: colourSelection,
        functionalRequirements,
        designConstraints
      });
      setBrief(generated);
    } catch {
      setFormErrors({ general: 'Failed to generate design brief. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyBrief = () => {
    if (!brief) return;
    const text = `FORMFORGE AI - INDUSTRIAL REDESIGN BRIEF
Concept: ${brief.concept}
Rationale: ${brief.rationale}

Main Features:
${brief.mainFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Proposed Materials:
${brief.materials.map((m) => `• ${m.name}: ${m.reason}`).join('\n')}

Expected Benefits:
${brief.expectedBenefits.map((b) => `+ ${b}`).join('\n')}

Potential Disadvantages:
${brief.potentialDisadvantages.map((d) => `- ${d}`).join('\n')}

Manufacturing Considerations:
${brief.manufacturingConsiderations}

Further Research Questions:
${brief.furtherResearchQuestions.map((q, i) => `Q${i + 1}: ${q}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="ff-view-container">
      {/* Caution Notice */}
      <div className="ff-notice-banner" role="alert">
        <div className="ff-notice-content">
          <span className="ff-notice-tag">Redesign Studio</span>
          <span>
            <strong>Illustrative Synthesis.</strong> The generated design brief is an illustrative conceptual document for design workshops and studio critique, not an engineering-validated specification.
          </span>
        </div>
      </div>

      <header className="ff-dash-header">
        <div className="ff-dash-kicker">Conceptual Redesign Architecture</div>
        <h1 className="ff-dash-title">Generate Grounded Concept Briefs</h1>
        <p className="ff-dash-desc">
          Transform historical precedents, material strengths, and user frustrations into actionable industrial design briefs.
          Define your aesthetic language, material parameters, and functional boundaries.
        </p>
      </header>

      <div className="ff-studio-layout">
        {/* Left Column: Form */}
        <section className="ff-studio-form-card" aria-label="Redesign Form">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
            Design Parameters
          </h2>

          <form onSubmit={handleSubmit}>
            {formErrors.general && (
              <div style={{ color: 'var(--status-unverified-text)', fontSize: '0.8125rem', marginBottom: '12px' }}>
                {formErrors.general}
              </div>
            )}

            {/* Product Name */}
            <div className="ff-form-group">
              <label htmlFor="productName" className="ff-form-label">
                Product Taxonomy Target *
              </label>
              <input
                id="productName"
                type="text"
                className="ff-text-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Portable Water Bottle"
              />
              {formErrors.productName && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.productName}
                </div>
              )}
            </div>

            {/* Design Inspiration */}
            <div className="ff-form-group">
              <label htmlFor="inspiration" className="ff-form-label">
                Design Inspiration & Movement *
              </label>
              <input
                id="inspiration"
                type="text"
                className="ff-text-input"
                value={inspiration}
                onChange={(e) => setInspiration(e.target.value)}
                placeholder="e.g. Bauhaus Functionalism & Aerospace Metallurgy"
              />
              {formErrors.inspiration && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.inspiration}
                </div>
              )}
            </div>

            {/* Target Users */}
            <div className="ff-form-group">
              <label htmlFor="targetUsers" className="ff-form-label">
                Target User Archetype *
              </label>
              <input
                id="targetUsers"
                type="text"
                className="ff-text-input"
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
                placeholder="e.g. Urban Commuters & Studio Designers"
              />
              {formErrors.targetUsers && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.targetUsers}
                </div>
              )}
            </div>

            {/* Material Selection Pills */}
            <div className="ff-form-group">
              <label className="ff-form-label">
                Material Systems (Select 1 or more) *
              </label>
              <div className="ff-pills-wrap">
                {materialOptions.map((mat) => {
                  const isChecked = selectedMaterials.includes(mat);
                  return (
                    <button
                      key={mat}
                      type="button"
                      className={`ff-pill-checkbox ${isChecked ? 'checked' : ''}`}
                      onClick={() => handleToggleMaterial(mat)}
                    >
                      <span>{isChecked ? '✓' : '+'}</span>
                      <span>{mat}</span>
                    </button>
                  );
                })}
              </div>
              {formErrors.materials && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.materials}
                </div>
              )}
            </div>

            {/* Colour Selection */}
            <div className="ff-form-group">
              <label htmlFor="colourScheme" className="ff-form-label">
                Colourway & CMF Palette
              </label>
              <select
                id="colourScheme"
                className="ff-select"
                value={colourSelection}
                onChange={(e) => setColourSelection(e.target.value)}
              >
                {colourOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Functional Requirements */}
            <div className="ff-form-group">
              <label htmlFor="functionalRequirements" className="ff-form-label">
                Functional Requirements *
              </label>
              <textarea
                id="functionalRequirements"
                className="ff-textarea"
                rows="3"
                value={functionalRequirements}
                onChange={(e) => setFunctionalRequirements(e.target.value)}
                placeholder="Specific functional capabilities (e.g. 360-degree drink cap, one-handed lock, drop resistance)"
              />
              {formErrors.functionalRequirements && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.functionalRequirements}
                </div>
              )}
            </div>

            {/* Design Constraints */}
            <div className="ff-form-group">
              <label htmlFor="designConstraints" className="ff-form-label">
                Design & Manufacturing Constraints *
              </label>
              <textarea
                id="designConstraints"
                className="ff-textarea"
                rows="3"
                value={designConstraints}
                onChange={(e) => setDesignConstraints(e.target.value)}
                placeholder="Limitations to respect (e.g. 100% dishwasher safe, weight threshold, monomaterial recycling)"
              />
              {formErrors.designConstraints && (
                <div className="ff-form-hint" style={{ color: 'var(--accent-orange)' }}>
                  {formErrors.designConstraints}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="ff-btn ff-btn-primary ff-btn-lg"
              style={{ width: '100%', marginTop: 'var(--space-sm)' }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="ff-loading-dots">
                    <span className="ff-loading-dot"></span>
                    <span className="ff-loading-dot"></span>
                    <span className="ff-loading-dot"></span>
                  </div>
                  <span>Synthesizing Design Brief...</span>
                </>
              ) : (
                'Create design brief →'
              )}
            </button>
          </form>
        </section>

        {/* Right Column: Brief Output or Instructions */}
        <section aria-label="Generated Design Brief">
          {brief ? (
            <div className="ff-brief-panel">
              {/* Header */}
              <div className="ff-brief-header">
                <div>
                  <div className="ff-brief-kicker">Industrial Redesign Brief • Demo Output</div>
                  <h2 className="ff-brief-concept-title">{brief.concept}</h2>
                  <div style={{ marginTop: '6px' }}>
                    <span className="ff-badge ff-badge-sample">Illustrative Demo Brief</span>
                    <span className="ff-badge ff-badge-neutral" style={{ marginLeft: '6px' }}>
                      Not engineering-validated
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="ff-btn ff-btn-secondary ff-btn-sm"
                    onClick={handleCopyBrief}
                  >
                    {copyFeedback ? '✓ Copied' : 'Copy Brief'}
                  </button>
                  <button
                    type="button"
                    className="ff-btn ff-btn-subtle ff-btn-sm"
                    onClick={() => setBrief(null)}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* 1. Concept & 2. Rationale */}
              <div className="ff-brief-section">
                <div className="ff-brief-sec-title">1. Architectural Rationale</div>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  {brief.rationale}
                </p>
              </div>

              {/* 3. Main Features */}
              <div className="ff-brief-section">
                <div className="ff-brief-sec-title">2. Main Industrial Features</div>
                <ul className="ff-bullet-list">
                  {brief.mainFeatures.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* 4. Proposed Materials & Reasons */}
              <div className="ff-brief-section">
                <div className="ff-brief-sec-title">3. Proposed Materials & Technical Reasons</div>
                {brief.materials.map((mat, idx) => (
                  <div key={idx} className="ff-brief-mat-item">
                    <div className="ff-brief-mat-name">{mat.name}</div>
                    <div className="ff-brief-mat-reason">{mat.reason}</div>
                  </div>
                ))}
              </div>

              {/* 5. Benefits & 6. Disadvantages (Two Column) */}
              <div className="ff-two-col" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="ff-pro-box">
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-verified-text)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    4. Expected Design Benefits
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8125rem' }}>
                    {brief.expectedBenefits.map((ben, idx) => (
                      <li key={idx}>+ {ben}</li>
                    ))}
                  </ul>
                </div>

                <div className="ff-con-box">
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-unverified-text)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    5. Potential Disadvantages
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8125rem' }}>
                    {brief.potentialDisadvantages.map((dis, idx) => (
                      <li key={idx}>- {dis}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 7. Manufacturing Considerations */}
              <div className="ff-brief-section">
                <div className="ff-brief-sec-title">6. Manufacturing Considerations</div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  {brief.manufacturingConsiderations}
                </p>
              </div>

              {/* 8. Further Research Questions */}
              <div className="ff-brief-section">
                <div className="ff-brief-sec-title">7. Critical Research & Validation Questions</div>
                <ul className="ff-bullet-list">
                  {brief.furtherResearchQuestions.map((q, idx) => (
                    <li key={idx}>
                      <strong>Question {idx + 1}:</strong> {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concept Sketch Placeholder - Required by Prompt */}
              <div className="ff-sketch-placeholder-card">
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>
                  Generative Concept Sketching
                </div>
                <div className="ff-sketch-placeholder-text">
                  Not available in this version.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  CAD model wireframing and generative CMF sketches are scheduled for Version 2.0.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
                <button
                  type="button"
                  className="ff-btn ff-btn-primary"
                  onClick={() => onNavigate('explorer')}
                >
                  Discuss Brief in Solution Explorer →
                </button>
              </div>
            </div>
          ) : (
            <div className="ff-empty-state" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ff-empty-icon"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <h3 className="ff-empty-title">Ready to Synthesize Brief</h3>
              <p className="ff-empty-desc">
                Fill in the design inspiration, target users, and functional criteria on the left, then click
                <strong> "Create design brief"</strong> to generate a structured 8-part industrial design specification.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
