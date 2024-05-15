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
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
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
