import React from 'react';
import school from "../../assets/school.jpg";
import TeamSection from './team';
import ContactPage from './contact';
import Footer from '../Footer/Footer';
import AnimatedStats from './animation';

const About = () => {
  return (
    <div className='bg-[#081F37]'>
      <div className="lg:flex lg:justify-center p-10 gap-4 lg:items-center bg-[#081F37]">
        <div className="lg:w-1/2 m-2">
          <img src={school} alt="Home" className="h-full w-full object-fit" />
        </div>
        <div className="lg:w-1/2 lg:pr-10 ">
          <h1 className="text-2xl font-bold mb-4 text-white text-center">About Us</h1>
          <p className="text-white text-justify">
            Kakatiya Vidyaniketan, situated opposite Indiramma Colony on N.S Gate Road in Dharmavaram, has been a beacon of education since its inception in 2009. Operating under the guidance of Settipi Rami Reddy, it offers co-educational programs in English medium.
            Over the years, Kakatiya Vidyaniketan has consistently delivered outstanding academic results, reflected in annual merit lists and numerous accolades in academics, dramas, music, dance, fine arts, and various indoor and outdoor sports.
            The school is affiliated with the State Board of Secondary Education (S.S.E.) Andhra Pradesh, sharing SSE's vision of providing a robust, vibrant, and holistic education that empowers excellence in all spheres of human endeavor.
          </p>
        </div>
      </div>
      <div className="lg:flex lg:justify-center gap-4 lg:items-center p-10 bg-[#081F37]">
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-white text-center lg:text-left">Our Vision</h1>
          <p className="text-white text-justify">
            Our vision is to provide a safe, nurturing, and stimulating environment that fosters the holistic development of each child. We aim to inspire a love for learning, encourage curiosity, and promote critical thinking, creativity, and independence. We strive to instill enduring values, enabling students to become responsible, compassionate, and contributing members of society.
          </p>
        </div>
        <div className="lg:w-1/2 lg:pr-10">
          <AnimatedStats />
        </div>
      </div>
      <div className='lg:py-20'>
        <TeamSection />
      </div>
      <div className='border-b lg:pb-20'>
        <ContactPage />
      </div>
      <Footer />
    </div>
  );
};

export default About;