import React from "react";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="max-w-screen-2xl mx-auto px-4">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()},{" "}
          <a
            href="https://www.zbyneksvoboda.cz"
            className="underline text-sm underline-offset-4"
            title="web Zbyněk Svoboda"
            target="_blank"
            rel="noopener noreferrer"
          >
            web Zbyněk Svoboda
          </a>
        </p>
      </div>
    </footer>
  );
}
