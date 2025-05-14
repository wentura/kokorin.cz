import HoverPanel from "@/components/HoverPanel";

export default function Hero() {
  return (
    <main className="h-[50vh] min-h-[200px] md:min-h-[400px] w-full flex flex-col md:flex-row overflow-hidden">
      <HoverPanel
        title="Glamping a tiny house"
        image="https://dummyimage.com/1000x1000/ddaa00/dcdcdc.png"
        href="#glamping"
        position="left"
      />
      <HoverPanel
        title="Penziony"
        image="https://www.harasov.eu/gallery/titulka_a_tiny.jpg"
        href="#penziony"
        position="center"
      />
      <HoverPanel
        title="Kempy a tábořiště"
        image="https://dummyimage.com/1000x1000/33cc00/d38463.png"
        href="#kemping"
        position="right"
      />
    </main>
  );
}
