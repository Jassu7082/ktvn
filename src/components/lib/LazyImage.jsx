import React, { useRef, useState, useEffect } from 'react';

/**
 * LazyImage
 * ---------
 * A drop-in replacement for <img> that:
 *  1. Uses native `loading="lazy"` for browser-level deferral.
 *  2. Uses IntersectionObserver to trigger a smooth fade-in once the image
 *     enters the viewport (with an optional preload margin).
 *  3. Shows a shimmer skeleton placeholder while the image is loading.
 *  4. Accepts an optional `src` that may be null/undefined (e.g. while a
 *     Firebase download URL is being resolved) — keeps showing the skeleton
 *     until a real src is provided.
 *
 * Props:
 *  src          — image URL (may be null/undefined initially)
 *  alt          — alt text (required for a11y)
 *  className    — additional classes for the <img> element
 *  wrapperClass — additional classes for the wrapper <div>
 *  rootMargin   — IntersectionObserver rootMargin (default "200px")
 *  aspectRatio  — CSS aspect-ratio for the skeleton (default "auto")
 *  width / height — forwarded to <img>
 */
const LazyImage = ({
    src,
    alt,
    className = '',
    wrapperClass = '',
    rootMargin = '200px',
    aspectRatio = 'auto',
    width,
    height,
    ...rest
}) => {
    const wrapperRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // IntersectionObserver — trigger once
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div
            ref={wrapperRef}
            className={`relative overflow-hidden bg-primary-dark ${wrapperClass}`}
            style={{ aspectRatio }}
        >
            {/* Dark Shimmer skeleton — shown until the image finishes loading */}
            {(!loaded || !src) && (
                <div className="absolute inset-0 skeleton-shimmer z-0" />
            )}

            {/* Only render <img> once element is near the viewport AND src is ready */}
            {inView && src && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    width={width}
                    height={height}
                    onLoad={() => setLoaded(true)}
                    className={`
            transition-opacity duration-300 ease-in-out
            ${loaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
                    style={{
                        imageRendering: 'high-quality',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden'
                    }}
                    {...rest}
                />
            )}
        </div>
    );
};

export default LazyImage;
