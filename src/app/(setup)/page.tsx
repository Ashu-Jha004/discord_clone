import React from "react";
import { intialProfile } from "@/lib/intial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import IntialModal from "@/components/modals/intial-modal";
import Upload from "@/components/Upload";

const SetupPage = async () => {
  const profile = await intialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <>
      <IntialModal />;
    </>
  );
};

export default SetupPage;
