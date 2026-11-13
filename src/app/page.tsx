
import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";
import { RecentEvents } from "@/components/home/recent-events";


export default function Home() {
  return (
    <>
      
      <main className="flex flex-1 flex-col">
        <Banner />
        <Features />
        <Gallery />
        <RecentEvents />
        <Newsletter />
      </main>
      
    </>
  );
}
