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
        <div className="flex min-h-screen w-full overflow-x-hidden">
          <Sidebar />
          <main className="flex-1 w-full md:pl-[80px]">
            {children}
          </main>
        </div>
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100]">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
