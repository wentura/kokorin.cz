"use client";

import { trackBookingModalOpen } from "@/lib/analytics";
import { trackInternalCtaClick } from "@/lib/analytics";
import { createLeadContext } from "@/lib/leadOptions";
import { filterPortfolioObjects } from "@/lib/portfolioObjects";
import { PrimaryLink } from "@/components/PrimaryCta";
import { cs } from "date-fns/locale";
import Link from "next/link";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccommodationResultCard from "@/components/AccommodationResultCard";
import BookingModal from "./BookingModal";

const CATEGORY_KEYS = ["penzion", "glamping", "kemping"];

const CATEGORY_LABEL = {
  penzion: "Penzion",
  glamping: "Glamping",
  kemping: "Kemp",
};

const ADULTS_MAX = 24;
const CHILDREN_MAX = 20;
const PETS_MAX = 30;
const QUICK_SCENARIOS = [
  { key: "family", label: "S dětmi u vody", adults: 2, children310: 2, pets: 0, styleTag: "u vody" },
  { key: "romantic", label: "Romantický víkend", adults: 2, children310: 0, pets: 0, styleTag: "pro páry" },
  { key: "forest", label: "V lese a v klidu", adults: 2, children310: 0, pets: 1, styleTag: "v lese" },
  { key: "caravan", label: "Karavan / stan", adults: 2, children310: 1, pets: 1, category: "kemping", styleTag: "karavan" },
  { key: "group", label: "Skupina / firma", adults: 8, children310: 0, pets: 0, styleTag: "pro skupiny" },
  { key: "hiking", label: "Cyklo a turistika", adults: 2, children310: 0, pets: 0, styleTag: "cyklo" },
];

const dateInputClass =
  "w-full min-w-0 bg-transparent border-0 p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 " +
  "focus:outline-none focus:ring-0 cursor-pointer";

const selectInputClass =
  "w-full bg-transparent border-0 p-0 text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 cursor-pointer";

function formatChildrenOption(n) {
  if (n === 0) return "žádné";
  if (n === 1) return "1 dítě";
  if (n >= 2 && n <= 4) return `${n} děti`;
  return `${n} dětí`;
}

function formatPetsOption(n) {
  if (n === 0) return "žádný";
  if (n === 1) return "1 mazlíček";
  if (n >= 2 && n <= 4) return `${n} mazlíčci`;
  return `${n} mazlíčků`;
}

export default function AccommodationSearchSection() {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children310, setChildren310] = useState(0);
  const [pets, setPets] = useState(0);
  const [categoryToggles, setCategoryToggles] = useState({
    penzion: true,
    glamping: true,
    kemping: true,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLeadContext, setModalLeadContext] = useState(null);
  const [modalPrefill, setModalPrefill] = useState(null);
  const [activeScenario, setActiveScenario] = useState("");

  const categoriesForFilter = useMemo(() => {
    return CATEGORY_KEYS.filter((k) => categoryToggles[k]);
  }, [categoryToggles]);

  const filtered = useMemo(
    () =>
      filterPortfolioObjects({
        adults,
        children310,
        pets,
        categories: categoriesForFilter,
        styleTag: activeScenario
          ? QUICK_SCENARIOS.find((s) => s.key === activeScenario)?.styleTag
          : "",
      }),
    [adults, children310, pets, categoriesForFilter, activeScenario],
  );

  const toggleCategory = (key) => {
    setActiveScenario("");
    setCategoryToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyScenario = (scenario) => {
    setAdults(scenario.adults);
    setChildren310(scenario.children310);
    setPets(scenario.pets);
    setActiveScenario(scenario.key);
    if (scenario.category) {
      setCategoryToggles({
        penzion: scenario.category === "penzion",
        glamping: scenario.category === "glamping",
        kemping: scenario.category === "kemping",
      });
    } else {
      setCategoryToggles({ penzion: true, glamping: true, kemping: true });
    }
    trackInternalCtaClick(`scenario_${scenario.key}`, "homepage-search");
  };

  const openBooking = (object) => {
    setModalLeadContext(
      createLeadContext({
        source: "homepage-search",
        sourcePage: "/",
        sourceSection: "accommodation-search",
        object,
      }),
    );
    setModalPrefill({
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      adults,
      children: children310,
      pets,
      stayType: object.category,
      wantsRecommendation: false,
    });
    trackBookingModalOpen("homepage-search");
    setModalOpen(true);
  };

  const adultsOptions = useMemo(
    () => Array.from({ length: ADULTS_MAX }, (_, i) => i + 1),
    [],
  );

  const childrenOptions = useMemo(
    () => Array.from({ length: CHILDREN_MAX + 1 }, (_, i) => i),
    [],
  );

  const petsOptions = useMemo(
    () => Array.from({ length: PETS_MAX + 1 }, (_, i) => i),
    [],
  );

  return (
    <section
      id="ubytovani-filtr"
      className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-8 md:mt-12 mb-10 md:mb-16 relative z-10 scroll-mt-24"
    >
      <p className="text-xs sm:text-sm text-gray-600 leading-snug mb-3">
        Termín, počet osob, mazlíčků a typ ubytování zužují seznam níže.<br />Kalendář{" "}
        <strong>neověřuje obsazenost</strong> – jde o{" "}
        <strong>nezávaznou poptávku</strong>, kterou potvrdí provozovatel.
      </p>

      {/* <div className="mb-4 flex flex-wrap gap-2">
        {QUICK_SCENARIOS.map((scenario) => (
          <button
            key={scenario.key}
            type="button"
            onClick={() => applyScenario(scenario)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeScenario === scenario.key
                ? "bg-[#1A6E6E] text-white border-[#1A6E6E]"
                : "bg-white text-gray-800 border-gray-300 hover:border-[#1A6E6E] hover:text-[#1A6E6E]"
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div> */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex flex-col justify-center gap-0.5 px-4 py-3">
            <label
              htmlFor="search-date-from"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Datum příjezdu
            </label>
            <DatePicker
              id="search-date-from"
              selected={dateFrom}
              onChange={(d) => {
                setDateFrom(d);
                if (dateTo && d && dateTo < d) setDateTo(null);
              }}
              selectsStart
              startDate={dateFrom}
              endDate={dateTo}
              minDate={new Date()}
              className={dateInputClass}
              dateFormat="dd.MM.yyyy"
              locale={cs}
              calendarStartDay={1}
              placeholderText="dd.mm.yyyy"
              showPopperArrow={false}
              isClearable
              popperClassName="react-datepicker-brand z-[80]"
            />
          </div>

          <div className="flex flex-col justify-center gap-0.5 px-4 py-3">
            <label
              htmlFor="search-date-to"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Datum odjezdu
            </label>
            <DatePicker
              id="search-date-to"
              selected={dateTo}
              onChange={setDateTo}
              selectsEnd
              startDate={dateFrom}
              endDate={dateTo}
              minDate={dateFrom || new Date()}
              className={dateInputClass}
              dateFormat="dd.MM.yyyy"
              locale={cs}
              calendarStartDay={1}
              placeholderText="dd.mm.yyyy"
              showPopperArrow={false}
              isClearable
              popperClassName="react-datepicker-brand z-[80]"
            />
          </div>

          <div className="flex flex-col justify-center gap-0.5 px-4 py-3">
            <label
              htmlFor="search-adults-select"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Počet dospělých
            </label>
            <select
              id="search-adults-select"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={selectInputClass}
            >
              {adultsOptions.map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? "1 osoba" : `${n} osob`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center gap-0.5 px-4 py-3">
            <label
              htmlFor="search-children-select"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Děti 3–10 let
            </label>
            <select
              id="search-children-select"
              value={children310}
              onChange={(e) => setChildren310(Number(e.target.value))}
              className={selectInputClass}
            >
              {childrenOptions.map((n) => (
                <option key={n} value={n}>
                  {formatChildrenOption(n)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center gap-0.5 px-4 py-3">
            <label
              htmlFor="search-pets-select"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Mazlíčci
            </label>
            <select
              id="search-pets-select"
              value={pets}
              onChange={(e) => setPets(Number(e.target.value))}
              className={selectInputClass}
            >
              {petsOptions.map((n) => (
                <option key={n} value={n}>
                  {formatPetsOption(n)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center gap-1.5 px-4 py-3">
            <span
              className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
              id="search-type-label"
            >
              Typ ubytování
            </span>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-labelledby="search-type-label"
            >
              {CATEGORY_KEYS.map((key) => {
                const on = categoryToggles[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleCategory(key)}
                    className={`rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold transition-colors border shrink-0 ${
                      on
                        ? "bg-[#1A6E6E] text-white border-[#1A6E6E]"
                        : "bg-gray-50 text-gray-800 border-gray-300 hover:border-[#1A6E6E] hover:text-[#1A6E6E]"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3CF] focus-visible:ring-offset-2`}
                  >
                    {CATEGORY_LABEL[key]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <PrimaryLink
            href="/booking"
            size="pillEnd"
            trackingName="booking_from_filter"
            trackingSource="homepage-search"
            className="!rounded-none !w-full !text-white !bg-[#1A6E6E] hover:!bg-[#155858]"
          >
            <span className="leading-tight text-center">
              Poslat poptávku
              <span className="inline"> ubytování</span>
            </span>
          </PrimaryLink>
        </div>
      </div>

      <div id="search-results" className="mt-10">
        {/* <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "místo odpovídá kritériím"
              : "míst odpovídá kritériím"}
          </p>
        </div> */}

        {categoriesForFilter.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
            Vyberte alespoň jeden typ ubytování.
          </p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
            Pro zadané údaje nemáme v portfoliu žádný objekt s dostatečnou
            kapacitou. Zkuste snížit počet osob nebo mazlíčků, případně{" "}
            <Link
              href="/booking"
              className="font-medium underline underline-offset-2 text-teal-800"
            >
              napište centrální poptávku
            </Link>
            .
          </p>
        ) : (
          <ul className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filtered.map((item) => (
              <AccommodationResultCard
                key={item.id}
                item={item}
                onBooking={openBooking}
              />
            ))}
          </ul>
        )}
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        leadContext={modalLeadContext}
        prefill={modalPrefill}
      />
    </section>
  );
}
