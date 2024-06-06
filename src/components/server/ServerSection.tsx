"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "../../../types";
import { ActionTooltip } from "../actio-tooltop";
import { Plus, Settings } from "lucide-react";
import { useModal } from "../../../hooks/use-modal-store";
interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectiontype: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}
const ServerSection = ({
  label,
  role,
  sectiontype,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text">
        {label}
      </p>
      {role != MemberRole.GUEST && sectiontype === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel")}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transistion"
          >
            <Plus className="h-4 2-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectiontype === "members" && (
        <ActionTooltip label="settings" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transistion"
          >
            <Settings className="h-4 2-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
