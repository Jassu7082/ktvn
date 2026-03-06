import React, { useEffect, useState } from "react";
import { imageDb, txtDB, auth } from '../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Footer/Footer";
import {
    LayoutDashboard,
    BarChart3,
    ImagePlus,
    Trash2,
    LogOut,
    Clock,
    Users,
    MousePointer2,
    CheckCircle2,
    XCircle,
    Loader2,
    Link2,
    Copy,
    ExternalLink
} from "lucide-react";

const RESERVED_SLUGS = ['admin', 'gallery', 'about', 'batches', 'login', 'home', 'contact', 'legal', 'privacy'];
const SLUG_REGEX = /^[a-zA-Z0-9-_]+$/;

function FirebaseImageUpload() {
    const [images, setImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgData, setImgData] = useState([]);
    const [metricsData, setMetricsData] = useState([]);
    const [redirects, setRedirects] = useState([]);
    const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'analytics' | 'upload' | 'redirects'
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Redirect form state
    const [redirectSlug, setRedirectSlug] = useState("");
    const [redirectFile, setRedirectFile] = useState(null);
    const [redirectLimit, setRedirectLimit] = useState(0); // 0 = unlimited
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
                fetchData();
                fetchMetrics();
                fetchRedirects();
            } else {
                setLoggedIn(false);
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const txtDataCollection = collection(txtDB, "txtData");
            const txtDataSnapshot = await getDocs(txtDataCollection);
            const imgDataArray = txtDataSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                // Handle legacy single-image posts by wrapping in array
                images: doc.data().images || [doc.data().imgUrl]
            }));

            // Client-side sort: newest first
            imgDataArray.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            setImgData(imgDataArray);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching content");
        }
        setIsLoading(false);
    };

    const fetchMetrics = async () => {
        try {
            const metricsCollection = collection(txtDB, "metrics");
            const q = query(metricsCollection, orderBy('timestamp', 'desc'), limit(100));
            const snapshot = await getDocs(q);
            setMetricsData(snapshot.docs.map(doc => doc.data()));
        } catch (error) {
            console.error("Error fetching metrics:", error);
        }
    };

    const fetchRedirects = async () => {
        try {
            const redirectsCollection = collection(txtDB, "redirects");
            const snapshot = await getDocs(redirectsCollection);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRedirects(data);
        } catch (error) {
            console.error("Error fetching redirects:", error);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const removeSelectedImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (!loggedIn || images.length === 0 || !title) {
            toast.warning("Please provide a title and select at least one image");
            return;
        }

        setIsUploading(true);
        try {
            const uploadedUrls = [];
            for (const image of images) {
                const imgRef = ref(imageDb, `gallery/${uuidv4()}_${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const url = await getDownloadURL(snapshot.ref);
                uploadedUrls.push(url);
            }

            await addDoc(collection(txtDB, 'txtData'), {
                title,
                description,
                images: uploadedUrls,
                createdAt: new Date().toISOString()
            });

            fetchData();
            toast.success("Post created with " + uploadedUrls.length + " images!");
            setImages([]);
            setTitle("");
            setDescription("");
            setActiveTab('manage');
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error("Upload failed: " + error.message);
        }
        setIsUploading(false);
    };

    const handleRedirectCreate = async () => {
        const cleanSlug = redirectSlug.trim().toLowerCase();

        // 1. Basic validation
        if (!cleanSlug || !redirectFile) {
            toast.error("Please provide both a slug and a file");
            return;
        }

        // 2. Regex check (URL safe)
        if (!SLUG_REGEX.test(cleanSlug)) {
            toast.error("Slug can only contain letters, numbers, hyphens, and underscores");
            return;
        }

        // 3. Reserved route check
        if (RESERVED_SLUGS.includes(cleanSlug)) {
            toast.error(`'/${cleanSlug}' is a reserved institutional route`);
            return;
        }

        // 4. Duplicate check
        const isDuplicate = redirects.some(r => r.slug === cleanSlug);
        if (isDuplicate) {
            toast.error(`A redirect for '/${cleanSlug}' already exists`);
            return;
        }

        setIsUploading(true);
        try {
            const fileRef = ref(imageDb, `redirects/${uuidv4()}_${redirectFile.name}`);
            const snapshot = await uploadBytes(fileRef, redirectFile);
            const url = await getDownloadURL(snapshot.ref);

            await addDoc(collection(txtDB, 'redirects'), {
                slug: cleanSlug,
                fileUrl: url,
                fileName: redirectFile.name,
                clicks: 0,
                limit: parseInt(redirectLimit) || 0,
                createdAt: new Date().toISOString()
            });

            fetchRedirects();
            toast.success(`Redirect link /${cleanSlug} active!`);
            setRedirectSlug("");
            setRedirectFile(null);
            setRedirectLimit(0);
        } catch (error) {
            console.error("Redirect Create Error:", error);
            toast.error("Failed to create redirect link");
        }
        setIsUploading(false);
    };

    const handleDeleteRedirect = async (id, fileUrl) => {
        if (!window.confirm("Permanently delete this redirect link?")) return;

        try {
            await deleteDoc(doc(txtDB, 'redirects', id));
            // Try to delete the file from storage if it exists
            const fileRef = ref(imageDb, fileUrl);
            await deleteObject(fileRef).catch(err => console.warn("File delete failed:", err));

            fetchRedirects();
            toast.success("Redirect link removed");
        } catch (error) {
            console.error("Delete Redirect Error:", error);
            toast.error("Failed to delete redirect");
        }
    };

    const handleDelete = async (postId, imageUrls) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            // Delete record from Firestore
            await deleteDoc(doc(txtDB, 'txtData', postId));

            // Delete all associated images from Storage
            for (const url of imageUrls) {
                if (url) {
                    const imgRef = ref(imageDb, url);
                    await deleteObject(imgRef).catch(err => console.warn("Image delete failed:", err));
                }
            }

            fetchData();
            toast.success("Post removed permanently");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete post");
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("Logged out successfully");
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
        }
    };

    // Analytics Summary Helpers
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '0s';
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    };

    const stats = {
        totalVisits: (metricsData || []).length,
        avgDurationRaw: metricsData?.length
            ? Math.round(metricsData.reduce((acc, curr) => acc + (curr.duration || 0), 0) / metricsData.length)
            : 0,
        mobileRatio: metricsData?.length ? Math.round((metricsData.filter(m => m.device === 'mobile').length / metricsData.length) * 100) : 0
    };

    // Page-wise aggregation
    const getPageStats = () => {
        const pages = {};
        (metricsData || []).forEach(m => {
            const p = m.page || '/';
            if (!pages[p]) pages[p] = { total: 0, landings: 0, duration: 0 };
            pages[p].total++;
            if (m.isLanding) pages[p].landings++;
            pages[p].duration += (m.duration || 0);
        });
        return Object.entries(pages).sort((a, b) => b[1].total - a[1].total);
    };

    const pageStats = getPageStats();

    return (
        <div className="min-h-screen bg-[#050B14] text-white">
            <ToastContainer theme="dark" position="bottom-right" />

            {/* Admin Header */}
            <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary font-black shadow-glow-sm">
                            K
                        </div>
                        <div>
                            <h1 className="text-sm font-black uppercase tracking-[0.2em]">Command Center</h1>
                            <p className="text-[10px] text-accent font-bold uppercase tracking-widest">KTVN Institutional Admin</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Navigation Tabs - Mobile Scrollable */}
                <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-8 sm:mb-12">
                    {[
                        { id: 'manage', label: 'Monitor', icon: LayoutDashboard },
                        { id: 'upload', label: 'Create', icon: ImagePlus },
                        { id: 'redirects', label: 'Redirects', icon: Link2 },
                        { id: 'analytics', label: 'Stats', icon: BarChart3 }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-accent text-primary shadow-glow-sm'
                                : 'text-text-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <tab.icon size={14} className="sm:w-4 sm:h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[600px]">
                    {activeTab === 'manage' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-display font-black tracking-tight mb-2">Live Content</h2>
                                    <p className="text-text-muted text-sm font-medium">Managing {imgData.length} published gallery entries</p>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="h-64 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-accent" size={32} />
                                </div>
                            ) : (
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {imgData.map((post) => (
                                        <div key={post.id} className="group bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 relative">
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={post.images?.[0] || post.imgUrl}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    alt=""
                                                />
                                                {post.images?.length > 1 && (
                                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black tracking-widest uppercase">
                                                        +{post.images.length - 1} Images
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] to-transparent opacity-60" />
                                            </div>

                                            <div className="p-8 relative">
                                                <h3 className="text-xl font-bold mb-3 line-clamp-1">{post.title}</h3>
                                                <p className="text-text-muted text-sm mb-6 line-clamp-2 font-medium opacity-80 leading-relaxed">
                                                    {post.description || "No description provided."}
                                                </p>

                                                <button
                                                    onClick={() => handleDelete(post.id, post.images || [post.imgUrl])}
                                                    className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                                                >
                                                    <Trash2 size={14} />
                                                    Terminate Post
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight mb-6 sm:mb-8">Publish New Story</h2>

                            <div className="space-y-8 sm:space-y-10 bg-white/[0.02] border border-white/5 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] backdrop-blur-md">
                                <div className="grid gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-1">Post Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Annual Sport Meet 2025"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-all font-bold"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-1">Context / Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Write a brief overview of this event..."
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-all font-medium h-32 resize-none"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-1">Asset Library (Multiple Allowed)</label>
                                        <div className="relative group/upload">
                                            <input
                                                key={images.length === 0 ? 'reset' : 'active'}
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                multiple
                                                disabled={isUploading}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                            />
                                            <div className="border-2 border-dashed border-white/10 group-hover/upload:border-accent/40 group-hover/upload:bg-accent/[0.02] rounded-3xl p-12 transition-all flex flex-col items-center gap-4 text-center">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover/upload:scale-110 transition-transform duration-500">
                                                    <ImagePlus size={32} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm uppercase tracking-widest">Select Visual Assets</p>
                                                    <p className="text-text-muted text-xs font-medium mt-1">PNG, JPG, or WEBP. Up to 10MB each.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {images.length > 0 && (
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 pt-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                                                <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="" />
                                                <button
                                                    onClick={() => removeSelectedImage(index)}
                                                    className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <XCircle className="text-white" size={24} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="w-full py-6 rounded-3xl bg-accent text-primary text-xs font-black uppercase tracking-[0.3em] hover:shadow-glow-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                                >
                                    {isUploading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                                    {isUploading ? 'Finalizing Upload...' : 'Publish to Gallery'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight mb-6 sm:mb-8 text-center sm:text-left">Institutional Intelligence</h2>

                            {/* Summary Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                                {[
                                    { label: 'Visits', val: stats.totalVisits, icon: MousePointer2, color: 'text-accent' },
                                    { label: 'Engagement', val: formatDuration(stats.avgDurationRaw), icon: Clock, color: 'text-blue-400' },
                                    { label: 'Device', val: `${stats.mobileRatio}% Mob`, icon: Users, color: 'text-purple-400' }
                                ].map(stat => (
                                    <div key={stat.label} className="bg-white/[0.03] border border-white/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] hover:border-white/10 transition-all flex sm:block items-center gap-6">
                                        <div className={`w-12 h-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} sm:mb-6`}>
                                            <stat.icon size={22} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1 sm:mb-2">{stat.label}</p>
                                            <p className="text-2xl sm:text-4xl font-display font-black tracking-tight">{stat.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Page-wise Breakdown */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 overflow-hidden">
                                <div className="flex items-center gap-4 mb-6 sm:mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        <LayoutDashboard size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold">Page-wise Insights</h3>
                                        <p className="text-text-muted text-[10px] sm:text-xs font-medium uppercase tracking-widest">Entry vs Exit Analysis</p>
                                    </div>
                                </div>
                                {/* Scroll indicator for tables on mobile */}
                                <div className="sm:hidden text-center mb-4">
                                    <p className="text-[8px] font-black uppercase text-accent/40 tracking-[0.4em]">Scroll sideways to view details</p>
                                </div>

                                <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest pl-4">Target Page</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest text-center">Total Visits</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest text-center">Direct Landings</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest text-right pr-4">Avg Engagement</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {pageStats.map(([path, data], idx) => (
                                                <tr key={idx} className="group hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-5 pl-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                                            <span className="text-xs font-black uppercase tracking-widest text-white">
                                                                {path === '/' ? '/HOME' : path.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-center font-display font-bold text-lg">{data.total}</td>
                                                    <td className="py-5 text-center">
                                                        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase">
                                                            {data.landings} Entries
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-right pr-4 font-bold text-text-muted">
                                                        {formatDuration(Math.round(data.duration / data.total))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Activity Feed */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-hidden">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Recent Activity Feed</h3>
                                        <p className="text-text-muted text-xs font-medium">Real-time visitor logs from the last 100 sessions</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest pl-4">Timestamp</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest">Entry Type</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest">Duration</th>
                                                <th className="pb-5 text-[10px] font-black text-accent uppercase tracking-widest pr-4 text-right">Route</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {(metricsData || []).slice(0, 5).map((metric, idx) => (
                                                <tr key={idx} className="group hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-4 text-xs font-bold text-white pl-4">
                                                        {formatTimestamp(metric.timestamp)}
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${metric.isLanding ? 'bg-green-400 shadow-glow-sm' : 'bg-blue-400'}`} />
                                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                                                                {metric.isLanding ? 'Direct Landing' : 'Click-wise'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-text-muted">
                                                            {formatDuration(metric.duration)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 pr-4 text-right">
                                                        <span className="text-[10px] font-black text-accent bg-accent/5 px-2 py-1 rounded">
                                                            {metric.page === '/' ? '/HOME' : metric.page.toUpperCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'redirects' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div>
                                    <h2 className="text-3xl font-display font-black tracking-tight mb-2">Redirect Hub</h2>
                                    <p className="text-text-muted text-sm font-medium">Universal link manager for downloads and sub-pages</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                                {/* Creator Card */}
                                <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-md lg:sticky lg:top-24">
                                    <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                                            <Link2 size={16} />
                                        </div>
                                        New Link
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">URL Slug</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-sm">/</span>
                                                <input
                                                    type="text"
                                                    value={redirectSlug}
                                                    onChange={(e) => setRedirectSlug(e.target.value)}
                                                    placeholder="e.g. pamphlet"
                                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-8 pr-4 py-4 outline-none focus:border-accent transition-all font-bold text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Target Document</label>
                                            <div className="relative group/red">
                                                <input
                                                    key={redirectFile ? 'selected' : 'empty'}
                                                    type="file"
                                                    onChange={(e) => setRedirectFile(e.target.files[0])}
                                                    disabled={isUploading}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                                />
                                                <div className={`border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center gap-3 text-center ${redirectFile ? 'border-accent/40 bg-accent/5' : 'border-white/10 group-hover/red:border-white/20'}`}>
                                                    {redirectFile ? (
                                                        <CheckCircle2 className="text-accent" size={24} />
                                                    ) : (
                                                        <ImagePlus className="text-white/20" size={24} />
                                                    )}
                                                    <p className="font-bold text-[10px] uppercase tracking-widest leading-tight">
                                                        {redirectFile ? redirectFile.name : 'Select File'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Usage Limit (0 for unlimited)</label>
                                            <input
                                                type="number"
                                                value={redirectLimit}
                                                onChange={(e) => setRedirectLimit(e.target.value)}
                                                placeholder="e.g. 100"
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-all font-bold text-sm"
                                            />
                                        </div>

                                        <button
                                            onClick={handleRedirectCreate}
                                            disabled={isUploading}
                                            className="w-full py-5 bg-accent text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            {isUploading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                                            Activate Link
                                        </button>
                                    </div>
                                </div>

                                {/* List Card */}
                                <div className="lg:col-span-2 space-y-4">
                                    {redirects.length === 0 ? (
                                        <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] text-center border-dashed">
                                            <p className="text-text-muted font-bold uppercase tracking-[0.2em] text-[10px]">No dynamic links created yet</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {redirects.map((link) => (
                                                <div key={link.id} className="bg-white/[0.03] border border-white/5 p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-white/10 transition-all group">
                                                    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                                            <Link2 className="text-accent/40 group-hover:text-accent transition-colors w-5 h-5 sm:w-6 sm:h-6" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-accent font-black text-sm uppercase truncate">/{link.slug}</span>
                                                                <button
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`);
                                                                        toast.info("Link copied to clipboard");
                                                                    }}
                                                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-white shrink-0"
                                                                >
                                                                    <Copy size={12} />
                                                                </button>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60 truncate max-w-[150px] sm:max-w-none">
                                                                    {link.fileName}
                                                                </p>
                                                                <div className="hidden sm:block h-1 w-1 rounded-full bg-white/20" />
                                                                <span className="text-[10px] font-black text-accent/80 uppercase tracking-widest">
                                                                    {link.clicks || 0} / {link.limit > 0 ? link.limit : '∞'} Hits
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                                        <a
                                                            href={link.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 sm:flex-none h-11 sm:h-10 px-4 sm:px-0 sm:w-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-primary transition-all gap-2 sm:gap-0"
                                                        >
                                                            <ExternalLink size={16} />
                                                            <span className="sm:hidden text-[10px] font-black uppercase tracking-widest">Preview</span>
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteRedirect(link.id, link.fileUrl)}
                                                            className="flex-1 sm:flex-none h-11 sm:h-10 px-4 sm:px-0 sm:w-10 rounded-xl bg-white/5 flex items-center justify-center text-red-400/40 hover:bg-red-500 hover:text-white transition-all gap-2 sm:gap-0"
                                                        >
                                                            <Trash2 size={16} />
                                                            <span className="sm:hidden text-[10px] font-black uppercase tracking-widest">Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default FirebaseImageUpload;
