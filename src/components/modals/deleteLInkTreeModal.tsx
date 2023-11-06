"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { buttonSchema } from "@/db/drizzle-zod/schemaValidation";
import { useModal } from "@/hooks/useModalStore";
import ky from "ky";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const DeleteLinkTreeModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const queryClient = useQueryClient();

 const isModalOpen = isOpen && type === "deleteLinkTree";

 const { linkTreeId } = data;

 const [isLoading, setIsLoading] = useState(false);

 const onClick = async () => {
  try {
   setIsLoading(true);

   await ky.delete(`/api/link-tree/${linkTreeId}`);

   await queryClient.invalidateQueries({
    queryKey: ["link-trees"],
    refetchType: "active",
   });

   toast.success("LinkTree Deleted Successfully");

   onClose();
  } catch (error: any) {
   return toast.error(error.message);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <Dialog open={isModalOpen} onOpenChange={onClose}>
   <DialogContent className="overflow-hidden">
    <DialogHeader>
     <DialogTitle className="text-2xl font-bold">
      Delete LinkTree
     </DialogTitle>
     <DialogDescription className=" text-zinc-500">
      Are you sure you want to do this? <br />
      <span className="text-gray-200 font-semibold">
       {linkTreeId}
      </span>{" "}
      will be permanently deleted.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter className="py-2">
     <Button
      className="w-full gap-2 bg-rose-400 text-gray-200 hover:text-gray-500"
      disabled={isLoading}
      onClick={onClick}
     >
      Delete
      {isLoading && (
       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
};
