//api/quizGenerator/route.ts

import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const replaceApostrophes = (str: string) => {
  return str.replace(/(\w)+'+(\w+)/g, "$1 $2");
};

export const POST = async (req: NextRequest) => {
  const { contentPrompt, articleId } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Content prompt is required" },
      { status: 400 }
    );
  }
  const transformedContentPrompt = replaceApostrophes(contentPrompt);

  // If an articleId was provided, check for existing quizzes for that article.
  // If no articleId is provided (e.g. generating from current summary without saving to DB), skip this check.
  if (typeof articleId === "number") {
    const existingQuiz = await prisma.quizzes.findMany({
      where: {
        articleid: articleId,
      },
    });

    if (existingQuiz.length > 0) {
      console.log("Using existing quiz, not generating again");
      return NextResponse.json(existingQuiz);
    }
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: transformedContentPrompt,

    config: {
      systemInstruction: `Generate 5 multiple choice questions based on this article: ${transformedContentPrompt}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]`,
    },
  });
  const text = replaceApostrophes(response.text || "");
  console.log("text", text);

  try {
    const cleaned = text.replace(/```json\s*|```/g, "").trim();
    const parsedQuiz = JSON.parse(cleaned);

    // If articleId is provided, persist quizzes to the database and return stored rows.
    // Otherwise return the parsed quiz array directly (don't attempt to insert without a valid article id).
    if (typeof articleId === "number") {
      const stored = await prisma.$transaction(
        parsedQuiz.map((q: QuizItem) =>
          prisma.quizzes.create({
            data: {
              question: q.question,
              options: q.options,
              answer: q.answer,
              articleid: articleId,
            },
          })
        )
      );

      console.log("Saved quizzes", stored.length);

      // Return the stored quizzes so the client receives an array of quiz items
      return NextResponse.json(stored);
    }

    // No articleId provided — return parsed quiz array for client-side use only
    return NextResponse.json(parsedQuiz);
  } catch (err) {
    console.log("DB insert error", err);
  }

  // If we couldn't store the quizzes for some reason, fall back to returning the raw text
  return NextResponse.json({ text });
};
