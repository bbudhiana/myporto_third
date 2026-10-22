import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Button from '@/Components/UI/Button';

interface Props {
    title?: string;
    children: React.ReactNode;
}

interface SiteProps {
    site?: {
        name?: string;
        url?: string;
        location?: string | null;
    };
}

export default function PublicLayout({ children }: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const { site } = usePage().props as SiteProps;
    const profileLocation = site?.location;

    // Keyboard escape listener to close mobile menu & restore focus per PRD 4
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mobileMenuOpen]);

    const navLinks = [
        { label: 'Tentang', href: '/#about' },
        { label: 'Proyek', href: '/projects' },
        { label: 'Pengalaman', href: '/#experience' },
        { label: 'Kompetensi', href: '/#skills' },
        { label: 'Kontak', href: '/#contact' },
    ];

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172B3A]">
            {/* Skip Link per PRD 11.1 */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#0F766E] focus:border focus:border-[#0F766E] focus:rounded-xl focus:shadow-md font-medium text-sm"
            >
                Lewati ke konten utama
            </a>

            {/* Sticky Header with border & backdrop blur */}
            <header className="sticky top-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-xs border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
                    {/* Brand / Monogram */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] rounded-lg p-1 -m-1"
                        aria-label="Kembali ke beranda Bana Budhiana"
                    >
                        <span className="w-10 h-10 rounded-xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] font-bold text-base flex items-center justify-center transition-colors group-hover:bg-[#0F766E] group-hover:text-white">
                            BB
                        </span>
                        <div className="flex flex-col">
                            <span className="font-bold text-base text-[#172B3A] tracking-tight group-hover:text-[#0F766E] transition-colors leading-tight">
                                Bana Budhiana
                            </span>
                            <span className="text-xs text-[#475569] font-medium leading-none">
                                Senior Software & AI Engineer
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#475569] hover:text-[#172B3A] hover:bg-[#F0F7F6] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button href="/#contact" variant="primary" size="sm">
                            Hubungi Saya
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                            className="p-2.5 rounded-xl text-[#172B3A] hover:bg-[#F0F7F6] border border-[#DDE5EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div
                        id="mobile-navigation"
                        ref={mobileMenuRef}
                        className="md:hidden border-b border-[#DDE5EA] bg-white px-5 py-4 space-y-2 shadow-lg"
                    >
                        <nav className="flex flex-col space-y-1" aria-label="Navigasi Mobile">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="px-4 py-3 rounded-xl text-base font-medium text-[#172B3A] hover:bg-[#F0F7F6] active:bg-[#E3F3EF] transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="pt-2 border-t border-[#DDE5EA]">
                            <Button href="/#contact" variant="primary" size="md" className="w-full" onClick={closeMenu}>
                                Hubungi Saya
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main id="main-content" className="flex-1 focus:outline-none">
                {children}
            </main>

            {/* Sticky mobile CTA */}
            <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-[#DDE5EA] bg-white/95 backdrop-blur-xs px-4 py-3">
                <a
                    href="/#contact"
                    className="flex w-full items-center justify-center rounded-xl bg-[#0F766E] px-5 py-3 text-base font-medium text-white transition hover:bg-[#115E59] active:scale-[0.98]"
                >
                    Hubungi Saya
                </a>
            </div>

            {/* Semantic Footer per PRD 6.3 */}
            <footer className="border-t border-[#DDE5EA] bg-white mt-16 sm:mt-24">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="w-9 h-9 rounded-xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] font-bold text-sm flex items-center justify-center">
                                    BB
                                </span>
                                <span className="font-bold text-lg text-[#172B3A]">
                                    Bana Budhiana
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-[#475569] max-w-md">
                                Senior Software & AI Engineer. Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.
                            </p>
                            {profileLocation && (
                                <p className="mt-3 text-xs font-medium text-[#475569]">
                                    {profileLocation}
                                </p>
                            )}
                        </div>

                        {/* Navigation links & Privacy */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-[#475569]">
                            <Link href="/#about" className="hover:text-[#0F766E] transition-colors">Tentang</Link>
                            <Link href="/projects" className="hover:text-[#0F766E] transition-colors">Proyek</Link>
                            <Link href="/#experience" className="hover:text-[#0F766E] transition-colors">Pengalaman</Link>
                            <Link href="/#skills" className="hover:text-[#0F766E] transition-colors">Kompetensi</Link>
                            <Link href="/#contact" className="hover:text-[#0F766E] transition-colors">Kontak</Link>
                            <Link href="/privacy" className="hover:text-[#0F766E] transition-colors font-medium">Kebijakan Privasi</Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[#DDE5EA] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#475569]">
                        <p>© {new Date().getFullYear()} Bana Budhiana. Seluruh hak cipta dilindungi.</p>
                        <p className="text-xs text-[#475569]/80">Dibangun dengan standar aksesibilitas dan performa.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
