import React, { useState } from "react";
import { Medal, Search, Trophy, GraduationCap, Star } from "lucide-react";
import batch2023_2024 from "./data/batch2023_2024";
import batch2024 from "./data/batch2024_2025";
import Footer from "../Footer/Footer";
import BatchFilter from "./BatchFilter";
import LazyImage from "../lib/LazyImage";

const Batches = () => {
  const batches = {
    "2024-2025": batch2024,
    "2023-2024": batch2023_2024,
  };

  const batchKeys = Object.keys(batches);
  const [selectedBatch, setSelectedBatch] = useState(batchKeys[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleBatchChange = (newBatch) => {
    setIsSwitching(true);
    setSelectedBatch(newBatch);
    setVisibleCount(10); // Reset pagination on batch switch
    setTimeout(() => setIsSwitching(false), 600);
  };

  const allStudents = batches[selectedBatch];

  const filteredStudents = allStudents
    .filter((member) =>
      member.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );

  const isSearchActive = searchTerm.trim().length > 0;

  // Results to display: If searching, show all matches. If not, slice by visibleCount.
  const studentsToDisplay = isSearchActive
    ? filteredStudents
    : allStudents.slice(3, 3 + visibleCount);

  return (
    <section className="bg-primary min-h-screen">
      {/* Header Section */}
      <div className="relative pt-24 pb-12 overflow-hidden bg-primary-dark border-b border-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent uppercase tracking-[0.3em] font-bold text-xs mb-3 block">Academic Excellence</span>
          <h1 className="section-heading text-4xl sm:text-5xl lg:text-6xl mb-6">Batch {selectedBatch}</h1>
          <div className="gold-divider h-1 w-32 mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Celebrating the hard work and outstanding achievements of our students. We take immense pride in their academic success and personal growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="w-full md:w-auto">
            <label className="text-accent text-xs font-bold uppercase tracking-widest mb-3 block">Filter by Year</label>
            <BatchFilter
              batchYears={batchKeys}
              selectedBatch={selectedBatch}
              setSelectedBatch={handleBatchChange}
            />
          </div>

          <div className="w-full md:max-w-xs relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search by student name..."
              className="w-full pl-12 pr-4 py-4 bg-surface rounded-xl border border-border-light focus:border-accent outline-none text-text-primary placeholder-text-muted shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value) setVisibleCount(10); // Reset count on search
              }}
            />
          </div>
        </div>

        {/* Content Toggle: Search vs Default */}
        {isSwitching ? (
          /* Loading State */
          <div className="animate-pulse">
            <div className="mb-20">
              <div className="h-8 w-48 bg-surface rounded mb-12" />
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-44 h-44 rounded-full bg-surface mb-6" />
                    <div className="h-6 w-32 bg-surface rounded mb-4" />
                    <div className="h-12 w-48 bg-surface rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-12">
              <div className="h-8 w-64 bg-surface rounded mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="h-24 bg-surface rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        ) : !isSearchActive ? (
          <>
            {/* Top Performers */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-12 justify-center lg:justify-start">
                <Trophy className="text-accent w-6 h-6" />
                <h2 className="text-2xl font-display font-bold text-text-primary tracking-widest uppercase">Hall of Fame</h2>
              </div>
              <TopPerformers students={allStudents.slice(0, 3)} />
            </div>

            {/* Regular Students Grid */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8 border-t border-border pt-12">
                <GraduationCap className="text-accent w-6 h-6" />
                <h2 className="text-2xl font-display font-bold text-text-primary tracking-wide">Student Directory</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {studentsToDisplay.map((member, index) => (
                  <ProfileCard
                    key={index}
                    image={member.imageUrl}
                    name={member.name}
                    marks={member.marks}
                    htNo={member.hallticketno}
                    batch={member.batch}
                  />
                ))}
              </div>

              {allStudents.length > visibleCount + 3 && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="group relative px-12 py-5 bg-surface border border-border-light rounded-2xl overflow-hidden transition-all hover:border-accent shadow-xl hover:shadow-glow-sm"
                  >
                    <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <p className="relative text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-hover:text-accent transition-colors flex items-center gap-3">
                      Expand Academic Directory
                      <Trophy size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Search Results */
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Search className="text-accent w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-text-primary tracking-wide">
                Search Results ({filteredStudents.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {studentsToDisplay.length > 0 ? (
                studentsToDisplay.map((member, index) => (
                  <ProfileCard
                    key={index}
                    image={member.imageUrl}
                    name={member.name}
                    marks={member.marks}
                    htNo={member.hallticketno}
                    batch={member.batch}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center glass rounded-xl border-dashed">
                  <p className="text-text-secondary text-lg font-light tracking-wide">No students found matching "<span className="text-accent font-bold">{searchTerm}</span>".</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

// ── Top Performers ────────────────────────────────────────────────────────────
const rankings = [
  {
    gradient: "from-[#D4A017] via-[#C9A84C] to-[#A07830]",
    icon: "🥇",
    label: "Outstanding",
    shadow: "shadow-[0_0_30px_rgba(201,168,76,0.25)]"
  },
  {
    gradient: "from-[#A8A9AD] via-[#D1D2D4] to-[#717277]",
    icon: "🥈",
    label: "Exceptional",
    shadow: "shadow-[0_0_30px_rgba(168,169,173,0.15)]"
  },
  {
    gradient: "from-[#CD7F32] via-[#E69138] to-[#8E4D13]",
    icon: "🥉",
    label: "Distinguished",
    shadow: "shadow-[0_0_30px_rgba(205,127,50,0.15)]"
  },
];

const TopPerformers = ({ students }) => (
  <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
    {students.map((student, index) => (
      <div
        key={student.id || index}
        className={`flex flex-col items-center text-center group ${index === 0
          ? 'order-1 lg:order-1 lg:-translate-y-8'
          : index === 1
            ? 'order-2 lg:order-0'
            : 'order-3'
          }`}
      >
        {/* Medallion Avatar */}
        <div className="relative mb-6">
          {/* Tiered Ring Background */}
          <div className={`absolute -inset-4 rounded-full bg-gradient-to-tr ${rankings[index].gradient} blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-slow`} />

          {/* Main Luxury Ring */}
          <div className={`relative p-2 rounded-full bg-gradient-to-tr ${rankings[index].gradient} ${rankings[index].shadow}`}>
            <div className="bg-primary rounded-full p-1 shadow-inner">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-primary-dark">
                <LazyImage
                  src={student.imageUrl}
                  alt={student.name}
                  className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-110"
                  wrapperClass="w-full h-full"
                />
              </div>
            </div>

            {/* Icon Badge */}
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-primary border-2 border-border-light rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl shadow-xl">
              {rankings[index].icon}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">
            {rankings[index].label}
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight leading-tight transition-colors group-hover:text-accent mb-3">
            {student.name}
          </h2>

          <div className="flex flex-col items-center bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-white">{student.marks}</span>
              <span className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-widest">/ 600</span>
            </div>
            <p className="text-[9px] text-accent font-black uppercase tracking-[0.2em] mt-1 opacity-60">HT NO: {student.hallticketno}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── Profile Card ──────────────────────────────────────────────────────────────
const ProfileCard = ({ image, name, marks, htNo, batch }) => (
  <div className="group bg-white/[0.02] rounded-2xl overflow-hidden border border-white/10 shadow-card hover:shadow-hover hover:border-accent/30 transition-all">
    <div className="flex">
      {/* Student Photo */}
      <div className="w-[85px] sm:w-[120px] aspect-[1/1] overflow-hidden bg-primary-dark shrink-0">
        <LazyImage
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          wrapperClass="w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center px-4 sm:px-6 py-3 min-w-0">
        <h4 className="text-xs sm:text-base font-black text-white tracking-tight line-clamp-1 mb-1 group-hover:text-accent transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent fill-accent" />
          <span className="text-[10px] sm:text-xs font-black text-accent tracking-widest">{marks} <span className="opacity-40 font-bold">/ 600</span></span>
        </div>
        <div className="space-y-0.5 opacity-60">
          <p className="text-[8px] sm:text-[10px] text-text-muted uppercase tracking-[0.1em] font-black">
            HT: {htNo}
          </p>
          <p className="text-[8px] sm:text-[10px] text-text-muted uppercase tracking-[0.1em] font-black">
            {batch}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Batches;