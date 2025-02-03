import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export const analyzeMood = async (mood) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    I'm building an app to help users enhance their mood.  
    The user has shared their mood as "${mood}".  
    Please provide a list of 5 specific, actionable points that can help improve their current state of mind.  

    For each point:  
    - The first point should include a brief empathetic acknowledgment. The rest should go straight to the action unless necessary.  
    - Keep each suggestion clear, practical, and immediately doable.  
    - Each point should be 2-3 lines long.  
    - Avoid unnecessary long explanations—be concise but helpful.  
    - Include a mix of physical, mental, and social activities.  
    - Format each point with a bullet point (•).  
    - No special characters or bold formatting.  

    Keep the tone warm and supportive, but focus on concrete actions rather than just emotional comfort.
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error with Google Generative AI:", error);
    throw error;
  }
};
