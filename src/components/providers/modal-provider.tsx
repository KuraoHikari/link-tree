"use client";

import { useEffect, useState } from "react";
import { CreateLinkTreeModal } from "../modals/createLInkTreeModal";

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
  </>
 );
};
