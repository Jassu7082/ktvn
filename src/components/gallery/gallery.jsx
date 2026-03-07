import React, { useEffect, useState, useRef } from "react";
import { imageDb, txtDB } from '../../config/firebase-config';
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { X, Maximize2, Calendar, Info, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../Footer/Footer";
import { SkeletonCard } from "../lib/Skeleton";

// ── GalleryModal (Lightbox) ──────────────────────────────────────────────────
const GalleryModal = ({ isOpen, onClose, data }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    if (!isOpen || !data) return null;

    const images = data.images || [data.imgUrl];

    const handleNext = (e) => {
        e.stopPropagation();
        setIsImageLoading(true);
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setIsImageLoading(true);
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-6xl max-h-[90vh] glass rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/5">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-3 bg-black/40 hover:bg-accent/20 rounded-full transition-all text-white border border-white/10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Main Viewport */}
                <div className="lg:w-2/3 bg-black/40 flex items-center justify-center p-6 relative">
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-6 z-20 p-3 bg-black/40 hover:bg-accent hover:text-primary rounded-full transition-all text-white border border-white/10"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-6 z-20 p-3 bg-black/40 hover:bg-accent hover:text-primary rounded-full transition-all text-white border border-white/10"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Glass Loading Shimmer */}
                    {isImageLoading && (
                        <div className="absolute inset-x-6 inset-y-6 z-10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-3xl animate-pulse flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">Optimizing Visuals</span>
                            </div>
                        </div>
                    )}

                    <img
                        src={images[activeIndex]}
                        key={activeIndex}
                        alt={data.title}
                        onLoad={() => setIsImageLoading(false)}
                        className={`max-w-full max-h-[45vh] lg:max-h-[75vh] object-contain shadow-2xl rounded-2xl transition-all duration-700 ${isImageLoading ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
                    />

                    {images.length > 1 && (
                        <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${idx === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Context Side */}
                <div className="lg:w-1/3 p-10 flex flex-col bg-[#050B14]/40 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-widest">
                            Official Archive
                        </div>
                        {images.length > 1 && (
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                {images.length} Visuals
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl font-display font-black text-white mb-6 leading-tight">
                        {data.title}
                    </h2>

                    <div className="h-px w-12 bg-accent mb-8" />

                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-text-secondary text-sm leading-relaxed font-medium opacity-80">
                            {data.description || "Captured moment of excellence at Kakatiya Vidyaniketan."}
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-text-muted">
                            <Calendar size={14} className="text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-widest">KTVN Campus</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── GalleryCard ───────────────────────────────────────────────────────────────
const GalleryCard = ({ data, onOpen }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Support both new array structure and legacy string structure
    const images = data.images || [data.imgUrl];
    const previewUrl = images[currentIndex];

    // Auto-slide effect for thumbnails
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000); // 4 seconds per slide for a premium feel
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div
            onClick={() => onOpen(data)}
            className="group relative flex flex-col h-full rounded-[2.5rem] bg-surface/30 overflow-hidden border border-white/5 hover:border-accent/40 shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-dark">
                <img
                    src={previewUrl}
                    alt={data.title}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Slide indicators (Visual only, no arrows) */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-accent' : 'w-1 bg-white/40'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Multi-image badge */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {images.length > 1 && (
                        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-black tracking-widest uppercase text-white scale-90 group-hover:scale-100 transition-transform">
                            {images.length} Photos
                        </div>
                    )}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-60" />

                <div className="absolute bottom-4 right-4 p-3 bg-accent text-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-glow-sm">
                    <Maximize2 className="w-4 h-4" />
                </div>
            </div>

            <div className="p-7 flex flex-col flex-grow relative">
                <h3 className="text-lg font-display font-black text-white mb-3 line-clamp-1 group-hover:text-accent transition-colors tracking-tight">
                    {data.title || "Untitled Capture"}
                </h3>

                <p className="text-xs text-text-muted font-medium line-clamp-2 opacity-60 leading-relaxed mb-6">
                    {data.description || "Institutional achievement and growth recorded."}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Explore Gallery</span>
                        <div className="h-px w-6 bg-accent/40 group-hover:w-10 group-hover:bg-accent transition-all duration-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Gallery page ──────────────────────────────────────────────────────────────
const Gallery = () => {
    const [imgData, setImgData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state promoted to page level
    const [selectedPost, setSelectedPost] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const txtDataCollection = collection(txtDB, "txtData");
                const snapshot = await getDocs(txtDataCollection);
                const metadata = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        ...data,
                        id: doc.id,
                        // Legacy Guard: Ensure images is always an array
                        images: data.images || [data.imgUrl]
                    };
                });

                // Client-side sort: newest first
                metadata.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });

                setImgData(metadata);

                // Deep Linking: Auto-open post if requested via state
                const openPostId = location.state?.openPostId;
                if (openPostId) {
                    const targetPost = metadata.find(p => p.id === openPostId);
                    if (targetPost) setSelectedPost(targetPost);
                }
            } catch (err) {
                console.error("Error fetching gallery metadata:", err);
                setError("Failed to load gallery. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, [location.state?.openPostId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
                    <h1 className="section-heading text-4xl sm:text-5xl mb-4">Gallery</h1>
                    <div className="gold-divider h-1 w-24 mx-auto mb-8" />
                </div>
                <div className="container mx-auto px-6 py-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-card bg-surface overflow-hidden border border-border-light h-[420px]">
                            <div className="h-64 skeleton-shimmer" />
                            <div className="p-5 space-y-3">
                                <div className="h-5 w-3/4 skeleton-shimmer rounded" />
                                <div className="h-4 w-full skeleton-shimmer rounded" />
                                <div className="h-4 w-5/6 skeleton-shimmer rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="glass p-8 rounded-xl text-center">
                    <p className="text-error text-lg font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen">
            {/* Header section */}
            <div className="relative pt-24 pb-12 overflow-hidden bg-primary-dark border-b border-border">
                {/* Subtle BG pattern/glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-accent uppercase tracking-[0.3em] font-bold text-xs mb-3 block">Memories At KTVN</span>
                    <h1 className="section-heading text-4xl sm:text-5xl lg:text-6xl mb-6">Our Visual History</h1>
                    <div className="gold-divider h-1 w-32 mx-auto mb-6" />
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
                        Step into the daily life of Kakatiya Vidyaniketan through our curated gallery of achievements, events, and student growth.
                    </p>
                </div>
            </div>

            {/* Grid section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
                    {imgData.map((data) => (
                        <GalleryCard
                            key={data.id}
                            data={data}
                            onOpen={setSelectedPost}
                        />
                    ))}
                </div>
            </div>

            <GalleryModal
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                data={selectedPost}
            />

            <Footer />
        </div>
    );
};

export default Gallery;
