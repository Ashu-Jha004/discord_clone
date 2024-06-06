"use client";
import { Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";
import qs from "query-string";
import { format } from "date-fns";
import { Fragment, useRef, ElementRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSocket } from "../providers/socket-providers";
import { useChatQuery } from "../../../hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import Chat_Items from "./Chat-Items";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { useChatScroll } from "../../../hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm";
interface ChatMessageProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const ChatMessage = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessageProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  useChatSocket({ queryKey, addKey, updateKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });
  console.log("status", status);

  if (status === "pending") {
    return (
      <>
        <div className="flex flex-col flex-1 justify-center items-center">
          <ServerCrash className="text-xs text-zinc-500 dark:text-zinc-500  my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Something went wrong...
          </p>
        </div>
      </>
    );
  } else if (status === "error") {
    return (
      <>
        <div className="flex flex-col flex-1 justify-center items-center">
          <ServerCrash className="text-xs text-zinc-500 dark:text-zinc-500 animate-spin my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Something went wrong...
          </p>
        </div>
      </>
    );
  }
  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 2-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button className=" text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transistion">
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto scroll-auto ">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((Message: MessageWithMemberWithProfile) => (
              <Chat_Items
                currentMember={member}
                member={Message.member}
                key={Message.id}
                id={member.id}
                content={Message.content}
                fileUrl={Message.fileUrl}
                deleted={Message.deleted}
                timestamp={format(new Date(Message.createdAt), DATE_FORMAT)}
                isUpdated={Message.updatedAt !== Message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessage;
