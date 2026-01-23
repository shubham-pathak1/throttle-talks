import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Throttle Talks",
  description: "The definitive digital garage for automotive purists.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-black text-white`}
      >
        <SmoothScroll />

        {/* Global Navigation Layout */}
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:pl-[80px]">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
