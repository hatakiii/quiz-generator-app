//api/login/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // log incoming payload for debugging (trim to avoid huge output)
    try {
      const preview = JSON.stringify(body).slice(0, 1000);
      console.log("/api/login payload:", preview);
    } catch (_) {
      console.log("/api/login payload: [unserializable]");
    }

    if (!body?.id) {
      return NextResponse.json({ error: "Missing Clerk ID" }, { status: 400 });
    }

    const email =
      body?.primaryEmailAddress?.emailAddress ?? body?.email ?? null;
    const name = body?.fullName ?? body?.name ?? null;

    // Use upsert to create or update the user
    let savedUser;
    try {
      savedUser = await prisma.users.upsert({
        where: { clerkid: body.id },
        update: {
          email,
          name,
        },
        create: {
          clerkid: body.id,
          email,
          name,
        },
      });
    } catch (dbErr: any) {
      console.error("Prisma upsert error:", dbErr);

      // Handle unique constraint on email (P2002) where create fails because email exists
      if (
        dbErr?.code === "P2002" &&
        dbErr?.meta?.target?.includes("email") &&
        email
      ) {
        try {
          const existingByEmail = await prisma.users.findUnique({
            where: { email },
          });
          if (existingByEmail) {
            // Assign clerkid to the existing user record
            const merged = await prisma.users.update({
              where: { id: existingByEmail.id },
              data: { clerkid: body.id, name, email },
            });
            return NextResponse.json({ data: merged });
          }
        } catch (mergeErr) {
          console.error("Error merging user by email:", mergeErr);
          return NextResponse.json(
            { error: "Database merge error", details: String(mergeErr) },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { error: "Database error during login", details: String(dbErr) },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: savedUser });
  } catch (err) {
    console.error("/api/login unexpected error:", err);
    return NextResponse.json(
      { error: "Login failed", details: String(err) },
      { status: 500 }
    );
  }
};
