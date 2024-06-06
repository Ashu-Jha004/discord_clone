"use client";
import axios from "axios";
import { Input } from "../ui/input";
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

const LeaveServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const router = useRouter();
  const isModalOpen = isOpen && type === "leaveServer";
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      await axios.patch(`/api/server/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
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
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave this :{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
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

export default LeaveServerModal;
