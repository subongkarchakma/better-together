
import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";


export default function Home() {
  return (
    <>
      
      <main className="flex flex-1 flex-col">
        <Banner />
        <Features />
        <Gallery />
        <Newsletter />
      </main>
      
    </>
  );
}
