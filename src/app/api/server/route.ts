import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();

    // Retrieve the current user's profile
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract the userId from the profile
    const { id: userId } = profile;

    // // Create a new server record in the database
    const server = await db.server.create({
      data: {
        profileId: profile.id, // Optionally include profileId if needed// Assign userId associated with the profile
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    console.log(profile);

    // Return the created server as a JSON response
    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    console.error("[SERVERS_POST]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
