import React, { useEffect, useState } from "react";
import { imageDb } from '../../config/firebase-config';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Footer from "../Footer/Footer";

const Gallery = () => {
    const [imgUrl, setImgUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            const promises = imgs.items.map(item =>
                getDownloadURL(item).then(url => url)
            );
            Promise.all(promises).then(urls => {
                // Filter out duplicate URLs
                const uniqueUrls = Array.from(new Set(urls));
                // Reverse the array to show latest uploads at the top
                setImgUrl(uniqueUrls.reverse());
                setIsLoading(false); // Set loading to false after images are loaded
            });
        });
    }, []);

    // Render loading spinner or message if still loading
    if (isLoading) {
        return (
            <div className="flex justify-center bg-[#081F37] items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#081F37]">
            <div className="container mx-auto px-4 py-8  grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-b">
                {imgUrl.map((imageUrl, index) => (
                    <div key={index} className="rounded-lg bg-slate-900 overflow-hidden border border-black">
                        <img
                            src={imageUrl}
                            alt={`Image ${index}`}
                            className="w-full h-64 object-contain"
                        />
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Gallery;
