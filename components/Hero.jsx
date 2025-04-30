import HoverPanel from "@/components/HoverPanel";

export default function Hero() {
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <HoverPanel
        title="Glamping"
        image="https://dummyimage.com/1000x1000/ddaa00/dcdcdc.png"
        href="#glamping"
        position="left"
      />
      <HoverPanel
        title="Penziony"
        image="https://dummyimage.com/1000x1000/aacc00/daa338.png"
        href="#penziony"
        position="center"
      />
      <HoverPanel
        title="Kempy"
        image="https://dummyimage.com/1000x1000/33cc00/d38463.png"
        href="#kemping"
        position="right"
      />
    </main>
  );
}
