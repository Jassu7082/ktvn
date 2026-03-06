import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../config/firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                navigate('/admin');
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all credentials");
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Access Granted - Command Center');
            navigate('/admin');
        } catch (error) {
            console.error('Sign-in error:', error.message);
            const errorMessage = error.code === 'auth/invalid-credential'
                ? "Invalid institutional credentials"
                : "Authentication Failure";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (user) return null;

    return (
        <div className="min-h-screen bg-[#050B14] relative overflow-hidden flex items-center justify-center p-6 selection:bg-accent selection:text-primary">
            {/* Cinematic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-md relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Back to Home Shortcut */}
                <Link to="/" className="absolute -top-16 left-0 flex items-center gap-2 text-text-muted hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Campus</span>
                </Link>

                {/* Login Card */}
                <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6 shadow-glow-accent group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl font-display font-black text-white tracking-tight mb-2">Command Center</h1>
                        <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Identity Verification Required</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-accent uppercase tracking-[0.2em] ml-1">Institutional Email</label>
                            <div className="relative group/input">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@ktvn.edu"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-accent transition-all font-bold placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-accent uppercase tracking-[0.2em] ml-1">Secure Passkey</label>
                            <div className="relative group/input">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-accent transition-all font-bold placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent text-primary h-16 rounded-[1.25rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.3em] hover:shadow-glow-accent transition-all duration-300 disabled:opacity-50 group/btn"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Authorize Access
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Branding Bar */}
                    <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none mb-1">KTVN</span>
                            <span className="text-[7px] font-bold text-text-muted uppercase tracking-[0.2em]">Institutional Engine</span>
                        </div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
