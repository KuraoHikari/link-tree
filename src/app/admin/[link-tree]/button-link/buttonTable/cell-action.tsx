"use client";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonTreeColumn } from "./columns";

import { Button } from "@/components/ui/button";
import {
 Copy,
 Edit,
 FolderOpen,
 MoreHorizontal,
 Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CellActionProps {
 data: ButtonTreeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
 data,
}) => {
 const router = useRouter();
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
 }, []);

 if (!isMounted) {
  return null;
 }
 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
     <span className="sr-only">Open menu</span>
     <MoreHorizontal className="h-4 w-4" />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => {}}>
     <Copy className="mr-2 h-4 w-4" /> Copy link
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => {}}>
     <Edit className="mr-2 h-4 w-4" /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem
     onClick={() =>
      router.push(`admin/${data.id}/button-link`)
     }
    >
     <FolderOpen className="mr-2 h-4 w-4" /> View Button
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => {}}>
     <Trash className="mr-2 h-4 w-4" /> Delete
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};