'use client';
import { useState, useEffect, useRef } from 'react';

export default function AITerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);
  const introIndex = useRef(0);

  // ⏱ Initial AI boot messages
  const introLines = [
    "🪐 Booting AI interface...",
    "Type anything to ask your assistant.",
  ];

  useEffect(() => {
    const typeIntro = () => {
      if (introIndex.current < introLines.length) {
        const line = introLines[introIndex.current];
        setTimeout(() => {
          setLines((prev) => [...prev, `> ${line}`]);
          introIndex.current += 1;
          typeIntro();
        }, 800);
      } else {
        setIsTyping(false);
      }
    };
    typeIntro();
  }, []);

  const handleCommand = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // 🧾 Print user input to terminal
    const newLines = [...lines, `> ${input}`];
    setLines(newLines);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ prompt: trimmed }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      const reply = data.reply;

      // 🧠 Optional: type character-by-character effect
      let typed = '';
      for (let i = 0; i < reply.length; i++) {
        typed += reply[i];
        setLines([...newLines, `> ${typed}`]);
        await new Promise((resolve) => setTimeout(resolve, 15)); // typing delay
      }
    } catch (err) {
      setLines([...newLines, "> ⚠️ Error contacting AI."]);
    }

    setLoading(false);
    setTimeout(() => {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, 100);
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

      {!isTyping && !loading && (
        <div className="flex mt-2">
          <span className="mr-2">{'>'}</span>
          <input
            className="flex-grow bg-transparent outline-none text-green-400 caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
          />
          <span className="ml-1 animate-blink text-green-400">_</span>
        </div>
      )}

      {loading && (
        <div className="mt-2 text-green-500 animate-pulse"> Thinking...</div>
      )}
    </div>
  );
}
