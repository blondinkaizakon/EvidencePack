import React, { useState } from 'react';
import { Search, ChevronRight, FileText, Calendar, Upload } from 'lucide-react';
import { Case, CaseStatus } from '../types';

const MOCK_CASES: Case[] = [
  {
    id: '1',
    caseNumber: 'А40-12345/2024',
    courtName: 'АС г. Москвы',
    plaintiff: 'ООО "Ромашка"',
    defendant: 'ПАО "Газпром"',
    baseDate: '2024-05-15',
    claimAmount: 1500000,
    status: CaseStatus.ACTIVE,
    documents: [],
    deadlines: []
  },
  {
    id: '2',
    caseNumber: 'А56-98765/2023',
    courtName: 'АС Санкт-Петербурга и ЛО',
    plaintiff: 'ИП Иванов И.И.',
    defendant: 'ООО "СтройМаш"',
    baseDate: '2023-11-20',
    claimAmount: 450000,
    status: CaseStatus.RISK,
    documents: [],
    deadlines: []
  },
  {
    id: '3',
    caseNumber: 'А41-11223/2024',
    courtName: 'АС Московской области',
    plaintiff: 'АО "ТехноНиколь"',
    defendant: 'ООО "Вектор"',
    baseDate: '2024-06-01',
    claimAmount: 3200000,
    status: CaseStatus.ACTIVE,
    documents: [],
    deadlines: []
  }
];

export const CaseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = MOCK_CASES.filter(c => 
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.plaintiff.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.defendant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 flex flex-col h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-lg font-bold text-stone-800">Реестр дел</h2>
           <p className="text-xs text-stone-400">Всего дел: {MOCK_CASES.length}</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors">
            <Upload size={16} />
            Загрузить суд. акт
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 shadow-sm transition-colors">
            + Новое дело
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-stone-100 bg-stone-50/50">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Поиск по номеру дела, истцу или ответчику..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-2">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">Номер дела</th>
              <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">Стороны</th>
              <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">Цена иска</th>
              <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">Дата решения</th>
              <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">Статус</th>
              <th className="p-4 border-b border-stone-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredCases.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors group cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-50 text-amber-700 rounded">
                        <FileText size={16} />
                    </div>
                    <span className="font-semibold text-stone-800">{item.caseNumber}</span>
                  </div>
                  <div className="text-xs text-stone-400 ml-9 mt-1">{item.courtName}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-stone-700 font-medium">{item.plaintiff}</div>
                  <div className="text-xs text-stone-400 mt-0.5">против</div>
                  <div className="text-sm text-stone-700">{item.defendant}</div>
                </td>
                <td className="p-4 text-sm text-stone-600 font-mono">
                  {item.claimAmount.toLocaleString('ru-RU')} ₽
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded w-fit">
                    <Calendar size={14} className="text-stone-400" />
                    {new Date(item.baseDate).toLocaleDateString('ru-RU')}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.status === CaseStatus.RISK 
                    ? 'bg-rose-50 text-rose-700 border-rose-100' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-stone-300 hover:text-stone-600 rounded-full transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCases.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400">
            <FileText size={48} className="text-stone-200 mb-4" />
            <p>Дела не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};