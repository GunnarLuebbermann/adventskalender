"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsClient } from "@/lib/clientState";

// Einmal pro Seitenaufruf auswürfeln (außerhalb des Renderns)
const roll = Math.random();

export default function RandomPhoto({ photos }: { photos: string[] }) {
  // Erst im Browser auswählen – sonst würfeln Server und Browser unterschiedlich
  const isClient = useIsClient();
  const photo = photos.length > 0 ? photos[Math.floor(roll * photos.length)] : null;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/60 bg-gradient-to-br from-bg-3/20 to-bg-1/20 backdrop-blur-sm min-h-48">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
      {isClient && photo && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Image
            src={photo}
            alt="Wir zwei"
            // Bilder dürfen beliebige Seitenverhältnisse haben – Breite füllt, Höhe passt sich an
            width={0}
            height={0}
            sizes="(max-width: 448px) 100vw, 448px"
            className="w-full h-auto"
            priority
          />
        </motion.div>
      )}
    </div>
  );
}
