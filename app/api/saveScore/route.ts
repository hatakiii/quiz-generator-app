import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { articleId, score } = await req.json();

    if (!articleId || score === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get Clerk user (new API)
    const user = await currentUser();
    const clerkId = user?.id;

    if (!clerkId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find internal user
    const internalUser = await prisma.users.findUnique({
      where: { clerkid: clerkId },
    });

    if (!internalUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find all quizzes under this article
    const quizzes = await prisma.quizzes.findMany({
      where: { articleid: articleId },
    });

    if (quizzes.length === 0) {
      return NextResponse.json({ error: "No quizzes found" }, { status: 404 });
    }

    const quizId = quizzes[0].id;

    // Save the score
    const saved = await prisma.userscores.create({
      data: {
        quizid: quizId,
        userid: internalUser.id,
        score,
      },
    });

    return NextResponse.json(saved);
  } catch (error) {
    console.error("Save score error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
