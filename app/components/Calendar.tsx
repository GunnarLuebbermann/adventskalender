"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { days, type Day } from "@/data/days";
import { isUnlocked, usePreview, useToday, withPreview } from "@/lib/unlock";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { useOpenedDays } from "@/lib/clientState";
import RandomPhoto from "./RandomPhoto";

// Türchen gemischt wie bei einem echten Adventskalender – aber jedes Mal gleich angeordnet
const shuffledDays = [...days].sort((a, b) => pseudoRandom(a.day, 7) - pseudoRandom(b.day, 7));

const FIRST_DAY = dayjs(days[0].unlockDate);
const CHRISTMAS_EVE = dayjs(days[days.length - 1].unlockDate);

function countdownText(today: string): string {
  const t = dayjs(today);
  if (t.isBefore(FIRST_DAY)) {
    const n = FIRST_DAY.diff(t, "day");
    return n === 1
      ? "Morgen öffnet sich das erste Türchen ✨"
      : `Noch ${n} Tage, dann öffnet sich das erste Türchen ✨`;
  }
  if (t.isBefore(CHRISTMAS_EVE)) {
    const n = CHRISTMAS_EVE.diff(t, "day");
    return n === 1 ? "Morgen ist Heiligabend 🎄" : `Noch ${n} Tage bis Heiligabend 🎄`;
  }
  return "Frohe Weihnachten! 💛";
}

export default function Calendar({
  searchParams,
  photos,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  /** Bilder aus public/images/startseite – eins davon wird zufällig gezeigt */
  photos: string[];
}) {
  const preview = usePreview(searchParams);
  // Datum & geöffnete Türchen erst im Browser auswerten (Zeitzone + localStorage).
  // today aktualisiert sich um Mitternacht und wenn die App wieder geöffnet wird.
  const today = useToday();
  const opened = useOpenedDays();

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-1 via-bg-2 to-bg-3 text-center p-6 relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-yellow-200 mb-3 font-serif drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
      >
        🎁 🎄 Isi&apos;s Adventskalender
      </motion.h1>

      <p className="text-yellow-100/90 mb-8 min-h-6 font-serif italic">
        {today && countdownText(today)}
      </p>

      <motion.div
        className="grid grid-cols-4 sm:grid-cols-6 gap-3 justify-items-center relative z-10 max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {shuffledDays.map((d) => (
          <Door
            key={d.day}
            day={d}
            unlocked={isUnlocked(d.unlockDate, preview, today)}
            isToday={d.unlockDate === today}
            wasOpened={opened.includes(d.day)}
            href={withPreview(`/${d.day}`, preview)}
          />
        ))}
      </motion.div>

      <p className="text-sm text-yellow-100 mt-10 opacity-80 italic">
        Jeden Tag ein kleines Stück Weihnachtszauber ✨
      </p>

      {/* 💞 Persönliches Foto */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 max-w-md mx-auto"
      >
        <RandomPhoto photos={photos} />
        <p className="text-lg text-yellow-100 font-medium italic drop-shadow-lg text-center">
          Mit dir wird selbst der Winter warm. 💛
        </p>
      </motion.div>

      <motion.footer className="mt-16 text-xs text-yellow-100/60">
        Created with 💛 by Gunnar
      </motion.footer>
    </main>
  );
}

const OPEN_DURATION = 0.6; // Sekunden, bis das Türchen aufgeklappt ist

function Door({
  day,
  unlocked,
  isToday,
  wasOpened,
  href,
}: {
  day: Day;
  unlocked: boolean;
  isToday: boolean;
  wasOpened: boolean;
  href: string;
}) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  // Erst das Türchen aufklappen lassen, dann zur Tagesseite wechseln
  const open = (e: MouseEvent) => {
    e.preventDefault();
    if (opening) return;
    setOpening(true);
    router.prefetch(href);
    setTimeout(() => router.push(href), OPEN_DURATION * 1000 + 150);
  };

  const style = !unlocked
    ? "bg-locked/40 border-locked-border text-gray-400 cursor-not-allowed"
    : wasOpened
      ? "bg-gradient-to-br from-opened-1 to-opened-2 border-gold/60 text-white/90"
      : "bg-gradient-to-br from-door-1 to-door-2 border-gold text-white";

  return (
    <motion.div
      className={`relative aspect-square w-20 sm:w-24 rounded-2xl [perspective:600px] ${opening ? "z-20" : ""} ${
        isToday ? "ring-4 ring-yellow-300/80 ring-offset-2 ring-offset-bg-2" : ""
      }`}
      animate={isToday && !wasOpened && !opening ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={isToday && !opening ? { repeat: Infinity, duration: 1.8 } : undefined}
      whileHover={unlocked && !opening ? { scale: 1.08 } : undefined}
    >
      {/* Was hinter dem Türchen steckt – sichtbar, sobald es aufklappt */}
      {unlocked && (
        <div className="absolute inset-0 rounded-2xl border-2 border-gold flex items-center justify-center bg-[radial-gradient(circle,#fffbea_0%,#f5d76e_55%,#b8912b_100%)] shadow-[inset_0_0_18px_rgba(120,80,0,0.45)]">
          <motion.img
            src={day.image}
            alt=""
            className="w-10 h-10"
            initial={false}
            animate={opening ? { scale: [0.6, 1.25, 1.1], opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: OPEN_DURATION + 0.2 }}
          />
        </div>
      )}

      {/* Das Türchen selbst – klappt an der linken Kante auf (Vorder- und Rückseite) */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: opening ? -115 : 0 }}
        transition={{ duration: OPEN_DURATION, ease: [0.4, 0, 0.2, 1] }}
      >
      {/* Rückseite der Tür */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-gold/70 bg-gradient-to-bl from-opened-1 to-bg-1 shadow-lg"
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      />
      {/* Vorderseite */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 shadow-lg glow flex flex-col items-center justify-center transition-colors duration-300 ${style}`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <span className="text-xl font-bold drop-shadow-sm">{day.day}</span>
        {unlocked && wasOpened && (
          <motion.img
            src={day.image}
            alt=""
            className="w-8 h-8 mt-1 opacity-90"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
        )}
        {unlocked && !wasOpened && (
          <motion.span
            className="mt-1 text-lg"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ✨
          </motion.span>
        )}
      </div>
      </motion.div>

      {unlocked && (
        <Link
          href={href}
          onClick={open}
          aria-label={`Türchen ${day.day} öffnen`}
          className="absolute inset-0 z-10 rounded-2xl cursor-pointer"
        />
      )}
    </motion.div>
  );
}
