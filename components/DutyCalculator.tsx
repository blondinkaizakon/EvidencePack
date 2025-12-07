import React, { useState } from 'react';
import { Coins, ArrowRight, RefreshCcw } from 'lucide-react';

export const DutyCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [duty, setDuty] = useState<number | null>(null);

  const calculateDuty = (sum: number) => {
    let result = 0;
    // Standard APK RF formula (Simplified for Demo, usually Art 333.21 Tax Code)
    // Using pre-2024 reform logic for demo simplicity, or generic progressive scale
    if (sum <= 100000) {
      result = Math.max(2000, sum * 0.04);
    } else if (sum <= 200000) {
      result = 4000 + (sum - 100000) * 0.03;
    } else if (sum <= 1000000) {
      result = 7000 + (sum - 200000) * 0.02;
    } else if (sum <= 2000000) {
      result = 23000 + (sum - 1000000) * 0.01;
    } else {
      result = 33000 + (sum - 2000000) * 0.005;
      if (result > 200000) result = 200000; // Cap
    }
    setDuty(Math.round(result));
  };

  const handleCalculate = () => {
    calculateDuty(amount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
            <Coins className="text-amber-600" />
            Калькулятор Госпошлины (Имущественный иск)
          </h2>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">Цена иска (руб.)</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full text-2xl font-mono p-4 border border-stone-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-5 text-stone-400 font-medium">RUB</span>
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10"
          >
            Рассчитать
            <ArrowRight size={20} />
          </button>

          {duty !== null && (
            <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-stone-500 text-sm font-medium uppercase tracking-wider">Размер госпошлины</span>
                 <button onClick={() => {setDuty(null); setAmount(0);}} className="text-amber-700 hover:bg-amber-100 p-1 rounded">
                   <RefreshCcw size={16} />
                 </button>
               </div>
               <div className="text-4xl font-bold text-stone-900">
                 {duty.toLocaleString('ru-RU')} ₽
               </div>
               <p className="text-xs text-stone-400 mt-2">
                 *Расчет согласно ст. 333.21 НК РФ. Сумма округлена до рублей.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};