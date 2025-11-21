import React, { useState, useRef, useEffect } from 'react';
import { COMMANDS } from '../constants';
import { CommandResponse } from '../types';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<CommandResponse[]>([
    { type: 'output', content: 'Akshaj OS [Version 1.0.5]\n(c) 2025 Akshaj Goel. All rights reserved.\n\nType \'help\' for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input } as CommandResponse];

      if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd.startsWith('open ')) {
        const project = cmd.split(' ')[1];
        if (project === 'edumerge') {
            window.open('https://aksweb.me/EduMerge-Website', '_blank');
            newHistory.push({ type: 'success', content: 'Opening EduMerge protocol...' });
        } else if (project === 'pollution') {
            window.open('https://aksweb.me/Pollution-Website', '_blank');
            newHistory.push({ type: 'success', content: 'Opening Pollution Awareness protocol...' });
        } else {
            newHistory.push({ type: 'error', content: `Project '${project}' not found.` });
        }
        setHistory(newHistory);
      } else if (COMMANDS[cmd as keyof typeof COMMANDS]) {
        newHistory.push({ type: 'success', content: COMMANDS[cmd as keyof typeof COMMANDS] });
        setHistory(newHistory);
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type 'help' for available commands.` });
        setHistory(newHistory);
      }
      
      setInput('');
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 font-mono text-sm shadow-2xl border border-gray-800 rounded-lg overflow-hidden bg-[#0F0F0F]">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-500 text-xs">guest@akshaj-system:~</span>
      </div>

      {/* Terminal Body */}
      <div 
        className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-2 whitespace-pre-wrap">
            {item.type === 'input' && (
               <div className="flex items-center gap-2">
                 <span className="text-accent">guest@akshaj:~$</span>
                 <span className="text-white">{item.content}</span>
               </div>
            )}
            {item.type === 'output' && <div className="text-gray-400">{item.content}</div>}
            {item.type === 'success' && <div className="text-primary pl-2 border-l-2 border-primary">{item.content}</div>}
            {item.type === 'error' && <div className="text-red-400">{item.content}</div>}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-accent">guest@akshaj:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-white flex-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          <div className="w-2 h-5 bg-gray-400 animate-pulse" />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Terminal;