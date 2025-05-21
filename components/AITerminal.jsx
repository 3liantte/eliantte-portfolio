'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

export default function AITerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle"); // idle | thinking | typing
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('normal');
  const terminalRef = useRef(null);

  useEffect(() => {
    const welcome = [
      '> Type anything to ask your assistant.',
    ];
    setLines(welcome);
  }, []);


const simulateTyping = (text) => {
  return new Promise((resolve) => {
    let current = '';
    let index = 0;

    const typeChar = () => {
      if (index < text.length) {
        current += text[index];
        setLines((prev) => {
          const newLines = [...prev.slice(0, -1), `> ${current}`];
          return newLines;
        });
        index++;

        // 🔽 Auto-scroll on each character
        setTimeout(() => {
          terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
          typeChar();
        }, 15);
      } else {
        resolve();
      }
    };

    typeChar();
  });
};
const handleCommand = async () => {
  const trimmed = input.trim();
  if (!trimmed) return;

  if (trimmed.toLowerCase().includes('mode')) {
    const newMode = trimmed.toLowerCase().includes('funny')
      ? 'funny'
      : trimmed.toLowerCase().includes('dev')
      ? 'dev'
      : 'normal';
    setMode(newMode);
    setLines((prev) => [...prev, `> ${trimmed}`, `> Personality switched to ${newMode}`]);
    setInput('');
    return;
  }

  const newHistory = [...history, { role: 'user', content: trimmed }];
  setLines((prev) => [...prev, `> ${trimmed}`]); // blank line for AI to type into
  setInput('');
  setStatus("thinking");

  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newHistory, mode }),
    });

    const data = await res.json();
    const reply = data.reply || "🤖 I couldn't generate a response.";

    setStatus("typing");
    await simulateTyping(reply);
    setStatus('idle');

    setHistory([...newHistory, { role: 'assistant', content: reply }]);
  } catch (err) {
    setLines((prev) => [...prev, '> ⚠️ AI Error.']);
    setStatus('idle'); // fallback to reset terminal state
  } finally {
    setTimeout(() => {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, 100);
  }
};

  return (
    <div
      className="w-full bg-black/70 backdrop-blur border border-gray-800 rounded-lg p-6 font-mono text-green-400 text-sm shadow-xl"
      style={{ maxHeight: '60vh', overflowY: 'auto' }}
      ref={terminalRef}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex mt-2 items-center">
        <span className="mr-2">{'>'}</span>
        <input
          disabled={status !== 'idle'}
          className={`flex-grow bg-transparent outline-none text-green-400 caret-green-400 transition-opacity ${
            status !== 'idle' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
        />
        {status === 'thinking' && <span className="ml-2 animate-pulse text-xs">...thinking</span>}
        {status === 'typing' && <span className="ml-2 animate-pulse text-xs">...typing</span>}
      </div>
    </div>
  );
}
