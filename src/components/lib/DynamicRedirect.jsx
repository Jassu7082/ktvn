import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc, increment, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { txtDB, imageDb } from '../../config/firebase-config';
import { ClipLoader } from 'react-spinners';
import { AlertCircle, ArrowLeft, Download } from 'lucide-react';

const DynamicRedirect = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('resolving'); // resolving | failed
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const resolveRedirect = async () => {
            try {
                const q = query(collection(txtDB, "redirects"), where("slug", "==", slug.toLowerCase()));
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const redirectDoc = snapshot.docs[0];
                    const data = redirectDoc.data();
                    const { fileUrl, fileName, clicks, limit } = data;

                    // Check if already expired (fail-safe)
                    if (limit > 0 && clicks >= limit) {
                        setStatus('failed');
                        setErrorMsg("This link has reached its usage limit and is no longer available.");
                        return;
                    }

                    // Increment click count
                    const newClicks = (clicks || 0) + 1;
                    await updateDoc(doc(txtDB, "redirects", redirectDoc.id), {
                        clicks: increment(1)
                    });

                    // URL Masking: Fetch as Blob to keep institutional link in address bar
                    try {
                        const response = await fetch(fileUrl);
                        if (!response.ok) throw new Error("Download failed");
                        const blob = await response.blob();
                        const downloadUrl = window.URL.createObjectURL(blob);

                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = fileName || 'document.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(downloadUrl);
                    } catch (fetchErr) {
                        console.warn("Masked fetch failed (likely CORS). Falling back to direct download.", fetchErr);
                        window.location.href = fileUrl;
                    }

                    // Self-Destruct Cleanup: If limit reached, purge everything
                    if (limit > 0 && newClicks >= limit) {
                        try {
                            await deleteDoc(doc(txtDB, "redirects", redirectDoc.id));
                            const fileRef = ref(imageDb, fileUrl);
                            await deleteObject(fileRef);
                            console.log("Self-destruct: Link and file purged successfully.");
                        } catch (purgeError) {
                            console.warn("Self-destruct purge failed:", purgeError);
                        }
                    }

                    // Success UI transition
                    setTimeout(() => {
                        setStatus('success');
                    }, 1000);
                } else {
                    setStatus('failed');
                    setErrorMsg(`The link /${slug} could not be found.`);
                }
            } catch (err) {
                console.error("Redirect Error:", err);
                setStatus('failed');
                setErrorMsg("Institutional Error: Failed to resolve or serve the secure document.");
            }
        };

        resolveRedirect();
    }, [slug]);

    if (status === 'resolving') {
        return (
            <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
                <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <ClipLoader color="#EAB308" size={50} />
                    <div className="text-center">
                        <h1 className="text-white text-2xl font-display font-black tracking-tight mb-2">Secure Download</h1>
                        <p className="text-text-muted text-sm uppercase tracking-widest font-bold opacity-60">Preparing institutional document...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
                <div className="glass p-12 rounded-[2.5rem] border border-white/5 max-w-md w-full relative overflow-hidden group">
                    <Download className="w-16 h-16 text-accent mx-auto mb-8 animate-bounce" />
                    <h2 className="text-2xl font-display font-black text-white mb-4">Transfer Complete</h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-10 opacity-70">
                        Your secure document has been sent to your device. You may close this tab or return to the main portal.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-accent text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-glow-accent transition-all flex items-center justify-center gap-3"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
            <div className="glass p-12 rounded-[2.5rem] border border-white/5 max-w-md w-full text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <AlertCircle size={120} className="text-error -rotate-12" />
                </div>

                <AlertCircle className="w-16 h-16 text-error mx-auto mb-8 animate-bounce" />
                <h2 className="text-2xl font-display font-black text-white mb-4">Link Not Found</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-10 opacity-70">
                    {errorMsg} Please check the URL or contact the administrator for assistance.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-accent font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-primary transition-all flex items-center justify-center gap-3"
                >
                    <ArrowLeft size={14} />
                    Back to Campus
                </button>
            </div>
        </div>
    );
};

export default DynamicRedirect;
