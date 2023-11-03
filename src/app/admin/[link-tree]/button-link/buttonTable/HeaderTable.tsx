"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderTable = ({ linkId }: { linkId: string }) => {
 const { onOpen } = useModal();
 const router = useRouter();
 return (
  <div className="flex items-center justify-between">
   <div className="flex gap-4 items-center">
    <Button
     variant="outline"
     size="icon"
     type="button"
     onClick={() => router.back()}
    >
     <ChevronLeft className="h-4 w-4" />
    </Button>
    <div>
     <h2 className="text-3xl font-bold tracking-tight">
      Button Link
     </h2>
     <p className="text-sm text-muted-foreground">
      Manage button on your "{linkId}" link-tree
     </p>
    </div>
   </div>

   <Button
    onClick={() =>
     onOpen("createButtonTree", { linkTreeId: linkId })
    }
   >
    <Plus className="mr-2 h-4 w-4" /> Add New
   </Button>
  </div>
 );
};

export default HeaderTable;
