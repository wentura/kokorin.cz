"use client";

function sendEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || !window.__kamilAnalyticsConsent || !window.gtag) return;
  window.gtag("event", eventName, parameters);
}

export function trackBookingModalOpen(source) {
  sendEvent("form_start", { source });
}

export function trackExternalObjectClick(section, objectName) {
  sendEvent("outbound_click", { section, object_name: objectName || "unknown" });
}

export function trackLeadSubmit({ outcome, routingMode, source }) {
  sendEvent(outcome === "success" ? "generate_lead" : "form_submit_error", {
    routing_mode: routingMode,
    source,
  });
}

export function trackInternalCtaClick(name, source = "unknown") {
  sendEvent("cta_click", { cta_name: name, source });
}

export function trackPhoneClick(source = "unknown") {
  sendEvent("phone_click", { source });
}

export function trackObjectRequestClick(sourceSection, objectName) {
  sendEvent("request_object_click", {
    source_section: sourceSection,
    object_name: objectName || "unknown",
  });
}
