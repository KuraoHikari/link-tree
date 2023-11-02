import { db } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import HeaderTable from "./buttonTable/HeaderTable";
import { Separator } from "@/components/ui/separator";

export default async function ButtonLink({
 params,
}: {
 params: { ["link-tree"]: string };
}) {
 const session = await getServerSession(authOptions);

 if (!session?.user?.id) {
  return null;
 }

 //find all link-tree user have
 const buttonTrees = await db.query.buttons.findMany({
  where: (buttons, { eq }) =>
   eq(buttons.linkTreeId, params["link-tree"]),
 });

 // const formattedLinkTrees: LinkTreeColumn[] = linkTrees.map(
 //  (item) => ({
 //   id: item.id,
 //   title: item.title,
 //   description: item.description,
 //   createdAt: `${item.createdAt?.toDateString()}`,
 //  })
 // );
 console.log(buttonTrees);
 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable linkId={params["link-tree"]} />
   <Separator />
  </div>
 );
}
