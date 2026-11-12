
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check the user's session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Please log in to view your events." },
        { status: 401 }
      );
    }

    // Request events from Express backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-events`,
      {
        method: "GET",
        headers: {
          "x-internal-api-secret": process.env.EVENT_API_SECRET!,
          "x-user-email": session.user.email,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Fetch my events error:", error);

    return NextResponse.json(
      { message: "Failed to fetch your events." },
      { status: 500 }
    );
  }
}
