"use client";
import { use, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { days, type Day, type Voucher } from "@/data/days";
import SpecialGiftBox from "../components/SpecialGiftBox";
import ScratchCard from "../components/ScratchCard";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { isUnlocked, usePreview, withPreview } from "@/lib/unlock";
import { markOpened, markScratched, useIsClient, useScratchedDays } from "@/lib/clientState";

export default function DayPage({
    params,
    searchParams,
}: {
    params: Promise<{ day: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const router = useRouter();
    const { day } = use(params); // 👈 Promise auflösen mit React.use()
    const preview = usePreview(searchParams);
    const isClient = useIsClient();

    const content = days.find((d) => d.day === Number(day));
    // Datum erst im Browser prüfen (Zeitzone der Nutzerin, nicht des Servers)
    const unlocked = isClient && !!content && isUnlocked(content.unlockDate, preview);
    const home = withPreview("/", preview);

    useEffect(() => {
        if (!isClient) return;
        if (!unlocked) router.replace(home);
        else if (content) markOpened(content.day);
    }, [isClient, unlocked, content, home, router]);

    if (!content || !unlocked) return null;

    const goHome = () => router.push(home);

    return content.isFinal ? (
        <FinalPage onBack={goHome} />
    ) : (
        <DayCard content={content} onBack={goHome} />
    );
}

function BackButton({ onClick, delay = 0 }: { onClick: () => void; delay?: number }) {
    return (
        <motion.button
            onClick={onClick}
            className="relative z-10 mt-8 px-6 py-2 bg-gold text-ink rounded-full shadow-lg font-semibold hover:bg-gold-light transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            🎁 Zurück zum Kalender
        </motion.button>
    );
}

function DayCard({ content, onBack }: { content: Day; onBack: () => void }) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bg-2 via-bg-3 to-bg-4 p-6 text-center text-white font-serif">
            <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-[#ffffff10] backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm border border-gold"
            >
                <motion.p
                    className="text-sm uppercase tracking-widest text-yellow-200/70 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {content.day}. Dezember
                </motion.p>

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

                {content.gift && (
                    <SpecialGiftBox boxImage="/images/giftbox_main.png" revealImage={content.gift} />
                )}

                {content.voucher && <VoucherScratch day={content.day} voucher={content.voucher} />}

                {content.photo && (
                    <motion.img
                        src={content.photo}
                        alt=""
                        className="mt-6 w-full rounded-lg shadow-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    />
                )}
            </motion.div>

            <BackButton onClick={onBack} />
        </main>
    );
}

function VoucherScratch({ day, voucher }: { day: number; voucher: Voucher }) {
    const scratched = useScratchedDays();
    return (
        <ScratchCard alreadyRevealed={scratched.includes(day)} onReveal={() => markScratched(day)}>
            <div className="bg-gradient-to-br from-[#fff8e1] to-[#f5e6b8] text-ink px-5 py-6 border-2 border-dashed border-gold-dark rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">Gutschein</p>
                <p className="text-4xl my-2">{voucher.emoji}</p>
                <p className="text-xl font-bold">{voucher.title}</p>
                <p className="text-sm italic mt-1">{voucher.subtitle}</p>
                <p className="text-xs mt-3 opacity-70">Einlösbar, wann immer du möchtest 💛</p>
            </div>
        </ScratchCard>
    );
}

const FINAL_LINES = [
    "Danke für ein wundervolles Jahr mit dir.",
    "Für jedes Lachen, jede Umarmung und jeden ganz normalen Tag.",
    "Ich freue mich auf alles, was noch kommt.",
];

function FinalPage({ onBack }: { onBack: () => void }) {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-bg-0 via-bg-1 to-bg-2 text-center text-yellow-100 font-serif p-6">
            {/* ✨ Hintergrundglühen */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2),transparent_70%)] animate-pulse" />

            {/* ✨ Goldfunken */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(25)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-yellow-200 opacity-70 select-none"
                        initial={{
                            top: pseudoRandom(i, 0) * 100 + "%",
                            left: pseudoRandom(i, 1) * 100 + "%",
                            scale: 0,
                        }}
                        animate={{
                            y: ["0%", "100%"],
                            opacity: [1, 0],
                            scale: [0, 1],
                        }}
                        transition={{
                            duration: 4 + pseudoRandom(i, 2) * 4,
                            repeat: Infinity,
                            delay: pseudoRandom(i, 3) * 3,
                        }}
                    >
                        ✨
                    </motion.span>
                ))}
            </div>

            {/* ✨ Textanimation */}
            <div className="relative z-10 max-w-md">
                <motion.img
                    src="/images/hat.png"
                    alt=""
                    className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                />

                <motion.h2
                    className="text-3xl font-bold mb-6 text-yellow-200 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    Frohe Weihnachten, mein Schatz 💛
                </motion.h2>

                {FINAL_LINES.map((line, i) => (
                    <motion.p
                        key={i}
                        className="text-lg mb-3 text-yellow-100 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + i * 1.5, duration: 1.5 }}
                    >
                        {line}
                    </motion.p>
                ))}

                <motion.h3
                    className="text-2xl mt-8 text-yellow-200 font-bold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + FINAL_LINES.length * 1.5, duration: 1.5 }}
                >
                    Ich liebe dich!! 🎄
                </motion.h3>
            </div>

            <BackButton onClick={onBack} delay={2 + FINAL_LINES.length * 1.5} />
        </main>
    );
}
