"use client";

import { trackLeadSubmit } from "@/lib/analytics";
import { cs } from "date-fns/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { PrimarySubmitButton } from "@/components/PrimaryCta";
import { toast } from "react-hot-toast";

export default function BookingForm({ onSuccess, accommodation, contact }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const dateFrom = watch("dateFrom");
  const dateTo = watch("dateTo");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageType: "legacyPair",
          adminTo: contact,
          data: {
            ...data,
            accommodation: accommodation,
          },
        }),
      });

      const body = response.ok ? await response.json() : null;
      const routingMode = body?.routing?.routingMode ?? "unknown";

      if (response.ok) {
        trackLeadSubmit({
          outcome: "success",
          routingMode,
          source: "kemp-box",
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
        source: "kemp-box",
      });
      toast.error(
        "Nepodařilo se odeslat poptávku. Prosím zkuste to znovu a nebo nám napište na info@harasov.eu",
      );
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg mb-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Kempové místo (box)
        </h3>
        <p className="text-gray-600 mb-2">
          1000,- (800,-) za box velikosti 10×10m
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>4 (2) bytosti (dospělí, děti, psi, kočky)</li>
          <li>obytné auto nebo auto + karavan nebo auto + stan(y)</li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 md:p-6 md:space-y-6 space-y-2"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-base text-gray-700"
          >
            Jméno
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Jméno je povinné" })}
            className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
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
            className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
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
              className="p-2 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
              dateFormat="dd.MM.yyyy"
              locale={cs}
              calendarStartDay={1}
              placeholderText="Vyberte datum odjezdu"
              showPopperArrow={false}
              isClearable
            />
            {errors.dateTo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dateTo.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
          <div className="w-full flex flex-row gap-2 items-center">
            <label
              htmlFor="adults"
              className="block text-sm font-base text-gray-700"
            >
              Počet dospělých
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
              className="mt-1 p-2 block w-full md:w-26 rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
            />
            {errors.adults && (
              <p className="mt-1 text-sm text-red-600">
                {errors.adults.message}
              </p>
            )}
          </div>

          <div className="w-full flex flex-row gap-2 items-center">
            <label
              htmlFor="infants"
              className="block text-sm font-base text-gray-700"
            >
              Počet dětí (3-10 let)
            </label>
            <input
              type="number"
              placeholder="0"
              id="infants"
              min="0"
              {...register("infants")}
              className="mt-1 p-2 block w-full md:w-26 rounded-md border-1 border-gray-300 shadow-sm focus:border-[#1A6E6E] focus:outline-none focus:ring-2 focus:ring-[#7DD3CF]"
            />
            {errors.infants && (
              <p className="mt-1 text-sm text-red-600">
                {errors.infants.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="hidden md:block text-sm font-base text-gray-700"
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

        <PrimarySubmitButton disabled={isSubmitting} size="formSubmit">
          {isSubmitting ? "Odesílání..." : "Odeslat poptávku"}
        </PrimarySubmitButton>
      </form>
    </div>
  );
}
