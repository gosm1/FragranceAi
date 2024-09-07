import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(req: Request) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    return NextResponse.json({ error: "Google AI API key not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { prompt } = body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch(error: any) {
    console.error(`Error with Google AI API request: ${error.message}`);
    return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 });
  }
}