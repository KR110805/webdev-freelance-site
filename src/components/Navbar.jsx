import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Navigation links mapping to section IDs
const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
];

/**
 * Navbar Component
 * - Transparent on top, blurred glass background on scroll
 * - Responsive hamburger menu on mobile
 * - Smooth scroll navigation to each section
 */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Track scroll position to toggle navbar background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section and close mobile menu
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-lg shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="text-xl font-bold tracking-tight"
                >
                    <span className="text-indigo-400">&lt;</span>
                    KR1119
                    <span className="text-indigo-400"> /&gt;</span>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 relative group"
                        >
                            {link.label}
                            {/* Animated underline on hover */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle navigation menu"
                >
                    <span className={`block w-6 h-0.5 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800/50"
                >
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-zinc-300 hover:text-white transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
