import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatHeader from "../../../../../../../components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessage from "@/components/chat/Chat-Message";
import ServerId from "../../page";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";
interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelID = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white  dark:bg-[#313338] flex flex-col h-[580px]">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessage
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />

          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              ChannelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <>
          <MediaRoom chatId={channel.id} video={false} audio={false} />
        </>
      )}
      {channel.type === ChannelType.VIDEO && (
        <>
          <MediaRoom chatId={channel.id} video={true} audio={false} />
        </>
      )}
    </div>
  );
};

export default ChannelID;
