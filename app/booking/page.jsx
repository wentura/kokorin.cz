import BookingPageClient from "@/components/BookingPageClient";
import Matomo from "@/components/Matomo";

export const metadata = {
  title: "Poptávka ubytování – Kokořín",
  description:
    "Centrální poptávka ubytování pro portfolio Kokořín.cz. Vyplňte termín, počet osob a typ pobytu a my doporučíme vhodný objekt nebo shortlist variant.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-3xl">
        <section className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Poptávka ubytování na Kokořínsku
          </h1>
          <p className="mt-3 text-gray-700 md:text-lg">
            Vyplňte několik základních údajů o pobytu. Pokud ještě nemáte
            vybraný konkrétní objekt, Kokořín.cz funguje jako centrální
            kvalifikační vrstva a doporučí vhodný objekt nebo shortlist
            variant z celého portfolia.
          </p>
        </section>

        <BookingPageClient />
        <Matomo />

        <p className="mt-6 text-xs text-gray-500 text-center">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů pro účely
          vyřízení vaší poptávky.
        </p>
      </div>
    </main>
  );
}
