import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { txtDB } from '../../config/firebase-config';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const startTime = Date.now();
        const path = location.pathname;
        const referrer = document.referrer;

        // Detect if this is a "Landing" (visitor just arrived from outside or direct link)
        const isLanding = !referrer || !referrer.includes(window.location.hostname);

        // Device detection
        const getDeviceType = () => {
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
            if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) return 'mobile';
            return 'desktop';
        };

        // Report metric on unmount or path change
        return () => {
            const endTime = Date.now();
            const durationSeconds = Math.round((endTime - startTime) / 1000);

            // Only track visits longer than 1 second to filter out bounces
            if (durationSeconds > 1) {
                const logMetric = async () => {
                    try {
                        await addDoc(collection(txtDB, 'metrics'), {
                            page: path,
                            duration: durationSeconds,
                            device: getDeviceType(),
                            timestamp: serverTimestamp(),
                            isLanding: isLanding,
                            referrer: referrer.substring(0, 100),
                            userAgent: navigator.userAgent.substring(0, 100)
                        });
                    } catch (error) {
                        console.error('Failed to log analytics:', error);
                    }
                };
                logMetric();
            }
        };
    }, [location.pathname]);

    return null;
};

export default AnalyticsTracker;
