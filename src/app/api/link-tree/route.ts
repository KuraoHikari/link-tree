import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { linkTreeSchema } from "@/db/drizzle-zod/schemaValidation";
import { catchApiError } from "@/lib/utils";
import { linkTrees } from "@/db/schema";

//create link-tree
export async function POST(req: Request) {
 try {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const createLinkTreeSchema = linkTreeSchema.omit({
   id: true,
   userId: true,
   createdAt: true,
  });

  const body = await req.json();

  const createLinkTreeValidate =
   createLinkTreeSchema.safeParse(body);
  if (!createLinkTreeValidate.success) {
   const errValidate = catchApiError(
    createLinkTreeValidate.error
   );

   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const createLinkTree = await db
   .insert(linkTrees)
   .values([
    {
     title: body.title,
     description: body.description,
     userId: session.user.id,
    },
   ])
   .returning();

  return NextResponse.json({ linkTree: createLinkTree[0] });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

//get link-tree
export async function GET() {
 try {
  //validate login user
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  //find all link-tree user have
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
