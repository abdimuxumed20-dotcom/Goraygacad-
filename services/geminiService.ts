
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStatusAnalysis = async (updates: any[]) => {
  const ai = getAI();
  const prompt = `Analyze these project status updates for 'Goraygacad Somali Exchange Online' and provide a concise summary of the progress and next steps: ${JSON.stringify(updates)}`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful project manager for a financial exchange service called Goraygacad. Summarize the status updates professionally and concisely."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analysis unavailable at this moment.";
  }
};

export const getCurrencyAdvice = async (amount: number, from: string, to: string) => {
  const ai = getAI();
  const prompt = `Provide a brief market insight for exchanging ${amount} ${from} to ${to} in the context of the Somali market. Is it a good time to trade?`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Could not fetch market advice.";
  }
};

export const askGeneralQuestion = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the official AI Assistant for Goraygacad Somali Exchange Online. You help users with exchange rates, transfer status, and general info about Somali financial services. Be professional, fast, and helpful."
    }
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    return "Ma awoodo inaan ka jawaabo hadda. Fadlan isku day markale.";
  }
};

export const performSystemActivation = async () => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Perform a mock 'Production Readiness' health check for a Somali currency exchange platform. Provide a 3-bullet point success report.",
    });
    return response.text;
  } catch (error) {
    return "Activation check failed. Manual override required.";
  }
};
