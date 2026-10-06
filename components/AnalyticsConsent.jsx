"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const consentKey = "kamil_ga4_analytics_consent_v2";
const validId = /^G-[A-Z0-9]+$/.test(measurementId || "");
let volatileChoice = null;

function validChoice(value) {
  try {
    const saved = typeof value === "string" ? JSON.parse(value) : value;
    return (saved?.choice === "granted" || saved?.choice === "denied") &&
      Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now()
      ? saved.choice
      : null;
  } catch {
    return null;
  }
}

function readChoice() {
  try {
    return validChoice(window.localStorage.getItem(consentKey));
  } catch {
    return validChoice(volatileChoice);
  }
}

function saveChoice(choice) {
  const expires = new Date();
  if (choice === "granted") expires.setFullYear(expires.getFullYear() + 1);
  else expires.setMonth(expires.getMonth() + 6);
  volatileChoice = { choice, expiresAt: expires.getTime() };
  try {
    window.localStorage.setItem(consentKey, JSON.stringify(volatileChoice));
    window.localStorage.removeItem("kamil_ga4_analytics_consent_v1");
  } catch {
    // A blocked storage API must not prevent the visitor from making a choice.
  }
  window.dispatchEvent(new Event("kamil-ga4-consent-changed"));
}

function subscribeToChoice(onStoreChange) {
  const onStorage = (event) => {
    if (event.key === consentKey) window.location.reload();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("kamil-ga4-consent-changed", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("kamil-ga4-consent-changed", onStoreChange);
  };
}

function removeAnalyticsCookies() {
  const domains = ["", `; domain=${window.location.hostname}`];
  const parts = window.location.hostname.split(".");
  if (parts.length > 2) domains.push(`; domain=.${parts.slice(-2).join(".")}`);

  for (const item of document.cookie.split(";")) {
    const name = item.trim().split("=")[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
}

function startAnalytics() {
  if (!validId || window.__kamilGa4Started) return;
  window.__kamilGa4Started = true;
  window.__kamilAnalyticsConsent = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function PageViews({ enabled }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    if (!enabled || !validId) return;
    startAnalytics();
    const currentUrl = window.location.href;
    if (window.__kamilGa4LastPage === currentUrl) return;
    window.gtag("event", "page_view", {
      page_location: currentUrl,
      page_title: document.title,
      page_referrer: window.__kamilGa4LastPage || document.referrer,
      send_to: measurementId,
    });
    window.__kamilGa4LastPage = currentUrl;
  }, [enabled, pathname, query]);

  return null;
}

export default function AnalyticsConsent() {
  const choice = useSyncExternalStore(subscribeToChoice, readChoice, () => "loading");
  const ready = choice !== "loading";
  const [settingsOpen, setSettingsOpen] = useState(false);

  function choose(nextChoice) {
    const hadAnalytics = choice === "granted";
    saveChoice(nextChoice);
    setSettingsOpen(false);
    if (nextChoice === "denied" && hadAnalytics) {
      window.__kamilAnalyticsConsent = false;
      removeAnalyticsCookies();
      window.location.reload();
    }
  }

  if (!validId) return null;

  return (
    <>
      <Suspense fallback={null}>
        <PageViews enabled={ready && choice === "granted"} />
      </Suspense>
      {ready && (choice === null || settingsOpen) ? (
        <section
          aria-label="Nastavení analytických cookies"
          className="fixed inset-x-3 bottom-3 z-[9999] mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-900 shadow-lg sm:p-5"
        >
          <p className="mb-3 leading-relaxed">
            S vaším souhlasem používáme Google Analytics, abychom věděli, jak lidé naše stránky používají a co můžeme zlepšit. Bez souhlasu měření nespustíme. Volbu můžete kdykoli změnit v Nastavení cookies. <a href="/informace-o-cookies" className="underline underline-offset-2">Více o cookies</a>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-lg border border-neutral-800 bg-white px-4 py-2 font-medium text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Odmítnout
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Povolit analytiku
            </button>
            {choice !== null && (
              <button type="button" onClick={() => setSettingsOpen(false)} className="px-2 py-2 underline">
                Zavřít
              </button>
            )}
          </div>
        </section>
      ) : ready ? (
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-3 text-xs text-neutral-700">
          <button type="button" onClick={() => setSettingsOpen(true)} className="underline underline-offset-2">
            Nastavení cookies
          </button>
          <a href="/informace-o-cookies" className="underline underline-offset-2">Informace o cookies</a>
        </div>
      ) : null}
    </>
  );
}
