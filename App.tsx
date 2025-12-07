import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainCalendar } from './components/MainCalendar';
import { CaseList } from './components/CaseList';
import { DeadlineCalculator } from './components/DeadlineCalculator';
import { DocumentValidator } from './components/DocumentValidator';
import { DutyCalculator } from './components/DutyCalculator';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('calendar');

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <MainCalendar />;
      case 'cases':
        return <CaseList />;
      case 'deadlines':
        return <DeadlineCalculator />;
      case 'check':
        return <DocumentValidator />;
      case 'duty':
        return <DutyCalculator />;
      default:
        return <MainCalendar />;
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'calendar': return 'Календарь событий';
      case 'cases': return 'База арбитражных дел';
      case 'deadlines': return 'Калькулятор сроков (АПК РФ)';
      case 'check': return 'Проверка комплектности';
      case 'duty': return 'Калькулятор госпошлины';
      default: return 'EvidencePack';
    }
  }

  return (
    <div className="flex min-h-screen bg-[#fafaf9]">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 tracking-tight">{getHeaderTitle()}</h1>
            <p className="text-sm text-stone-400 mt-1">
              Система контроля рисков Арбитражного процесса РФ
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-stone-800">Юридический Департамент</p>
                <p className="text-xs text-stone-400">ООО "Вектор"</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-700 font-bold border border-stone-200 shadow-sm">
                ЮД
             </div>
          </div>
        </header>

        <div className="fade-in-up">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;