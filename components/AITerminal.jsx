'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

export default function AITerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('normal');
  const terminalRef = useRef(null);

  useEffect(() => {
    const welcome = [
      '> Type anything to ask your assistant.',
      '> You can also say "funny mode", "devmode", or "normal mode" to switch personalities.',
    ];
    setLines(welcome);
  }, []);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    window.startVoiceInput = () => recognition.start();
  }, []);

  const handleCommand = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Handle mode switching
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
    setLines((prev) => [...prev, `> ${trimmed}`]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory, mode }),
      });

      const data = await res.json();
      const reply = data.reply || "🤖 I couldn't generate a response.";

      setHistory([...newHistory, { role: 'assistant', content: reply }]);
      setLines((prev) => [...prev, `> ${reply}`]);
    } catch (err) {
      setLines((prev) => [...prev, '> ⚠️ AI Error.']);
    } finally {
      setIsTyping(false);
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
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex mt-2 items-center">
        <span className="mr-2">{'>'}</span>
        <input
          className="flex-grow bg-transparent outline-none text-green-400 caret-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
        />
        <Button onClick={() => window.startVoiceInput()} className="ml-2 text-xs text-cyan-400">🎙️ Speak</Button>
        {isTyping && <span className="ml-2 animate-pulse text-xs">...thinking</span>}
      </div>
    </div>
  );
}
