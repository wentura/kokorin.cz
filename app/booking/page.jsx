import BookingModal from "@/components/BookingModal";

export const metadata = {
  title: "Poptávka ubytování – Kokořín",
  description:
    "Jednoduchý poptávkový formulář pro ubytování na Kokořínsku. Vyplňte termín, počet osob a preferovaný typ ubytování.",
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
            Vyplňte prosím několik základních údajů o vašem pobytu. Ozveme se
            vám zpět s nabídkou konkrétního ubytování.
          </p>
        </section>

        <BookingModal isOpen={true} onClose={() => {}} />

        <p className="mt-6 text-xs text-gray-500 text-center">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů pro účely
          vyřízení vaší poptávky.
        </p>
      </div>
    </main>
  );
}
