import { use, useSyncExternalStore } from "react";
import dayjs from "dayjs";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Vorschau-Modus: `?preview` an der URL schaltet alle Türchen frei –
// aber nur lokal mit `npm run dev`. Im Production-Build (Vercel) wird der
// Zweig komplett entfernt, dort ist `?preview` wirkungslos.
export function usePreview(searchParams: SearchParams): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  return "preview" in use(searchParams);
}

/**
 * @param today aktuelles Datum als "YYYY-MM-DD" (aus useToday), null = noch unbekannt
 */
export function isUnlocked(unlockDate: string, preview: boolean, today: string | null): boolean {
  if (preview) return true;
  if (!today) return false;
  // ISO-Daten lassen sich direkt als Text vergleichen
  return unlockDate <= today;
}

// ---- Aktuelles Datum, das sich selbst aktualisiert ----

const todayKey = () => dayjs().format("YYYY-MM-DD");

function subscribeToday(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  // Kurz nach Mitternacht neu prüfen (falls die Seite die ganze Nacht offen ist)
  const scheduleMidnight = () => {
    clearTimeout(timer);
    const msUntilMidnight = dayjs().add(1, "day").startOf("day").diff(dayjs()) + 1000;
    timer = setTimeout(() => {
      onChange();
      scheduleMidnight();
    }, msUntilMidnight);
  };

  // iPhone-App kommt aus dem Hintergrund zurück → Timer liefen evtl. nicht, neu prüfen
  const onWake = () => {
    if (document.visibilityState === "hidden") return;
    onChange();
    scheduleMidnight();
  };

  scheduleMidnight();
  document.addEventListener("visibilitychange", onWake);
  window.addEventListener("focus", onWake);
  window.addEventListener("pageshow", onWake);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onWake);
    window.removeEventListener("focus", onWake);
    window.removeEventListener("pageshow", onWake);
  };
}

/**
 * Heutiges Datum ("YYYY-MM-DD") im Browser der Nutzerin – aktualisiert sich um
 * Mitternacht und wenn die Seite/App wieder in den Vordergrund kommt.
 * null beim Server-Rendering (dort ist Zeitzone/Uhrzeit nicht die der Nutzerin).
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribeToday, todayKey, () => null);
}

// Link-Ziel, das den Vorschau-Modus beibehält.
export function withPreview(path: string, preview: boolean): string {
  return preview ? `${path}?preview` : path;
}
