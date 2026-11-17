import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * false beim Server-Rendering und während der Hydration, danach true.
 * Alles, was vom aktuellen Datum oder localStorage abhängt, erst rendern,
 * wenn das true ist – sonst passen Server-HTML und Browser nicht zusammen
 * (Build/Server läuft in anderer Zeitzone bzw. zu anderer Zeit).
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/**
 * Eine Liste von Tagesnummern in localStorage (nur in diesem Browser).
 * Wird für „Türchen geöffnet“ und „Rubbellos freigerubbelt“ benutzt.
 */
function createDayStore(storageKey: string) {
  const listeners = new Set<() => void>();

  const readRaw = (): string => {
    try {
      return localStorage.getItem(storageKey) ?? "[]";
    } catch {
      return "[]";
    }
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  };

  const parse = (raw: string): number[] => {
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
    } catch {
      return [];
    }
  };

  return {
    useDays(): number[] {
      return parse(useSyncExternalStore(subscribe, readRaw, () => "[]"));
    },
    add(day: number) {
      const current = parse(readRaw());
      if (current.includes(day)) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify([...current, day]));
      } catch {
        // Speichern nicht möglich (z. B. privater Modus) – dann eben ohne
      }
      listeners.forEach((l) => l());
    },
  };
}

const openedStore = createDayStore("opened-days-2026");
export const useOpenedDays = openedStore.useDays;
export const markOpened = openedStore.add;

const scratchedStore = createDayStore("scratched-days-2026");
export const useScratchedDays = scratchedStore.useDays;
export const markScratched = scratchedStore.add;
