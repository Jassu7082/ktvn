import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PamphletDownload = () => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('pamphletDownloaded')) {
      const a = document.createElement('a');
      a.href = '/pamphlet.pdf';
      a.download = 'Kakatiya Vidyaniketan.pdf';
      a.click();
      sessionStorage.setItem('pamphletDownloaded', 'true');
      setDownloaded(true);

      // Optional: Close after 2s (works only if opened via JS)
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      setDownloaded(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#081F37] to-[#0F2A4D] text-white px-4">
      {downloaded ? (
        <>
          <FaCheckCircle className="text-5xl text-green-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Download started!</h1>
          <p className="text-center max-w-md text-gray-300">
            If the download didn't start automatically,
            <a
              href="/pamphlet.pdf"
              download
              className="text-cyan-400 underline ml-1"
            >
              click here to download manually.
            </a>
          </p>
        </>
      ) : (
        <>
          <div className="loader mb-4"></div>
          <h1 className="text-xl font-semibold mb-2">Preparing your download...</h1>
          <p className="text-gray-300 text-sm">Please wait a moment.</p>
        </>
      )}
    </div>
  );
};

export default PamphletDownload;
