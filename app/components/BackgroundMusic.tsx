"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    // Deine Songliste
    const songs = [
        "/sounds/christmas1.mp3",
        "/sounds/christmas2.mp3",
        "/sounds/christmas3.mp3",
        "/sounds/christmas4.mp3",
        "/sounds/christmas5.mp3",
        "/sounds/christmas6.mp3",
        "/sounds/christmas7.mp3",
        "/sounds/christmas8.mp3",
        "/sounds/christmas9.mp3",
        "/sounds/christmas10.mp3",
        "/sounds/christmas11.mp3",
        "/sounds/christmas12.mp3",
        "/sounds/christmas13.mp3",
        "/sounds/christmas14.mp3",
        "/sounds/christmas15.mp3",
        "/sounds/christmas16.mp3",
        "/sounds/christmas17.mp3",
        "/sounds/christmas18.mp3",
    ];

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSong, setCurrentSong] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState(false);

    // 🎶 Hilfsfunktion: zufälligen Song wählen (nicht denselben zweimal in Folge)
    const getRandomSong = (exclude?: string) => {
        const available = songs.filter((s) => s !== exclude);
        const randomIndex = Math.floor(Math.random() * available.length);
        return available[randomIndex];
    };

    const playSong = (song?: string) => {
        if (!audioRef.current) return;
        const newSong = song ?? getRandomSong(currentSong);
        audioRef.current.src = newSong;
        audioRef.current.volume = 0.25;
        audioRef.current
            .play()
            .then(() => {
                setCurrentSong(newSong);
                setIsPlaying(true);
                localStorage.setItem("music-playing", "true");
            })
            .catch(() => {
                // Autoplay blockiert – Nutzer muss klicken
            });
    };

    const stopMusic = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem("music-playing", "false");
    };

    const toggleMusic = () => {
        isPlaying ? stopMusic() : playSong();
    };

    // 🔁 Wenn Song endet → neuen starten
    const handleEnded = () => {
        playSong();
    };

    // 🔄 Beim ersten Laden prüfen, ob Musik an war
    useEffect(() => {
        const stored = localStorage.getItem("music-playing");
        if (stored === "true") {
            playSong();
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} onEnded={handleEnded} preload="auto" />
            <button
                onClick={toggleMusic}
                className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#d4af37] text-[#3b0a0a] px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-[#f5d76e] transition"
            >
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? "animate-spin" : ""
                        }`}
                >
                    <img
                        src="/images/santa.png"
                        alt="Weihnachtsmann"
                        className="w-6 h-6 select-none pointer-events-none"
                    />
                </div>
                <span>{isPlaying ? "Musik aus" : "Musik an"}</span>
            </button>
        </>
    );
}