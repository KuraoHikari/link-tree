import { db } from "@/db";
import { buttonSchema } from "@/db/drizzle-zod/schemaValidation";
import { buttons } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { catchApiError } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
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

  const createButtonSchema = buttonSchema.omit({
   id: true,
   userId: true,
   createdAt: true,
   linkTreeId: true,
  });

  const body = await req.json();

  const createButtonValidate =
   createButtonSchema.safeParse(body);

  if (!createButtonValidate.success) {
   const errValidate = catchApiError(
    createButtonValidate.error
   );
   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  //find link tree
  const findLinkTree = await db.query.linkTrees.findFirst({
   where: (linkTree, { eq }) =>
    eq(linkTree.id, params.linkTreeId),
  });

  if (!findLinkTree) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }
  //not user link tree
  if (findLinkTree.userId !== session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const createButton = await db
   .insert(buttons)
   .values([
    {
     userId: session.user.id,
     linkTreeId: params.linkTreeId,
     text: body.text,
     link: body.link,
    },
   ])
   .returning();

  return NextResponse.json({ linkTree: createButton[0] });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
