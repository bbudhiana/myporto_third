import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Button from '@/Components/UI/Button';

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function AdminLayout({ title, children }: Props) {
    const { flash, unreadMessagesCount } = usePage().props as any;

    const navItems = [
        { label: 'Ringkasan', href: '/admin' },
        { label: 'Profil Saya', href: '/admin/profile' },
        { label: 'Pengalaman', href: '/admin/experiences' },
        { label: 'Kompetensi', href: '/admin/skills' },
        { label: 'Studi Kasus Proyek', href: '/admin/projects' },
        { label: 'Media & Berkas CV', href: '/admin/media' },
        {
            label: 'Kotak Masuk',
            href: '/admin/messages',
            badge: unreadMessagesCount ? `${unreadMessagesCount}` : undefined,
        },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#172B3A] flex flex-col md:flex-row">
            <Head title={`Admin - ${title}`} />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-[#DDE5EA] flex flex-col justify-between shrink-0">
                <div>
                    {/* Brand */}
                    <div className="p-6 border-b border-[#DDE5EA] flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] font-bold text-sm flex items-center justify-center">
                                BB
                            </span>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-[#172B3A]">
                                    Admin CMS
                                </span>
                                <span className="text-xs text-[#475569]">
                                    Bana Budhiana
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <nav className="p-4 space-y-1" aria-label="Menu Admin">
                        {navItems.map((item) => {
                            const isActive =
                                item.href === '/admin'
                                    ? currentPath === '/admin'
                                    : currentPath.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition min-h-[44px] ${
                                        isActive
                                            ? 'bg-[#E3F3EF] text-[#0F766E] font-semibold'
                                            : 'text-[#475569] hover:bg-[#F0F7F6] hover:text-[#172B3A]'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className="px-2 py-0.5 rounded-full text-xs bg-[#0F766E] text-white font-bold">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom actions */}
                <div className="p-4 border-t border-[#DDE5EA] space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center justify-center w-full px-3 py-2 rounded-xl border border-[#DDE5EA] text-xs font-semibold text-[#475569] hover:bg-[#F0F7F6] transition"
                    >
                        Lihat Website Publik ↗
                    </Link>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center justify-center w-full px-3 py-2 rounded-xl bg-red-50 text-[#B91C1C] hover:bg-red-100 text-xs font-semibold transition"
                    >
                        Keluar (Logout)
                    </Link>
                </div>
            </aside>

            {/* Main Admin Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-[#DDE5EA] px-6 sm:px-8 flex items-center justify-between">
                    <h1 className="text-lg font-bold text-[#172B3A]">{title}</h1>
                    <span className="text-xs text-[#475569] font-medium">
                        Pengelola Tunggal Terautentikasi
                    </span>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] text-sm flex items-center justify-between">
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[#B91C1C] text-sm flex items-center justify-between">
                        <span>{flash.error}</span>
                    </div>
                )}

                <main className="p-6 sm:p-8 flex-1">{children}</main>
            </div>
        </div>
    );
}
