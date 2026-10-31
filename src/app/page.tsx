import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Banner />
      </main>
    </>
  );
}
