import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Droplets,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Megaphone,
  Sprout,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { getDb } from "@/lib/mongo";

// Shape of the event documents stored in MongoDB (collections `events`
// and `userEvents` in the `better-together` database).
type StoredEvent = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail?: string;
};

type UpcomingEvent = StoredEvent & { _id: string };

const categoryIcons: Record<string, LucideIcon> = {
  Plantation: Sprout,
  Cleanup: Leaf,
  Donation: Heart,
  Education: BookOpen,
  "Food Drive": UtensilsCrossed,
  "Blood Donation": Droplets,
  "Awareness Campaign": Megaphone,
};

/** "2026-11-20" -> "2026-11-20" comparable local-midnight date string. */
function todayString() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function organizerName(email?: string) {
  if (!email) return "BetterTogether Team";
  const [local = ""] = email.split("@");
  const name = local
    .split(/[.\-_+]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return name || "BetterTogether Team";
}

function daysUntil(eventDate: string) {
  const target = new Date(`${eventDate}T00:00:00`).getTime();
  const start = new Date(`${todayString()}T00:00:00`).getTime();
  return Math.round((target - start) / 86_400_000);
}

function relativeLabel(eventDate: string) {
  const days = daysUntil(eventDate);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

/**
 * Read the six soonest upcoming events straight from MongoDB, merging the
 * `events` and `userEvents` collections.
 */
async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  try {
    const db = getDb();
    const filter = { eventDate: { $gte: todayString() } };
    const sort = { eventDate: 1 as const };

    const [legacy, community] = await Promise.all([
      db
        .collection<StoredEvent>("events")
        .find(filter)
        .sort(sort)
        .limit(6)
        .toArray(),
      db
        .collection<StoredEvent>("userEvents")
        .find(filter)
        .sort(sort)
        .limit(6)
        .toArray(),
    ]);

    return [...legacy, ...community]
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
      .slice(0, 6)
      .map((doc) => ({ ...doc, _id: String(doc._id) }));
  } catch (error) {
    console.error("Failed to load upcoming events from MongoDB:", error);
    return [];
  }
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const Icon = categoryIcons[event.eventType] ?? CalendarDays;
  const [month, day] = new Date(`${event.eventDate}T00:00:00`)
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .split(" ");
  const organizer = organizerName(event.creatorEmail);
  const initial = organizer.charAt(0).toUpperCase();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-7/5 overflow-hidden bg-muted">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/25" />

        <span className="absolute top-3 left-3 inline-flex max-w-[calc(100%-5.5rem)] items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <Icon className="size-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
          <span className="truncate">{event.eventType}</span>
        </span>

        <div className="absolute bottom-3 left-3 rounded-lg bg-slate-900/90 px-3 py-1.5 text-center text-white shadow-sm backdrop-blur-sm">
          <div className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
            {month}
          </div>
          <div className="text-lg leading-none font-bold">{day}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold text-balance">
          {event.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400">
          <MapPin className="size-4 shrink-0" />
          <span className="truncate">{event.location}</span>
        </p>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-600/10 text-xs font-bold text-teal-700 dark:text-teal-300">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{organizer}</p>
            <p className="text-xs text-muted-foreground">Organizer</p>
          </div>
          <span className="ml-auto shrink-0 text-xs font-semibold text-teal-600 dark:text-teal-400">
            {relativeLabel(event.eventDate)}
          </span>
        </div>

        <Link
          href={`/events/${event._id}`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 text-sm font-semibold text-white shadow-sm shadow-teal-600/25 transition-colors hover:bg-teal-700"
        >
          View Event
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export async function RecentEvents() {
  // Opt this tree out of prerendering so the query always runs per request.
  await connection();
  const events = await getUpcomingEvents();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-orange-500 uppercase dark:text-orange-400">
              <Flame className="size-4" />
              Upcoming Initiatives
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Recent Upcoming Events
            </h2>
            <p className="mt-3 text-muted-foreground">
              The next six community drives on the calendar — grab a spot before
              the start date, every pair of hands counts.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            View All Events
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/40 px-6 py-16 text-center">
            <CalendarDays className="size-8 text-teal-600 dark:text-teal-400" />
            <h3 className="mt-4 text-lg font-bold">No upcoming events yet</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              New drives are added all the time. Check back soon, or start one
              yourself.
            </p>
            <Link
              href="/create-event"
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              Create an Event
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
