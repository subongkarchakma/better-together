import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Banner />
        <Features />
      </main>
    </>
  );
}
