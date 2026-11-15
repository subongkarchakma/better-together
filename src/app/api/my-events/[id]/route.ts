import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { message: 'Please log in to delete this event.' },
      { status: 401 },
    );
  }

  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-events/${id}`,
    {
      method: 'DELETE',
      headers: {
        'x-internal-api-secret': process.env.EVENT_API_SECRET!,
        'x-user-email': session.user.email,
      },
      cache: 'no-store',
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  // Verify the logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { message: 'Please log in to edit this event.' },
      { status: 401 },
    );
  }

  const { id } = await params;
  const body = await request.json();

  // Forward the request to Express
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-events/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-api-secret': process.env.EVENT_API_SECRET!,
        'x-user-email': session.user.email,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
