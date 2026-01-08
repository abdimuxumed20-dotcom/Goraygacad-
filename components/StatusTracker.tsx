
import React from 'react';
import { CheckCircle2, Info, Rocket, Sparkles } from 'lucide-react';
import { STATUS_UPDATES } from '../constants';

const StatusTracker: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Quick Update Messages</h2>
           <p className="text-slate-500">Test Environment Live Status Tracking</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Now Live
        </div>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-200 -z-10"></div>
        
        {STATUS_UPDATES.map((update) => (
          <div key={update.id} className="flex gap-4 items-start group">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-md z-10 transition-transform group-hover:scale-110 ${
              update.type === 'success' ? 'bg-green-600 text-white' : 'bg-sky-600 text-white'
            }`}>
              {update.id}
            </div>
            
            <div className={`flex-grow p-5 rounded-2xl shadow-sm border transition-all hover:shadow-md ${
              update.type === 'success' 
                ? 'bg-green-600 text-white border-green-500' 
                : 'bg-sky-50 text-sky-900 border-sky-100'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg leading-tight">{update.message}</h3>
                {update.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 opacity-80" /> : <Info className="w-5 h-5 flex-shrink-0 opacity-80" />}
              </div>
              <p className={`text-sm ${update.type === 'success' ? 'text-green-50' : 'text-sky-600'}`}>
                {update.subMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
         <div className="flex gap-4 items-center">
            <div className="p-3 bg-blue-50 rounded-2xl">
               <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <div>
               <h4 className="font-bold text-slate-800">Deployment Summary</h4>
               <p className="text-slate-500 text-sm">Automated system checks passed. Goraygacad is operational.</p>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-sm font-medium text-slate-700">Apps Ready</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-sm font-medium text-slate-700">Firebase Setup Done</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
               <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
               <span className="text-sm font-medium text-slate-700">Mock Data Live</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
               <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
               <span className="text-sm font-medium text-slate-700">Testing Begins</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StatusTracker;
