'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  CalendarDays,
  ImagePlus,
  MapPin,
  Leaf,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const eventTypes = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Blood Donation',
  'Education',
  'Awareness Campaign',
  'Other',
];

export default function CreateEventPage() {
  const [eventDate, setEventDate] = useState<Date>();
  const [eventType, setEventType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const eventData = {
      title: formData.get('title'),
      description: formData.get('description'),
      eventType,
      thumbnail: formData.get('thumbnail'),
      location: formData.get('location'),
      eventDate: eventDate
        ? `${eventDate.getFullYear()}-${String(
            eventDate.getMonth() + 1,
          ).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`
        : '',
    };

    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:8000/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create event');
      }

      toast.success('Event created successfully!');

      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);

      toast.error(
        error instanceof Error ? error.message : 'Something went wrong!',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9F6] px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#E7F5DF] text-[#39823A]">
            <Leaf size={27} />
          </div>

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#39823A]">
            <Sparkles size={15} />
            MAKE A DIFFERENCE
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#17251A] md:text-5xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            Bring people together, inspire positive change, and create
            meaningful experiences in your community.
          </p>
        </div>

        {/* Info Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E8EDE5] bg-white p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5E7] text-[#39823A]">
              <Users size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Build Community
              </p>
              <p className="text-xs text-gray-500">Bring people together</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E8EDE5] bg-white p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5E7] text-[#39823A]">
              <CalendarCheck size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Plan Ahead</p>
              <p className="text-xs text-gray-500">Organize future events</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E8EDE5] bg-white p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5E7] text-[#39823A]">
              <Leaf size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Create Impact
              </p>
              <p className="text-xs text-gray-500">Make positive changes</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden rounded-3xl border border-[#E8EDE5] bg-white py-0 shadow-sm">
          <CardContent className="px-6 py-8 md:px-10 md:py-10">
            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Basic Information */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-[#17251A]">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Give your event a name and tell people about it.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    Event Title <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Community Tree Plantation 2026"
                    className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-[#39823A]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold"
                  >
                    Event Description <span className="text-red-500">*</span>
                  </Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event, its purpose, activities, and how people can participate..."
                    className="min-h-36 resize-y rounded-xl border-gray-200 px-4 py-3 shadow-none focus-visible:ring-[#39823A]"
                    required
                  />

                  <p className="text-xs text-gray-400">
                    Write a clear description to help people understand your
                    event.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-sm font-semibold">
                    Event Category <span className="text-red-500">*</span>
                  </Label>

                  <Select
                    value={eventType}
                    onValueChange={(value) => setEventType(value ?? '')}
                  >
                    <SelectTrigger
                      id="eventType"
                      className="h-12 w-full rounded-xl border-gray-200 px-4 shadow-none"
                    >
                      <SelectValue placeholder="Choose an event category" />
                    </SelectTrigger>

                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>

              <div className="border-t border-dashed border-gray-200" />

              {/* Event Media */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-[#17251A]">
                    Event Cover Image
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add an image that represents your event.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-sm font-semibold">
                    Thumbnail Image URL <span className="text-red-500">*</span>
                  </Label>

                  <div className="relative">
                    <ImagePlus className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="thumbnail"
                      name="thumbnail"
                      type="url"
                      placeholder="https://example.com/event-image.jpg"
                      className="h-12 rounded-xl border-gray-200 pl-11 shadow-none"
                      required
                    />
                  </div>

                  <p className="text-xs text-gray-400">
                    Use a publicly accessible image URL.
                  </p>
                </div>
              </section>

              <div className="border-t border-dashed border-gray-200" />

              {/* Location and Schedule */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-[#17251A]">
                    Location & Schedule
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Where and when will your event take place?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold">
                      Event Location <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g. Chattogram, Bangladesh"
                        className="h-12 rounded-xl border-gray-200 pl-11 shadow-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Event Date <span className="text-red-500">*</span>
                    </Label>

                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 w-full justify-start rounded-xl border-gray-200 px-4 font-normal shadow-none"
                          />
                        }
                      >
                        <CalendarDays className="mr-3 size-4 text-gray-400" />

                        <span
                          className={
                            eventDate ? 'text-gray-900' : 'text-gray-400'
                          }
                        >
                          {eventDate
                            ? formatDate(eventDate)
                            : 'Choose event date'}
                        </span>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto rounded-xl p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={eventDate}
                          onSelect={setEventDate}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date <= today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    <p className="text-xs text-gray-400">
                      Select a future date.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="rounded-2xl bg-[#F5F8F2] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#17251A]">
                      Ready to make an impact?
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Review your details before creating your event.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-[#39823A] px-7 font-semibold text-white hover:bg-[#2E6C30]"
                  >
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}

                    {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400">
          Every small action can create a meaningful change.
        </p>
      </div>
    </main>
  );
}
