"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-4 py-16 md:py-24">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-black tracking-tighter text-white">
                                Throttle Talks
                            </h2>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            The definitive digital garage for automotive purists. Document your build, track your maintenance, and connect with a community that understands the obsession.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <SocialLink
                                href="#"
                                icon={
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                }
                                label="X (formerly Twitter)"
                            />
                            <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                            <SocialLink href="#" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
                            <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
                        </div>
                    </div>

                    {/* Links Column 1: Platform (2 Cols) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="font-bold text-white mb-6 tracking-wide">PLATFORM</h3>
                        <ul className="space-y-4">
                            <FooterLink href="/features">Features</FooterLink>
                            <FooterLink href="/explore">Explore Builds</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/mobile">Mobile App</FooterLink>
                        </ul>
                    </div>

                    {/* Links Column 2: Community (2 Cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-white mb-6 tracking-wide">COMMUNITY</h3>
                        <ul className="space-y-4">
                            <FooterLink href="/events">Events</FooterLink>
                            <FooterLink href="/forum">Forums</FooterLink>
                            <FooterLink href="/guidelines">Guidelines</FooterLink>
                            <FooterLink href="/support">Support</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter Column (4 Cols) */}
                    <div className="lg:col-span-4 lg:col-start-9 md:col-span-4">
                        <h3 className="font-bold text-white mb-6 tracking-wide">STAY TUNED</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            Get the latest build spotlights and platform updates delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-white/20 h-10 rounded-sm"
                            />
                            <Button size="icon" className="h-10 w-10 shrink-0 bg-white text-black hover:bg-zinc-200 rounded-full">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                </div>

                <Separator className="bg-white/10 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} Throttle Talks. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-zinc-400 hover:text-white text-sm transition-colors block">
                {children}
            </Link>
        </li>
    );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <Link
            href={href}
            className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all duration-300 border border-zinc-800 hover:border-white"
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
