'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

export default function AITerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('normal');
  const terminalRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const bootLines = [
      '> 🚀 System online.',
      "> Hello, explorer. I'm at your command — type anything to get started"
    ];

    const simulateBootSequence = async () => {
      for (const line of bootLines) {
        let typed = '';
        for (let i = 0; i < line.length; i++) {
          typed += line[i];
          setLines((prev) => [...prev.slice(0, -1), typed]);
          await new Promise((res) => setTimeout(res, 30));
        }
        setLines((prev) => [...prev, '']);
        scrollToBottom();
        await new Promise((res) => setTimeout(res, 500));
      }
    };

    setLines(['']);
    simulateBootSequence();
  }, []);

  const simulateTyping = (text) => {
    return new Promise((resolve) => {
      let current = '';
      let index = 0;

      const typeChar = () => {
        if (index < text.length) {
          current += text[index];
          setLines((prev) => [...prev.slice(0, -1), `> ${current}`]);
          index++;
          if (index % 4 === 0 || index === text.length - 1) {
            scrollToBottom();
          }
          setTimeout(typeChar, 15);
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
      setLines((prev) => [...prev, `> ${trimmed}`, `> Personality switched to ${newMode}`, '']);
      setInput('');
      scrollToBottom();
      return;
    }

    const newHistory = [...history, { role: 'user', content: trimmed }];
    setLines((prev) => [...prev, `> ${trimmed}`, '>']);
    setInput('');
    setStatus("thinking");
    scrollToBottom();

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
      setStatus('idle');
    } finally {
      scrollToBottom();
    }
  };

  return (
    <div
      className="w-full bg-black/70 backdrop-blur border border-gray-800 rounded-lg p-6 font-mono text-green-400 text-sm shadow-xl"
      style={{
        maxHeight: '60vh',
        overflowY: 'auto',
      }}
      ref={terminalRef}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex mt-2 items-center">
        <span className="mr-2">{'>'}</span>
        <input
          type="text"
          inputMode="text"
          style={{ fontSize: '16px' }}
          disabled={status !== 'idle'}
          className={`flex-grow bg-transparent outline-none text-green-400 caret-green-400 transition-opacity ${
            status !== 'idle' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
        />
        {status === 'idle' && <span className="ml-1 animate-blink text-green-400">_</span>}
        {status === 'thinking' && <span className="ml-2 animate-pulse text-xs">...thinking</span>}
        {status === 'typing' && <span className="ml-2 animate-pulse text-xs">...typing</span>}
      </div>
    </div>
  );
}
