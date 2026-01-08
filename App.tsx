
import React, { useState, useEffect } from 'react';
import { LayoutGrid, ListTodo, Calculator, Sparkles, Menu, Bell, Rocket, ShieldCheck } from 'lucide-react';
import ProfileHero from './components/ProfileHero';
import StatusTracker from './components/StatusTracker';
import ExchangeCalculator from './components/ExchangeCalculator';
import AIAssistant from './components/AIAssistant';
import { AppView } from './types';
import { getStatusAnalysis, performSystemActivation } from './services/geminiService';
import { STATUS_UPDATES } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingSummary(true);
      const summary = await getStatusAnalysis(STATUS_UPDATES);
      setAiSummary(summary);
      setLoadingSummary(false);
    };
    fetchSummary();
  }, []);

  const handleActivateSystem = async () => {
    setActivating(true);
    const result = await performSystemActivation();
    // In a real app we'd handle the response, here we simulate activation
    setTimeout(() => {
      setIsSystemActive(true);
      setActivating(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-4 space-y-8">
              <ProfileHero />
              
              {!isSystemActive ? (
                <button 
                  onClick={handleActivateSystem}
                  disabled={activating}
                  className="w-full p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl text-white shadow-xl hover:shadow-orange-200/50 transition-all active:scale-95 group relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {activating ? (
                      <>
                        <RefreshCw className="w-10 h-10 mb-2 animate-spin" />
                        <span className="font-bold text-lg uppercase tracking-widest">Activating...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-10 h-10 mb-2 group-hover:animate-bounce" />
                        <span className="font-bold text-xl mb-1">Activate Production</span>
                        <p className="text-orange-100 text-sm">Launch Goraygacad Live Engine</p>
                      </>
                    )}
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Rocket className="w-24 h-24" />
                  </div>
                </button>
              ) : (
                <div className="w-full p-6 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl text-white shadow-xl flex items-center gap-4 animate-in zoom-in-95">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">System Active</h4>
                    <p className="text-emerald-100 text-sm">Goraygacad is live.</p>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-sky-800 to-sky-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-sky-300" />
                    <span className="text-sm font-bold uppercase tracking-widest text-sky-200">System Insight</span>
                  </div>
                  {loadingSummary ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-sky-700 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-sky-700 rounded-full w-full animate-pulse"></div>
                    </div>
                  ) : (
                    <p className="text-sky-50 text-sm leading-relaxed italic">"{aiSummary}"</p>
                  )}
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                   <LayoutGrid className="w-32 h-32" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
               <ExchangeCalculator />
               <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Recent Network Activity</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Logs</span>
                 </div>
                 <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-lg">💸</span>
                          </div>
                          <div>
                             <p className="font-bold text-slate-800">Transfer Completed</p>
                             <p className="text-xs text-slate-500">Reference: GRC-{Math.floor(100000 + Math.random() * 900000)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-green-600">+ ${(100 + Math.random() * 2000).toFixed(2)}</p>
                           <p className="text-xs text-slate-400">{i * 3} mins ago</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        );
      case AppView.STATUS_TRACKER:
        return <div className="animate-in slide-in-from-right-8 fade-in duration-500"><StatusTracker /></div>;
      case AppView.CONVERTER:
        return <div className="max-w-xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-500"><ExchangeCalculator /></div>;
      case AppView.AI_ASSISTANT:
        return <div className="animate-in fade-in duration-500"><AIAssistant /></div>;
      default:
        return <StatusTracker />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-10 h-10 bg-sky-700 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
                <span className="text-white text-xl font-black">G</span>
             </div>
             <span className="text-2xl font-black text-slate-800 tracking-tight">Goraygacad</span>
          </div>

          <nav className="flex-grow space-y-2">
            {[
              { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutGrid },
              { id: AppView.STATUS_TRACKER, label: 'Status Updates', icon: ListTodo },
              { id: AppView.CONVERTER, label: 'Calculator', icon: Calculator },
              { id: AppView.AI_ASSISTANT, label: 'AI Assistant', icon: Sparkles },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as AppView);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all ${
                  activeView === item.id 
                  ? 'bg-sky-50 text-sky-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                 <img src="https://picsum.photos/100/100?random=1" alt="User" />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-800">Admin Panel</p>
                  <p className="text-xs text-slate-500">Verified Operator</p>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-x-hidden">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between mb-6">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
             <Menu className="w-6 h-6 text-slate-600" />
           </button>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
             </div>
             <span className="font-bold text-slate-800">Goraygacad</span>
           </div>
           <button className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
             <Bell className="w-6 h-6 text-slate-600" />
           </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between mb-10">
           <div>
             <h1 className="text-3xl font-black text-slate-800">
               {activeView === AppView.DASHBOARD && 'Welcome back, Admin'}
               {activeView === AppView.STATUS_TRACKER && 'Development Status'}
               {activeView === AppView.CONVERTER && 'Currency Exchange Tools'}
               {activeView === AppView.AI_ASSISTANT && 'AI Activation Hub'}
             </h1>
             <p className="text-slate-500 font-medium">Monitoring the Somali Exchange ecosystem.</p>
           </div>
           <div className="flex items-center gap-4">
              <button className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                <Bell className="w-6 h-6 text-slate-500" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all ${
                isSystemActive 
                ? 'bg-sky-700 text-white shadow-sky-100' 
                : 'bg-slate-200 text-slate-500 shadow-none'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isSystemActive ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></span>
                {isSystemActive ? 'System Operational' : 'Maintenance Mode'}
              </div>
           </div>
        </header>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
