import { db } from "@/db";
import { buttonSchema } from "@/db/drizzle-zod/schemaValidation";
import { buttons } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { catchApiError } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
 req: Request,
 {
  params,
 }: { params: { linkTreeId: string; buttonId: string } }
) {
 try {
  if (!params.linkTreeId || !params.buttonId) {
   return new NextResponse(
    "linkTree and buttonId id is required",
    {
     status: 400,
    }
   );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
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

  const button = await db.query.users.findFirst({
   where: (button, { eq }) =>
    eq(button.id, params.buttonId),
  });

  return NextResponse.json({
   data: button,
  });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

export async function PATCH(
 req: Request,
 {
  params,
 }: { params: { linkTreeId: string; buttonId: string } }
) {
 try {
  if (!params.linkTreeId || !params.buttonId) {
   return new NextResponse(
    "linkTree and buttonId id is required",
    {
     status: 400,
    }
   );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const updateButtonSchema = buttonSchema.omit({
   id: true,
   userId: true,
   createdAt: true,
   linkTreeId: true,
  });

  const body = await req.json();

  const updateButtonValidate =
   updateButtonSchema.safeParse(body);

  if (!updateButtonValidate.success) {
   const errValidate = catchApiError(
    updateButtonValidate.error
   );
   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const findButton = await db.query.buttons.findFirst({
   where: (button, { eq }) =>
    eq(button.id, params.buttonId),
  });

  if (!findButton) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  if (findButton.userId !== session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  await db
   .update(buttons)
   .set({
    text: body.text,
    link: body.link,
   })
   .where(
    and(
     eq(buttons.id, params.buttonId),
     eq(buttons.linkTreeId, params.linkTreeId)
    )
   );

  return NextResponse.json({
   data: {
    id: params.buttonId,
    text: body.text,
    link: body.link,
    linkTreeId: params.linkTreeId,
   },
  });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

export async function DELETE(
 req: Request,
 {
  params,
 }: { params: { linkTreeId: string; buttonId: string } }
) {
 try {
  if (!params.linkTreeId || !params.buttonId) {
   return new NextResponse(
    "linkTree and buttonId id is required",
    {
     status: 400,
    }
   );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const findButton = await db.query.buttons.findFirst({
   where: (button, { eq }) =>
    eq(button.id, params.buttonId),
  });

  if (!findButton) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  if (findButton.userId !== session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  await db
   .delete(buttons)
   .where(
    and(
     and(
      eq(buttons.id, params.buttonId),
      eq(buttons.linkTreeId, params.linkTreeId)
     )
    )
   );

  return NextResponse.json({
   data: { message: `${params.buttonId} is deleted` },
  });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
