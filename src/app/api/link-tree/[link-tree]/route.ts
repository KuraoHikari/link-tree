import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//get link-tree
export async function GET(
 req: Request,
 { params }: { params: { linkTreeId: string } }
) {
 try {
  if (!params.linkTreeId) {
   return new NextResponse("linkTree id is required", {
    status: 400,
   });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
   return new NextResponse("Internal Error", {
    status: 401,
   });
  }

  const linkTree = await db.query.linkTrees.findFirst({
   where: (linkTree, { eq }) =>
    eq(linkTree.id, params.linkTreeId),
  });

  return NextResponse.json({ data: linkTree });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
