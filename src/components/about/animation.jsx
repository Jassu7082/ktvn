import React, { useEffect, useState } from 'react';

const stats = [
    { label: 'Years of Experience', value: 14, suffix: '+', unit: 'years' },
    { label: 'Students', value: 1000, suffix: '+', unit: '' },
    { label: 'Teachers', value: 60, suffix: '+', unit: '' },
];

const AnimatedStats = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        const intervals = stats.map((stat, index) => {
            const increment = stat.value / 100;
            return setInterval(() => {
                setCounts((prevCounts) => {
                    const newCounts = [...prevCounts];
                    if (newCounts[index] < stat.value) {
                        newCounts[index] = Math.min(stat.value, newCounts[index] + increment);
                    }
                    return newCounts;
                });
            }, 30);
        });

        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <div className=" py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="mx-auto flex max-w-xs flex-col items-center gap-y-4">
                            <dt className="text-base leading-7 text-gray-100">{stat.label}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <div className="relative flex items-center justify-center h-20 w-20 rounded-full text-white">
                                    {Math.round(counts[index])}
                                    <span className="text-white text-4xl">{stat.suffix}</span>
                                </div>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default AnimatedStats;
