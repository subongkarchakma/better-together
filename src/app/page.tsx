
import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";

export default function Home() {
  return (
    <>
      
      <main className="flex flex-1 flex-col">
        <Banner />
        <Features />
      </main>
    </>
  );
}
