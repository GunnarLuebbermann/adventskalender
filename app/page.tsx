import fs from "node:fs";
import path from "node:path";
import Calendar from "./components/Calendar";

// 📸 Alle Bilder in diesem Ordner landen automatisch in der Zufallsauswahl
// für das Foto auf der Startseite. Einfach Dateien hinzufügen oder löschen.
const PHOTO_DIR = path.join(process.cwd(), "public", "images", "startseite");
const PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function findPhotos(): string[] {
  try {
    return fs
      .readdirSync(PHOTO_DIR)
      .filter((file) => PHOTO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/images/startseite/${encodeURIComponent(file)}`);
  } catch {
    return [];
  }
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const NO_PARAMS: SearchParams = Promise.resolve({});

export default function HomePage(props: { searchParams: SearchParams }) {
  // ?preview gibt es nur lokal (npm run dev). In Production die URL-Parameter gar nicht
  // anfassen – sonst wird die Seite dynamisch statt beim Build fertig erzeugt, und
  // auf Vercel lässt sich der Bilder-Ordner zur Laufzeit nicht mehr lesen.
  const searchParams = process.env.NODE_ENV === "development" ? props.searchParams : NO_PARAMS;
  return <Calendar searchParams={searchParams} photos={findPhotos()} />;
}
