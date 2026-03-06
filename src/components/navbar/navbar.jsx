import React, { useState, useEffect } from 'react';
import { FaBars, FaHome, FaImages, FaBook, FaUsers, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ktvnlogo.png';

const navLinks = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/about', icon: FaBook, label: 'About' },
    { to: '/gallery', icon: FaImages, label: 'Gallery' },
    { to: '/batches', icon: FaUsers, label: 'Batches' },
];

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setShowSidebar((v) => !v);
    const closeSidebar = () => setShowSidebar(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Scroll lock logic for sidebar
        if (showSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset'; // Cleanup
        };
    }, [showSidebar]);

    const linkClass = (to) =>
        `flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 ${location.pathname === to
            ? 'text-accent'
            : 'text-text-muted hover:text-text-primary'
        }`;

    return (
        <header className={`flex z-[80] items-center justify-between px-6 sticky top-0 py-4 transition-all duration-500 ${scrolled ? 'bg-primary/90 backdrop-blur-md h-16 shadow-lg border-b border-border' : 'bg-primary h-20 border-b border-border/50'
            }`}>
            {/* Brand */}
            <div className="flex items-center gap-4">
                <img className="h-10 w-10 sm:h-12 sm:w-12 object-contain" src={logo} alt="KTVN Logo" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <p className="text-lg sm:text-xl font-bold text-text-primary font-display tracking-[0.05em] leading-none">
                            KAKATIYA
                        </p>
                        {[5, 6].includes(new Date().getMonth()) && (
                            <span className="hidden sm:inline-block text-[10px] font-black text-accent uppercase tracking-[0.2em] px-3 py-1 bg-accent/10 rounded-full border border-accent/20 animate-pulse">
                                Admissions Live
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] sm:text-xs font-black text-accent tracking-[0.3em] uppercase mt-1">
                        Vidyaniketan
                    </p>
                </div>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
                {!showSidebar && (
                    <button onClick={toggleSidebar} aria-label="Open menu" className="p-2 bg-surface rounded-lg border border-border-light shadow-md active:scale-95 transition-transform">
                        <FaBars className="text-accent text-xl" />
                    </button>
                )}
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex gap-8">
                {navLinks.map(({ to, icon: Icon, label }) => (
                    <Link key={to} to={to} className={linkClass(to)}>
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Mobile sidebar overlay */}
            <div
                className={`lg:hidden fixed inset-0 w-full h-screen bg-[#050B14]/60 backdrop-blur-sm z-[100] transition-opacity duration-500 overflow-hidden ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeSidebar}
            >
                <div
                    className={`absolute right-0 top-0 w-[85%] max-w-sm h-full bg-[#050B14] border-l border-white/10 shadow-3xl transition-transform duration-500 ease-out flex flex-col ${showSidebar ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Interior Glow Backdrop */}
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="flex justify-between items-center px-8 py-8 border-b border-white/5 relative z-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-1">Campus Menu</span>
                            <span className="text-lg font-display font-black text-white tracking-widest uppercase opacity-40">Navigate</span>
                        </div>
                        <button onClick={closeSidebar} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent active:scale-90 transition-all">
                            <FaTimes size={18} />
                        </button>
                    </div>

                    <nav className="flex flex-col p-8 gap-3 relative z-10">
                        {navLinks.map(({ to, icon: Icon, label }, idx) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={closeSidebar}
                                className={`flex items-center justify-between px-6 py-6 rounded-2xl transition-all duration-300 group relative overflow-hidden ${location.pathname === to
                                    ? 'bg-accent/10 border border-accent/30 text-accent'
                                    : 'bg-white/[0.02] border border-white/5 text-text-muted hover:bg-white/[0.05] hover:border-white/10'
                                    }`}
                                style={{
                                    transitionDelay: showSidebar ? `${150 + idx * 50}ms` : '0ms',
                                    transform: showSidebar ? 'translateX(0)' : 'translateX(20px)',
                                    opacity: showSidebar ? 1 : 0
                                }}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <Icon className={`text-xl transition-transform duration-500 ${location.pathname === to ? 'scale-110' : 'group-hover:rotate-12'}`} />
                                    <span className="text-sm font-black uppercase tracking-[0.3em] font-display">{label}</span>
                                </div>
                                {location.pathname === to ? (
                                    <div className="w-2 h-2 rounded-full bg-accent shadow-glow relative z-10" />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent/40 transition-colors relative z-10" />
                                )}

                                {/* Hover background glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto p-12 pb-16 px-10 text-center border-t border-white/5 relative z-10">
                        <img className="h-8 w-auto mx-auto mb-6 opacity-40 grayscale" src={logo} alt="Logo" />
                        <p className="text-[10px] uppercase font-black tracking-[0.5em] text-text-muted mb-2 opacity-60 px-4">Dharmavaram • Andhra Pradesh</p>
                        <p className="text-[8px] uppercase font-bold text-accent tracking-[0.2em] opacity-40">Kakatiya Vidyaniketan © 2026</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
