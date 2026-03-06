import React from 'react';
import ktvnLogo from '../../assets/ktvnlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Batches', path: '/batches' },
];

const socialLinks = [
    { icon: faInstagram, href: 'https://www.instagram.com/kakatiyavidyaniketan_dmm', label: 'Instagram', color: 'hover:text-pink-500 hover:shadow-pink-500/20' },
    { icon: faFacebook, href: 'https://www.facebook.com/kakatiyavidyaniketan.dharmavaram', label: 'Facebook', color: 'hover:text-blue-600 hover:shadow-blue-600/20' },
    { icon: faYoutube, href: 'https://youtube.com/@kakatiyavidyanikethanemsch2239', label: 'YouTube', color: 'hover:text-red-600 hover:shadow-red-600/20' },
];

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-[#050B14] border-t border-white/5 mt-auto relative overflow-hidden selection:bg-accent selection:text-primary">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Background Translucent Logo */}
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none translate-x-1/4 translate-y-1/4 rotate-12">
                <img src={ktvnLogo} alt="" className="w-full h-full object-contain grayscale invert" />
            </div>

            <div className="pt-28 pb-12 max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 mb-24">

                    {/* Brand column - The 'Seal' */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-start min-w-[280px]">
                        <div className="flex items-center gap-4 mb-10 group cursor-default">
                            <div className="relative">
                                <img src={ktvnLogo} alt="KTVN" className="h-16 w-auto relative z-10 brightness-110 drop-shadow-glow transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                            <div className="h-12 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-black text-white tracking-tighter leading-none mb-1">KTVN</span>
                                <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] opacity-80">Institution of Excellence</span>
                            </div>
                        </div>
                        <p className="text-text-secondary text-[13px] leading-relaxed text-left font-medium mb-10 max-w-sm opacity-60">
                            Empowering generations with value-based education, technical prowess, and cultural integrity since inception.
                        </p>
                        <div className="flex gap-6">
                            {socialLinks.map(({ icon, href, label, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted ${color} transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:text-accent group shadow-xl`}
                                >
                                    <FontAwesomeIcon icon={icon} className="text-lg transition-transform duration-500 group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation card style */}
                    <div className="col-span-1 pt-4 lg:pt-0">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-10 border-l-2 border-accent pl-4">Digital Campus</h4>
                        <nav className="flex flex-col items-start gap-5">
                            {navLinks.map(({ label, path }) => (
                                <button
                                    key={path}
                                    className="text-text-secondary text-xs font-bold uppercase tracking-[0.2em] hover:text-accent transition-all duration-300 flex items-center group relative overflow-hidden"
                                    onClick={() => navigate(path)}
                                >
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-accent transition-all duration-500 mr-0 group-hover:mr-3 opacity-0 group-hover:opacity-100" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Contact card style */}
                    <div className="col-span-1 pt-4 lg:pt-0">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-10 border-l-2 border-accent pl-4">Direct Channel</h4>
                        <div className="flex flex-col items-start gap-8">
                            <div className="flex flex-col items-start group">
                                <span className="text-[8px] text-accent font-black uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">Front Desk</span>
                                <a href="tel:+919030088545" className="text-white text-sm font-black hover:text-accent tracking-tight transition-colors">+91 90300 88545</a>
                            </div>
                            <div className="flex flex-col items-start group">
                                <span className="text-[8px] text-accent font-black uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">Inquiries</span>
                                <a href="mailto:kakatiyadmm@gmail.com" className="text-white text-sm font-black hover:text-accent break-all tracking-tight transition-colors">kakatiyadmm@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Location & Status */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-start border-t border-white/5 pt-12 lg:pt-0 lg:border-none">
                        <div className="flex items-start gap-4 mb-8 group">
                            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent group-hover:text-primary text-sm" />
                            </div>
                            <p className="text-text-secondary text-[12px] font-bold leading-relaxed opacity-80 pt-1">
                                NS.Gate Road, Dharmavaram,<br />
                                Anantapur (Dt), AP - 515671
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white/[0.03] to-transparent p-6 rounded-[2rem] border border-white/5 w-full backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <FontAwesomeIcon icon={faClock} className="text-accent text-3xl rotate-12" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-glow-sm">School Operations</span>
                            </div>
                            <div className="space-y-4 relative z-10 pb-2">
                                <div className="flex flex-col">
                                    <span className="text-accent font-black text-sm tracking-tight">09:00 AM - 04:30 PM</span>
                                    <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">Mon - Sat Service Hours</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                                    Admissions Live
                                </span>
                                <FontAwesomeIcon icon={faShieldAlt} className="text-white/20 text-xs" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom — Legal & Trust */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em] text-center md:text-left opacity-40">
                            © {new Date().getFullYear()} KAKATIYA VIDYANIKETAN
                        </p>
                        <div className="h-px w-8 bg-white/10 hidden md:block" />
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-30">
                            S RAMI REDDY EDUCATIONAL SOCIETY
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow-accent" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] whitespace-nowrap">
                                Govt. of A.P Recognised
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
