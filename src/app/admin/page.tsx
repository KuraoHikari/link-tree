"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import ky from "ky";
import { Plus } from "lucide-react";

export default function AdminPage() {
 const onSubmit = async () => {
  try {
   const res = await ky.post("/api/link-tree");
   const json = await res.json();

   console.log(
    "🚀 ~ file: page.tsx:13 ~ onSubmit ~ json:",
    json
   );
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <div className="flex items-center justify-between">
    <div>
     <h2 className="text-3xl font-bold tracking-tight">
      Link Tree
     </h2>
     <p className="text-sm text-muted-foreground">
      Manage link-tree for you
     </p>
    </div>
    <Button onClick={() => {}}>
     <Plus className="mr-2 h-4 w-4" /> Add New
    </Button>
   </div>
  </div>
 );
}
