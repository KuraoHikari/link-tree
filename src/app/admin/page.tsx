import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
 LinkTreeColumn,
 columns,
} from "./adminTable/columns";
import HeaderTable from "./adminTable/headerTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";

export default async function AdminPage() {
 const session = await getServerSession(authOptions);

 if (!session?.user?.id) {
  return null;
 }

 //find all link-tree user have
 const linkTrees = await db.query.linkTrees.findMany({
  where: (linkTrees, { eq }) =>
   eq(linkTrees.userId, session?.user?.id),
 });

 const formattedLinkTrees: LinkTreeColumn[] = linkTrees.map(
  (item) => ({
   id: item.id,
   title: item.title,
   description: item.description,
   createdAt: `${item.createdAt?.toDateString()}`,
  })
 );

 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable />
   <Separator />
   <DataTable
    searchKey="title"
    columns={columns}
    data={formattedLinkTrees}
   />
  </div>
 );
}
