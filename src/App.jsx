// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import Workflow from './components/Workflow';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Features from './pages/Features';
import WhatWeDo from './pages/WhatWeDo';
import SignUp from './pages/SignUp';
import Releases from './pages/Releases';
import Playground from './pages/Playground';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/features" element={<Features />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/whatwedo" element={<WhatWeDo />} />
            
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeatureSection />
                  <Workflow />
                  <Pricing />
                  <Testimonials />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;