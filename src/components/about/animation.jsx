import React, { useEffect, useState, useRef } from 'react';

const stats = [
    { label: 'Years of Experience', value: 14, suffix: '+' },
    { label: 'Students', value: 1000, suffix: '+' },
    { label: 'Teachers', value: 60, suffix: '+' },
];

const AnimatedStats = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);

    // Only start the count-up animation when the section is in view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        const intervals = stats.map((stat, index) => {
            const increment = stat.value / 100;
            return setInterval(() => {
                setCounts((prev) => {
                    const next = [...prev];
                    if (next[index] < stat.value) {
                        next[index] = Math.min(stat.value, next[index] + increment);
                    }
                    return next;
                });
            }, 30);
        });

        return () => intervals.forEach(clearInterval);
    }, [started]);

    return (
        <div ref={sectionRef} className="py-2 sm:py-4">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="mx-auto flex max-w-xs flex-col items-center gap-y-4"
                    >
                        <dt className="text-sm sm:text-base leading-7 text-text-muted font-medium uppercase tracking-widest opacity-70">
                            {stat.label}
                        </dt>
                        <dd className="order-first">
                            <div className="flex items-center justify-center p-4 rounded-full text-text-primary">
                                <span className="text-5xl sm:text-6xl font-display font-black text-white shadow-glow-sm">
                                    {Math.round(counts[index])}
                                    <span className="text-accent ml-1">{stat.suffix}</span>
                                </span>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default AnimatedStats;
