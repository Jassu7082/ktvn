import React from 'react';

const members = [
    {
      position: 'Founder',
      name: 'S Rami Reddy',
      description: "To provide students a positive, stimulating, and caring environment that encourages the fulfillment of individual potential and the growth of self-esteem in all areas.",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      position: 'Principal',
      name: 'S Nirmala Jayachandra Reddy',
      description: "To develop within students an attitude of individual responsibility based upon the values of honesty, respect, self-control, equality, care, and concern for others.",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Suryaprakash Reddy',
      description: "To develop and maintain a balance between the child's intelligence quotient, emotional quotient, and try to tip the balance in favor of the joy quotient.",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Padma',
      description: "Our teachers lead, inspire, excite, and relate to students in a loving, supportive manner. Our teachers get to know and appreciate each child's unique interests, strengths.",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      position: 'Director',
      name: 'S Rajasekhar Reddy',
      description: "MCA",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    },
    {
      position: 'Empowering Leader',
      name: 'S Jayachandra Reddy',
      description: "M.A M.Ed Teacher",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    }
  ];
  

const TeamSection = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white text-center ">Meet The Team</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
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
