//api/articleSummarizer/route.ts

import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🧹 Энэ функц нь үг хоорондын хашилт (') илүүдэл орсон хэсгийг цэвэрлэж өгдөг.
// Жишээ нь: it's → it s  гэх мэт.
// Зарим үед өгөгдөл илгээхэд AI болон SQL-д асуудал үүсгэдэг тул ингэж цэвэрлэдэг.
const replaceApostrophes = (str: string) => {
  // Replace only repeated or misplaced apostrophes, not valid possessives like "Lenin's"
  return (
    str
      // Fix double or triple apostrophes like it''s → it's
      .replace(/'{2,}/g, "'")
      // Remove apostrophes not between letters (e.g., ' hello or hello ')
      .replace(/(^'|'$)/g, "")
      // Optional: remove isolated apostrophes surrounded by spaces
      .replace(/\s+'\s+/g, " ")
  );
};

export const POST = async (req: NextRequest) => {
  const { contentPrompt, titlePrompt } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Title and content prompt is required" },
      { status: 400 }
    );
  }

  // --- 🔑 ADD USER AUTHENTICATION AND ID RETRIEVAL ---
  const user = await currentUser();
  const clerkId = user?.id;

  if (!clerkId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const internalUser = await prisma.users.findUnique({
    where: { clerkid: clerkId },
  });

  if (!internalUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } // --------------------------------------------------

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
        userid: internalUser.id,
      },
    });

    return NextResponse.json({ text, data: articleContent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text, data: "" });
  }
};

export const GET = async () => {
  // --- 🔑 GET USER AUTHENTICATION AND ID RETRIEVAL ---
  const user = await currentUser();
  const clerkId = user?.id;

  if (!clerkId) {
    // Return an empty array or a 401/404 if not logged in
    return Response.json(
      { message: "Not authenticated", articles: [] },
      { status: 401 }
    );
  }

  const internalUser = await prisma.users.findUnique({
    where: { clerkid: clerkId },
  });

  if (!internalUser) {
    return Response.json(
      { message: "User not found", articles: [] },
      { status: 404 }
    );
  } // -------------------------------------------------- // ---  FILTER ARTICLES BY USER ID ---
  const articles = await prisma.articles.findMany({
    where: {
      userid: internalUser.id,
    },
    orderBy: {
      createdat: "desc", // Optional: Order by most recent
    },
  }); // --------------------------------------
  return Response.json({ message: "success", articles });
};
