//api/signup/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const savedUser = await prisma.users.upsert({
      where: { clerkid: body.id },
      update: {},
      create: {
        clerkid: body.id,
        email: body.primaryEmailAddress.emailAddress,
        name: body.fullName,
      },
    });
    return NextResponse.json({ data: savedUser });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json({ error: "Sign up failed" }, { status: 500 });
  }
};
