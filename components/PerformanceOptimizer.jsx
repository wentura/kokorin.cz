"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images that are not in viewport
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap",
        as: "style",
      },
      {
        rel: "preload",
        href: "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262134/Kamil/vW45A8151.webp",
        as: "image",
      },
      {
        rel: "preload",
        href: "https://www.harasov.eu/gallery/titulka_a_tiny.jpg",
        as: "image",
      },
      {
        rel: "preload",
        href: "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262135/Kamil/W45A8080.webp",
        as: "image",
      },
    ];

    preloadLinks.forEach((link) => {
      const linkElement = document.createElement("link");
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });

    // Service Worker registration for caching
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }

    // Cleanup
    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return null;
}
