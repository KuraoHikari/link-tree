"use client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
 LinkTreeColumn,
 columns,
} from "./adminTable/columns";
import HeaderTable from "./adminTable/headerTable";
import ky from "ky";
import { useQuery } from "@tanstack/react-query";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { db } from "@/db";

async function getLinkTrees() {
 const res = await ky.get("api/link-tree");
 const users = (await res.json()) as PostType;
 return users;
}

type PostType = {
 data: {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
 }[];
};

export default function AdminPage() {
 const { data, error, isLoading } = useQuery<PostType>({
  queryKey: ["link-trees"],
  queryFn: () => getLinkTrees(),
 });

 if (isLoading) return "Loading...";

 if (error)
  return "An error has occurred: " + error.message;

 const formattedLinkTrees = data?.data?.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  createdAt: `${item.createdAt?.toString()}`,
 }));

 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable />
   <Separator />
   <DataTable
    searchKey="title"
    columns={columns}
    data={formattedLinkTrees ? formattedLinkTrees : []}
   />
  </div>
 );
}
