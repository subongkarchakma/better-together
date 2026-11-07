import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  const event: IEvent = await res.json();

 return (
  <section className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto max-w-5xl px-4">

      {/* Back Button */}
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
      >
        <ArrowLeft size={18} />
        Back to Events
      </Link>

      {/* Event Details Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Event Image */}
        <div className="relative h-64 w-full bg-gray-100 md:h-105">
          {event.thumbnail && (
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Event Information */}
        <div className="p-6 md:p-10">

          <span className="inline-block rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            {event.eventType}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
            {event.title}
          </h1>

          {/* Date and Location */}
          <div className="mt-6 flex flex-col gap-4 border-y border-gray-100 py-5 text-gray-600 sm:flex-row sm:gap-10">
            <p className="flex items-center gap-2">
              <CalendarDays className="text-green-600" size={20} />
              {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="text-green-600" size={20} />
              {event.location}
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              About This Event
            </h2>

            <p className="leading-8 whitespace-pre-line text-gray-600">
              {event.description}
            </p>
          </div>

          {/* Join Event Button */}
          <div className="mt-10 border-t border-gray-100 pt-7">
            <Button className="h-12 w-full rounded-xl bg-[#39823A] text-base font-semibold text-white hover:bg-[#2E6C30] sm:w-auto sm:px-10">
              Join Event
            </Button>
          </div>

        </div>
      </div>
    </div>
  </section>
);
};

export default EventDetailsPage;