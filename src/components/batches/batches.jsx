import React, { useState } from "react";
import { Medal, Search } from "lucide-react";
import batch2023_2024 from "./data/batch2023_2024";
import batch2024 from "./data/batch2024_2025";
import Footer from "../Footer/Footer";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import BatchFilter from "./BatchFilter";

const Batches = () => {
  const batches = {
    "2024-2025": batch2024,
    "2023-2024": batch2023_2024,
  };

  const batchKeys = Object.keys(batches);
  const [selectedBatch, setSelectedBatch] = useState(batchKeys[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = batches[selectedBatch]
    .slice(3)
    .filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section className="p-4 bg-[#081F37] min-h-screen ">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Batch {selectedBatch}</h2>
      <BatchFilter batchYears={batchKeys} selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch} />
      <div className="relative mb-6 flex items-center border-white p-1 pt-2  lg:w-1/4">
        <Search className="absolute left-3 text-gray-400 " />
        <input
          type="text"
          placeholder="Search students..."
          className="pl-10 pr-4 py-2 rounded-lg bg-slate-800 text-white w-full focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TopPerformers students={batches[selectedBatch].slice(0, 3)} />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-12 border-b">
        {filteredStudents.map((member, index) => (
          <ProfileCard
            key={index}
            image={member.imageUrl}
            name={member.name}
            details={[
              { label: "Batch:", value: member.batch },
              { label: "Marks:", value: member.marks },
            ]}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

const TopPerformers = ({ students }) => {
  const medals = [
    { color: "bg-gradient-to-r from-amber-300 to-yellow-500", icon: "🥇" },
    { color: "bg-gradient-to-r from-slate-300 to-slate-400", icon: "🥈" },
    { color: "bg-gradient-to-r from-amber-600 to-amber-700", icon: "🥉" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="text-blue-600" />
        <h2 className="text-2xl font-bold text-white">Top Performers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {students.map((student, index) => (
          <Card key={student.id} className={`flex border-black hover:border-white  ${medals[index]?.color || ""} shadow-md hover:shadow-lg transition-shadow overflow-hidden`}> 
            <div className="w-1/3">
              <Avatar className="w-full h-full">
                <AvatarImage src={student.imageUrl} alt={student.name} className="w-full h-full object-cover" />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardContent className={`p-4 flex flex-col justify-center w-2/3 text-white`}>
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="text-sm text-gray-400">Batch {student.batchYear}</p>
              <div className="bg-gray-800 w-[120px] rounded-full px-4 py-1 my-2">
                <p className="text-lg font-bold text-blue-400">{student.marks} / 600</p>
              </div>
              <span className="text-2xl">{medals[index]?.icon}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProfileCard = ({ image, name, details }) => {
  return (
    <div className="bg-slate-950 border border-white rounded-lg shadow-md flex md:flex-row p-1 max-w-sm mx-auto">
      <img className="h-40 md:h-auto rounded-lg object-cover w-1/3" src={image} alt={name} />
      <div className="flex flex-col justify-center bg-slate-900 p-4 w-2/3 text-white">
        <h2 className="text-xl font-bold">{name}</h2>
        <ul className="list-none mt-2">
          {details.map((detail, idx) => (
            <li key={idx} className="mb-1">
              {detail.label} <b>{detail.value}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Batches;