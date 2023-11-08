import { create } from "zustand";

export type ModalType =
 | "createLinkTree"
 | "deleteLinkTree"
 | "editLinkTree"
 | "createButtonTree"
 | "editButtonTree"
 | "deleteButtonTree";

interface ModalData {
 linkTreeId?: string;
 linkTree?: {
  title: string;
  description: string;
 };
 buttonTreeId?: string;
 buttonTree?: {
  text: string;
  link: string;
 };
}

interface ModalStore {
 type: ModalType | null;
 data: ModalData;
 isOpen: boolean;
 onOpen: (type: ModalType, data?: ModalData) => void;
 onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
 type: null,
 data: {},
 isOpen: false,
 onOpen: (type, data = {}) =>
  set({ isOpen: true, type, data }),
 onClose: () => set({ type: null, isOpen: false }),
}));
