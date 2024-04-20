import prisma from "@/lib/db";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();

  try {
    if (!email && !password) {
      return NextResponse.json({ message: "Incomplete credentials" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "user doesn't exist" },
        { status: 404 }
      );
    }

    const matchUser = await compare(password, existingUser?.password);

    if (!matchUser) {
      return NextResponse.json(
        { message: "Password incorrect" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string
    );

    return NextResponse.json(
      { message: "Logged In", token: token },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
