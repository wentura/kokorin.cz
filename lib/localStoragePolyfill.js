"use strict";

/**
 * Next.js dev server runs on Node, which might expose a partial `localStorage`
 * implementation when launched with `--localstorage-file`. In that case the
 * object exists but its methods are undefined, causing runtime crashes the
 * first time something calls `localStorage.getItem`.
 *
 * We replace that stub with a minimal in-memory implementation so any server
 * evaluation of client components succeeds. In the browser this check is a
 * no-op because the real Web Storage API already provides the expected
 * methods.
 */
if (typeof globalThis !== "undefined") {
  const storage = globalThis.localStorage;

  const hasStorageMethods =
    storage &&
    typeof storage.getItem === "function" &&
    typeof storage.setItem === "function" &&
    typeof storage.removeItem === "function";

  if (storage && !hasStorageMethods) {
    const store = new Map();

    const memoryStorage = {
      getItem: (key) => {
        if (!store.has(key)) {
          return null;
        }

        return store.get(key);
      },
      setItem: (key, value) => {
        store.set(key, String(value));
      },
      removeItem: (key) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
      key: (index) => {
        const keys = Array.from(store.keys());
        return keys[index] ?? null;
      },
      get length() {
        return store.size;
      },
    };

    globalThis.localStorage = memoryStorage;
  }
}

