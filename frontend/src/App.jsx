import { useState } from 'react';
import { ICONS } from './data/icons';
import './App.css';

const EXAMPLES = [
  { label: 'In pain', ids: ['pain', 'head', 'doctor'] },
  { label: 'Need water', ids: ['water', 'tired'] },
  { label: 'Miss family', ids: ['miss_family', 'sad'] },
];

function App() {
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
      const res = await fetch('http://127.0.0.1:5001/api/generate', {
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
        <p className="impact-line">Built for the 2M+ people in the U.S. living with aphasia.</p>
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
        <p className="examples-label">Try an example</p>
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
          <p className="builder-empty">Choose icons below to begin.</p>
        ) : (
          <>
            <div className="builder-head">
              <p className="builder-title">Building your sentence</p>
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
                  <span className="emoji" aria-hidden="true">{icon.emoji}</span>
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
          ) : 'Build sentence'}
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
            🔊
          </button>
        </section>
      )}

      <details className="about">
        <summary>Why this matters</summary>
        <p>
          More than two million people in the U.S. live with aphasia, most often after a stroke,
          and roughly one in three stroke survivors experiences it. Aphasia affects the ability to
          speak, read, write, or understand language — not intelligence. Silent Voice lets someone
          build and speak a sentence from simple icons when words don't come easily.
        </p>
      </details>
    </div>
  );
}

export default App;
