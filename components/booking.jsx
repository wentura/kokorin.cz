"use client";

import { trackLeadSubmit } from "@/lib/analytics";
import { stayTypeOptions, travelIntentOptions } from "@/lib/leadOptions";
import { cs } from "date-fns/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { PrimarySubmitButton } from "@/components/PrimaryCta";

export default function BookingForm({ onSuccess, leadContext, prefill }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stayType: leadContext?.sourceCategory || "nevim_potrebuji_poradit",
      wantsRecommendation: !leadContext?.sourceObjectId,
      flexibleDates: false,
      phone: "",
      travelIntent: "rodina",
      children: 0,
      pets: 0,
      ...(prefill && typeof prefill === "object" ? prefill : {}),
    },
  });

  const dateFrom = watch("dateFrom");
  const dateTo = watch("dateTo");
  const wantsRecommendation = watch("wantsRecommendation");
  const sourceObjectName = leadContext?.sourceObjectName;
  const sourceObjectId = leadContext?.sourceObjectId;

  const formatCzDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("cs-CZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const analyticsSource = leadContext?.source || "booking-page";
    try {
      const petCount = Math.max(0, Number(data.pets ?? 0) || 0);
      const payload = {
        ...data,
        accommodation: sourceObjectName || null,
        source: leadContext?.source || "booking-page",
        sourcePage: leadContext?.sourcePage || "/booking",
        sourceSection: leadContext?.sourceSection || "booking-page",
        sourceObjectId: leadContext?.sourceObjectId || null,
        sourceObjectName: sourceObjectName || null,
        sourceCategory: leadContext?.sourceCategory || null,
        sourceWebsite: leadContext?.sourceWebsite || null,
        dateFrom: formatCzDate(data.dateFrom),
        dateTo: formatCzDate(data.dateTo),
        adults: Number(data.adults),
        children: Number(data.children || 0),
        pets: petCount,
        dogs: petCount,
        cats: 0,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageType: "lead",
          leadContext,
          data: payload,
          sendUserConfirmation: true,
        }),
      });

      const body = response.ok ? await response.json() : null;
      const routingMode = body?.routing?.routingMode ?? "unknown";

      if (response.ok) {
        trackLeadSubmit({
          outcome: "success",
          routingMode,
          source: analyticsSource,
        });
        toast.success("Poptávka byla úspěšně odeslána!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to send emails");
      }
    } catch (error) {
      trackLeadSubmit({
        outcome: "error",
        routingMode: "unknown",
        source: analyticsSource,
      });
      toast.error(
        "Nepodařilo se odeslat poptávku. Prosím zkuste to znovu a nebo nám napište na info@kokorin.cz",
      );
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-2 md:p-4 space-y-2 md:space-y-3"
    >
      <div className="text-sm text-teal-900">
        {sourceObjectName ? (
          <p>
            Vyplňujete poptávku pro <strong>{sourceObjectName}</strong>.<br />
            Chcete-li doporučit i jinou variantu ubytování, zaškrtněte „Chci doporučit…“
          </p>
        ) : (
          <p>
            Na základě informací a 
            vašich preferencí doporučíme vhodné ubytování.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-base text-gray-700">
          Jméno
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Jméno je povinné" })}
          className="mt-0 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-base text-gray-700"
        >
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="+420 123 456 789"
          {...register("phone")}
          className="mt-0 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label
            htmlFor="stayType"
            className="block text-sm font-base text-gray-700"
          >
            Typ pobytu
          </label>
          <select
            id="stayType"
            {...register("stayType", { required: "Typ pobytu je povinný" })}
            className="mt-0 p-2 block w-full rounded-md border-1 border-gray-300 bg-white shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          >
            {stayTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.stayType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stayType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="travelIntent"
            className="block text-sm font-base text-gray-700"
          >
            Pro koho pobyt vybíráte
          </label>
          <select
            id="travelIntent"
            {...register("travelIntent", {
              required: "Vyberte, pro koho pobyt hledáte",
            })}
            className="mt-0 p-2 block w-full rounded-md border-1 border-gray-300 bg-white shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          >
            <option value="">Vyberte variantu</option>
            {travelIntentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.travelIntent && (
            <p className="mt-1 text-sm text-red-600">
              {errors.travelIntent.message}
            </p>
          )}
        </div>
      </div>

      <div className="pb-1">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("wantsRecommendation")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF] focus:ring-offset-2"
          />
          <span>
            {sourceObjectName
              ? "Chci doporučit i další vhodné varianty ubytování."
              : "Chci doporučit varianty z portfolia ubytování."}
          </span>
        </label>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-base text-gray-700"
        >
          E-mail
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "E-mail je povinný",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Neplatná e-mailová adresa",
            },
          })}
          className="mt-0 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="w-full flex flex-row gap-2 items-center">
          <label
            htmlFor="dateFrom"
            className="block text-sm font-base text-gray-700 "
          >
            Od
          </label>
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setValue("dateFrom", date)}
            selectsStart
            startDate={dateFrom}
            endDate={dateTo}
            minDate={new Date()}
            className="p-2 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
            dateFormat="dd.MM.yyyy"
            locale={cs}
            calendarStartDay={1}
            placeholderText="Vyberte datum příjezdu"
            showPopperArrow={false}
            isClearable
          />
          {errors.dateFrom && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateFrom.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <label
            htmlFor="dateTo"
            className="block text-sm font-base text-gray-700"
          >
            Do
          </label>
          <DatePicker
            selected={dateTo}
            onChange={(date) => setValue("dateTo", date)}
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            minDate={dateFrom}
            className="p-2 mt-0 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
            dateFormat="dd.MM.yyyy"
            locale={cs}
            calendarStartDay={1}
            placeholderText="Vyberte datum odjezdu"
            showPopperArrow={false}
            isClearable
          />
          {errors.dateTo && (
            <p className="mt-0 text-sm text-red-600">{errors.dateTo.message}</p>
          )}
        </div>
      </div>
      <div className="">
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("flexibleDates")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF] focus:ring-offset-2"
          />
          <span>Termín je flexibilní, pokud bude vhodnější jiná varianta.</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-end">
        <div className="flex flex-row flex-wrap gap-2 items-center mt-0">
          <label
            htmlFor="adults"
            className="text-sm font-base text-gray-700 shrink-0 whitespace-nowrap"
          >
            Dospělí
          </label>
          <input
            type="number"
            id="adults"
            placeholder="2"
            min="1"
            {...register("adults", {
              required: "Počet dospělých je povinný",
              min: { value: 1, message: "Minimálně 1 dospělý" },
            })}
            className="mt-0 p-2 min-w-0 flex-1 rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          />
          {errors.adults && (
            <p className="w-full mt-1 text-sm text-red-600">
              {errors.adults.message}
            </p>
          )}
        </div>

        <div className="flex flex-row flex-wrap gap-2 items-center">
          <label
            htmlFor="children"
            className="text-sm font-base text-gray-700 shrink-0 whitespace-nowrap"
          >
            Děti 3–10 let
          </label>
          <input
            type="number"
            placeholder="0"
            id="children"
            min="0"
            {...register("children")}
            className="mt-0 p-2 min-w-0 flex-1 rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          />
          {errors.children && (
            <p className="w-full mt-1 text-sm text-red-600">
              {errors.children.message}
            </p>
          )}
        </div>

        <div className="flex flex-row flex-wrap gap-2 items-center">
          <label
            htmlFor="pets"
            className="text-sm font-base text-gray-700 shrink-0 whitespace-nowrap"
          >
            Mazlíčci
          </label>
          <input
            type="number"
            id="pets"
            min="0"
            {...register("pets", { min: { value: 0, message: "Minimum 0" } })}
            className="mt-0 p-2 min-w-0 flex-1 rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          />
          {errors.pets && (
            <p className="w-full mt-0 text-sm text-red-600">
              {errors.pets.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="hidden text-sm font-base text-gray-700"
        >
          Poznámka k poptávce
        </label>
        <textarea
          id="notes"
          rows="3"
          placeholder="Poznámky k vaší rezervaci..."
          {...register("notes")}
          className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
        />
      </div>

      <div className="text-xs text-gray-500">
        Vaše informace budou použity výhradně pro zpracování vaší poptávky.<br />Další užití je proti našim morálním zásadám.
      </div>

      <PrimarySubmitButton disabled={isSubmitting} size="formSubmit">
        {isSubmitting ? "Odesílání..." : "Odeslat poptávku"}
      </PrimarySubmitButton>
    </form>
  );
}
