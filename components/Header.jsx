import Image from "next/image";

export default function Header() {
  return (
    <header className="relative h-24 md:h-44 2xl:h-80 w-full flex items-end overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dam7wdzvx/image/upload/v1747266139/Kamil/kokorin_header.webp"
        alt="Kokořínsko - kraj pískovcových skal"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        quality={80}
      />
      <div className="relative w-full bg-black/35">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-gray-100 text-xs md:text-sm tracking-[0.25em] uppercase">
              Kokořín.cz
            </span>
            <h1 className="text-gray-50 text-lg md:text-3xl 2xl:text-4xl font-extralight tracking-tight">
              Kokořínsko – nejlepší místo pro vaši dovolenou
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
