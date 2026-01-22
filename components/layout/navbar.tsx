import PillNav from "@/components/ui/pill-nav";
import StaggeredMenu from "@/components/ui/staggered-menu";

export function Navbar() {
    return (
        <>
            <div className="hidden md:block">
                <PillNav
                    logo="/logo.png"
                    logoAlt="Throttle Talks"
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Explore', href: '/explore' },
                        { label: 'Community', href: '/community' },
                        { label: 'Log In', href: '/login' },
                        { label: 'Sign Up', href: '/signup' },
                    ]}
                    baseColor="#fff"
                    pillColor="#fff"
                    hoveredPillTextColor="#000"
                    pillTextColor="#fff"
                    initialLoadAnimation={true}
                />
            </div>
            <div className="md:hidden">
                <StaggeredMenu
                    position="right"
                    items={[
                        { label: 'Home', ariaLabel: 'Home', link: '/' },
                        { label: 'Explore', ariaLabel: 'Explore', link: '/explore' },
                        { label: 'Community', ariaLabel: 'Community', link: '/community' },
                        { label: 'Log In', ariaLabel: 'Log In', link: '/login' },
                        { label: 'Sign Up', ariaLabel: 'Sign Up', link: '/signup' }
                    ]}
                    socialItems={[
                        { label: 'Twitter', link: '#' },
                        { label: 'Instagram', link: '#' }
                    ]}
                    displaySocials={true}
                    displayItemNumbering={true}
                    // Matching B&W Theme
                    menuButtonColor="#fff"
                    openMenuButtonColor="#fff"
                    accentColor="#fff"
                    colors={['#18181b', '#27272a', '#3f3f46', '#52525b']}
                    logoUrl="/logo.png"
                    isFixed={true}
                />
            </div>
        </>
    );
}
