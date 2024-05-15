import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { auth, googleProvider } from '../../config/firebase-config';
import { Navigate } from 'react-router-dom';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            // Firebase sign in logic here
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Sign in successful');
            <Navigate to="/admin" />;
        } catch (error) {
            console.error('Sign-in error:', error.message);
            const errorMessage = error.message.split(': ')[1]; // Extract relevant part of error message
            toast.error(errorMessage);
        }
    };

    if (user) {
        return <Navigate to="/admin" />;
    }

    return (
        <div>
            <div className="min-h-screen bg-[#597AAF] bg-[url('/img1.jpeg')] bg-cover bg-center text-white flex items-center justify-center">
                <div className="welcome-container bg-[#1541A2] p-6 rounded-lg shadow-lg w-1/2 h-[50vh]">
                    <h1 className="text-4xl font-bold text-center">Sign In</h1>
                    <div className="mt-4 text-black">
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 text-black">
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full bg-[#597AAF] text-white rounded-lg px-4 py-2 hover:bg-white hover:text-[#597AAF] transition duration-300 ease-in-out"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default SignInForm;
