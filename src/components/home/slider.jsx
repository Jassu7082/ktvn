import React, { useState, useEffect } from 'react';
import image0 from '../../assets/home_1.jpg'; 
import image1 from '../../assets/home_2.jpg'; 
import image2 from '../../assets/home_3.jpg';  
import image3 from '../../assets/home_4.jpg';

function Slider() {
  const slides = [image0,image1,image2,image3]; // Add more images to the slides array as needed
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slides every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            data-carousel-item={index === currentIndex ? 'active' : ''}
          ></div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-2 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === slideIndex ? 'bg-[#52D3D8]' : 'bg-white'}`}
            aria-current={currentIndex === slideIndex}
            aria-label={`Slide ${slideIndex + 1}`}
            onClick={() => goToSlide(slideIndex)}
          ></button>
        ))}
      </div>     
    </div>
  );
}

export default Slider;
