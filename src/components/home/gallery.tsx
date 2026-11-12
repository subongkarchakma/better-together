import Image from 'next/image';
import { Image as ImageIcon, MapPin } from 'lucide-react';

type GalleryMoment = {
  image: string;
  alt: string;
  tag: string;
  title: string;
  location: string;
};

const moments: GalleryMoment[] = [
  {
    image: '/gallery/winter-clothes.jpg',
    alt: 'Volunteers handing out folded sweaters and blankets at a winter clothing drive',
    tag: 'Warmth for Rickshaw Pullers',
    title: 'Winter Clothes Drive',
    location: 'Mirpur-10, Dhaka',
  },
  {
    image: '/gallery/night-blanket.jpg',
    alt: 'Volunteers laying out blankets at a night-time relief distribution',
    tag: 'Shelterless Night Support',
    title: 'Night Blanket Relief',
    location: 'Mohammadpur, Dhaka',
  },
  {
    image: '/gallery/lake-cleanup.jpg',
    alt: 'Two volunteers collecting litter into bags along a sandy shore',
    tag: 'Eco Plastic-Free Waters',
    title: 'Dhanmondi Lake Clean-up',
    location: 'Dhanmondi, Dhaka',
  },
  {
    image: '/gallery/tree-plantation.jpg',
    alt: 'A gloved volunteer holding a young tree seedling',
    tag: '1000 Green Saplings',
    title: 'Urban Tree Plantation',
    location: 'Uttara, Dhaka',
  },
  {
    image: '/gallery/food-relief.jpg',
    alt: 'A volunteer handing a bag of food rations to an elderly couple',
    tag: 'Fresh Meals Sharing',
    title: 'Community Food Relief',
    location: 'Old Dhaka',
  },
  {
    image: '/gallery/book-bag-drive.jpg',
    alt: 'Children lining up with new backpacks at a relief camp',
    tag: 'Education for Underprivileged',
    title: 'Children Book & Bag Drive',
    location: 'Rayerbazar, Dhaka',
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-teal-600 text-white shadow-sm shadow-teal-600/30">
              <ImageIcon className="size-3.5" />
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase dark:text-teal-400">
              Visual Stories
            </span>
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Community in Action
          </h2>
          <p className="mt-3 text-muted-foreground">
            Moments from volunteer drives, relief distributions, and green
            initiatives across Dhaka and beyond.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((moment) => (
            <article
              key={moment.title}
              className="group rounded-2xl border border-border/60 bg-card p-1 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-7/5 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-block rounded-md bg-teal-600 px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                    {moment.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    {moment.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-white/85">
                    <MapPin className="size-3.5 shrink-0" />
                    {moment.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
