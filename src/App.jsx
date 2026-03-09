import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, Menu, Bell, User, 
  LayoutDashboard, BarChart3, Database, Settings, 
  ChevronLeft, Home, FileText, Download, Play,
  Filter, Search, Calendar, RefreshCw
} from 'lucide-react';

const App = () => {
  const [isLnbOpen, setIsLnbOpen] = useState(true);
  const [activeGnb, setActiveGnb] = useState('Planning');
  const [expandedL2, setExpandedL2] = useState('Statistical Forecasting');

  const menuData = {
    'DP': [
      { title: 'Foecast', icon: <LayoutDashboard size={18}/>, sub: ['Forecast', 'Alerts'] },
      { title: 'Master', icon: <LayoutDashboard size={18}/>, sub: ['Sales Hierarchy Info', 'Product Lifecycle Mgmt', 'Sales-Product ASN'] }],
    'MP': [
      { title: 'Input Data', icon: <BarChart3 size={18}/>, sub: ['Forecast Run', 'Model Management', 'Outlier Correction'] },
      { title: 'Planning', icon: <User size={18}/>, sub: ['Sales Input', 'Consensus Meeting'] }
    ],
    'S&OP': [{ title: 'Performance', icon: <FileText size={18}/>, sub: ['Accuracy Analysis', 'Bias Tracking'] }],
    'Admin': [{ title: 'Standard Data', icon: <Database size={18}/>, sub: ['Product Master', 'Customer Info'] }]
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F1F5F9] font-sans text-slate-900">
      
      {/* GNB: 상단 네비게이션 */}
      <header className="h-16 bg-[#0F172A] text-white flex items-center justify-between px-6 z-30 shadow-lg shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/40 group-hover:scale-105 transition-all">N</div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Nexprime</span>
          </div>
          
          <nav className="flex items-center gap-2 h-full pt-1">
            {Object.keys(menuData).map(menu => (
              <button
                key={menu}
                onClick={() => {setActiveGnb(menu); setExpandedL2(menuData[menu][0]?.title);}}
                className={`px-5 h-16 text-sm font-semibold transition-all relative flex items-center ${
                  activeGnb === menu ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {menu}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
            <div className="text-right">
              <p className="text-xs font-bold text-white">John Doe</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Sr. Planner</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-slate-600 to-slate-400 rounded-full flex items-center justify-center shadow-inner border border-slate-500">
              <User size={20} className="text-slate-200" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LNB: 좌측 메뉴 */}
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 relative flex flex-col z-20 ${isLnbOpen ? 'w-64' : 'w-16'}`}>
          <button 
            onClick={() => setIsLnbOpen(!isLnbOpen)}
            className="absolute -right-3 top-8 bg-white border border-slate-200 rounded-full p-1.5 shadow-md hover:text-blue-600 transition-all hover:scale-110"
          >
            {isLnbOpen ? <ChevronLeft size={14} /> : <Menu size={14} />}
          </button>

          <div className={`flex-1 overflow-y-auto ${isLnbOpen ? 'px-3' : 'px-1'} py-6`}>
            {isLnbOpen && <div className="px-3 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{activeGnb} Menu</div>}
            
            <div className="space-y-1">
              {menuData[activeGnb]?.map(item => (
                <div key={item.title}>
                  <button
                    onClick={() => setExpandedL2(expandedL2 === item.title ? '' : item.title)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      expandedL2 === item.title ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={expandedL2 === item.title ? 'text-blue-600' : 'text-slate-400'}>{item.icon}</span>
                      {isLnbOpen && <span className="font-bold text-sm">{item.title}</span>}
                    </div>
                    {isLnbOpen && (expandedL2 === item.title ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                  </button>

                  {isLnbOpen && expandedL2 === item.title && (
                    <div className="mt-1 space-y-1 ml-9">
                      {item.sub.map(s => (
                        <button key={s} className="w-full text-left py-2 text-xs font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all">
                           • {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-[#F8FAFC]">
          
          {/* Breadcrumb & Global Action Filter */}
          <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Home size={12} /> <ChevronRight size={12} /> {activeGnb} <ChevronRight size={12} /> <span className="text-blue-600">{expandedL2}</span>
            </div>
            <div className="flex gap-3">
               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100">
                  <Calendar size={14} /> Last 12 Weeks
               </div>
               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100">
                  <Filter size={14} /> Region: Global
               </div>
            </div>
          </div>

          <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header 섹션 */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">{expandedL2}</h2>
                <p className="text-slate-500 font-medium">수요 예측 프로세스를 실행하고 AI 추천 모델을 확인합니다.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all hover:shadow-md active:scale-95">
                  <Download size={18} /> Export Results
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95">
                  <RefreshCw size={18} className="animate-hover" /> Run Forecast
                </button>
              </div>
            </div>

            {/* 카드 섹션: 차트 및 그리드 */}
            <div className="grid grid-cols-1 gap-8">
              {/* 차트 영역 카드 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[400px]">
                <div className="flex justify-between items-center mb-8 font-bold">
                   <div className="flex items-center gap-2 text-slate-800">
                      <BarChart3 className="text-blue-600" /> AI-Driven Demand Trends
                   </div>
                   <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-1"><span className="w-3 h-1 bg-blue-500 rounded-full"></span> Actual</div>
                      <div className="flex items-center gap-1"><span className="w-3 h-1 bg-orange-400 rounded-full"></span> Predicted</div>
                   </div>
                </div>
                <div className="w-full h-[300px] bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <BarChart3 size={48} className="opacity-10 mb-4" />
                  <p className="text-sm font-bold">여기에 인터랙티브 차트가 렌더링됩니다.</p>
                </div>
              </div>

              {/* 데이터 그리드 카드 */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center px-8">
                  <div className="flex items-center gap-3 font-bold text-slate-700">
                     <Search size={18} className="text-slate-400" />
                     Forecast Details Data
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full uppercase">124 Items Detected</span>
                </div>
                <div className="h-80 flex items-center justify-center text-slate-300 font-bold bg-white">
                  [ AG-Grid 또는 전용 데이터 그리드가 들어갈 자리 ]
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;