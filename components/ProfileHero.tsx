
import React from 'react';
import { ShieldCheck, Phone, MessageSquare, UserPlus, Share2, Globe, Clock } from 'lucide-react';

const ProfileHero: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
      <div className="bg-cyan-700 h-32 relative">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                <span className="text-cyan-700 text-4xl">🏪</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-16 pb-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-3xl font-bold text-slate-800">Goraygacad</h1>
          <ShieldCheck className="w-6 h-6 text-blue-500 fill-blue-50" />
        </div>
        <p className="text-slate-500 font-medium mb-4">Exchange money</p>
        
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full text-slate-600 text-sm mb-8">
           <span>🏪</span>
           <span className="font-semibold">Verified business</span>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
            <Phone className="w-6 h-6 text-slate-600" />
          </button>
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
            <MessageSquare className="w-6 h-6 text-slate-600" />
          </button>
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
            <UserPlus className="w-6 h-6 text-slate-600" />
          </button>
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
            <Share2 className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="space-y-4 text-left border-t border-slate-100 pt-6">
          <h3 className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Business Info</h3>
          <div className="flex items-center gap-3 text-slate-700">
             <Globe className="w-5 h-5 text-slate-400" />
             <a href="https://www.goraygacad.com" className="text-blue-600 hover:underline">Www.goraygacad.com</a>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
             <Clock className="w-5 h-5 text-slate-400" />
             <span className="text-slate-500 italic">Open 24/7 (Online)</span>
          </div>
          <button className="w-full py-2 text-blue-600 font-medium text-center border-t border-slate-50 mt-2">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
