import { create } from "zustand";
import { ChannelType, Server, Channel } from "@prisma/client";

export type ModalType =
  | "createServer"
  | "invite"
  | "members"
  | "editServer"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "messageFile";

interface ModelData {
  apiUrl?: string | any;
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  query?: Record<string, any> | any;
}

interface ModalStore {
  type: ModalType | null;
  data: ModelData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModelData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {
    server: undefined,
    channel: undefined,
    channelType: "TEXT", // Set a default value for channelType or adjust as needed
  },
  isOpen: false,
  onOpen: (type, data = { channelType: "TEXT" }) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
