"use Client";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../userAvatar";
import { ActionTooltip } from "../actio-tooltop";
import { useRouter, useParams } from "next/navigation";
import {
  Crown,
  Edit,
  FileIcon,
  ShieldCheck,
  Trash,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const roleIconMap = {
  GUEST: <User className="h-4 w-4 ml-2 text-green-500" />,
  ADMIN: <Crown className="h-4 w-4 ml-2 text-rose-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
};
const Chat_Items = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content]);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isMODERATOR = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isMODERATOR || isOwner);
  const canEditMessage = !deleted && (isAdmin || isOwner) && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = !isPdf && fileUrl;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoading = form.formState.isSubmitting;
  const params = useParams();
  const router = useRouter();
  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }
    router.push(`/servers/${params?.serverId}/conversation/${member.id}`);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: ` ${socketUrl}/${id}`,
        query: socketQuery,
      });
      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="releative group flex items-center hover:bg-black/5 p-4 scroll-auto transistion w-full">
        <div className="group flex gap-x-2 items-start w-full">
          <div
            onClick={onMemberClick}
            className="cursor-pointer hover:drop-shadow-md transistion"
          >
            <UserAvatar src={member.profile.imageUrl} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2">
              <div className="flex items-center">
                <p className="font-semibold text-sm hover:underline cursor-pointer">
                  {member.profile.name}
                </p>
                <ActionTooltip label={member.role}>
                  {roleIconMap[member.role]}
                </ActionTooltip>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
            {isImage && (
              <a
                title="_blank"
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
              >
                <Image
                  src={fileUrl}
                  alt={content}
                  fill
                  className="object-cover"
                />
              </a>
            )}
            {isPdf && (
              <div className="releative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-500" />
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noonpener noreferrer"
                  className="ml-2 text-2m text-indigo-500 dark:text-indigo-500"
                >
                  PDF File
                </a>
              </div>
            )}
            {!fileUrl && !isEditing && (
              <p
                className={cn(
                  "text-big p-2 text-zinc-700 dark:text-zinc-300 ",
                  deleted &&
                    "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}
              >
                {content}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
            {!fileUrl && isEditing && (
              <Form {...form}>
                <form
                  className="flex items-center w-full gap-x-2 pt-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                              placeholder="Edit the message"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm">
                    Save
                  </Button>
                  <span className="text-[10px] mt-1 text-zinc-400">
                    {" "}
                    Press escape to cancel to save
                  </span>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat_Items;
