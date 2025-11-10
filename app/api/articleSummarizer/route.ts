import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🧹 Энэ функц нь үг хоорондын хашилт (') илүүдэл орсон хэсгийг цэвэрлэж өгдөг.
// Жишээ нь: it's → it s  гэх мэт.
// Зарим үед өгөгдөл илгээхэд AI болон SQL-д асуудал үүсгэдэг тул ингэж цэвэрлэдэг.
const replaceApostrophes = (str: string) => {
  return str.replace(/(\w)+'+(\w+)/g, "$1 $2");
};

export const POST = async (req: NextRequest) => {
  const { contentPrompt, titlePrompt } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Title and content prompt is required" },
      { status: 400 }
    );
  }

  const transformedContentPrompt = replaceApostrophes(contentPrompt);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: transformedContentPrompt,
    config: {
      systemInstruction: `You have to make a short summary of the submitted content within 5 sentences. `,
    },
  });
  const text = replaceApostrophes(response.text || "");

  try {
    // const articleContent = await query(
    //   `INSERT INTO articles(title, content, summary) VALUES($1, $2, $3)`,
    //   [titlePrompt, transformedContentPrompt, text]
    // );

    const articleContent = await prisma.articles.create({
      data: {
        title: titlePrompt,
        content: transformedContentPrompt,
        summary: text,
      },
    });

    return NextResponse.json({ text, data: articleContent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text, data: "" });
  }
};

export const GET = async () => {
  // const articles = await query("SELECT * FROM articles");
  const articles = await prisma.articles.findMany();

  return Response.json({ message: "success", articles });
};
