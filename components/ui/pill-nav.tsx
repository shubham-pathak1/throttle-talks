"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    logo: string;
    logoAlt?: string;
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    onMobileMenuClick?: () => void;
    initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    activeHref, // Can be overridden, otherwise uses pathname
    className = '',
    ease = 'power3.easeOut',
    baseColor = '#fff',
    pillColor = '#060010',
    hoveredPillTextColor = '#060010',
    pillTextColor,
    onMobileMenuClick,
    initialLoadAnimation = true
}) => {
    const pathname = usePathname();
    const currentHref = activeHref || pathname;

    const resolvedPillTextColor = pillTextColor ?? baseColor;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
    const logoImgRef = useRef<HTMLImageElement | null>(null);
    const logoTweenRef = useRef<gsap.core.Tween | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const navItemsRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

    useEffect(() => {
        // Reset layout on mount
        const layout = () => {
            circleRefs.current.forEach(circle => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

                if (label) {
                    tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
                }

                tlRefs.current[index] = tl;
            });
        };

        layout();

        const onResize = () => layout();
        window.addEventListener('resize', onResize);

        if (document.fonts) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
        }

        if (initialLoadAnimation) {
            const logo = logoRef.current;
            const navItems = navItemsRef.current;

            if (logo) {
                gsap.set(logo, { scale: 0 });
                gsap.to(logo, {
                    scale: 1,
                    duration: 0.6,
                    ease
                });
            }

            if (navItems) {
                gsap.set(navItems, { width: 0, overflow: 'hidden' });
                gsap.to(navItems, {
                    width: 'auto',
                    duration: 0.6,
                    ease
                });
            }
        }

        return () => window.removeEventListener('resize', onResize);
    }, [items, ease, initialLoadAnimation]);

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: 'auto'
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: 'auto'
        });
    };



    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: 'visible' });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: 'top center'
                    }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: 'top center',
                    onComplete: () => {
                        gsap.set(menu, { visibility: 'hidden' });
                    }
                });
            }
        }

        onMobileMenuClick?.();
    };

    const isExternalLink = (href: string) =>
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#');

    // Next.js Link handles both pretty well, but we check for standard anchor usage
    const isRouterLink = (href?: string) => href && !isExternalLink(href);

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: resolvedPillTextColor,
        ['--nav-h']: '56px', // Increased from 48px
        ['--logo']: '48px',
        ['--pill-pad-x']: '24px',
        ['--pill-gap']: '4px'
    } as React.CSSProperties;

    return (
        <div className="fixed top-6 left-0 right-0 z-[1000] flex justify-center w-full pointer-events-none">
            <nav
                className={`pointer-events-auto flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
                aria-label="Primary"
                style={cssVars}
            >
                {isRouterLink(items?.[0]?.href) ? (
                    <div
                        ref={el => {
                            if (el) logoRef.current = el;
                        }}
                        className="rounded-full p-1 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: 'auto',
                            minWidth: 'var(--nav-h)',
                            height: 'var(--nav-h)',
                        }}
                    >
                        {typeof logo === 'string' && (logo.startsWith('/') || logo.startsWith('http')) ? (
                            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block rounded-full" />
                        ) : (
                            <span className="px-4 font-black tracking-tighter text-white whitespace-nowrap">{logo}</span>
                        )}
                    </div>
                ) : (
                    <a
                        href={items?.[0]?.href || '#'}
                        aria-label="Home"
                        ref={el => {
                            if (el) logoRef.current = el;
                        }}
                        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: 'var(--nav-h)',
                            height: 'var(--nav-h)',
                            //   background: 'var(--base, #000)'
                        }}
                    >
                        <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block rounded-full" />
                    </a>
                )}

                <div
                    ref={navItemsRef}
                    className="relative items-center rounded-full hidden md:flex ml-2 bg-black/50 backdrop-blur-md border border-white/10"
                    style={{
                        height: 'var(--nav-h)',
                        // background: 'var(--base, #000)'
                    }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[4px] h-full"
                        style={{ gap: 'var(--pill-gap)' }}
                    >
                        {items.slice(1).map((item, i) => { // Skip Home since it's the logo
                            // Correct index because we sliced
                            const realIndex = i + 1;
                            const isActive = currentHref === item.href;

                            const pillStyle: React.CSSProperties = {
                                // background: 'var(--pill-bg, #fff)',
                                background: 'transparent',
                                color: 'var(--pill-text, var(--base, #fff))',
                                paddingLeft: 'var(--pill-pad-x)',
                                paddingRight: 'var(--pill-pad-x)'
                            };

                            const PillContent = (
                                <>
                                    <span
                                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                        style={{
                                            background: 'var(--base, #fff)', // White pill on hover
                                            willChange: 'transform'
                                        }}
                                        aria-hidden="true"
                                        ref={el => {
                                            circleRefs.current[realIndex] = el;
                                        }}
                                    />
                                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                                        <span
                                            className="pill-label relative z-[2] inline-block leading-[1]"
                                            style={{ willChange: 'transform' }}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{
                                                color: 'var(--hover-text, #000)', // Black text on white pill
                                                willChange: 'transform, opacity'
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.label}
                                        </span>
                                    </span>
                                    {isActive && (
                                        <span
                                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-1 h-1 rounded-full z-[4]"
                                            style={{ background: 'var(--base, #fff)' }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </>
                            );

                            const basePillClasses =
                                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-sm uppercase tracking-widest whitespace-nowrap cursor-pointer px-0';

                            return (
                                <li key={item.href} role="none" className="flex h-full">
                                    {isRouterLink(item.href) ? (
                                        <Link
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={item.ariaLabel || item.label}
                                            onMouseEnter={() => handleEnter(realIndex)}
                                            onMouseLeave={() => handleLeave(realIndex)}
                                        >
                                            {PillContent}
                                        </Link>
                                    ) : (
                                        <a
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={item.ariaLabel || item.label}
                                            onMouseEnter={() => handleEnter(realIndex)}
                                            onMouseLeave={() => handleLeave(realIndex)}
                                        >
                                            {PillContent}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <button
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative bg-black/50 backdrop-blur-md border border-white/10"
                    style={{
                        width: 'var(--nav-h)',
                        height: 'var(--nav-h)',
                        // background: 'var(--base, #000)'
                    }}
                >
                    <span
                        className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ background: 'var(--pill-bg, #fff)' }}
                    />
                    <span
                        className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ background: 'var(--pill-bg, #fff)' }}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[calc(var(--nav-h)+1rem)] left-4 right-4 rounded-[27px] shadow-2xl z-[998] origin-top bg-zinc-900/90 backdrop-blur-xl border border-white/10"
                style={{
                    ...cssVars,
                    //   background: 'var(--base, #f0f0f0)'
                }}
            >
                <ul className="list-none m-0 p-[8px] flex flex-col gap-[4px]">
                    {items.map(item => {
                        const defaultStyle: React.CSSProperties = {
                            //   background: 'var(--pill-bg, #fff)',
                            background: 'transparent',
                            color: 'var(--pill-text, #fff)'
                        };
                        const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            //   e.currentTarget.style.color = 'var(--hover-text, #fff)';
                        };
                        const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--pill-text, #fff)';
                        };

                        const linkClasses =
                            'block py-3 px-6 text-sm font-medium rounded-[20px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] uppercase tracking-wide';

                        return (
                            <li key={item.href}>
                                {isRouterLink(item.href) ? (
                                    <Link
                                        href={item.href}
                                        className={linkClasses}
                                        style={defaultStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={linkClasses}
                                        style={defaultStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PillNav;
