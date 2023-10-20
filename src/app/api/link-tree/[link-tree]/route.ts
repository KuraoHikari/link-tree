import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { linkTrees } from "@/db/schema";
import { linkTreeSchema } from "@/db/drizzle-zod/schemaValidation";
import { catchApiError } from "@/lib/utils";

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

  const linkTree = await db.query.linkTrees.findFirst({
   where: (linkTree, { eq }) =>
    eq(linkTree.id, params.linkTreeId),
  });

  if (!linkTree) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  return NextResponse.json({ data: linkTree });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

//edit link-tree
export async function PATCH(
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
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }
  const updateLinkTreeSchema = linkTreeSchema.omit({
   id: true,
   userId: true,
   createdAt: true,
  });

  const body = await req.json();

  const updateLinkTreeValidate =
   updateLinkTreeSchema.safeParse(body);
  if (!updateLinkTreeValidate.success) {
   const errValidate = catchApiError(
    updateLinkTreeValidate.error
   );

   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const findLinkTree = await db.query.linkTrees.findFirst({
   where: (linkTree, { eq }) =>
    eq(linkTree.id, params.linkTreeId),
  });

  //find link tree
  if (!findLinkTree) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  //not user link tree
  if (findLinkTree.userId !== session?.user?.id) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  //update link tree
  await db
   .update(linkTrees)
   .set({
    title: body.title,
    description: body.description,
   })
   .where(eq(linkTrees.id, params.linkTreeId));

  return NextResponse.json({
   data: {
    ...findLinkTree,
    title: body.title,
    description: body.description,
   },
  });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

//delete link-tree
export async function DELETE(
 req: Request,
 { params }: { params: { linkTreeId: string } }
) {
 try {
  if (!params.linkTreeId) {
   return new NextResponse("linkTree id is required", {
    status: 400,
   });
  }

  const linkTree = await db.query.linkTrees.findFirst({
   where: (linkTree, { eq }) =>
    eq(linkTree.id, params.linkTreeId),
  });

  if (!linkTree) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  return NextResponse.json({ data: linkTree });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
