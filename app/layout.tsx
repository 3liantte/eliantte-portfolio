import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";
import { FloatingNavDemo } from "@/components/Navbar/Navbar";
import ScrollProgressBar from "@/components/ui/scroll-progress-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Creative developer portfolio with 3D parallax effects and scroll animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white font-sans overflow-x-hidden`}
      >
        <SmoothScroll />
        <ScrollProgressBar/>
        <FloatingNavDemo/>
          {children}
      </body>
    </html>
  );
}
