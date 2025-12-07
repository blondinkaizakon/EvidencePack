import React, { useState } from 'react';
import { Upload, Check, X, Search, Loader2, FileText } from 'lucide-react';

interface ValidationItem {
  id: string;
  rule: string;
  status: 'pending' | 'valid' | 'invalid';
  snippet?: string;
}

const RULES = [
  { id: 'r1', rule: 'Наличие подписи истца или представителя (ст. 125 АПК РФ)' },
  { id: 'r2', rule: 'Уведомление о вручении другим лицам (ст. 126 АПК РФ)' },
  { id: 'r3', rule: 'Документ об уплате госпошлины (ст. 126 АПК РФ)' },
  { id: 'r4', rule: 'Доверенность на подписание (если подписано представителем)' },
];

export const DocumentValidator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [validations, setValidations] = useState<ValidationItem[]>(RULES.map(r => ({ ...r, status: 'pending' })));
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsProcessing(true);
      // Simulate OCR processing
      setTimeout(() => {
        const mockText = "Исковое заявление... Приложение: 1. Квитанция об оплате госпошлины на сумму 5000 руб. 2. Почтовая квитанция об отправке Ответчику №12345. 3. Доверенность 77 АА 1234567.";
        setExtractedText(mockText);
        runDeterministicCheck(mockText);
        setIsProcessing(false);
      }, 1500);
    }
  };

  const runDeterministicCheck = (text: string) => {
    const newValidations = [...validations];

    if (/госпошлин|платежн(.*)поручени/i.test(text)) {
      const idx = newValidations.findIndex(v => v.id === 'r3');
      newValidations[idx].snippet = "Найдено: 'Квитанция об оплате госпошлины'";
    }

    if (/почтов(.*)квитанц|уведомлен|трек-номер/i.test(text)) {
      const idx = newValidations.findIndex(v => v.id === 'r2');
      newValidations[idx].snippet = "Найдено: 'Почтовая квитанция об отправке'";
    }

     if (/доверенност/i.test(text)) {
      const idx = newValidations.findIndex(v => v.id === 'r4');
      newValidations[idx].snippet = "Найдено: 'Доверенность 77 АА...'";
    }

    setValidations(newValidations);
  };

  const handleValidation = (id: string, isValid: boolean) => {
    setValidations(prev => prev.map(v => 
      v.id === id ? { ...v, status: isValid ? 'valid' : 'invalid' } : v
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Upload Column */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col">
        <h2 className="text-lg font-bold text-stone-800 mb-4">1. Загрузка документа</h2>
        
        {!file ? (
          <div className="border-2 border-dashed border-stone-200 rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors">
            <Upload className="text-stone-300 mb-4" size={48} />
            <p className="text-stone-600 font-medium">Перетащите файл</p>
            <p className="text-xs text-stone-400 mt-2">PDF, DOCX, JPG</p>
            <input 
              type="file" 
              className="hidden" 
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label 
              htmlFor="file-upload"
              className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-stone-800 shadow-sm"
            >
              Выбрать файл
            </label>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex items-center gap-3 mb-4">
              <FileText className="text-amber-600" />
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-stone-900 truncate">{file.name}</p>
                <p className="text-xs text-stone-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button onClick={() => {setFile(null); setExtractedText('');}} className="ml-auto p-1 hover:bg-amber-100 rounded text-stone-400">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 bg-stone-50 border border-stone-100 rounded-lg p-4 overflow-y-auto text-xs font-mono text-stone-600 leading-relaxed">
              {isProcessing ? (
                <div className="flex items-center justify-center h-full gap-2 text-stone-400">
                  <Loader2 className="animate-spin" /> Распознавание...
                </div>
              ) : extractedText ? (
                extractedText
              ) : (
                "Текст не распознан"
              )}
            </div>
          </div>
        )}
      </div>

      {/* Validation Column */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-stone-800">2. Чек-лист комплектности</h2>
          <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold border border-stone-200">
            Ст. 126 АПК РФ
          </span>
        </div>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {validations.map((item) => (
            <div 
              key={item.id} 
              className={`border rounded-xl p-4 transition-all ${
                item.status === 'valid' ? 'border-emerald-200 bg-emerald-50/50' : 
                item.status === 'invalid' ? 'border-rose-200 bg-rose-50/50' : 
                'border-stone-100 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex justify-between gap-4 items-start">
                <div className="flex-1">
                  <p className={`font-medium text-sm ${
                     item.status === 'valid' ? 'text-emerald-900' : 
                     item.status === 'invalid' ? 'text-rose-900' : 
                     'text-stone-800'
                  }`}>
                    {item.rule}
                  </p>
                  
                  {item.snippet ? (
                     <div className="mt-2 text-xs bg-amber-50/50 p-2 rounded border border-amber-100 text-stone-600 flex items-start gap-2">
                        <Search size={12} className="mt-0.5 text-amber-500" />
                        <span className="font-medium">{item.snippet}</span>
                     </div>
                  ) : null}
                </div>

                <div className="flex gap-2 items-start">
                   <button 
                      onClick={() => handleValidation(item.id, true)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors border ${
                        item.status === 'valid' 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'bg-white text-stone-300 border-stone-200 hover:border-emerald-300 hover:text-emerald-500'
                      }`}
                   >
                     <Check size={16} />
                   </button>
                   <button 
                      onClick={() => handleValidation(item.id, false)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors border ${
                        item.status === 'invalid' 
                        ? 'bg-rose-500 text-white border-rose-600' 
                        : 'bg-white text-stone-300 border-stone-200 hover:border-rose-300 hover:text-rose-500'
                      }`}
                   >
                     <X size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};