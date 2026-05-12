import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  console.log("Generating 500 words...");
  
  const prompt = `Give me exactly 500 unique English words for TOEIC band 500-700. Return them strictly as a JSON array of objects. 
  Each object MUST have:
  - "word": string (the English word, starts with letters D through Z)
  - "meaning": string (Vietnamese meaning)
  - "example": string (Short simple English example sentence)
  Please do not include basic words often found from A to C.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: 'application/json',
          responseSchema: {
              type: Type.ARRAY,
              items: {
                  type: Type.OBJECT,
                  properties: {
                      word: { type: Type.STRING },
                      meaning: { type: Type.STRING },
                      example: { type: Type.STRING }
                  },
                  required: ["word", "meaning", "example"]
              }
          }
      }
    });

    const raw = response.text;
    const words = JSON.parse(raw);
    console.log(`Received ${words.length} words!`);
    
    let out = `import { Word } from './types';\n\nexport const chunk6: Word[] = [\n`;
    let id = 701;
    const used = new Set();
    
    for (const w of words) {
      if (!w.word || !w.meaning || !w.example) continue;
      const lower = w.word.toLowerCase();
      if (used.has(lower)) continue;
      used.add(lower);
      
      const wordClean = lower.replace(/'/g, "\\'");
      const meanClean = w.meaning.replace(/'/g, "\\'");
      const exClean = w.example.replace(/'/g, "\\'");
      
      out += `  { id: '${id}', word: '${wordClean}', meaning: '${meanClean}', example: '${exClean}' },\n`;
      id++;
    }
    out += `];\n\nexport const processChunk6 = () => chunk6;\n`;
    fs.writeFileSync('src/chunk6.ts', out);
    console.log(`Wrote chunk 6 with ${used.size} uniquely generated words.`);
  } catch (err) {
    console.error("Error generating: ", err);
  }
}

run();
