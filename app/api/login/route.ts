//api/login/route.ts

import React from "react";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log({ body });

    const UserInfo = await prisma.users.create({
      data: {
        email: body.primaryEmailAddress.emailAddress,
        clerkid: body.primaryEmailAddress.id,
        name: body.fullName,
      },
    });
    return NextResponse.json({ data: UserInfo });
  } catch (err) {
    console.error("Error occured", err);
    return NextResponse.json({ data: "" });
  }
};
