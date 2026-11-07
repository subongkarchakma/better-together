import {
  CalendarCheck,
  CalendarClock,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  chip: string;
};

const features: Feature[] = [
  {
    icon: Users,
    title: "Neighbor-Run Drives",
    description:
      "Anyone can kick off a cleanup, clothing round, or food share for their block — no committee required.",
    chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    icon: CalendarCheck,
    title: "One-Tap Sign-Up",
    description:
      "Spot a drive you like? Claim your spot in a single tap and get updates straight from the organizer.",
    chip: "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    icon: ShieldCheck,
    title: "Creator Controls",
    description:
      "Edit details, message volunteers, and track attendance for your own drives with built-in organizer tools.",
    chip: "bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400",
  },
  {
    icon: CalendarClock,
    title: "Always the Next Thing",
    description:
      "Feeds only show active, future-dated drives, so every listing you see still needs volunteers.",
    chip: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
  },
];

export function Features() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">
            Why BetterTogether
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Made for Real Neighborhoods
          </h2>
          <p className="mt-3 text-muted-foreground">
            A simple toolkit that turns willing neighbors into organized
            volunteers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, chip }) => (
            <article
              key={title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={`mb-4 grid size-10 place-items-center rounded-xl ${chip}`}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
