import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//create link-tree
export async function POST() {
 try {
  const session = await getServerSession(authOptions);

  //   console.log(
  //    "🚀 ~ file: route.ts:7 ~ POST ~ session:",
  //    session
  //   );
  return NextResponse.json({ session });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

export async function GET() {
 try {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ session });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
