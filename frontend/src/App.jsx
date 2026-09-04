import { useState } from 'react';
import { ICONS } from './data/icons';
import './App.css';

const EXAMPLES = [
  { label: 'In pain', ids: ['pain', 'head', 'doctor'] },
  { label: 'Need water', ids: ['water', 'tired'] },
  { label: 'Miss family', ids: ['miss_family', 'sad'] },
];

function App() {

  function IconGraphic({ icon }) {
  const commonProps = {
    viewBox: '0 0 48 48',
    className: 'icon-svg',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (icon.id) {
    // ───────────── Emotions ─────────────

    case 'happy':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="18" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="30" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <path d="M17 28c2 4 5 6 7 6s5-2 7-6" />
        </svg>
      );

    case 'sad':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="18" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="30" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <path d="M17 33c2-4 5-6 7-6s5 2 7 6" />
          <path d="M34 28c0 3-2 5-2 7" />
        </svg>
      );

    case 'scared':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="18" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="30" cy="21" r="1.5" fill="currentColor" stroke="none" />
          <ellipse cx="24" cy="31" rx="4" ry="5" />
          <path d="M17 16l3 2M31 18l-3-2" />
        </svg>
      );

    case 'want_cry':
      return (
        <svg {...commonProps}>
          <path d="M24 7C24 7 13 19 13 28a11 11 0 0 0 22 0C35 19 24 7 24 7Z" />
          <circle cx="20" cy="26" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="28" cy="26" r="1.5" fill="currentColor" stroke="none" />
          <path d="M19 32c2-2 8-2 10 0" />
        </svg>
      );

    case 'miss_family':
      return (
        <svg {...commonProps}>
          <path d="M24 36S9 27 9 17c0-5 4-8 8-8 3 0 6 2 7 5 1-3 4-5 7-5 4 0 8 3 8 8 0 10-15 19-15 19Z" />
          <circle cx="24" cy="21" r="3" />
          <path d="M18 31c1-4 3-6 6-6s5 2 6 6" />
        </svg>
      );

    // ───────────── Body ─────────────

    case 'pain':
      return (
        <svg {...commonProps}>
          <path d="M15 29c-3-3-4-7-2-11 2-4 7-6 11-5 4 1 7 4 8 8 1 4-1 8-4 11" />
          <path d="M28 13l3-4M34 17l5-1M33 24l5 2" />
          <path d="M18 27c2-2 5-2 7 0" />
        </svg>
      );

    case 'head':
      return (
        <svg {...commonProps}>
          <path d="M20 39v-5c-5-2-8-7-8-13 0-8 5-13 12-13s12 5 12 13c0 6-3 11-8 13v5" />
          <path d="M18 20c2-2 4-3 6-3M30 20c-2-2-4-3-6-3" />
          <circle cx="19" cy="24" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="29" cy="24" r="1.5" fill="currentColor" stroke="none" />
          <path d="M21 30c2 1 4 1 6 0" />
        </svg>
      );

    case 'chest':
      return (
        <svg {...commonProps}>
          <path d="M19 10c-3 2-6 6-7 12l3 3 3-3" />
          <path d="M29 10c3 2 6 6 7 12l-3 3-3-3" />
          <path d="M24 9v27" />
          <path d="M19 16c2 2 3 4 5 7M29 16c-2 2-3 4-5 7" />
        </svg>
      );

    case 'stomach':
      return (
        <svg {...commonProps}>
          <path d="M18 10v8c0 4 3 5 6 5s6 2 6 6c0 5-3 8-7 8-6 0-10-4-10-10V14" />
          <path d="M18 10c2 2 4 2 6 0" />
          <ellipse cx="24" cy="27" rx="6" ry="7" />
        </svg>
      );

    case 'tired':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="17" />
          <path d="M16 22c2 2 4 2 6 0M26 22c2 2 4 2 6 0" />
          <path d="M19 31c3-2 7-2 10 0" />
          <path d="M34 10h6l-5 7h5" />
        </svg>
      );

    // ───────────── Needs ─────────────

    case 'family':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="14" r="4" />
          <circle cx="14" cy="19" r="3" />
          <circle cx="34" cy="19" r="3" />
          <path d="M16 36c1-7 4-11 8-11s7 4 8 11" />
          <path d="M8 36c1-5 3-8 6-8 2 0 4 1 5 3M40 36c-1-5-3-8-6-8-2 0-4 1-5 3" />
        </svg>
      );

    case 'water':
      return (
        <svg {...commonProps}>
          <path d="M24 6S12 20 12 29a12 12 0 0 0 24 0C36 20 24 6 24 6Z" />
          <path d="M18 29c1 3 3 5 6 5" />
        </svg>
      );

    case 'bathroom':
      return (
        <svg {...commonProps}>
          <path d="M14 12h7v10h-5" />
          <path d="M21 22h13c0 7-5 12-12 12h-3c-3 0-5-2-5-5" />
          <path d="M21 12h7M28 12v5" />
        </svg>
      );

    case 'rest':
      return (
        <svg {...commonProps}>
          <path d="M9 29h30" />
          <path d="M11 29V20h8c3 0 5 2 5 5v4" />
          <path d="M24 29v-6h13c2 0 3 2 3 4v2" />
          <path d="M11 29v6M37 29v6" />
          <path d="M14 20v-4h8v4" />
        </svg>
      );

    case 'doctor':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="14" r="6" />
          <path d="M13 38c1-9 5-14 11-14s10 5 11 14" />
          <path d="M24 27v7M20.5 30.5h7" />
          <path d="M29 11h5v5" />
        </svg>
      );

    default:
      return (
        <span className="emoji" aria-hidden="true">
          {icon.emoji}
        </span>
      );
  }
}

  const [selected, setSelected] = useState([]); // ordered array of icon objects
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(true);
  const [error, setError] = useState('');

  const toggleIcon = (icon) => {
    setSelected(prev => {
      const exists = prev.some(i => i.id === icon.id);
      if (exists) return prev.filter(i => i.id !== icon.id);
      return [...prev, icon];
    });
  };

  const removeIcon = (id) => {
    setSelected(prev => prev.filter(i => i.id !== id));
  };

  const applyExample = (ids) => {
    setSentence('');
    setError('');
    setSelected(ids.map(id => ICONS.find(i => i.id === id)).filter(Boolean));
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const generate = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://echo-of-words-3qd9.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icons: selected.map(i => i.label) }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setSentence(data.sentence);
      if (autoRead) {
        speak(data.sentence);
      }
    } catch (err) {
      setError("Couldn't build the sentence.");
    }
    setLoading(false);
  };

  const categories = [...new Set(ICONS.map(i => i.category))];

  return (
    <div className="app">
      <header className="app-header">
        <div className="wordmark">
          <svg className="wordmark-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="9" width="3" height="6" rx="1.5" fill="currentColor" />
            <rect x="8" y="5" width="3" height="14" rx="1.5" fill="currentColor" />
            <rect x="14" y="2" width="3" height="20" rx="1.5" fill="currentColor" />
            <rect x="20" y="7" width="3" height="10" rx="1.5" fill="currentColor" />
          </svg>
          <h1>Silent Voice</h1>
        </div>
        <p className="tagline">
          Tap the icons that match what you want to say. We'll turn them into a sentence and speak it out loud.
        </p>
        <p className="impact-line">When words are hard, there's another way to speak.</p>
        <label className="switch-row">
          <span className="switch">
            <input
              type="checkbox"
              checked={autoRead}
              onChange={(e) => setAutoRead(e.target.checked)}
            />
            <span className="switch-track" aria-hidden="true"></span>
          </span>
          Read sentences aloud automatically
        </label>
      </header>

      <div className="examples">
        <p className="examples-label">Quick Start</p>
        <div className="examples-row">
          {EXAMPLES.map(ex => (
            <button key={ex.label} className="example-btn" onClick={() => applyExample(ex.ids)}>
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <section className="builder" aria-label="Sentence being built">
        {selected.length === 0 ? (
        <div className="builder-empty">
          <span className="builder-empty-icon">+</span>

          <div className="builder-empty-text">
            <strong>Choose an icon to get started</strong>
            <span>Your message will appear here.</span>
          </div>
        </div>
        ) : (
          <>
            <div className="builder-head">
              <div>
                <p className="builder-title">Build your message</p>
              </div>
              <button className="clear-btn" onClick={() => { setSelected([]); setSentence(''); setError(''); }}>
                Clear all
              </button>
            </div>
            <ol className="chip-row">
              {selected.map((icon, idx) => (
                <li key={icon.id} className="chip">
                  <span className="chip-index">{idx + 1}</span>
                  <span className="chip-emoji">{icon.emoji}</span>
                  {icon.label}
                  <button
                    className="chip-remove"
                    onClick={() => removeIcon(icon.id)}
                    aria-label={`Remove ${icon.label}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>

      {categories.map(cat => (
        <section key={cat} className="category">
          <h2>{cat}</h2>
          <div className="icon-grid">
            {ICONS.filter(i => i.category === cat).map(icon => {
              const idx = selected.findIndex(i => i.id === icon.id);
              const isSelected = idx !== -1;
              return (
                <button
                  key={icon.id}
                  className={`icon-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleIcon(icon)}
                  aria-pressed={isSelected}
                >
                  {isSelected && <span className="icon-badge">{idx + 1}</span>}
                  <IconGraphic icon={icon} />
                  <span className="icon-label">{icon.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <div className="generate-row">
        <button className="generate-btn" onClick={generate} disabled={loading || selected.length === 0}>
          {loading ? (
            <span className="dots" aria-hidden="true"><span></span><span></span><span></span></span>
          ) : 'Build my message'}
        </button>
      </div>

      {error && (
        <p className="error-box" role="alert">
          {error}
          <button className="retry-btn" onClick={generate}>Try again</button>
        </p>
      )}

{sentence && (
  <section className="output" aria-live="polite">
    <p className="output-sentence">{sentence}</p>

    <button
      className={`replay-btn ${speaking ? 'speaking' : ''}`}
      onClick={() => speak(sentence)}
      aria-label="Play sentence again"
    >
      <span aria-hidden="true">{speaking ? '◉' : '🔊'}</span>
    </button>
  </section>
)}

      <details className="about">
        <summary>Why this matters</summary>
        <p>
        Communication should never depend on finding the perfect words.
        Silent Voice gives people with aphasia a simple way to express what they need, feel or want, one icon at a time.
        </p>
      </details>
    </div>
  );
}

export default App;
