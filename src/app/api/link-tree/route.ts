import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
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

//get link-tree
export async function GET() {
 try {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
   return new NextResponse("Internal Error", {
    status: 401,
   });
  }

  const linkTrees = await db.query.linkTrees.findMany({
   where: (linkTrees, { eq }) =>
    eq(linkTrees.userId, session?.user?.id),
  });

  return NextResponse.json({ data: linkTrees });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
