import React, { useEffect, useState } from "react";
import { imageDb } from '../../config/firebase-config';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Footer from "../Footer/Footer";

const Gallery = () => {
    const [imgUrl, setImgUrl] = useState([]);

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
            });
        });
    }, []);

    return (
        <div>
        <div className="container mx-auto px-4 py-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {imgUrl.map((imageUrl, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
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
