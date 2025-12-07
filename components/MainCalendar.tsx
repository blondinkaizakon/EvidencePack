import React from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const EVENTS = [
  { id: 1, day: 5, title: 'Апелляция по А40-12345', type: 'critical' },
  { id: 2, day: 12, title: 'Отзыв на иск А56-98765', type: 'warning' },
  { id: 3, day: 15, title: 'Заседание А41-11223', type: 'info' },
  { id: 4, day: 25, title: 'Истечение срока по А18-13579', type: 'critical' },
];

export const MainCalendar: React.FC = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Срочные задачи</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">2 дела</p>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600">
            <AlertCircle size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Заседания в этом месяце</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">5 заседаний</p>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <Clock size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Сегодня</p>
            <p className="text-lg font-bold text-stone-800 mt-1">10 Октября, Вт</p>
          </div>
          <div className="text-right">
             <p className="text-xs text-stone-400">Событий нет</p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-800">Октябрь 2025</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-stone-50 rounded-lg text-stone-500">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 hover:bg-stone-50 rounded-lg text-stone-500">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b border-stone-100 bg-stone-50">
          {weekDays.map(day => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-stone-400 uppercase">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr h-[600px]">
           {/* Padding days for demo start on Tuesday */}
           <div className="border-r border-b border-stone-100 bg-stone-50/50"></div>
           
           {daysInMonth.map(day => {
             const events = EVENTS.filter(e => e.day === day);
             return (
               <div key={day} className="border-r border-b border-stone-100 p-2 min-h-[100px] relative hover:bg-stone-50 transition-colors group">
                 <span className={`text-sm font-medium ${day === 10 ? 'bg-stone-900 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-stone-700'}`}>
                   {day}
                 </span>
                 
                 <div className="mt-2 space-y-1">
                   {events.map(event => (
                     <div 
                      key={event.id} 
                      className={`text-[10px] p-1.5 rounded border truncate cursor-pointer
                        ${event.type === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                          event.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                          'bg-blue-50 text-blue-700 border-blue-100'}`}
                     >
                       {event.title}
                     </div>
                   ))}
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};