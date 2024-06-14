import React from 'react';
import jaya from '../../assets/team/jaya.jpg';
import ramireddy from '../../assets/team/ramireddy.jpg';
import suryaprakash from '../../assets/team/suri.jpeg';
import padma from '../../assets/team/padma.jpg';
import rajasekhar from '../../assets/team/rajasekhar.jpg';
import nirmala from '../../assets/team/nirmala.jpg';
const members = [
    {
      position: 'Founder',
      name: 'S Rami Reddy',
      description: "To provide students a positive, stimulating, and caring environment that encourages the fulfillment of individual potential and the growth of self-esteem in all areas.",
      imageUrl:ramireddy, // Placeholder image URL
    },
    {
      position: 'Principal',
      name: 'S Nirmala Jayachandra Reddy',
      description: "To develop within students an attitude of individual responsibility based upon the values of honesty, respect, self-control, equality, care, and concern for others.",
      imageUrl: nirmala, // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Suryaprakash Reddy',
      description: "To develop and maintain a balance between the child's intelligence quotient, emotional quotient, and try to tip the balance in favor of the joy quotient.",
      imageUrl: suryaprakash, // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Padma',
      description: "Devoted educators ignite, guide, connect with students, fostering a caring haven. They champion each child's unique talents, unlocking potential through personalized attention.",
      imageUrl:padma, // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Rajasekhar Reddy',
      description: "MCA",
      imageUrl: rajasekhar, // Placeholder image URL
    },
    {
      position: 'Empowering Leader',
      name: 'S Jayachandra Reddy',
      description: "M.A M.Ed Teacher",
      imageUrl: jaya, // Placeholder image URL
    }
  ];
  

const TeamSection = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white text-center ">Meet The Team</h2>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4 px-10">
        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-contain mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-700 mb-2">{member.position}</p>
            <p className="text-gray-700">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
