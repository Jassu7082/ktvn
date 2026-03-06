import React from 'react';

/**
 * Skeleton loaders
 * ----------------
 * A set of composable shimmer placeholders used during loading states.
 * All use the `.skeleton-shimmer` utility defined in index.css.
 */

/** Generic shimmer block — configure width/height via className */
export const SkeletonBlock = ({ className = '' }) => (
    <div className={`skeleton-shimmer rounded ${className}`} />
);

/** Skeleton for a gallery/team image card */
export const SkeletonCard = ({ className = '' }) => (
    <div className={`rounded-card overflow-hidden bg-surface border border-border-light ${className}`}>
        <div className="w-full h-64 skeleton-shimmer" />
        <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 skeleton-shimmer rounded" />
            <div className="h-3 w-full skeleton-shimmer rounded" />
            <div className="h-3 w-5/6 skeleton-shimmer rounded" />
        </div>
    </div>
);

/** Skeleton for a profile/batch card (horizontal layout) */
export const SkeletonProfileCard = ({ className = '' }) => (
    <div className={`rounded-card overflow-hidden bg-surface flex border border-border-light p-1 ${className}`}>
        <div className="w-1/3 h-40 skeleton-shimmer rounded-l-card" />
        <div className="w-2/3 p-4 space-y-3">
            <div className="h-5 w-3/4 skeleton-shimmer rounded" />
            <div className="h-3 w-full skeleton-shimmer rounded" />
            <div className="h-3 w-2/3 skeleton-shimmer rounded" />
        </div>
    </div>
);

/** Full-page skeleton used by the route-level Suspense fallback */
export const PageSkeleton = () => (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center gap-6 p-8">
        {/* Fake hero block */}
        <div className="w-full max-w-4xl h-64 skeleton-shimmer rounded-lg" />
        {/* Fake content rows */}
        <div className="w-full max-w-4xl space-y-3">
            <div className="h-6 w-1/2 skeleton-shimmer rounded" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-5/6 skeleton-shimmer rounded" />
        </div>
        {/* Fake card grid */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    </div>
);

/** Small inline image skeleton — use when you just need a picture placeholder */
export const SkeletonImage = ({ className = '' }) => (
    <div className={`skeleton-shimmer rounded ${className}`} />
);
