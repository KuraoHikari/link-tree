"use client";

import { useEffect, useState } from "react";
import { CreateLinkTreeModal } from "../modals/createLInkTreeModal";
import { CreateButtonTreeModal } from "../modals/createButttonTree";

export const ModalProvider = () => {
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
 }, []);

 if (!isMounted) {
  return null;
 }

 return (
  <>
   <CreateLinkTreeModal />
   <CreateButtonTreeModal />
  </>
 );
};
