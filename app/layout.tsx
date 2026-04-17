// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import { GoogleAnalytics } from '@next/third-parties/google'; // ✅ অ্যানালিটিক্স প্যাকেজ

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "দৈনিক চাকরি | আপনার স্বপ্নের চাকরি খুঁজুন",
  description: "বাংলাদেশের সকল সরকারি, বেসরকারি, ব্যাংক এবং এনজিওর সর্বশেষ চাকরির খবর সবার আগে পেতে ভিজিট করুন দৈনিক চাকরি ওয়েবসাইটে।",
  openGraph: {
    title: "দৈনিক চাকরি | আপনার স্বপ্নের চাকরি খুঁজুন",
    description: "বাংলাদেশের সকল সরকারি, বেসরকারি এবং ব্যাংক চাকরির খবর সবার আগে।",
    url: "https://dailyjobs.bd",
    siteName: "দৈনিক চাকরি",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50/50" suppressHydrationWarning>
        <Header /> 
        <main className="flex-grow">
          {children}
        </main>
        
        {/* ✅ আপনার Google Analytics ID এখানে বসান */}
        <GoogleAnalytics gaId="G-1PR46X7764" />
        
      </body>
    </html>
  );
}