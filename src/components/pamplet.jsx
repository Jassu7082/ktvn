import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const PamphletDownload = () => {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem('pamphletOpened');

    const openPDF = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = '/pamphlet.pdf'; // Mobile - redirect
      } else {
        const newTab = window.open('/pamphlet.pdf', '_blank');
        if (newTab) {
          newTab.focus();
        }
        // Wait before showing tick mark (simulate loading)
        setTimeout(() => {
          setOpened(true);
          setLoading(false);
        }, 1200);
      }
    };

    if (!alreadyOpened) {
      sessionStorage.setItem('pamphletOpened', 'true');
      openPDF();
    } else {
      setTimeout(() => {
        setOpened(true);
        setLoading(false);
      }, 800);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#081F37] to-[#0F2A4D] text-white px-4">
      {loading ? (
        <>
          <ClipLoader color="#38bdf8" size={48} />
          <h1 className="text-xl font-semibold mt-4">Opening your pamphlet...</h1>
          <p className="text-gray-300 text-sm mt-2">Please wait a moment.</p>
        </>
      ) : (
        <>
          <FaCheckCircle className="text-5xl text-green-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pamphlet Opened</h1>
          <p className="text-center max-w-md text-gray-300">
            If nothing happened,
            <a
              href="/pamphlet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline ml-1"
            >
              click here to view it manually.
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default PamphletDownload;
