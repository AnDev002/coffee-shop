// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Josefin_Sans, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const josefin = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-poppins" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"], variable: "--font-great-vibes" });

export const metadata: Metadata = {
  title: "N.S Coffee",
  description: "Best Coffee Sellers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        suppressHydrationWarning={true}
        className={`${inter.variable} ${josefin.variable} ${poppins.variable} ${greatVibes.variable} bg-black text-white font-poppins`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}