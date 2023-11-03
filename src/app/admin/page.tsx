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
import { catchError } from "@/lib/utils";

export async function getLinkTrees() {
 const res = await ky.get("api/link-tree");
 const users = (await res.json()) as dataLinkTreeType;
 return users;
}

type dataLinkTreeType = {
 data: LinkTreeColumn[];
};

export default function AdminPage() {
 const { data, error, isLoading } =
  useQuery<dataLinkTreeType>({
   queryKey: ["link-trees"],
   queryFn: () => getLinkTrees(),
  });

 if (isLoading) return "Loading...";

 if (error) {
  catchError(error);
 }

 const formattedLinkTrees = data?.data?.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  createdAt: `${new Date(item.createdAt).toLocaleDateString(
   "en-GB"
  )}`,
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
