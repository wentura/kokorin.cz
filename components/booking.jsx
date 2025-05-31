"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const accommodationTypes = [
  { value: "penzion", label: "Penzion" },
  { value: "glamping", label: "Glamping" },
  { value: "kemping", label: "Kemping" },
];

export default function BookingForm({ onSuccess }) {
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
      // Send email to admin
      const adminResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "svoboda.zbynek@gmail.com",
          subject: "Nová rezervace na Kokořín.cz",
          data: data,
        }),
      });

      // Send confirmation email to user
      const userResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          subject: "Vaše rezervace na Kokořín.cz",
          data: {
            name: data.name,
            message:
              "Děkujeme za vaši rezervaci.<br />Budeme vás kontaktovat co nejdříve.<br /><br /><br />S pozdravem, tým Kokořín.cz",
          },
        }),
      });

      if (adminResponse.ok && userResponse.ok) {
        toast.success("Rezervace byla úspěšně odeslána!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to send emails");
      }
    } catch (error) {
      toast.error("Nepodařilo se odeslat rezervaci. Prosím zkuste to znovu.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-2 md:p-6 md:space-y-6 space-y-2"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-base text-gray-700">
          Jméno
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Jméno je povinné" })}
          className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            className="p-2 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dateFormat="dd/MM/yyyy"
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
            className="p-2 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dateFormat="dd/MM/yyyy"
          />
          {errors.dateTo && (
            <p className="mt-1 text-sm text-red-600">{errors.dateTo.message}</p>
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
            className="mt-1 p-2 block w-full md:w-26 rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.adults && (
            <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>
          )}
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <label
            htmlFor="infants"
            className="block text-sm font-base text-gray-700"
          >
            Počet dětí (0-15 let)
          </label>
          <input
            type="number"
            placeholder="0"
            id="infants"
            min="0"
            {...register("infants", {
              required: "Počet dětí je povinný",
              min: { value: 0, message: "Minimálně 0 dětí" },
            })}
            className="mt-1 p-2 block w-full md:w-26 rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          htmlFor="accommodation"
          className="block text-sm font-base text-gray-700"
        >
          Preferovaný typ ubytování
        </label>
        <select
          id="accommodation"
          {...register("accommodation", {
            required: "Typ ubytování je povinný",
          })}
          className="mt-1 p-2 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Vyberte typ ubytování</option>
          {accommodationTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.accommodation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.accommodation.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl uppercase font-bold tracking-tight text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-50-500 disabled:opacity-50"
      >
        {isSubmitting ? "Odesílání..." : "Odeslat rezervaci"}
      </button>
    </form>
  );
}
