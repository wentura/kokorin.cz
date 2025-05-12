import Glamping from "@/components/Glamping";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kemping from "@/components/Kemping";
import Penziony from "@/components/Penziony";
export default function Page() {
  return (
    <main className="bg-gray-100">
      <Header />
      <Hero />
      <Penziony />
      <Glamping />
      <Kemping />
    </main>
  );
}
