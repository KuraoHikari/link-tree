"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

const HeaderTable = ({ linkId }: { linkId: string }) => {
 const { onOpen } = useModal();
 return (
  <div className="flex items-center justify-between">
   <div>
    <h2 className="text-3xl font-bold tracking-tight">
     Button Link
    </h2>
    <p className="text-sm text-muted-foreground">
     Manage button on your "{linkId}" link-tree
    </p>
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
