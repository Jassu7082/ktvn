import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { imageDb, txtDB } from '../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Footer/Footer";

function FirebaseImageUpload() {
    const [images, setImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgData, setImgData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
                fetchData();
            } else {
                setLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const txtDataCollection = collection(txtDB, "txtData");
            const txtDataSnapshot = await getDocs(txtDataCollection);
            const imgDataArray = txtDataSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setImgData(imgDataArray.reverse());
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
        setIsLoading(false);
    };

    const handleLogin = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, "user@example.com", "password");
            setLoggedIn(true);
            toast.success("Successfully logged in");
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("Error signing in");
        }
    };

    const handleImageChange = (e) => {
        setImages([...images, ...e.target.files]);
    };

    const handleUpload = () => {
        if (loggedIn && images.length > 0) {
            images.forEach((image) => {
                const imgRef = ref(imageDb, `files/${uuidv4()}`);
                uploadBytes(imgRef, image).then((value) => {
                    getDownloadURL(value.ref).then(async (url) => {
                        await addDoc(collection(txtDB, 'txtData'), { title, description, imgUrl: url });
                        fetchData();
                        toast.success("Image uploaded successfully");
                    }).catch(error => {
                        console.error("Error uploading image:", error);
                        toast.error("Error uploading image");
                    });
                }).catch(error => {
                    console.error("Error uploading image:", error);
                    toast.error("Error uploading image");
                });
            });
            setImages([]);
            setTitle("");
            setDescription("");
        } else {
            toast.warning("User not logged in or no images selected");
        }
    };

    const handleDelete = async (id, imgUrl) => {
        try {
            // Delete the Firestore document
            await deleteDoc(doc(txtDB, 'txtData', id));
            // Delete the image from Firebase Storage
            const imgRef = ref(imageDb, imgUrl);
            await deleteObject(imgRef);
            fetchData();
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting document or image:", error);
            toast.error("Error deleting document or image");
        }
    };

    if (!loggedIn) {
        return (
            <div>
                <p>You need to login to upload images</p>
                <Navigate to="/login" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center bg-[#081F37]">
            <ToastContainer />
            <div className="w-full max-w-lg border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Upload Images</h1>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-1">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-1">Select Images:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="mb-2 w-full"
                        multiple
                    />
                </div>
                <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Upload</button>
                <div className="mt-4 flex flex-wrap justify-center">
                    {images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded Image ${index}`} className="mt-2 mr-2 inline-block border border-gray-300 rounded-lg" style={{ width: "200px", height: "auto" }} />
                    ))}
                </div>
            </div>
            <div className="mt-8 w-full max-w-4xl border-b">
                <h2 className="text-xl font-bold mb-4 text-white text-center border-b">Admin Page - Manage Posts</h2>
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
                    </div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {imgData.map((data, index) => (
                            <div key={index} className="rounded-lg bg-slate-900 overflow-hidden border border-black">
                                <img
                                    src={data.imgUrl}
                                    alt={`Image ${index}`}
                                    className="w-full h-64 object-contain"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">{data.title}</h3>
                                    <p className="text-sm text-gray-300">{data.description}</p>
                                    <button onClick={() => handleDelete(data.id, data.imgUrl)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default FirebaseImageUpload;
