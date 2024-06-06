"use client";
import axios from "axios";
import { Input } from "../ui/input";
import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { useModal } from "../../../hooks/use-modal-store";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { useOrigin } from "../../../hooks/use-origin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import queryString from "query-string";

const DeleteChannelModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server, channel } = data;
  const params = useParams();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteChannel";
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${params?.serverId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this :{" "}
            <span className="font-semibold text-indigo-500">
              # {channel?.name}
            </span>{" "}
            server ?
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <DialogFooter>
            <div className="flex items-center justify-between w-full ">
              <Button
                disabled={isLoading}
                onClick={onClose}
                variant={"primary"}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={onClick}
                variant={"destructive"}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </div>
        .
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
