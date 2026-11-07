import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/event';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



const AllEventsPage = async () => {
  let events: IEvent[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      cache: 'no-store',
    });

    const data = await res.json();
    events = data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-green-600">
            Future Community Drives
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Explore Upcoming events, connect with your community, and become
            part of something bigger.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                {event.thumbnail ? (
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-green-50 text-green-600">
                    No Image Available
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow">
                  {event.eventType}
                </span>
              </div>

              {/* Event Information */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                  {event.title}
                </h3>

                <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-500">
                  {event.description}
                </p>

                <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <p>
                    📅{' '}
                    {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
                      'en-US',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      },
                    )}
                  </p>

                  <p>📍 {event.location}</p>
                </div>
              </div>
              <div>
                <Button className="group h-11 w-full rounded-none bg-[#39823A] px-5 text-white transition-colors hover:bg-[#2E6C30]">
                  <Link
                    href={`/events/${event._id}`}
                    className="flex items-center justify-between"
                  >
                    <span className="flex-1 text-center">View Event</span>
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllEventsPage;
