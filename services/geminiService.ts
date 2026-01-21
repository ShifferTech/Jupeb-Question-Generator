
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateJUPEBQuestions = async (
  subject: Subject,
  topic: string,
  count: number = 5
): Promise<Question[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} high-quality JUPEB (Joint Universities Preliminary Examinations Board) standard past questions for ${subject} on the topic: ${topic}. 
    Ensure the questions are challenging and follow the exact style and format of JUPEB exams (Multiple Choice). 
    Include a detailed step-by-step explanation for each answer.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            questionText: { type: Type.STRING },
            options: {
              type: Type.OBJECT,
              properties: {
                A: { type: Type.STRING },
                B: { type: Type.STRING },
                C: { type: Type.STRING },
                D: { type: Type.STRING }
              },
              required: ["A", "B", "C", "D"]
            },
            correctOption: { type: Type.STRING, description: "One of A, B, C, or D" },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
          },
          required: ["id", "questionText", "options", "correctOption", "explanation", "difficulty"]
        }
      }
    }
  });

  try {
    const rawData = JSON.parse(response.text.trim());
    return rawData.map((q: any) => ({
      ...q,
      subject,
      topic
    }));
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate questions. Please try again.");
  }
};
