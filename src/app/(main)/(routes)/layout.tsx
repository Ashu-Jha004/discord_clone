import NavigationSidebar from "@/components/navigation/NavigationSidebar";
import React from "react";

const layout = async ({ children }: { children: any }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[122px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[122px] h-full">{children}</main>
    </div>
  );
};

export default layout;
