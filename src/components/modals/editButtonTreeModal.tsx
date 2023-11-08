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
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { buttonSchema } from "@/db/drizzle-zod/schemaValidation";
import { useModal } from "@/hooks/useModalStore";
import ky from "ky";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const formSchema = buttonSchema.omit({
 id: true,
 userId: true,
 linkTreeId: true,
});

export const EditButtonTreeModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const queryClient = useQueryClient();

 const isModalOpen = isOpen && type === "editButtonTree";

 const { linkTreeId, buttonTreeId, buttonTree } = data;

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   text: "",
   link: "",
  },
 });

 useEffect(() => {
  if (buttonTree) {
   form.setValue("text", buttonTree.text);
   form.setValue("link", buttonTree.link);
  }
 }, [buttonTree, form]);

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  try {
   await ky
    .patch(
     `/api/link-tree/${linkTreeId || ""}/button/${
      buttonTreeId || ""
     }`,
     {
      json: values,
     }
    )
    .json();
   await queryClient.invalidateQueries({
    queryKey: ["button-trees"],
    refetchType: "active",
   });

   toast.success("Button Edited Successfully");

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
      Create ButtonTree
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
        name="text"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Text</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter text"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Link</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter link"
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
