"use client";

import { useSocket } from "./providers/socket-providers";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  console.log(isConnected);
  if (!isConnected) {
    return (
      <>
        <Badge
          variant={"outline"}
          className=" bg-yellow-600 text-white border-none"
        >
          FallBack: polling every 1sec.
        </Badge>
      </>
    );
  }

  return (
    <>
      <Badge
        variant={"outline"}
        className=" bg-emerald-600 text-white border-none"
      >
        Live: Real time connection!
      </Badge>
    </>
  );
};
