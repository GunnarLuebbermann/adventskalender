"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  boxImage: string;
  revealImage: string;
}

export default function SpecialGiftBox({ boxImage, revealImage }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      {!opened ? (
        <motion.img
          src={boxImage}
          alt="Geschenkbox"
          className="w-28 h-28 cursor-pointer drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => setOpened(true)}
        />
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={revealImage}
            alt="Echtes Geschenk"
            className="w-56 h-auto mx-auto rounded-2xl border border-[#d4af37] shadow-lg"
          />
          <p className="text-sm text-yellow-100 italic mt-3">
            Dieses Geschenk bekommst du heute in echt 💛
          </p>
        </motion.div>
      )}
    </div>
  );
}
