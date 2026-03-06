import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { txtDB, imageDb } from '../../config/firebase-config';
import school from "../../assets/school.jpg";
import Slider from "./slider";
import cont3img1 from "../../assets/cont3img1.png";
import cont3img2 from "../../assets/cont3img2.png";
import cont3img3 from "../../assets/cont3img3.png";
import Footer from "../Footer/Footer";
import LazyImage from "../lib/LazyImage";
import { Trophy, Images, ArrowRight, Maximize2, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`glass rounded-2xl border border-border-light overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-glow bg-surface/50' : 'hover:bg-surface/30'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-display font-bold text-text-primary group-hover:text-accent transition-colors">{question}</span>
        <ChevronDown className={`text-accent w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 text-text-secondary text-base leading-relaxed border-t border-border-light/50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [recentGallery, setRecentGallery] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const txtDataCollection = collection(txtDB, "txtData");
        const snapshot = await getDocs(txtDataCollection);
        const allData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Safe Client-side sort: newest first
        allData.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        // Slice top 10 latest
        setRecentGallery(allData.slice(0, 10));
      } catch (e) {
        console.error("Error fetching recent moments:", e);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="bg-primary overflow-x-hidden">
      {/* 1. Hero — desktop full-screen (Static) */}
      <div className="h-[70vh] md:h-[90vh] hidden sm:block relative overflow-hidden">
        <LazyImage
          src={school}
          alt="Kakatiya Vidyaniketan School"
          className="h-full w-full object-cover transform scale-105"
          wrapperClass="h-full w-full"
          rootMargin="0px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-80" />
      </div>

      {/* 2. Hero — mobile (Slider) */}
      <div className="block sm:hidden bg-primary pt-16">
        <Slider />
      </div>

      {/* 3. Why Choose Us section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="lg:w-1/2">
          <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] sm:text-xs mb-4 block">The KTVN Advantage</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6 md:mb-8 font-black tracking-tight leading-tight">Why Choose Our Institution?</h2>
          <div className="gold-divider mb-8" />
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-light mb-8 italic border-l-4 border-accent pl-5 sm:pl-6 bg-surface/30 py-6 sm:py-4 rounded-r-xl shadow-lg">
            "Our distinguished faculty is devoted to inspiring and nurturing students, fostering a supportive learning environment where individuality thrives."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-surface/50 p-6 rounded-2xl border border-border-light shadow-sm">
              <h4 className="font-bold text-accent mb-2 uppercase tracking-widest text-xs">Expert Faculty</h4>
              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">Advanced degrees and passionate educators dedicated to student growth.</p>
            </div>
            <div className="bg-surface/50 p-6 rounded-2xl border border-border-light shadow-sm">
              <h4 className="font-bold text-accent mb-2 uppercase tracking-widest text-xs">Holistic Growth</h4>
              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">Uncovering unique strengths, interests, and creative potential.</p>
            </div>
          </div>
        </div>
        {/* Secondary Slider — Hidden on Mobile to avoid redundancy */}
        <div className="hidden lg:block lg:w-1/2 w-full relative group">
          <Slider />
        </div>
      </div>

      {/* 4. Recent Moments Gallery Preview */}
      <div className="py-16 md:py-24 bg-primary relative border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Images className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] sm:text-xs block">Gallery</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-10 md:mb-12 font-black tracking-tight">Recent Moments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {recentGallery.map((item) => (
              <HomeGalleryCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery" className="glass px-8 sm:px-10 py-4 rounded-full inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-widest hover:bg-accent hover:text-primary transition-all shadow-glow active:scale-95">
              Visit Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. FAQ Section */}
      <div className="py-16 sm:py-24 bg-primary relative border-t border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] sm:text-xs mb-4 block underline decoration-accent/30 underline-offset-4">Information Center</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-6xl mb-6 font-black tracking-tight">Frequently Asked Questions</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="space-y-4">
            <FAQItem
              question="When can I visit the school?"
              answer="You are welcome to visit our campus during office hours: Monday to Saturday, 9:00 AM - 4:30 PM. For guided tours, schedule in advance."
            />
            <FAQItem
              question="What classes do you offer?"
              answer="We offer foundational and advanced education starting from Pre-KG up to Class X (SSC). Admissions are based on merit and vacancy."
            />
            <FAQItem
              question="Do you provide residential facilities?"
              answer="Yes, KTVN offers both Residential and Non-Residential options with home-like, safe, and disciplined hostel environments."
            />
          </div>
        </div>
      </div>

      {/* 6. Programs section */}
      <div className="py-16 md:py-24 bg-primary-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 md:mb-16">
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6 font-black tracking-tight">Academic Foundations</h2>
            <div className="gold-divider mx-auto mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <Programs
              image={cont3img1}
              title="Expert Mentorship"
              content="Our educators blend academic expertise with real-world insights, cultivating a dynamic learning environment."
            />
            <Programs
              image={cont3img2}
              title="Creative Exploration"
              content="We blend child-led exploration with skill development, fostering comprehension through diverse indoor and outdoor play."
            />
            <Programs
              image={cont3img3}
              title="Holistic Ethos"
              content="Core values of kindness, respect, and integrity define our community, where teamwork and achievements are paramount."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Programs({ image, title, content }) {
  return (
    <div className="flex flex-col items-center bg-surface p-8 rounded-3xl border border-border-light shadow-card group hover:shadow-glow transition-all duration-500">
      <div className="h-48 w-full relative mb-8 rounded-2xl overflow-hidden">
        <LazyImage
          src={image}
          alt={title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-700"
          wrapperClass="h-full w-full"
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-accent mb-4 tracking-wide">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed font-light">{content}</p>
      </div>
    </div>
  );
}

function HomeGalleryCard({ item }) {
  const [url, setUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const rawUrl = item.images?.[0] || item.imgUrl;

  useEffect(() => {
    if (rawUrl) {
      if (rawUrl.startsWith('gs://')) {
        const gsPath = rawUrl.replace(/^gs:\/\/[^/]+\/(.+)$/, '$1');
        getDownloadURL(storageRef(imageDb, gsPath))
          .then(setUrl)
          .catch(e => console.error(e));
      } else {
        setUrl(rawUrl);
      }
    }
  }, [rawUrl]);

  // Scroll Reveal Logic
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = () => {
    // Navigate to gallery and pass the specific post ID to auto-open it
    navigate('/gallery', { state: { openPostId: item.id } });
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`reveal-on-scroll ${isVisible ? 'active' : ''} relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-card hover:shadow-hover transition-all duration-500 bg-primary-dark cursor-pointer border border-border-light`}
    >
      <div className="absolute inset-0 z-0">
        <LazyImage
          src={url}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          wrapperClass="w-full h-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90 transition-opacity z-10" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
        <h4 className="text-xl font-display font-black text-white mb-2 drop-shadow-lg">{item.title}</h4>
        <div className="gold-divider w-12 h-1 mb-3 group-hover:w-full transition-all duration-700" />
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <span className="text-[10px] text-accent font-black uppercase tracking-widest bg-accent/10 px-2 py-1 rounded backdrop-blur-sm">Institutional Moment</span>
          <Maximize2 className="text-accent w-4 h-4 transition-transform group-hover:rotate-12" />
        </div>
      </div>
    </div>
  );
}

export default Home;
