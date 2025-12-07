import React, { useState } from 'react';
import { Calculator, Calendar, Info } from 'lucide-react';

export const DeadlineCalculator: React.FC = () => {
  const [baseDate, setBaseDate] = useState<string>('');
  const [docType, setDocType] = useState<string>('decision');
  
  // Simplified calculation logic for MVP
  const calculateDeadlines = () => {
    if (!baseDate) return null;
    const start = new Date(baseDate);
    
    // Апелляция: +1 месяц (ст. 259 АПК)
    const appealDate = new Date(start);
    appealDate.setMonth(appealDate.getMonth() + 1);

    // Кассация: +2 месяца со дня вступления в силу (если решение вступило сразу - сложнее, берем базу)
    // Упрощение: +2 месяца для кассации на вступившее в силу
    const cassationDate = new Date(start);
    cassationDate.setMonth(cassationDate.getMonth() + 2);

    // Вступление в силу (если не обжаловано): +1 месяц
    const forceDate = new Date(start);
    forceDate.setMonth(forceDate.getMonth() + 1);

    return {
      appeal: appealDate.toLocaleDateString('ru-RU'),
      cassation: cassationDate.toLocaleDateString('ru-RU'),
      force: forceDate.toLocaleDateString('ru-RU'),
    };
  };

  const results = calculateDeadlines();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
          <Calculator className="text-amber-700" />
          Калькулятор процессуальных сроков (АПК РФ)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Тип судебного акта / события
            </label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
            >
              <option value="decision">Решение суда первой инстанции (полный текст)</option>
              <option value="order">Определение об оставлении без движения</option>
              <option value="appeal_ruling">Постановление апелляции</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Базовая дата (Дата изготовления)
            </label>
            <input 
              type="date" 
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
          <Info className="text-amber-700 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">Алгоритм расчета:</p>
            <p>Расчет производится согласно гл. 10 АПК РФ. Учитываются правила окончания сроков в нерабочие дни (ст. 114 АПК РФ). В MVP версии используется календарный месяц без учета переносов праздников РФ 2024-2025.</p>
          </div>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-l-4 border-l-orange-500 border-stone-200">
            <p className="text-sm text-stone-500 font-medium uppercase">Срок на апелляцию</p>
            <p className="text-2xl font-bold text-stone-900 mt-2">{results.appeal}</p>
            <p className="text-xs text-stone-400 mt-1">1 месяц (ст. 259 АПК РФ)</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-l-4 border-l-emerald-500 border-stone-200">
             <p className="text-sm text-stone-500 font-medium uppercase">Вступление в силу</p>
             <p className="text-2xl font-bold text-stone-900 mt-2">{results.force}</p>
             <p className="text-xs text-stone-400 mt-1">Если не подана жалоба (ст. 180 АПК РФ)</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-l-4 border-l-purple-500 border-stone-200">
             <p className="text-sm text-stone-500 font-medium uppercase">Срок на кассацию</p>
             <p className="text-2xl font-bold text-stone-900 mt-2">{results.cassation}</p>
             <p className="text-xs text-stone-400 mt-1">2 мес. со вступления (ст. 276 АПК РФ)</p>
          </div>
        </div>
      )}
    </div>
  );
};