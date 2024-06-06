"use client";

import { useParams, useRouter } from "next/navigation";
import { ShieldAlert, ShieldCheck, UserRound } from "lucide-react";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import UserAvatar from "../userAvatar";
import { profile } from "console";
import { cn } from "@/lib/utils";
interface ServermemberProps {
  member: Member & { profile: Profile };
  server: Server;
}
const roleIconMap = {
  [MemberRole.GUEST]: <UserRound className="mr-2 h-4 w-4 text-green-600" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-600" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-700" />,
};
const ServerMember = ({ member, server }: ServermemberProps) => {
  const params = useParams();
  const router = useRouter();
  const icon = roleIconMap[member.role];
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversation/${member.id}`);
  };
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transistion mb-1",
          params?.memberId === member.id && "bg-zinc-700/20 dark:text-zinc-700"
        )}
      >
        <UserAvatar
          className="h-8 w-8 md:h-8 md:w-8"
          src={member.profile.imageUrl}
        />
        {icon}
        <p
          className={cn(
            "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transistion",
            params?.memberId === member.id && "text-primary dark:text-zinc-200"
          )}
        >
          {member.profile.name}
        </p>
      </button>
    </>
  );
};

export default ServerMember;

//////////////////////////////////////////////////////
