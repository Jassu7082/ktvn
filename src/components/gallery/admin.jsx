import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { imageDb } from '../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; 
import { v4 as uuidv4 } from "uuid"; // Import the v4 function with alias
import { Navigate } from "react-router-dom";

function FirebaseImageUpload() {
    const [images, setImages] = useState([]); // State for storing uploaded images
    const [loggedIn, setLoggedIn] = useState(false);
    const [title, setTitle] = useState(""); // State for post title
    const [description, setDescription] = useState(""); // State for post description

    useEffect(() => {
        // Check if user is already logged in
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, "user@example.com", "password");
            setLoggedIn(true);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleImageChange = (e) => {
        setImages([...images, ...e.target.files]);
    };

    const handleUpload = () => {
        if (loggedIn && images.length > 0) {
            images.forEach((image) => {
                const imgRef = ref(imageDb, `files/${uuidv4()}`); // Generate unique ID for each image
                uploadBytes(imgRef, image).then((value) => {
                    console.log(value);
                    getDownloadURL(value.ref).then((url) => {
                        // Handle image upload success
                        console.log("Image uploaded:", url);
                    });
                });
            });
            // Clear the images state after upload
            setImages([]);
        } else {
            console.log("User not logged in or no images selected");
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Images</h1>
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
                    multiple
                    accept="image/*"
                    className="mb-2"
                />
            </div>
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
            <div className="mt-4">
                {/* Display uploaded images */}
                {images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded Image ${index}`} className="mt-2 mr-2 inline-block" style={{ width: "200px", height: "auto" }} />
                ))}
            </div>
        </div>
    );
}

export default FirebaseImageUpload;
