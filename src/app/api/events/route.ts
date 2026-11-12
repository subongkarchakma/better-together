import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verify request origin
    const origin = request.headers.get("origin");

    if (!origin || origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { message: "Invalid request origin." },
        { status: 403 }
      );
    }

    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Please log in to create an event." },
        { status: 401 }
      );
    }

    // Get form data
    const eventData = await request.json();

    // Forward event data to Express
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-secret": process.env.EVENT_API_SECRET!,
        },
        body: JSON.stringify({
          ...eventData,
          creatorEmail: session.user.email,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return NextResponse.json(
      { message: "Something went wrong while creating the event." },
      { status: 500 }
    );
  }
}
