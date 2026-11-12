'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDays,
  CirclePlus,
  Leaf,
  MapPin,
  Pencil,
  Settings,
  Sprout,
  Trash,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

type ManageEvent = {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  description: string;
  organizer: string;
  thumbnail: string;
};

const categoryIcons: Record<string, LucideIcon> = {
  Plantation: Sprout,
  'Food Drive': UtensilsCrossed,
  Cleanup: Leaf,
};

const initialEvents: ManageEvent[] = [
  {
    _id: 'test-1',
    title: 'Test 1',
    eventType: 'Plantation',
    eventDate: '2026-11-05',
    location: 'Fugiat ut quasi non',
    description: 'Test',
    organizer: 'Dolore expedita dese',
    thumbnail: '/gallery/tree-plantation.jpg',
  },
  {
    _id: 'test-2',
    title: 'Test 2',
    eventType: 'Food Drive',
    eventDate: '2026-11-07',
    location: 'Lorem tempora dolore',
    description: 'Et natus velit magni',
    organizer: 'Dolore expedita dese',
    thumbnail: '/gallery/food-relief.jpg',
  },
];

function formatDate(eventDate: string) {
  return new Date(`${eventDate}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState(initialEvents);

  function handleView(event: ManageEvent) {
    toast.info(`Opening "${event.title}"`);
  }

  function handleEdit(event: ManageEvent) {
    toast.info(`Editing "${event.title}"`);
  }

  function handleDelete(event: ManageEvent) {
    setEvents((current) =>
      current.filter((item) => item._id !== event._id),
    );
    toast.success(`"${event.title}" deleted`);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Page header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
              <Settings className="size-3.5" />
              Organizer Dashboard
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Manage My Events
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              View, edit, and manage the social drives you have published. Only
              you have permission to edit or delete your created initiatives.
            </p>
          </div>

          <Link href="/create-event" className="shrink-0">
            <Button
              size="lg"
              className="h-11 rounded-lg bg-teal-600 px-5 text-white shadow-sm shadow-teal-600/30 hover:bg-teal-700"
            >
              <CirclePlus data-icon="inline-start" />
              Create New Event
            </Button>
          </Link>
        </div>

        <Separator className="mt-8" />

        {/* Events grid */}
        {events.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const CategoryIcon = categoryIcons[event.eventType] ?? Leaf;

              return (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Cover image with overlays */}
                  <div className="relative aspect-[8/5] overflow-hidden bg-muted">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur-sm dark:bg-black/70 dark:text-emerald-300">
                      <CategoryIcon className="size-3.5" />
                      {event.eventType}
                    </span>

                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-black/65 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
                      <CalendarDays className="size-3.5" />
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{event.title}</h2>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 shrink-0 text-teal-600 dark:text-teal-400" />
                      {event.location}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-3 border-t border-border/60 pt-3">
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <User className="size-4 shrink-0" />
                        {event.organizer}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <Button
                        variant="secondary"
                        className="h-9 flex-1"
                        onClick={() => handleView(event)}
                      >
                        View
                      </Button>
                      <Button
                        className="h-9 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-950"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil data-icon="inline-start" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="h-9"
                        aria-label={`Delete ${event.title}`}
                        onClick={() => handleDelete(event)}
                      >
                        <Trash data-icon="inline-start" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-card/50 px-6 py-16 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <CalendarDays className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold">No events yet</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              You haven&apos;t published any community drive yet. Create one and
              it will show up right here.
            </p>
            <Link href="/create-event" className="mt-5 inline-block">
              <Button className="h-10 rounded-lg bg-teal-600 px-5 text-white shadow-sm shadow-teal-600/30 hover:bg-teal-700">
                <CirclePlus data-icon="inline-start" />
                Create New Event
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
