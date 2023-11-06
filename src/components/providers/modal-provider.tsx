"use client";

import { useEffect, useState } from "react";
import { CreateLinkTreeModal } from "../modals/createLInkTreeModal";
import { CreateButtonTreeModal } from "../modals/createButttonTree";
import { DeleteLinkTreeModal } from "../modals/deleteLInkTreeModal";

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
   <DeleteLinkTreeModal />
  </>
 );
};
