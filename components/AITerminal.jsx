'use client';
import { useState, useEffect, useRef } from 'react';

const responses = {
  help: "Available commands: about, projects, contact, clear, devmode",
  about: "I'm Koketso, a creative frontend developer focused on immersive web experiences.",
  projects: "Recent: Parallax Portfolio, Inventory Manager, Forex Bot.",
  contact: 'You can reach me at koketso@example.com.',
  clear: " ",
  devmode: "[🔧] Developer mode activated. Accessing advanced systems...",
};

const introLines = [
  "🪐 Booting AI interface...",
  "🔭 Calibrating starfield...",
  "🚀 Welcome aboard, Captain Koketso.",
  "Type `help` to get started.",
];

const funAIReplies = [
  "🤖 I'm not sure, but it sounds important!",
  "👽 That's classified, Captain.",
  "💡 Interesting question. Let me think...",
  "🛸 Sorry, my neural circuits didn't catch that.",
  "🔮 That might be a question for future-me.",
  "📡 Signal lost... please try again.",
];

export default function AITerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef(null);
  const index = useRef(0);

  useEffect(() => {
    const typeIntro = () => {
      if (index.current < introLines.length) {
        const line = introLines[index.current];
        setTimeout(() => {
          setLines((prev) => [...prev, `> ${line}`]);
          index.current += 1;
          typeIntro();
        }, 1000);
      } else {
        setIsTyping(false);
      }
    };
    typeIntro();
  }, []);

  const handleCommand = () => {
    const trimmed = input.trim().toLowerCase();

    let output;
    if (responses.hasOwnProperty(trimmed)) {
      output = responses[trimmed];
    } else {
      // return a random AI-style fun answer
      const randIndex = Math.floor(Math.random() * funAIReplies.length);
      output = funAIReplies[randIndex];
    }

    const newLines = [
      ...lines,
      `> ${input}`,
      ...(trimmed === 'clear' ? [] : [`> ${output}`]),
    ];

    setLines(trimmed === 'clear' ? ['> AI Terminal Reinitialized'] : newLines);
    setInput('');

    setTimeout(() => {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, 50);
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

      {!isTyping && (
        <div className="flex mt-2">
          <span className="mr-2">{'>'}</span>
          <input
            className="flex-grow bg-transparent outline-none text-green-400 caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
            autoFocus
          />
          <span className="ml-1 animate-blink text-green-400">_</span>
        </div>
      )}
    </div>
  );
}
