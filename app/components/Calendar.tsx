"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { days } from "@/data/days";
import { isUnlocked, usePreview, withPreview } from "@/lib/unlock";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { useIsClient, useOpenedDays } from "@/lib/clientState";
import RandomPhoto from "./RandomPhoto";

// Türchen gemischt wie bei einem echten Adventskalender – aber jedes Mal gleich angeordnet
const shuffledDays = [...days].sort((a, b) => pseudoRandom(a.day, 7) - pseudoRandom(b.day, 7));

const FIRST_DAY = dayjs(days[0].unlockDate);
const CHRISTMAS_EVE = dayjs(days[days.length - 1].unlockDate);

function countdownText(): string {
  const today = dayjs().startOf("day");
  if (today.isBefore(FIRST_DAY)) {
    const n = FIRST_DAY.diff(today, "day");
    return n === 1
      ? "Morgen öffnet sich das erste Türchen ✨"
      : `Noch ${n} Tage, dann öffnet sich das erste Türchen ✨`;
  }
  if (today.isBefore(CHRISTMAS_EVE)) {
    const n = CHRISTMAS_EVE.diff(today, "day");
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
  // Datum & geöffnete Türchen erst im Browser auswerten (Zeitzone + localStorage)
  const isClient = useIsClient();
  const opened = useOpenedDays();
  const today = dayjs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-1 via-bg-2 to-bg-3 text-center p-6 relative overflow-hidden">
      {/* ✨ leichte Schneefall-Deko */}
      <div className="absolute inset-0 pointer-events-none animate-[snow_15s_linear_infinite] opacity-40 bg-[url('/images/snow.png')] bg-cover"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-yellow-200 mb-3 font-serif drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
      >
        🎁 🎄 Isi&apos;s Adventskalender
      </motion.h1>

      <p className="text-yellow-100/90 mb-8 min-h-6 font-serif italic">
        {isClient && countdownText()}
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
        {shuffledDays.map((d) => {
          const unlocked = isClient && isUnlocked(d.unlockDate, preview);
          const isToday = isClient && today.isSame(dayjs(d.unlockDate), "day");
          const wasOpened = opened.includes(d.day);

          const style = !unlocked
            ? "bg-locked/40 border-locked-border text-gray-400 cursor-not-allowed"
            : wasOpened
              ? "bg-gradient-to-br from-opened-1 to-opened-2 border-gold/60 text-white/90 cursor-pointer"
              : "bg-gradient-to-br from-door-1 to-door-2 border-gold text-white cursor-pointer";

          const door = (
            <>
              <span className="text-xl font-bold drop-shadow-sm">{d.day}</span>
              {unlocked && wasOpened && (
                <motion.img
                  src={d.image}
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
            </>
          );

          return (
            <motion.div
              key={d.day}
              className={`aspect-square w-20 sm:w-24 rounded-2xl border-2 shadow-lg transition-colors duration-300 glow ${style} ${
                isToday ? "ring-4 ring-yellow-300/80 ring-offset-2 ring-offset-bg-2" : ""
              }`}
              animate={isToday && !wasOpened ? { scale: [1, 1.06, 1] } : undefined}
              transition={isToday ? { repeat: Infinity, duration: 1.8 } : undefined}
              whileHover={unlocked ? { scale: 1.08 } : undefined}
            >
              {unlocked ? (
                <Link
                  href={withPreview(`/${d.day}`, preview)}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  {door}
                </Link>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">{door}</div>
              )}
            </motion.div>
          );
        })}
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

      <style jsx global>{`
        @keyframes snow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 1000px;
          }
        }
      `}</style>
    </main>
  );
}
