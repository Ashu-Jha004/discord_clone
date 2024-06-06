"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/actio-tooltop";

interface NavigationItemsProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemsProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <>
      <ActionTooltip side="right" align="center" label={name}>
        <button onClick={onClick} className="group relative flex items-center ">
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transistion-all w-[5px]",
              params?.serverId !== id && "group-hover:h-[20px]",
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />{" "}
          <div
            className={cn(
              "releative group flex mx-5 items-center justify-center w-[80px] h-[80px] rounded-[24px] group-hover:rounded-[16px] transistiton-all overflow-hidden",
              params?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image width={80} height={80} alt="Channel" src={imageUrl} />
          </div>
        </button>
      </ActionTooltip>
    </>
  );
};
