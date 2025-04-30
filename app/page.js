import Glamping from "@/components/Glamping";
import Hero from "@/components/Hero";
import Kemping from "@/components/Kemping";
import Penziony from "@/components/Penziony";
export default function Page() {
  return (
    <main className="bg-gray-100 flex flex-col gap-24">
      <Hero />
      <Penziony />
      <Glamping />
      <Kemping />
    </main>
  );
}
