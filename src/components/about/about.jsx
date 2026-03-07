import React from 'react';
import school from "../../assets/school.jpg";
import TeamSection from './team';
import ContactPage from './contact';
import Footer from '../Footer/Footer';
import AnimatedStats from './animation';
import LazyImage from '../lib/LazyImage';
import { History, Target, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#050B14] min-h-screen selection:bg-accent selection:text-primary overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-auto sm:h-[60vh] lg:h-[80vh] overflow-hidden border-b border-white/5 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="relative w-full h-full flex flex-col justify-end py-12 lg:py-24">
            {/* Background Image Layer */}
            <div className="absolute inset-x-0 top-0 bottom-0 sm:absolute sm:inset-0 z-0">
              <div className="w-full h-full rounded-2xl sm:rounded-[3rem] overflow-hidden relative border border-white/5">
                <LazyImage
                  src={school}
                  alt="Kakatiya Vidyaniketan Campus"
                  className="w-full h-full object-cover opacity-60"
                  wrapperClass="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent" />
              </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] sm:text-xs mb-3 sm:mb-4 block">The Legacy of Excellence</span>
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-display font-black text-white tracking-tighter leading-tight sm:leading-none mb-6">
                Institutional <br />Heritage
              </h1>
              <div className="h-1.5 sm:h-2 w-24 sm:w-32 bg-accent shadow-glow-accent" />
            </div>
          </div>
        </div>

        {/* Floating Accent Background */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none hidden sm:block" />
      </section>

      {/* About Content - Premium Blocks */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 group">
              <div className="flex items-center gap-4 text-accent">
                <History size={20} className="sm:w-6 sm:h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Our Chronicle</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
                A Beacon of Education <br />
                <span className="text-accent opacity-80">Since 2009</span>
              </h2>

              <div className="relative pl-5 sm:pl-8 border-l-2 border-accent/30 group-hover:border-accent transition-colors duration-500">
                <p className="text-text-muted text-base sm:text-lg font-medium leading-relaxed opacity-90 text-justify">
                  Kakatiya Vidyaniketan, situated opposite Indiramma Colony on N.S Gate
                  Road in Dharmavaram, has been a beacon of education since its
                  inception in 2009. Operating under the visionary guidance of
                  <span className="text-white font-bold"> Settipi Rami Reddy</span>, it offers
                  premier co-educational programs in English medium.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] backdrop-blur-md">
                <p className="text-text-muted text-sm sm:text-base leading-relaxed font-medium">
                  Consistently delivering outstanding academic results, Kakatiya Vidyaniketan
                  has shaped the merit lists of AP for years, earning numerous
                  accolades across academics, arts, and athletics.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl sm:rounded-[3rem] border border-white/5 shadow-2xl">
              <LazyImage
                src={school}
                alt="KTVN Architecture"
                className="w-full aspect-square sm:aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Glass Architecture */}
      <section className="py-16 sm:py-24 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedStats />
            </div>

            <div className="order-1 lg:order-2 space-y-8 sm:space-y-10">
              <div className="flex items-center gap-4 text-accent">
                <Target size={20} className="sm:w-6 sm:h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Foundational Goals</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
                Nurturing <br />
                <span className="text-accent opacity-80">Global Citizens</span>
              </h2>

              <div className="space-y-6 sm:space-y-8 pl-5 sm:pl-8 border-l-2 border-accent/30">
                <p className="text-text-muted text-base sm:text-lg font-medium leading-relaxed opacity-90 text-justify italic">
                  "Our vision is to provide a safe, nurturing, and stimulating environment
                  that fosters the holistic development of each child."
                </p>
                <p className="text-text-muted text-sm sm:text-base font-medium leading-relaxed opacity-80 text-justify">
                  We aim to inspire a love for learning, encourage curiosity, and promote
                  critical thinking, creativity, and independence. We strive to instill
                  enduring values, enabling students to become responsible members of society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 sm:mb-20">
            <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] block mb-4">Leadership</span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-black text-white italic tracking-tighter">Scholastic Pioneers</h2>
          </div>
          <TeamSection />
        </div>
      </section>

      {/* Interaction section */}
      <section className="py-16 sm:py-24 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ContactPage />
        </div>
      </section>

      <Footer />
    </div >
  );
};

export default About;
