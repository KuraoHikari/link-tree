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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { linkTreeSchema } from "@/db/drizzle-zod/schemaValidation";
import { useModal } from "@/hooks/useModalStore";
import ky from "ky";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const formSchema = linkTreeSchema.omit({
 id: true,
 userId: true,
 createdAt: true,
});

export const EditLinkTreeModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const queryClient = useQueryClient();

 const isModalOpen = isOpen && type === "editLinkTree";

 const { linkTreeId, linkTree } = data;

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   title: "",
   description: "",
  },
 });

 useEffect(() => {
  if (linkTree) {
   form.setValue("title", linkTree.title);
   form.setValue("description", linkTree.description);
  }
 }, [linkTree, form]);

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  try {
   await ky
    .patch(`/api/link-tree/${linkTreeId}`, { json: values })
    .json();
   await queryClient.invalidateQueries({
    queryKey: ["link-trees"],
    refetchType: "active",
   });

   toast.success("Link-tree Edited Successfully");
   form.reset();
   onClose();
  } catch (error: any) {
   return toast.error(error.message);
  }
 };

 const handleClose = () => {
  form.reset();
  onClose();
 };

 return (
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
   <DialogContent className="overflow-hidden">
    <DialogHeader>
     <DialogTitle className="text-2xl font-bold">
      Edit LinkTree
     </DialogTitle>
    </DialogHeader>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
     >
      <div className="space-y-4">
       <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter title"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
           <Textarea
            placeholder="LinkTree Description"
            className="resize-y"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <DialogFooter>
       <Button
        type="submit"
        className="w-full gap-2"
        disabled={isLoading}
       >
        Save
        {isLoading && (
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
