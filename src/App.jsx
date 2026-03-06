import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import ScrollToTop from './components/lib/ScrollToTop';
import { PageSkeleton } from './components/lib/Skeleton';
import { Analytics } from "@vercel/analytics/react";
import AnalyticsTracker from './components/lib/AnalyticsTracker';

// ── Route-level code splitting ────────────────────────────────────────────────
// Each page is an independent JS chunk — browser only downloads the code for
// the route the user actually visits.
const Home = lazy(() => import('./components/home/home'));
const About = lazy(() => import('./components/about/about'));
const Gallery = lazy(() => import('./components/gallery/gallery'));
const Batches = lazy(() => import('./components/batches/batches'));
const AdminUpload = lazy(() => import('./components/gallery/admin'));
const SignInForm = lazy(() => import('./components/gallery/login'));
const DynamicRedirect = lazy(() => import('./components/lib/DynamicRedirect'));

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <AnalyticsTracker />
        {/* Navbar is always visible — not lazy-loaded */}
        <Navbar />

        {/* PageSkeleton shown while a lazy chunk is being downloaded */}
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/admin" element={<AdminUpload />} />
            <Route path="/:slug" element={<DynamicRedirect />} />
          </Routes>
        </Suspense>

        <Analytics />
      </div>
    </Router>
  );
}

export default App;
