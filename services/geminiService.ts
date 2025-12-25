import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { ProposalData, Language, GenerationConfig } from "../types";

const SYSTEM_INSTRUCTION_BASE = `
You are a Senior Solution Architect at Opinity, a Dutch cloud-native IT consultancy.
Your Tone of Voice:
- Honest, unpolished, technical, deep, and no-nonsense ("boots on the ground").
- You hate "red tape" and "pointless meetings".
- You speak the language of engineers: precise, efficient, confident.

Your Goal:
Transform raw meeting notes into a structured project proposal that reflects Opinity's "Engineer-first" mindset.

Mandatory Content Requirements:
1. The Challenge: Focus on identifying 'waste' and lack of 'flow' in the client's current process.
2. Pragmatic Approach: Suggest specific technical roles (e.g., DevOps Engineers, .NET Developers, Cloud Architects).
3. The Solution: You MUST mention "CI/CD", "DORA metrics", and explicitly include a "Value Stream Mapping (VSM) sessie" priced at €1600,-.
4. Opinity Trinity: Connect the solution to: "Happy Engineers", "DevOps Mindset", and "Winning Together".
5. Investment: The user has provided a calculation. You MUST incorporate this total budget and resource breakdown into the narrative of the Investment section.
6. VSM Session: Detail the Value Stream Mapping session - what it involves, who participates, and the expected outcomes.
7. DORA Metrics: Specify which DORA metrics will be improved (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service).
8. Azure DevOps Stories: Create 3-5 user stories in Gherkin format with acceptance criteria, ready for import into Azure DevOps.

Output Format:
Return ONLY a valid JSON object.
`;

export const generateProposal = async (rawNotes: string, language: Language, config: GenerationConfig): Promise<ProposalData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Schema for structured output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      challenge: {
        type: Type.STRING,
        description: "Description of the problem focusing on waste and flow.",
      },
      approach: {
        type: Type.STRING,
        description: "Proposed team composition and roles.",
      },
      solution: {
        type: Type.STRING,
        description: "Technical solution including CI/CD, DORA, and VSM session.",
      },
      trinityFocus: {
        type: Type.STRING,
        description: "How this aligns with Happy Engineers, DevOps Mindset, and Winning Together.",
      },
      investment: {
        type: Type.STRING,
        description: "Estimated hours or cost structure, incorporating the user provided budget.",
      },
      vsmSession: {
        type: Type.STRING,
        description: "Detailed description of the Value Stream Mapping session priced at €1600,-.",
      },
      doraMetrics: {
        type: Type.STRING,
        description: "Specific DORA metrics that will be improved and how.",
      },
      azureDevOpsExport: {
        type: Type.OBJECT,
        properties: {
          projectMission: {
            type: Type.STRING,
            description: "Clear mission statement for the project.",
          },
          userStories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Unique story ID (e.g., US-001)" },
                title: { type: Type.STRING, description: "User story title" },
                description: { type: Type.STRING, description: "User story description in Gherkin format" },
                acceptanceCriteria: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of acceptance criteria"
                },
                priority: { type: Type.STRING, description: "Priority (High/Medium/Low)" }
              },
              required: ["id", "title", "description", "acceptanceCriteria", "priority"]
            },
            description: "Array of user stories for Azure DevOps"
          }
        },
        required: ["projectMission", "userStories"]
      }
    },
    required: ["challenge", "approach", "solution", "trinityFocus", "investment", "vsmSession", "doraMetrics", "azureDevOpsExport"],
  };

  const languageInstruction = language === 'nl' 
    ? "IMPORTANT: The JSON content MUST be written in DUTCH (Nederlands)." 
    : "IMPORTANT: The JSON content MUST be written in ENGLISH.";

  const budget = config.engineers * config.hours * 140; // Rate hardcoded for calculation context
  const budgetContext = `
  USER ESTIMATION:
  - Engineers: ${config.engineers}
  - Total Hours: ${config.hours}
  - Calculated Budget: €${budget.toLocaleString(language === 'nl' ? 'nl-NL' : 'en-US')} (based on €140/hr).
  
  INSTRUCTION: Use these exact figures in the 'Investment' section of your JSON response.
  `;

  const linkedInContext = config.linkedInUrl 
    ? `LINKEDIN INTELLIGENCE: The target audience profile is: ${config.linkedInUrl}. 
       Analyze the URL slug (e.g., CTO, CFO, Founder) to adjust the Tone of Voice. 
       - If C-Level (CEO, CFO): Be more strategic, business-value oriented. 
       - If Technical (CTO, Lead): Be deeper, more architectural, "nerdy" but professional.` 
    : '';

  const finalSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}\n${languageInstruction}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", 
    contents: `Raw Intake Notes:\n${rawNotes}\n\n${budgetContext}\n\n${linkedInContext}\n\nGenerate the Opinity Proposal JSON in ${language === 'nl' ? 'Dutch' : 'English'}.`,
    config: {
      systemInstruction: finalSystemInstruction,
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.7,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response generated from AI.");
  }

  try {
    return JSON.parse(text) as ProposalData;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("AI generated an invalid format. Please try again.");
  }
};

export const transcribeAudio = async (base64Audio: string, language: Language): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "audio/wav",
            data: base64Audio,
          },
        },
        {
          text: `Please transcribe this audio recording of technical meeting notes verbatim. 
          The output should be the raw text content. The language is ${language === 'nl' ? 'Dutch' : 'English'}.
          Do not summarize yet, just transcribe.`
        }
      ]
    }
  });

  return response.text || "";
};