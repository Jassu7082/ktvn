import React, { useState, useEffect } from 'react';
import LazyImage from '../lib/LazyImage';

// Slide image paths — imported statically (Vite bundles them)
// but rendering uses LazyImage so decoding is deferred + fade-in applies.
import image0 from '../../assets/home_1.jpg';
import image1 from '../../assets/home_2.jpg';
import image2 from '../../assets/home_3.jpg';
import image3 from '../../assets/home_4.jpg';

const slides = [image0, image1, image2, image3];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const goToSlide = (idx) => setCurrentIndex(idx);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Slower for premium feel
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id="indicators-carousel" className="relative w-full aspect-video sm:aspect-[16/7] sm:max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl border border-white/5 bg-[#050B14] group" data-carousel="static">
      {/* Slides */}
      {slides.map((src, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'}
          `}
          style={{
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          aria-hidden={index !== currentIndex}
        >
          {/* Background Layer: Blurred Fill */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src={src}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-40 scale-105"
              wrapperClass="w-full h-full"
            />
          </div>

          {/* Foreground Layer: Full Image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <LazyImage
              src={src}
              alt={`School slide ${index + 1}`}
              className="w-full h-full object-contain"
              wrapperClass="w-full h-full"
              rootMargin="400px"
            />
          </div>

          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent z-20 pointer-events-none" />
        </div>
      ))}

      {/* Dot indicators - Now nested inside for perfect alignment */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-6 left-1/2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            onClick={() => goToSlide(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={currentIndex === slideIndex}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 border border-white/20
              ${currentIndex === slideIndex ? 'bg-accent w-8 border-accent shadow-glow-sm' : 'bg-white/40 hover:bg-white/60'}
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
