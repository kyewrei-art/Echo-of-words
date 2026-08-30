import { useState } from 'react';
import { ICONS } from './data/icons';
import './App.css';

function App() {
  const [selected, setSelected] = useState([]);
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleIcon = (label) => {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const generate = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icons: selected }),
      });
      const data = await res.json();
      setSentence(data.sentence);
    } catch (err) {
      setSentence('生成失败，请重试');
    }
    setLoading(false);
  };

  const categories = [...new Set(ICONS.map(i => i.category))];

  return (
    <div className="app">
      <h1>无声情绪日记</h1>

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
        已选择: {selected.join(' → ') || '(无)'}
      </div>

      <button className="generate-btn" onClick={generate} disabled={loading}>
        {loading ? '生成中...' : '生成'}
      </button>

      {sentence && <div className="sentence-output">{sentence}</div>}
    </div>
  );
}

export default App;