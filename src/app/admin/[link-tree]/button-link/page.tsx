"use client";

import HeaderTable from "./buttonTable/HeaderTable";
import { Separator } from "@/components/ui/separator";
import ky from "ky";
import {
 ButtonTreeColumn,
 columns,
} from "./buttonTable/columns";
import { useQuery } from "@tanstack/react-query";
import { catchError } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table";

export async function getButtonLinks(linkTreeId: string) {
 const res = await ky.get(
  `/api/link-tree/${linkTreeId}/button`
 );
 const users = (await res.json()) as dataButtonTreeType;
 return users;
}

type dataButtonTreeType = {
 data: ButtonTreeColumn[];
};

export default function ButtonLink({
 params,
}: {
 params: { ["link-tree"]: string };
}) {
 const { data, error, isLoading } =
  useQuery<dataButtonTreeType>({
   queryKey: ["button-trees"],
   queryFn: () => getButtonLinks(params["link-tree"]),
  });

 if (isLoading) return "Loading...";

 if (error) {
  catchError(error);
 }

 //  console.log(data);
 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable linkId={params["link-tree"]} />
   <Separator />
   <DataTable
    searchKey="text"
    columns={columns}
    data={data?.data ? data?.data : []}
   />
  </div>
 );
}
