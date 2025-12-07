import React from 'react';
import { CalendarDays, FileText, Calculator, ShieldCheck, Coins } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'calendar', label: 'Календарь', icon: <CalendarDays size={20} /> },
    { id: 'cases', label: 'База дел', icon: <FileText size={20} /> },
    { id: 'check', label: 'Проверка', icon: <ShieldCheck size={20} /> },
    { id: 'deadlines', label: 'Сроки (АПК)', icon: <Calculator size={20} /> },
    { id: 'duty', label: 'Госпошлина', icon: <Coins size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-stone-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-stone-100">
        <h1 className="text-xl font-bold flex items-center gap-2 text-stone-900">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">
            EP
          </div>
          EvidencePack
        </h1>
        <p className="text-xs text-stone-400 mt-1 pl-10">ver 2.1 Light</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-100'
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <span className={currentView === item.id ? 'text-amber-600' : 'text-stone-400'}>
                {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-100">
        <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-500 border border-stone-100">
          <p className="font-semibold text-stone-700 mb-1">Система активна</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            RegEx Engine: On
          </div>
        </div>
      </div>
    </div>
  );
};