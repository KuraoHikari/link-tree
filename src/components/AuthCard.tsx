"use client";

import { catchError, cn } from "@/lib/utils";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

const AuthCard = ({ className, ...props }: CardProps) => {
 const session = useSession();
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const router = useRouter();

 useEffect(() => {
  if (session?.status === "authenticated") {
   router.push("/admin");
  }
 }, [session?.status, router]);

 const loginWithGoogle = async () => {
  setIsLoading(true);

  try {
   await signIn("google");
  } catch (error) {
   catchError(error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <Card
   className={cn(
    "w-[380px] bg-gray-50 bg-opacity-80 px-4 py-8 shadow sm:px-10",
    className
   )}
   {...props}
  >
   <CardHeader>
    <CardTitle>Sign-Up</CardTitle>
    <CardDescription>
     To Create your own link-tree.
    </CardDescription>
   </CardHeader>
   <CardContent className="grid gap-4">
    <Button
     type="button"
     disabled={isLoading}
     onClick={loginWithGoogle}
    >
     <FcGoogle className="text-lg" />
     <p className="ms-2">Google</p>
    </Button>
   </CardContent>
  </Card>
 );
};

export default AuthCard;
