import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const dataRisk = [
  { name: 'Янв', risks: 4, prevented: 3 },
  { name: 'Фев', risks: 3, prevented: 3 },
  { name: 'Мар', risks: 6, prevented: 5 },
  { name: 'Апр', risks: 2, prevented: 2 },
  { name: 'Май', risks: 5, prevented: 5 },
];

const dataTypes = [
  { name: 'Сроки (Апелляция)', value: 40 },
  { name: 'Комплектность (ст. 126)', value: 30 },
  { name: 'Госпошлина', value: 20 },
  { name: 'Доверенность', value: 10 },
];

// Updated colors: Amber (Gold), Emerald (Success), Stone (Neutral), Rose (Alert)
const COLORS = ['#b45309', '#059669', '#78716c', '#e11d48'];

export const KPIDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-stone-500">Предотвращено потерь</p>
              <h3 className="text-2xl font-bold text-stone-900">1.2 млн ₽</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-2 font-medium">+12% к прошлому мес.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-stone-500">Ошибок комплектности</p>
              <h3 className="text-2xl font-bold text-stone-900">18</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <CheckCircle size={20} />
            </div>
          </div>
           <p className="text-xs text-stone-400 mt-2">100% выявлено до подачи</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-stone-500">Ближайшие дедлайны</p>
              <h3 className="text-2xl font-bold text-stone-900">3 дела</h3>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2 font-medium">Требуют внимания &lt; 5 дн.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-stone-500">Риск оставления б/д</p>
              <h3 className="text-2xl font-bold text-stone-900">0%</h3>
            </div>
            <div className="p-2 bg-rose-100 rounded-lg text-rose-700">
              <AlertTriangle size={20} />
            </div>
          </div>
           <p className="text-xs text-emerald-600 mt-2 font-medium">Стабильно низкий</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Динамика предотвращенных рисков</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataRisk}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4' }}
                  cursor={{fill: '#f5f5f4'}}
                />
                <Bar dataKey="risks" fill="#d6d3d1" name="Выявлено рисков" radius={[4, 4, 0, 0]} />
                <Bar dataKey="prevented" fill="#b45309" name="Устранено" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Структура ошибок (АПК РФ)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
              {dataTypes.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-stone-600">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                      {entry.name}
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};