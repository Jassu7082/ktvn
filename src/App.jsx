import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import About from './components/about/about';
import Gallery from './components/gallery/gallery';
import Batches from './components/batches/batches';

function App() {
  return (
    <Router>
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/about" element={About} />
        <Route path="/gallery" element={Gallery} />
        <Route path="/batches" element={Batches} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
