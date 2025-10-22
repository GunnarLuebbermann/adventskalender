"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { days } from "@/data/days";
import dayjs from "dayjs";

export default function HomePage() {
  const today = dayjs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#3b0a0a] via-[#5e1515] to-[#8a1d1d] text-center p-6 relative overflow-hidden">
      {/* ✨ leichte Schneefall-Deko */}
      <div className="absolute inset-0 pointer-events-none animate-[snow_15s_linear_infinite] opacity-40 bg-[url('/images/snow.png')] bg-cover"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-yellow-200 mb-8 font-serif drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
      >
        🎁 🎄 Isi's Adventskalender
      </motion.h1>

      <motion.div
        className="grid grid-cols-4 sm:grid-cols-6 gap-3 justify-items-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {days.map((d) => {
          const unlocked =
            today.isAfter(dayjs(d.unlockDate)) ||
            today.isSame(dayjs(d.unlockDate), "day");

          return (
            <motion.div
              key={d.day}
              className={`aspect-square w-20 sm:w-24 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg transition-all duration-300 glow
    ${unlocked
                  ? "bg-gradient-to-br from-[#a00000] to-[#e03b3b] border-[#d4af37] text-white cursor-pointer"
                  : "bg-[#3d0b0b]/40 border-[#5a1d1d] text-gray-400 cursor-not-allowed"
                }`}
              whileHover={{ scale: 1.05 }}
            >
              <Link href={unlocked ? `/${d.day}` : "#"} className="flex flex-col items-center">
                <span className="text-xl font-bold drop-shadow-sm">{d.day}</span>
                {unlocked && (
                  <motion.img
                    src={d.image}
                    alt=""
                    className="w-8 h-8 mt-2 opacity-90"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="text-sm text-yellow-100 mt-10 opacity-80 italic">
        Jeden Tag ein kleines Stück Weihnachtszauber ✨
      </p>

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
