import { useState } from 'react';
import { ICONS } from './data/icons';
import './App.css';

function App() {
  const [selected, setSelected] = useState([]);
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoRead, setAutoRead] = useState(true);

  const toggleIcon = (label) => {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const generate = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icons: selected }),
      });
      const data = await res.json();
      setSentence(data.sentence);
      if (autoRead) {
        speak(data.sentence);
      }
    } catch (err) {
      setSentence('Generation failed, please try again');
    }
    setLoading(false);
  };

  const categories = [...new Set(ICONS.map(i => i.category))];

  return (
    <div className="app">
      <h1>Silent Voice</h1>

      <div className="auto-read-toggle">
        <label>
          <input
            type="checkbox"
            checked={autoRead}
            onChange={(e) => setAutoRead(e.target.checked)}
          />
          Auto-read aloud
        </label>
      </div>

      {categories.map(cat => (
        <div key={cat} className="category">
          <h3>{cat}</h3>
          <div className="icon-grid">
            {ICONS.filter(i => i.category === cat).map(icon => (
              <button
                key={icon.id}
                className={`icon-btn ${selected.includes(icon.label) ? 'selected' : ''}`}
                onClick={() => toggleIcon(icon.label)}
              >
                <span className="emoji">{icon.emoji}</span>
                <span>{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="selected-bar">
        Selected: {selected.join(' → ') || '(None)'}
      </div>

      <button className="generate-btn" onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {sentence && (
        <div className="sentence-output">
          <span>{sentence}</span>
          <button className="replay-btn" onClick={() => speak(sentence)}>
            🔊
          </button>
        </div>
      )}
    </div>
  );
}

export default App;