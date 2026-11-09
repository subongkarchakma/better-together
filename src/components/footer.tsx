import Link from 'next/link';
import {
  CalendarCheck,
  Globe,
  HeartHandshake,
  MapPin,
  SquarePen,
  type LucideIcon,
} from 'lucide-react';

type PlatformLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const platformLinks: PlatformLink[] = [
  { label: 'Upcoming Events', href: '/events', icon: CalendarCheck },
  { label: 'Create an Event', href: '/create-event', icon: SquarePen },
  { label: 'Manage My Events', href: '/events' },
  { label: 'My Joined Events', href: '/events' },
];

const activeCauses = [
  { label: 'Winter Clothes & Blanket Relief', dot: 'bg-teal-600' },
  { label: 'City Clean-up & Waste Segregation', dot: 'bg-teal-600' },
  { label: 'Urban Tree Plantation Drives', dot: 'bg-teal-600' },
  { label: 'Underprivileged Meal Sharing', dot: 'bg-orange-500' },
  { label: 'Free Medical & Health Camps', dot: 'bg-blue-500' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
                <HeartHandshake className="size-5" />
              </span>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                BetterTogether
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A community-driven event management platform empowering everyday
              citizens to create, join, and track impactful social development
              drives.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              Dhaka, Bangladesh • Nationwide impact
            </p>
          </div>

          {/* Explore Platform */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Explore Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {platformLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {Icon ? (
                      <Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                    ) : null}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Causes */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Active Causes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {activeCauses.map(({ label, dot }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Community Spirit */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Community Spirit
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every small action counts. Connect with local volunteers, turn
              compassion into direct community aid, and be the change your city
              needs.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
              <Globe className="size-3.5" />
              100% Volunteer Driven
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} BetterTogether. Built with care for
            community service and social development.
          </p>
          <p className="flex items-center gap-1">Made for a better tomorrow</p>
        </div>
      </div>
    </footer>
  );
}
