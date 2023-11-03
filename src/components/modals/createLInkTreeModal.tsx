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

const formSchema = linkTreeSchema.omit({
 id: true,
 userId: true,
 createdAt: true,
});

export const CreateLinkTreeModal = () => {
 const { isOpen, onClose, type } = useModal();
 const queryClient = useQueryClient();

 const isModalOpen = isOpen && type === "createLinkTree";

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   title: "",
   description: "",
  },
 });

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  try {
   await ky.post("/api/link-tree", { json: values }).json();
   await queryClient.invalidateQueries({
    queryKey: ["link-trees"],
    refetchType: "active",
   });
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
      Create LinkTree
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
        Create
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
