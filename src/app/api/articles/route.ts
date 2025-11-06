//../api/articles/route.ts
import { query } from "@/lib/connectDB";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { contentPrompt, titlePrompt } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Title and content prompt is required" },
      { status: 400 }
    );
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contentPrompt,

    config: {
      systemInstruction: `Please provide a concise summary of the following article: ${contentPrompt}`,
    },
  });
  const text = response.text;
  console.log("text", text);

  // await query(`INSERT INTO articles (title, content, summery, userId) VALUES (
  // ${title}, ${contentPrompt}, ${text} , 1)`)

  // await query(
  //   `INSERT INTO articles (title, content, summary) VALUES ($1, $2, $3)`,
  //   [titlePrompt, contentPrompt, text]
  // );

  return NextResponse.json({ text });
};
