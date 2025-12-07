import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, text extraction (OCR) would happen before this
// This service acts as the "Intelligent Parser" for text content to suggest metadata.

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeDocumentText = async (text: string): Promise<{ suggestedType: string; criticalKeywords: string[] }> => {
  const ai = getAiClient();
  if (!ai) return { suggestedType: 'Неизвестно', criticalKeywords: [] };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Проанализируй текст юридического документа (РФ) и определи его тип и ключевые слова.
      Текст: ${text.substring(0, 5000)}...`, // Truncate for safety
      config: {
        systemInstruction: "Ты помощник юриста. Твоя задача — классифицировать документ по АПК РФ (Доверенность, Квитанция, Иск, Решение) и найти ключевые слова (срок, сумма, дата). Верни JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedType: { type: Type.STRING },
            criticalKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return { suggestedType: 'Ошибка анализа', criticalKeywords: [] };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { suggestedType: 'Ошибка', criticalKeywords: [] };
  }
};