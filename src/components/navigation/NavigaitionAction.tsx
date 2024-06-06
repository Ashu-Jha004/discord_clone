"use client";
import React from "react";
import { Plus } from "lucide-react";
import { ActionTooltip } from "../actio-tooltop"; // Corrected import path
import { useModal } from "../../../hooks/use-modal-store";
import { Button } from "../ui/button";

const NavigationAction = () => {
  const { onOpen } = useModal();

  const handleOpenModal = () => {
    onOpen("createServer");
  };

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <Button
          variant={"ghost"}
          className="group flex items-center"
          onClick={handleOpenModal} // Use a separate handler function
        >
          <div className="flex mx-3 h-12 w-12 rounded-full group-hover:rounded-md transition-all overflow-hidden items-center justify-center bg-background dark:bg-neural-700 group-hover:bg-green-500">
            <Plus
              className="group-hover:text-white transition text-green-500"
              size={25}
            />
          </div>
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
