import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import NavigationSidebar from "./navigation/NavigationSidebar";
import ServerSidebar from "./server/ServerSidebar";
const mobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" variant={"ghost"} size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0  flex gap-0">
          <div className="w-[120px]">
            <NavigationSidebar />
          </div>

          <ServerSidebar serverId={serverId} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default mobileToggle;
