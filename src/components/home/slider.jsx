import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import image0 from '../../assets/home_1.jpg'; // Example image import
import test from '../../assets/school.jpg';

function Slider() {
  const slides = [image0, test]; // Add more images to the slides array as needed
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
    <div className='max-w-[1400px] h-[240px] w-full m-auto px-1 relative group pt-0'>
      {/* Left Arrow - Hidden on small screens */}
      <div className='hidden lg:block absolute top-[50%] -translate-x-[150%] translate-y-[-50%] left-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      
      {/* Slider */}
      <div style={{ backgroundImage: `url(${slides[currentIndex]})` }} className='w-full h-full bg-center bg-cover'></div>
      
      {/* Right Arrow - Hidden on small screens */}
      <div className='hidden lg:block absolute top-[50%] -translate-x-[-150%] translate-y-[-50%] right-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      
      {/* Dot indicators */}
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-4xl cursor-pointer ${currentIndex === slideIndex ? 'text-[#52D3D8] rounded-full' : 'text-white'}`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
