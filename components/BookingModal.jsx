"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import BookingForm from "./booking";

export default function BookingModal({
  isOpen,
  onClose,
  leadContext,
  prefill,
}) {
  const title = leadContext?.sourceObjectName
    ? `Poptávka ubytování\n${leadContext.sourceObjectName}`
    : "Centrální poptávka ubytování";

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={onClose}
          aria-label="Poptávkový formulář na ubytování"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900 mb-4 text-center"
                  >
                    {title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </Dialog.Title>
                  <div className="mt-2 max-h-[min(80vh,900px)] overflow-y-auto pr-1">
                    <BookingForm
                      key={
                        isOpen
                          ? `${leadContext?.sourceObjectId ?? "generic"}-${prefill?.dateFrom instanceof Date ? prefill.dateFrom.getTime() : "nd"}`
                          : "closed"
                      }
                      onSuccess={onClose}
                      leadContext={leadContext}
                      prefill={prefill}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Toaster position="top-center" />
    </>
  );
}
