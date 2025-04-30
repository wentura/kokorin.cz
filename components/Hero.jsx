import HoverPanel from "@/components/HoverPanel";

export default function Hero() {
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <HoverPanel
        title="Web A"
        image="https://dummyimage.com/1000x1000/ddaa00/dcdcdc.png"
        href="/web-a"
        position="left"
      />
      <HoverPanel
        title="Web B"
        image="https://dummyimage.com/1000x1000/aacc00/daa338.png"
        href="/web-b"
        position="center"
      />
      <HoverPanel
        title="Web C"
        image="https://dummyimage.com/1000x1000/33cc00/d38463.png"
        href="/web-c"
        position="right"
      />
    </main>
  );
}
