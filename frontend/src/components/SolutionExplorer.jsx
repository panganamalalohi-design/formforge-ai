import React, { useState, useEffect, useRef } from 'react';
import { askExplorer } from '../api/client';

/**
 * Design Solution Explorer Component
 *
 * @param {Object} props
 * @param {Object} props.product - Active product
 * @param {string} props.selectedEntryId - Current timeline entry ID
 * @param {Function} props.onSelectEntry - Entry change handler
 * @param {string} [props.preloadQuestion] - Optional initial question passed from another view
 */
export default function SolutionExplorer({
  product,
  selectedEntryId,
  onSelectEntry,
  preloadQuestion = ''
}) {
  const timelineEntries = product?.timeline || [];
  const currentEntry =
    timelineEntries.find((e) => e.id === selectedEntryId) || timelineEntries[0] || null;

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'agent',
      entryTitle: currentEntry?.title || 'Selected Product Milestone',
      periodLabel: currentEntry?.period?.label || 'Historical Era',
      text: `Welcome to the Design Solution Explorer. You are analyzing the "${currentEntry?.title || 'Product'}" (${currentEntry?.period?.label || 'Era'}). Ask technical questions regarding material selection, sealing mechanics, ergonomics, or explore potential redesign alternatives.`,
      documentedFacts: [
        `Historical Milestone: ${currentEntry?.title || 'Hydration Vessel Milestone'}.`,
        `Material System: ${currentEntry?.materialsAndCharacteristics || 'Specified manufacturing materials'}.`,
        `Functional Solution: ${currentEntry?.solutionIntroduced || 'Historical mechanical resolution'}.`
      ],
      aiSuggestions: [
        "Inquire about specific physical failure modes or manufacturing limitations of this era.",
        "Ask how this design decision translates to modern sustainable circular manufacturing.",
        "Probe into the hygienic trade-offs between thread tolerances and microbial growth."
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const streamEndRef = useRef(null);

  // Auto scroll to bottom of stream
  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle preloaded question if triggered from research view
  useEffect(() => {
    if (preloadQuestion && !loading) {
      handleAskQuestion(preloadQuestion);
    }
  }, [preloadQuestion]);

  const exampleQuestions = [
    "Why might this material be used?",
    "What problem does this design solve?",
    "What are its limitations?",
    "What alternatives could be explored?"
  ];

  const handleAskQuestion = async (qText) => {
    const q = (qText || question).trim();
    if (!q || loading) return;

    const userMsgId = `usr-${Date.now()}`;
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: q,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setQuestion('');
    setLoading(true);

    try {
      const response = await askExplorer({
        product,
        entry: currentEntry,
        question: q
      });

      setMessages([
        ...newMessages,
        {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          entryTitle: currentEntry?.title,
          periodLabel: currentEntry?.period?.label,
          text: response.answer,
          documentedFacts: response.documentedFacts,
          aiSuggestions: response.aiSuggestions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: `err-${Date.now()}`,
          sender: 'agent',
          text: "An error occurred while synthesizing the demo response. Please try asking again.",
          documentedFacts: [],
          aiSuggestions: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAskQuestion(question);
  };

  return (
    <div className="ff-view-container" style={{ paddingBottom: 'var(--space-xl)' }}>
      {/* Sample Data Caution Notice */}
      <div className="ff-notice-banner" role="alert">
        <div className="ff-notice-content">
          <span className="ff-notice-tag">Demo Explorer</span>
          <span>
            <strong>Simulated Exploration.</strong> Technical inquiries are answered using local design synthesis rules. Responses distinguish between documented engineering facts and exploratory AI suggestions.
          </span>
        </div>
      </div>

      <header className="ff-dash-header" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="ff-dash-kicker">Design Solution Explorer</div>
        <h1 className="ff-dash-title" style={{ fontSize: '2rem' }}>
          Interrogate Design Decisions
        </h1>
      </header>

      {/* Explorer Workspace Card */}
      <div className="ff-explorer-container">
        {/* Top Context Selector Bar */}
        <div className="ff-explorer-top">
          <div className="ff-context-selector">
            <span className="ff-context-label">Active Milestone Context:</span>
            <select
              className="ff-select-input"
              value={currentEntry?.id || ''}
              onChange={(e) => onSelectEntry(e.target.value)}
              aria-label="Select timeline milestone context"
            >
              {timelineEntries.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.period.label} — {entry.title}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="ff-badge ff-badge-neutral">
              Product: {product?.name || 'Water Bottle'}
            </span>
            <span className="ff-demo-pill">Demo Mode</span>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="ff-chat-stream" role="log" aria-live="polite">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="ff-chat-bubble ff-chat-user">
                  <p>{msg.text}</p>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      opacity: 0.7,
                      alignSelf: 'flex-end'
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className="ff-chat-bubble ff-chat-agent">
                <div className="ff-agent-header">
                  <div className="ff-agent-meta">
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      FormForge Synthesis Engine
                    </span>
                    <span>•</span>
                    <span>{msg.entryTitle}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="ff-demo-pill">Demo response</span>
                    <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                <div className="ff-chat-answer">
                  <p>{msg.text}</p>
                </div>

                {/* Separate Visual Block: Documented Facts */}
                {msg.documentedFacts && msg.documentedFacts.length > 0 && (
                  <div className="ff-facts-box">
                    <div className="ff-facts-title">Documented Physical & Historical Facts</div>
                    <ul className="ff-facts-list">
                      {msg.documentedFacts.map((fact, idx) => (
                        <li key={idx}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Separate Visual Block: AI Suggestions & Design Opportunities */}
                {msg.aiSuggestions && msg.aiSuggestions.length > 0 && (
                  <div className="ff-ai-box">
                    <div className="ff-ai-title">AI Design Opportunities & Alternatives</div>
                    <ul className="ff-ai-list">
                      {msg.aiSuggestions.map((sug, idx) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="ff-chat-bubble ff-chat-agent" style={{ opacity: 0.85 }}>
              <div className="ff-chat-loading">
                <div className="ff-loading-dots">
                  <span className="ff-loading-dot"></span>
                  <span className="ff-loading-dot"></span>
                  <span className="ff-loading-dot"></span>
                </div>
                <span>Analyzing mechanical principles & historical documentation...</span>
              </div>
            </div>
          )}

          <div ref={streamEndRef} />
        </div>

        {/* Bottom Form & Example Chips */}
        <div className="ff-explorer-bottom">
          <div className="ff-chip-tray">
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', alignSelf: 'center' }}>
              Suggested Inquiries:
            </span>
            {exampleQuestions.map((qText, idx) => (
              <button
                key={idx}
                type="button"
                className="ff-q-chip"
                onClick={() => handleAskQuestion(qText)}
                disabled={loading}
              >
                {qText}
              </button>
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="ff-chat-form">
            <input
              type="text"
              className="ff-chat-input"
              placeholder="Ask an industrial design question about this milestone..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              aria-label="Ask question"
            />
            <button
              type="submit"
              className="ff-btn ff-btn-primary"
              disabled={!question.trim() || loading}
            >
              {loading ? 'Synthesizing...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
