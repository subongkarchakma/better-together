import {
  ArrowRight,
  Leaf,
  Sprout,
  Users,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "820+", label: "Active Neighbors", color: "text-emerald-600 dark:text-emerald-400" },
  { icon: CheckCircle2, value: "260+", label: "Drives Completed", color: "text-teal-600 dark:text-teal-400" },
  { icon: Home, value: "15,000+", label: "Residents Helped", color: "text-violet-600 dark:text-violet-400" },
  { icon: Sprout, value: "100%", label: "Community Run", color: "text-amber-600 dark:text-amber-400" },
];

export function Banner() {
  return (
    <section
      id="drives"
      className="bg-gradient-to-b from-emerald-100/70 via-rose-50/40 to-background dark:from-emerald-950/40 dark:via-background dark:to-background"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
          <Leaf className="size-3.5" />
          Community-Powered Neighborhood Volunteering
        </span>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl sm:leading-[1.15]">
          Show Up Where You Live.{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Grow the Block You Love.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-pretty text-muted-foreground">
          BetterTogether is where neighbors team up on the things that matter
          close to home: weekend park cleanups, food and book shares, winter
          clothing rounds, and tree-planting afternoons — all organized by
          people on your street.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-emerald-600 px-5 text-white shadow-sm shadow-emerald-600/30 hover:bg-emerald-700"
          >
            Explore Upcoming Drives
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-white/80 px-5 dark:bg-input/30"
          >
            <Sprout data-icon="inline-start" className="text-emerald-600 dark:text-emerald-400" />
            Host Your Own Drive
          </Button>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border/60 bg-white/80 px-4 py-5 shadow-sm backdrop-blur dark:bg-input/20"
            >
              <Icon className={`mb-1 size-4 ${color}`} />
              <dd className={`text-xl font-bold ${color}`}>{value}</dd>
              <dt className="text-xs text-muted-foreground">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
