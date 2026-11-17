import { use } from "react";
import dayjs from "dayjs";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Vorschau-Modus: `?preview` an der URL schaltet alle Türchen frei –
// aber nur lokal mit `npm run dev`. Im Production-Build (Vercel) wird der
// Zweig komplett entfernt, dort ist `?preview` wirkungslos.
export function usePreview(searchParams: SearchParams): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  return "preview" in use(searchParams);
}

export function isUnlocked(unlockDate: string, preview: boolean): boolean {
  if (preview) return true;
  const today = dayjs();
  return today.isAfter(dayjs(unlockDate)) || today.isSame(dayjs(unlockDate), "day");
}

// Link-Ziel, das den Vorschau-Modus beibehält.
export function withPreview(path: string, preview: boolean): string {
  return preview ? `${path}?preview` : path;
}
