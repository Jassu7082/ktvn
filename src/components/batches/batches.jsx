import React, { useState, useEffect } from 'react';
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
            className={`px-4 py-2 rounded ${selectedBatch === batch ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Batch {batch}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 text-center lg:grid-cols-4 gap-4 border-b p-4">
        {batches[selectedBatch].map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-contain mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-700 mb-2">Batch: <b>{member.batch}</b></p>
            <p className="text-gray-700">Marks: <b>{member.marks}</b></p>
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default Batches;