"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    if (!email) return;
    setSubscribed(true);
    form.reset();
  }

  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-linear-to-br from-teal-100/70 via-white to-muted/60 px-8 py-12 text-center shadow-sm sm:px-12">
          <p className="text-xs font-bold tracking-[0.18em] text-teal-600 uppercase dark:text-teal-400">
            Stay Connected
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Subscribe to Local Cause Alerts
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Get notified when new winter drives, blanket distributions, or
            emergency cleanups are organized in your neighborhood.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-11 w-full rounded-lg bg-white px-4 sm:w-72"
            />
            <Button
              type="submit"
              className="h-11 rounded-lg bg-teal-600 px-5 text-white shadow-sm shadow-teal-600/30 hover:bg-teal-700"
            >
              <Send />
              Subscribe
            </Button>
          </form>

          <p
            className="mt-5 text-xs text-muted-foreground"
            aria-live="polite"
          >
            {subscribed
              ? "You're on the list — watch your inbox for the next drive."
              : "No spam guaranteed. Unsubscribe at any time."}
          </p>
        </div>
      </div>
    </section>
  );
}
