import React from 'react';
import LazyImage from '../lib/LazyImage';
import ramireddy from '../../assets/team/ramireddy.jpg';
import suryaprakash from '../../assets/team/suri.jpeg';
import padma from '../../assets/team/padma.jpg';
import rajasekhar from '../../assets/team/raj.jpeg';
import nirmala from '../../assets/team/nirmala.jpeg';

const members = [
  {
    position: 'Founder',
    name: 'S Rami Reddy',
    description:
      'To provide students a positive, stimulating, and caring environment that encourages the fulfillment of individual potential and the growth of self-esteem in all areas.',
    imageUrl: ramireddy,
  },
  {
    position: 'Correspondent & Principal',
    name: 'Smt J Nirmala Devi',
    description:
      'Dedicated to nurturing students with values of integrity, respect, self-discipline, equality, empathy, and responsibility, empowering them to grow into confident and compassionate individuals.',
    imageUrl: nirmala,
  },
  {
    position: 'Director',
    name: 'S Suryaprakash Reddy',
    description:
      'To develop and maintain a balance between the child\'s intelligence quotient, emotional quotient, and try to tip the balance in favor of the joy quotient.',
    imageUrl: suryaprakash,
  },
  {
    position: 'Director',
    name: 'S Padma',
    description:
      'Devoted educators ignite, guide, connect with students, fostering a caring haven. They champion each child\'s unique talents, unlocking potential through personalized attention.',
    imageUrl: padma,
  },
  {
    position: 'Director',
    name: 'S Rajasekhar Reddy',
    description:
      'At Kakatiya Vidyaniketan, we inspire a passion for learning and values for life. Our vision is to build strong foundations for a brighter tomorrow.',
    imageUrl: rajasekhar,
  },
];

const TeamSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-0">
      {members.map((member, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] shadow-card hover:shadow-glow transition-all duration-500 p-6 overflow-hidden group"
        >
          <div className="relative h-56 w-full mb-6 rounded-xl overflow-hidden bg-black/20">
            <LazyImage
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              wrapperClass="w-full h-full"
            />
          </div>
          <h3 className="text-xl font-display font-bold mb-1 text-white">{member.name}</h3>
          <p className="text-sm text-accent font-black uppercase tracking-widest mb-4">{member.position}</p>
          <p className="text-sm text-text-muted leading-relaxed font-medium opacity-80">{member.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
