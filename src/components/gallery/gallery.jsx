import React, { useEffect, useState } from "react";
import { imageDb, txtDB } from '../../config/firebase-config';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../Footer/Footer";

const Gallery = () => {
    const [imgData, setImgData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch the data from Firestore
            const txtDataCollection = collection(txtDB, "txtData");
            const txtDataSnapshot = await getDocs(txtDataCollection);
            const imgDataArray = txtDataSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            // Fetch the images URLs
            const imgUrls = await Promise.all(
                imgDataArray.map(async (imgData) => {
                    const imgRef = ref(imageDb, imgData.imgUrl);
                    const url = await getDownloadURL(imgRef);
                    return { ...imgData, url };
                })
            );

            setImgData(imgUrls);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center bg-[#081F37] items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#081F37]">
            <div className="container mx-auto px-4 py-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-b">
                {imgData.map((data, index) => (
                    <div key={index} className="rounded-lg bg-slate-900 overflow-hidden border border-black">
                        <img
                            src={data.url}
                            alt={`Image ${index}`}
                            className="w-full h-64 object-contain"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white mb-2">{data.title}</h3>
                            <p className="text-sm text-gray-300">{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Gallery;
