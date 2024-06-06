import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("ServerId is missing", { status: 400 });
    }
    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    console.log(server);

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("SERVER-ID", error);
    return new NextResponse("internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("ServerId is missing", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("SERVER_ID", error);
    return new NextResponse("internal Error", { status: 500 });
  }
}
