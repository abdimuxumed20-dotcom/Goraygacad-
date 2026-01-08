
import React, { useState } from 'react';
import { ArrowLeftRight, TrendingUp, Info } from 'lucide-react';
import { getCurrencyAdvice } from '../services/geminiService';

const ExchangeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SOS');
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const handleConsultAI = async () => {
    setLoading(true);
    const result = await getCurrencyAdvice(Number(amount), from, to);
    setAiInsight(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Currency Exchange</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Amount</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-lg font-semibold"
            placeholder="0.00"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-slate-500 mb-1">From</label>
            <select 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 outline-none"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
          
          <div className="mt-6 flex items-center justify-center p-3 bg-slate-100 rounded-full">
            <ArrowLeftRight className="w-5 h-5 text-slate-400" />
          </div>

          <div className="flex-grow">
            <label className="block text-sm font-medium text-slate-500 mb-1">To</label>
            <select 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 outline-none"
            >
              <option value="SOS">SOS - Somali Shilling</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="AED">AED - UAE Dirham</option>
            </select>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
             <span>Estimated Rate</span>
             <span className="font-bold text-slate-700">1 USD = 580.00 SOS</span>
           </div>
           <div className="flex justify-between items-center text-xl font-bold text-slate-800">
             <span>Total Receive</span>
             <span className="text-green-600">{(Number(amount) * 580).toLocaleString()} SOS</span>
           </div>
        </div>

        <button 
          onClick={handleConsultAI}
          disabled={loading}
          className="w-full py-4 bg-sky-700 hover:bg-sky-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              Ask AI for Market Insight
            </>
          )}
        </button>

        {aiInsight && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex gap-2 items-center mb-2">
               <Info className="w-4 h-4 text-blue-600" />
               <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">AI Analysis</span>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed italic">{aiInsight}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeCalculator;
