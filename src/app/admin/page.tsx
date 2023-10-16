"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import ky from "ky";

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
  <div>
   <Button onClick={() => signOut()}>
    <h1>Sign Out</h1>
   </Button>

   <Button onClick={() => onSubmit()}>
    <h1>onSubmit</h1>
   </Button>
  </div>
 );
}
