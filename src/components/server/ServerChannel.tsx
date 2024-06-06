"use client";

import { Channel, MemberRole, Server, ChannelType } from "@prisma/client";
import React from "react";
import {
  Hash,
  Mic,
  Shield,
  Video,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Edit,
  Trash,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../actio-tooltop";
import { useModal } from "../../../hooks/use-modal-store";
interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};
const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const param = useParams();
  const router = useRouter();

  const { onOpen } = useModal();
  const onlick = () => {
    return router.push(`/servers/${param?.serverId}/channels/${channel.id}`);
  };
  const Icon = iconMap[channel.type];
  return (
    <>
      <div className="space-y-[4px]">
        <button
          onClick={onlick}
          className={cn(
            "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transistion mb-1",
            param?.channelId == channel.id &&
              "bg-zinc-700/20 dark:text-zinc-700"
          )}
        >
          <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          <p
            className={cn(
              "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transistion",
              param?.ChannelId === channel.id &&
                "text-primary dark:text-zinc-200"
            )}
          >
            {channel.name}
          </p>
          {channel.name !== "genral" && role !== MemberRole.GUEST && (
            <div className="ml-auto flex items-center gap-x-2">
              <ActionTooltip label="Edit">
                <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transistion " />
              </ActionTooltip>
              <ActionTooltip label="trash">
                <Trash
                  onClick={() => onOpen("deleteChannel", { server, channel })}
                  className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transistion "
                />
              </ActionTooltip>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default ServerChannel;
