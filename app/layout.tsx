// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "দৈনিক চাকরি | বাংলাদেশের এক নম্বর জব পোর্টাল",
  description: "প্রতিদিনের সব সরকারি ও বেসরকারি চাকরির খবর সবার আগে পেতে ভিজিট করুন দৈনিক চাকরি।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      
      {/* এখানে suppressHydrationWarning যুক্ত করা হয়েছে */}
      <body className="min-h-full flex flex-col bg-slate-50/50" suppressHydrationWarning>
        
        <Header /> 
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}