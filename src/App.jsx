import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import About from './components/about/about';
import Gallery from './components/gallery/gallery';
import Batches from './components/batches/batches';
import FirebaseImageUpload from './components/gallery/admin';
import SignInForm from './components/gallery/login';
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <Router>
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/batches" element={<Batches/>} />
        <Route path="/login" element={<SignInForm/>} />
        <Route path="/admin" element={<FirebaseImageUpload/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
