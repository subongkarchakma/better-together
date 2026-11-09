import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Sprout,
  Users,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/*
 * Background photo: community volunteers with the litter they collected during
 * a neighbourhood clean-up — "CFAS SCPOA Conducts Inaugural Community Cleanup",
 * U.S. Navy, public domain (Wikimedia Commons).
 */

const stats = [
  { icon: Users, value: "820+", label: "Active Neighbors", color: "text-emerald-400" },
  { icon: CheckCircle2, value: "260+", label: "Drives Completed", color: "text-teal-400" },
  { icon: Home, value: "15,000+", label: "Residents Helped", color: "text-violet-400" },
  { icon: Sprout, value: "100%", label: "Community Run", color: "text-amber-400" },
];

export function Banner() {
  return (
    <section id="drives" className="relative isolate overflow-hidden">
      {/* Background photo of a community service day */}
      <Image
        src="/hero-community-service.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Readability gradient + brand tint so white copy stays legible */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/85" />
      <div className="absolute inset-0 bg-emerald-950/25" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          <Leaf className="size-3.5" />
          Social Development, One Drive at a Time
        </span>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl sm:leading-[1.15]">
          Show Up. Lend a Hand.{" "}
          <span className="text-emerald-400">
            Build a Stronger Community.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-pretty text-white/85">
          BetterTogether is where neighbors turn compassion into community
          service: weekend cleanups, food and blanket relief, winter clothing
          rounds, tree-planting afternoons, and book shares — the everyday work
          of social development, organized by the people on your street.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/events">
            <Button
              size="lg"
              className="rounded-full bg-emerald-500 px-5 text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-600"
            >
              Explore Upcoming Events
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
          <Link href="/create-event">
            <Button
              size="lg"
              className="rounded-full border border-white/30 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Sprout data-icon="inline-start" />
              Create Your Own Event
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-4 py-5 shadow-sm backdrop-blur-sm"
            >
              <Icon className={`mb-1 size-4 ${color}`} />
              <dd className="text-xl font-bold text-white">{value}</dd>
              <dt className="text-xs text-white/70">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
