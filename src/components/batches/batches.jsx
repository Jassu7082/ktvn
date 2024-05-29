import React, { useState } from 'react';
import batch2022_2023 from './batch2022_2023';
import batch2023_2024 from './batch2023_2024';
import Footer from '../Footer/Footer';

const Batches = () => {
  const batches = {
    '2022-2023': batch2022_2023,
    '2023-2024': batch2023_2024,
  };

  const batchKeys = Object.keys(batches);
  const [selectedBatch, setSelectedBatch] = useState(batchKeys[batchKeys.length - 1]);

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
  };

  return (
    <section className="p-4 bg-[#081F37] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Batch {selectedBatch}</h2>
      <div className="flex justify-center space-x-4 mb-4">
        {batchKeys.map((batch) => (
          <button
            key={batch}
            onClick={() => handleBatchSelect(batch)}
            className={`px-4 py-2 rounded ${
              selectedBatch === batch ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Batch {batch}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-12 border-b">
        {batches[selectedBatch].map((member, index) => (
          <div key={index} className="w-full">
            <ProfileCard
              image={member.imageUrl}
              name={member.name}
              details={[
                { label: 'Batch:', value: member.batch },
                { label: 'Marks:', value: member.marks },
              ]}
            />
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
};

const ProfileCard = ({ image, name, details }) => {
  return (
    <div className="bg-white rounded-lg shadow-md flex  md:flex-row p-4 max-w-sm mx-auto">
      <img className="w-full h-40 md:h-auto object-cover w-1/3 mr-0 mr-4" src={image} alt={name} />
      <div className="flex flex-col justify-center bg-slate-900 p-4 w-2/3 text-white">
        <h2 className="text-xl font-bold">{name}</h2>
        <ul className="list-none mt-2">
          {details.map((detail) => (
            <li key={detail.label} className="mb-1">
              {detail.label} <b>{detail.value}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Batches;