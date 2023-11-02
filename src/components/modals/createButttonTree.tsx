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

const formSchema = buttonSchema.omit({
 id: true,
 userId: true,
 linkTreeId: true,
});

export const CreateButtonTreeModal = () => {
 const { isOpen, onClose, type, data } = useModal();

 const isModalOpen = isOpen && type === "createButtonTree";

 const { linkTreeId } = data;

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   text: "",
   link: "",
  },
 });

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  try {
   await ky
    .post(`/api/link-tree/${linkTreeId || ""}/button`, {
     json: values,
    })
    .json();

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
        Create
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
