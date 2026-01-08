
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { askGeneralQuestion } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Muraadkee ayaan kaa caawiyaa? Waxaan ahay kaaliyaha rasmiga ah ee Goraygacad.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await askGeneralQuestion(history, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || 'Khalad ayaa dhacay.' }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-6 bg-sky-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Goraygacad AI Hub</h2>
            <p className="text-sky-200 text-xs font-medium uppercase tracking-wider">Online Assistant</p>
          </div>
        </div>
        <button onClick={() => setMessages([{ role: 'model', text: 'Muraadkee ayaan kaa caawiyaa?' }])} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                m.role === 'user' ? 'bg-sky-100 text-sky-700' : 'bg-white text-slate-400 border border-slate-100'
              }`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-sky-700 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-sky-300" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-3xl rounded-tl-none">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Weydii wax ku saabsan sarifka ama adeegayada..."
            className="w-full pl-4 pr-16 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-medium transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-3 bg-sky-700 text-white rounded-xl hover:bg-sky-800 transition-all disabled:opacity-50 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
