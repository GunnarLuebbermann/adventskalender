import "./globals.css";
import Snowfall from "./components/Snowfall";

export const metadata = {
  title: "Isi's Adventskalender",
  description: "24 Tage voller Magie",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="relative bg-gradient-to-b from-[#3b0a0a] via-[#5e1515] to-[#8a1d1d] text-white min-h-screen">
        <Snowfall /> {/* ❄️ Hier! */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
