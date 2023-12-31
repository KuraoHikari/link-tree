"use client";

import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useModal } from "@/hooks/useModalStore";
import ky from "ky";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FileWarning, Loader2 } from "lucide-react";

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
  <AlertDialog open={isModalOpen}>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle className="flex gap-2 items-center">
      <FileWarning className="h-5 w-5" /> Are you absolutely
      sure?
     </AlertDialogTitle>
     <AlertDialogDescription>
      This action cannot be undone. This will permanently
      delete your{" "}
      <span className="font-bold text-gray-200">
       {linkTreeId}
      </span>{" "}
      and remove your data from our servers.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel
      disabled={isLoading}
      onClick={onClose}
     >
      Cancel
     </AlertDialogCancel>
     <AlertDialogAction
      disabled={isLoading}
      onClick={onClick}
     >
      Continue{" "}
      {isLoading && (
       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
};
