import { GoogleGenAI, Type } from "@google/genai";
import type { JadwalKuliah, Aplikasi } from '../types';
import { lecturers, curriculum } from '../data/jadwalData';


const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

export async function generateAppData(): Promise<Aplikasi[]> {
    const prompt = `
    Generate a list of 5-6 common applications found in a university's student academic portal.
    The response must be a valid JSON array of objects, conforming to the schema.
    The 'url' property for 'Jadwal Kuliah' must be 'JadwalDosen'. For other applications, use a placeholder like '#'.
    Use a distinct color and icon for each application.
    `;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                nama_aplikasi: { type: Type.STRING, description: "Nama aplikasi, e.g., 'Jadwal Kuliah'" },
                deskripsi: { type: Type.STRING, description: "Deskripsi singkat aplikasi" },
                url: { type: Type.STRING, description: "URL atau identifier view, e.g., 'JadwalDosen' or '#'" },
                icon: { type: Type.STRING, enum: ['CalendarIcon', 'BookOpenIcon', 'UserCircleIcon', 'DocumentTextIcon', 'CreditCardIcon'] },
                color: { type: Type.STRING, enum: ['blue', 'green', 'purple', 'yellow', 'red', 'indigo'] },
            },
            required: ["nama_aplikasi", "deskripsi", "url", "icon", "color"],
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        
        return data as Aplikasi[];

    } catch (error) {
        console.error("Error generating app data from Gemini API:", error);
        throw new Error("Failed to fetch app data.");
    }
}


export async function generateScheduleData(): Promise<JadwalKuliah[]> {
    const prompt = `
    You are a university scheduling assistant for 'Universitas Pamulang'. Your task is to generate a realistic and comprehensive class schedule based on the provided data.
    
    **CRITICAL INSTRUCTIONS:**
    1. Your response MUST be ONLY a valid JSON array of objects. 
    2. Do NOT include any introductory text, summary, or markdown formatting like \`\`\`json. Your entire output must be parsable JSON.
    3. Generate a list of at least 400 individual class sessions.
    
    **DATA AND RULES:**
    - Use the provided lecturers and curriculum data to create the schedule.
    - Each JSON object must represent a single class session and conform to this structure: { courseName: string, lecturer: string, day: 'Senin'|'Selasa'|'Rabu'|'Kamis'|'Jumat', time: string, room: string, class: string, prodi: string, fakultas: string, semester: number }.
    - For each course, create multiple parallel classes (e.g., 01TPLP001, 01TPLP002).
    - Assign lecturers from 'Fakultas Ilmu Komputer' ONLY to 'TEKNIK INFORMATIKA S1' courses.
    - Assign lecturers from 'Fakultas Ekonomi dan Bisnis' ONLY to 'MANAJEMEN S1' courses.
    - Distribute classes across 'Senin' to 'Jumat' at realistic university times.
    - Ensure 'fakultas', 'prodi', 'semester', and 'class' code are consistent with the curriculum. The class code format is '0[Semester]TPLP[XXX]' for 'Teknik Informatika' or '0[Semester]SMJE[XXX]' for 'Manajemen'.

    **INPUT DATA:**
    - Lecturers (Fakultas Ilmu Komputer): ${JSON.stringify(lecturers.fik)}
    - Lecturers (Fakultas Ekonomi dan Bisnis): ${JSON.stringify(lecturers.feb)}
    - Curriculum (TEKNIK INFORMATIKA S1): ${JSON.stringify(curriculum.ti)}
    - Curriculum (MANAJEMEN S1): ${JSON.stringify(curriculum.manajemen)}

    Begin generating the JSON array now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                // By removing schema enforcement, we give the model more flexibility, 
                // which can help avoid failures with very large and complex prompts.
                temperature: 0.7,
            },
        });
        
        if (!response.text) {
            throw new Error("The API returned an empty response. This might be due to the prompt being too large or hitting content safety filters.");
        }

        const jsonText = response.text.trim();
        // Defensive cleaning: remove markdown fences if they exist despite the prompt's instructions.
        const cleanedJsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        
        const data = JSON.parse(cleanedJsonText);
        
        return data as JadwalKuliah[];

    } catch (error) {
        console.error("Error generating schedule data from Gemini API:", error);
        
        if (error instanceof SyntaxError) {
            // This specifically catches JSON.parse failures
            throw new Error("Failed to parse schedule data. The API returned a malformed JSON response.");
        }

        // Re-throw other errors with a generic message
        throw new Error("Failed to fetch schedule data. The API may be unavailable or the request was invalid.");
    }
}