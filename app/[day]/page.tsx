"use client";
import { use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { days } from "@/data/days";
import dayjs from "dayjs";

export default function DayPage({
    params,
}: {
    params: Promise<{ day: string }>;
}) {
    const router = useRouter();
    const { day } = use(params); // 👈 Promise auflösen mit React.use()

    const numericDay = parseInt(day);
    const content = days.find((d) => d.day === numericDay);

    if (!content) return <p>Not found</p>;

    const unlocked =
        dayjs().isAfter(dayjs(content.unlockDate)) ||
        dayjs().isSame(dayjs(content.unlockDate), "day");

    if (!unlocked) router.push("/");

    if (!content.isFinal) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#4a0e0e] via-[#741c1c] to-[#b32a2a] p-6 text-center text-white font-serif">
                <motion.div
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#ffffff10] backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm border border-[#d4af37]"
                >
                    <motion.img
                        src={content.image}
                        alt=""
                        className="w-24 h-24 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    />

                    <motion.h2
                        className="text-2xl font-bold mb-3 text-yellow-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {content.title}
                    </motion.h2>

                    <motion.p
                        className="text-lg text-yellow-50 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {content.text}
                    </motion.p>
                </motion.div>

                <button
                    onClick={() => router.push("/")}
                    className="mt-8 px-6 py-2 bg-[#d4af37] text-[#3b0a0a] rounded-full shadow-lg font-semibold hover:bg-[#f5d76e] transition"
                >
                    🎁 Zurück zum Kalender
                </button>
            </main>
        );
    }

    if (content.isFinal) {
        return (
            <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#2c0d0d] via-[#3e1212] to-[#5a1919] text-center text-yellow-100 font-serif">
                {/* ✨ Hintergrundglühen */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2),transparent_70%)] animate-pulse" />

                {/* ✨ Goldfunken */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    {[...Array(25)].map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute text-yellow-200 opacity-70 select-none"
                            initial={{
                                top: Math.random() * 100 + "%",
                                left: Math.random() * 100 + "%",
                                scale: 0,
                            }}
                            animate={{
                                y: ["0%", "100%"],
                                opacity: [1, 0],
                                scale: [0, 1],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        >
                            ✨
                        </motion.span>
                    ))}
                </div>

                {/* ✨ Textanimation */}
                <div className="relative z-10 max-w-md">
                    <motion.h2
                        className="text-3xl mb-4 font-bold text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        Frohe Weihnachten, mein Herz 💛
                    </motion.h2>

                    <motion.p
                        className="text-lg mb-3 text-yellow-100 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                    >
                        Du hast so viel geschafft, überstanden und erreicht.
                    </motion.p>

                    <motion.p
                        className="text-lg mb-3 text-yellow-100 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1.5 }}
                    >
                        Jetzt wartet das Leben – voller Licht, Wärme und neuer Horizonte.
                    </motion.p>

                    <motion.h3
                        className="text-2xl mt-8 text-yellow-200 font-bold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 5, duration: 1.5 }}
                    >
                        🌅 Deine Reise beginnt.
                    </motion.h3>
                </div>

                <motion.button
                    onClick={() => router.push("/")}
                    className="relative z-10 mt-10 px-6 py-2 bg-[#d4af37] text-[#3b0a0a] rounded-full shadow-lg font-semibold hover:bg-[#f5d76e] transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6.5 }}
                >
                    🎁 Zurück zum Kalender
                </motion.button>
            </main>
        );
    }

}
