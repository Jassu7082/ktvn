import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { imageDb } from '../../config/firebase-config';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"; 
import { Navigate } from "react-router-dom";
// Import the v4 function from the uuid library
import { v4 } from "uuid";

function FirebaseImageUpload(){
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

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

    const handleClick = () => {
        if (loggedIn && img) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {
                console.log(value);
                getDownloadURL(value.ref).then((url) => {
                    setImgUrl((data) => [...data, url]);
                });
            });
        } else {
            console.log("User not logged in or no image selected");
        }
    };

    useEffect(() => {
        if (loggedIn) {
            listAll(ref(imageDb, "files")).then((imgs) => {
                console.log(imgs);
                imgs.items.forEach((val) => {
                    getDownloadURL(val).then((url) => {
                        setImgUrl((data) => [...data, url]);
                    });
                });
            });
        }
    }, [loggedIn]);

    if (!loggedIn) {
        return (
            <div>
                <p>You need to login to upload images</p>
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} /> 
            <button onClick={handleClick}>Upload</button>
            <br/>
            {
                imgUrl.map((dataVal) => (
                    <div key={dataVal}>
                        <img src={dataVal} height="200px" width="200px" />
                        <br/> 
                    </div>
                ))
            }
        </div>
    );
}

export default FirebaseImageUpload;
