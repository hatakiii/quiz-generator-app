import { query } from "@/lib/connectDB";
import { NextRequest } from "next/server";

export const GET = async () => {
  const students = await query("SELECT * FROM students");
  return Response.json({ message: "success", data: students });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, age, gender } = body;
  const student = await query(
    `INSERT INTO student(name, age, gender) VALUES (${name},${age},${gender})`
  );
  return Response.json({ message: "successfully added", data: student });
};
