import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation"; // Updated import for useRouter
import { db } from "@/lib/db";
import React from "react";

interface InviteCodeProps {
  params: {
    inviteCode: string;
  };
}

const InviteCode: React.FC<InviteCodeProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn(); // Redirect to sign-in if profile is not available
  }

  if (!params.inviteCode) {
    return redirect("/"); // Redirect if inviteCode is missing
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    alert("Server already exists");
    return redirect(`/servers/${existingServer.id}`); // Redirect to existing server if found
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`); // Redirect to newly created server
  }

  // Call the invite code verification function on component mount
  // Empty dependency array ensures it runs only once after component mount

  return null; // Render nothing in this component as we are handling redirects
};

export default InviteCode;
