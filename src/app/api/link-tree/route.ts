import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
 request: Request,
 response: Response
) {
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
