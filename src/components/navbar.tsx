'use client';

import {
  CalendarCheck,
  CalendarDays,
  HeartHandshake,
  LayoutDashboard,
  LogIn,
  Moon,
  PlusCircle,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            <HeartHandshake className="size-5" />
          </span>
          <span className="leading-tight">
            <Link href={'/'}>
              <span className="block text-sm font-bold text-emerald-700 dark:text-emerald-400">
                BetterTogether
              </span>
            </Link>

            <span className="block text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Neighbors Helping Neighbors
            </span>
          </span>
        </div>

        {/* Center link */}
        <Link
          href="/events"
          className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
        >
          <CalendarCheck className="size-4" />
          Upcoming Events
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle dark mode"
            className="rounded-full"
            onClick={toggleTheme}
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
          {user ? (
            <div className="flex items-center gap-1">
              <Popover>
                <PopoverTrigger
                  render={
                    <Avatar>
                      <AvatarImage src={user?.image as string} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  }
                ></PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>
                      {user?.email}
                    </PopoverDescription>

                    <div className="space-y-1 py-2">
                      <Link
                        href="/create-event"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        <PlusCircle size={17} />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        <LayoutDashboard size={17} />
                        Manage Event
                      </Link>

                      <Link
                        href="/my-booking"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        <CalendarDays size={17} />
                        Joined Event
                      </Link>
                    </div>
                    <Button onClick={handleSignOut} variant={'destructive'}>
                      <LogIn data-icon="inline-start" />
                      Sign out
                    </Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
              <Button onClick={handleSignOut} variant={'destructive'}>
                <LogIn data-icon="inline-start" />
                Sign out
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="rounded-lg text-white bg-[#2c722d]" variant="outline">
                <LogIn data-icon="inline-start" />
                Log in
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
