export type Voucher = {
  emoji: string;
  title: string;
  subtitle: string;
};

export type Day = {
  day: number;
  title?: string;
  text?: string;
  /** Kleines Icon für Türchen und Karte */
  image: string;
  unlockDate: string;
  /** Optional: persönliches Foto, das unter dem Text angezeigt wird */
  photo?: string;
  /** Optional: Geschenkbox zum Antippen, enthüllt dieses (verschwommene) Bild */
  gift?: string;
  /** Optional: Gutschein als Rubbellos */
  voucher?: Voucher;
  isFinal?: boolean;
};

export const days: Day[] = [
  {
    day: 1,
    title: "Der erste Lichtschein",
    text: "Ein neuer Dezember, ein neues erstes Türchen. Wie schön, dass wir diese Zeit wieder gemeinsam erleben.",
    image: "/images/candle.png",
    unlockDate: "2026-12-01",
  },
  {
    day: 2,
    title: "Sternstunden",
    text: "Manche Momente leuchten noch lange nach. Mit dir sammle ich die schönsten davon.",
    image: "/images/star.png",
    unlockDate: "2026-12-02",
  },
  {
    day: 3,
    title: "Tee & Decke",
    text: "Heute Abend gilt: Decke, Tee, du und ich. Der Rest der Welt darf warten.",
    image: "/images/tea.png",
    unlockDate: "2026-12-03",
  },
  {
    day: 4,
    title: "Ein Jahr mehr",
    text: "Wieder ein Jahr voller gemeinsamer Schritte. Danke für jeden einzelnen davon.",
    image: "/images/footprints.png",
    unlockDate: "2026-12-04",
  },
  {
    day: 5,
    title: "Einzigartig",
    text: "Keine Schneeflocke gleicht der anderen – und niemand ist so wie du.",
    image: "/images/snowflake.png",
    unlockDate: "2026-12-05",
  },
  {
    day: 6,
    title: "Nikolaus",
    text: "Heute ist Nikolaus – ein guter Tag, um es sich richtig gemütlich zu machen.",
    image: "/images/boot.png",
    unlockDate: "2026-12-06",
  },
  {
    day: 7,
    title: "Lachen",
    text: "Mit niemandem lache ich so viel wie mit dir – über die großen Dinge und die ganz albernen.",
    image: "/images/heart.png",
    unlockDate: "2026-12-07",
  },
  {
    day: 8,
    title: "Licht",
    text: "Du bringst Licht in jeden noch so grauen Tag. Ich liebe dich!",
    image: "/images/candle2.png",
    unlockDate: "2026-12-08",
  },
  {
    day: 9,
    title: "Unsere Geschichte",
    text: "Jeder Tag mit dir ist eine neue Seite in unserer Geschichte – und ich mag jede einzelne.",
    image: "/images/book.png",
    unlockDate: "2026-12-09",
  },
  {
    day: 10,
    title: "Kuschelzeit",
    text: "Draußen wird es kälter, drinnen wird es wärmer. Perfektes Wetter zum Kuscheln – und für einen Film.",
    image: "/images/fireplace.png",
    unlockDate: "2026-12-10",
    voucher: { emoji: "🎬", title: "Filmabend", subtitle: "Du suchst den Film aus – ich sorge für Snacks & Decke" },
  },
  {
    day: 11,
    title: "Stolz",
    text: "Ich bin so stolz auf dich – auf alles, was du bist, und auf alles, was du schaffst.",
    image: "/images/star2.png",
    unlockDate: "2026-12-11",
  },
  {
    day: 12,
    title: "Verbunden",
    text: "Egal, wie voll und laut die Tage sind: Wir halten zusammen.",
    image: "/images/ribbon.png",
    unlockDate: "2026-12-12",
  },
  {
    day: 13,
    title: "Gemeinsam",
    text: "Kein Weg ist zu weit, wenn wir ihn zusammen gehen.",
    image: "/images/path.png",
    unlockDate: "2026-12-13",
  },
  {
    day: 14,
    title: "Kraft",
    text: "Du bist stärker, als du manchmal glaubst. Ich sehe es jeden Tag.",
    image: "/images/mountain.png",
    unlockDate: "2026-12-14",
  },
  {
    day: 15,
    title: "Leichtigkeit",
    text: "Heute darf alles ein bisschen leichter sein. Atme durch – du hast es dir verdient.",
    image: "/images/feather.png",
    unlockDate: "2026-12-15",
    voucher: { emoji: "💆", title: "10 Minuten Massage", subtitle: "Einfach zurücklehnen und genießen" },
  },
  {
    day: 16,
    title: "Lichterglanz",
    text: "Bald leuchtet der Weihnachtsbaum. Das schönste Leuchten im Raum ist trotzdem deins.",
    image: "/images/tree.png",
    unlockDate: "2026-12-16",
  },
  {
    day: 17,
    title: "Danke",
    text: "Danke für deine Geduld, deine Wärme und dein Lachen. Danke, dass es dich gibt.",
    image: "/images/heart2.png",
    unlockDate: "2026-12-17",
  },
  {
    day: 18,
    title: "Mein Herz",
    text: "Den Schlüssel zu meinem Herzen hast du schon lange. Pass gut auf ihn auf.",
    image: "/images/key.png",
    unlockDate: "2026-12-18",
  },
  {
    day: 19,
    title: "Gute Nacht",
    text: "Das Schönste an jedem Abend: zu wissen, dass ich neben dir einschlafe. Und vorher gibt's noch was Schönes …",
    image: "/images/moon.png",
    unlockDate: "2026-12-19",
    voucher: { emoji: "💆", title: "20 Minuten Massage", subtitle: "Die ausführliche Variante – ganz in Ruhe" },
  },
  {
    day: 20,
    title: "Für immer",
    text: "Gute Tage, schlechte Tage – ich bleibe bei dir. Genau so, wie du bist. Für immer.",
    image: "/images/heart.png",
    unlockDate: "2026-12-20",
  },
  {
    day: 21,
    title: "Weihnachtsmarkt",
    text: "Glühwein, Lichter und deine Hand in meiner – mehr Weihnachten brauche ich nicht.",
    image: "/images/star.png",
    unlockDate: "2026-12-21",
  },
  {
    day: 22,
    title: "Vorfreude",
    text: "Nur noch zweimal schlafen. Ich freue mich so auf Weihnachten mit dir.",
    image: "/images/bell.png",
    unlockDate: "2026-12-22",
  },
  {
    day: 23,
    title: "Das schönste Geschenk",
    text: "Morgen ist Heiligabend. Und das schönste Geschenk habe ich schon längst: dich.",
    image: "/images/giftbox.png",
    unlockDate: "2026-12-23",
  },
  {
    day: 24,
    image: "/images/hat.png",
    unlockDate: "2026-12-24",
    isFinal: true,
  },
];
