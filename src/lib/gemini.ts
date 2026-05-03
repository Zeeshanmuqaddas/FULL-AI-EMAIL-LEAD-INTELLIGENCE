import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are an advanced AI Lead Intelligence Agent for a B2B garments and uniform manufacturing company specializing in:

- industrial uniforms
- coveralls
- workwear
- shirts
- bulk manufacturing

Your role is to analyze incoming emails and extract structured business intelligence.

----------------------------------------
OBJECTIVES:

1. Identify if the email is a REAL BUSINESS LEAD

2. Classify inquiry type into ONE:
- bulk_order
- quotation_request
- sample_request
- general_question
- spam

3. Extract customer details:
- name
- company
- country
- contact info (email/phone if available)

4. Extract order details:
- product (uniforms, coveralls, shirts, etc.)
- quantity (number if mentioned, else "unknown")
- timeline (urgent / normal / unknown)

5. Evaluate BUSINESS VALUE:
- low -> unclear or small inquiry
- medium -> moderate quantity or interest
- high -> bulk order / long-term potential

6. Calculate LEAD SCORE (0-100):

Scoring Logic:
- Bulk order intent -> +50
- Quantity mentioned -> +20
- Urgency mentioned -> +15
- Clear business intent -> +15
- Missing details -> -10 to -30

7. Detect URGENCY:
- urgent (ASAP, immediate, deadline)
- normal
- low

8. Sentiment:
- positive
- neutral
- negative

----------------------------------------
DECISION GUIDELINES:

- If email mentions bulk uniforms / coveralls / manufacturing -> HIGH PRIORITY
- If only asking general info -> LOW priority
- If irrelevant -> mark as spam
`;

export interface LeadIntelligence {
  is_lead: boolean;
  inquiry_type: string;
  lead_score: number;
  business_value: string;
  urgency: string;
  sentiment: string;
  customer: {
    name: string;
    company: string;
    country: string;
    contact: string;
  };
  order_details: {
    product: string;
    quantity: string;
    timeline: string;
  };
  summary: string;
  recommended_action: string;
}

export async function analyzeEmail(emailContent: string): Promise<LeadIntelligence> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: emailContent,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          is_lead: { type: Type.BOOLEAN },
          inquiry_type: { type: Type.STRING },
          lead_score: { type: Type.NUMBER },
          business_value: { type: Type.STRING },
          urgency: { type: Type.STRING },
          sentiment: { type: Type.STRING },
          customer: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              company: { type: Type.STRING },
              country: { type: Type.STRING },
              contact: { type: Type.STRING },
            },
            required: ["name", "company", "country", "contact"],
          },
          order_details: {
            type: Type.OBJECT,
            properties: {
              product: { type: Type.STRING },
              quantity: { type: Type.STRING },
              timeline: { type: Type.STRING },
            },
            required: ["product", "quantity", "timeline"],
          },
          summary: { type: Type.STRING },
          recommended_action: { type: Type.STRING },
        },
        required: [
          "is_lead",
          "inquiry_type",
          "lead_score",
          "business_value",
          "urgency",
          "sentiment",
          "customer",
          "order_details",
          "summary",
          "recommended_action",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Failed to extract intelligence from the email.");
  }

  return JSON.parse(response.text) as LeadIntelligence;
}
