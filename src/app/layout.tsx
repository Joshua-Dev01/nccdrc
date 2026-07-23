import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo.png",
  },
  title: "NCCDRC — Nigerian Chambers of Commerce and Dispute Resolution Centre",
  description:
    "The Nigerian Chambers of Commerce Dispute Resolution Centre (NCCDRC) resolves commercial disputes through arbitration and mediation, offering trainings, mentorship, and membership to businesses and ADR practitioners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white flex flex-col ">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
