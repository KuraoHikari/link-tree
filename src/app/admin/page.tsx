import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
 LinkTreeColumn,
 columns,
} from "./adminTable/columns";
import HeaderTable from "./adminTable/headerTable";
import ky from "ky";
import { toast } from "sonner";

export default function AdminPage() {
 //fectch data from client
 //  const formattedBillboards: LinkTreeColumn[] =
 //  FetchLinkTree.map((item) => ({
 //    id: item.id,
 //    label: item.label,
 //    createdAt: format(item.createdAt, "MMMM do, yyyy"),
 //   }));

 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable />
   <Separator />
   <DataTable
    searchKey="label"
    columns={columns}
    data={[]}
   />
  </div>
 );
}
