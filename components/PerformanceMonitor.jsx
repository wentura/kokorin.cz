"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    onCLS(console.log);
    onFID(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);

    // Performance observer for long tasks
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn("Long task detected:", entry);
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    }

    // Monitor layout shifts
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.value > 0.1) {
            console.warn("Layout shift detected:", entry);
          }
        }
      });
      observer.observe({ entryTypes: ["layout-shift"] });
    }

    // Monitor first input delay
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.processingStart - entry.startTime > 100) {
            console.warn("Slow input detected:", entry);
          }
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
    }

    // Report performance metrics to analytics
    const reportPerformance = () => {
      if ("performance" in window) {
        const perfData = performance.getEntriesByType("navigation")[0];
        if (perfData) {
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp: perfData.connectEnd - perfData.connectStart,
            ttfb: perfData.responseStart - perfData.requestStart,
            domContentLoaded:
              perfData.domContentLoadedEventEnd -
              perfData.domContentLoadedEventStart,
            load: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.fetchStart,
          };

          // Send to analytics if available
          if (window._paq) {
            window._paq.push([
              "trackEvent",
              "Performance",
              "Metrics",
              JSON.stringify(metrics),
            ]);
          }

          console.log("Performance metrics:", metrics);
        }
      }
    };

    window.addEventListener("load", reportPerformance);

    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null;
}
