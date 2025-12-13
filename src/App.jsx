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

// NFT Pages
import NFTs from './pages/nfts';
import EthereumNFTCreator from './pages/nfts/EthereumNFTCreator';
import BitcoinOrdinals from './pages/nfts/BitcoinOrdinals';
import NFTMarketplace from './pages/nfts/marketplace';
import NFTAnalytics from './pages/nfts/analytics';

// dApp Pages
import DApps from './pages/dapps';
import EthereumSimulator from './pages/dapps/EthereumSimulator';
import BitcoinSandbox from './pages/dapps/BitcoinSandbox';
import DeFiSimulator from './pages/dapps/DeFiSimulator';
import SmartContractIDE from './pages/dapps/SmartContractIDE';

// Community & DAO Pages
import Community from './pages/Community.jsx';
import DAO from './pages/DAO.jsx';
import Docs from './pages/Docs.jsx';

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
            
            {/* NFT Routes */}
            <Route path="/nfts" element={<NFTs />} />
            <Route path="/nfts/marketplace" element={<NFTMarketplace />} />
            <Route path="/nfts/ethereum-creator" element={<EthereumNFTCreator />} />
            <Route path="/nfts/bitcoin-ordinals" element={<BitcoinOrdinals />} />
            <Route path="/nfts/analytics" element={<NFTAnalytics />} />
            
            {/* dApp Routes */}
            <Route path="/dapps" element={<DApps />} />
            <Route path="/dapps/ethereum-simulator" element={<EthereumSimulator />} />
            <Route path="/dapps/bitcoin-sandbox" element={<BitcoinSandbox />} />
            <Route path="/dapps/defi-simulator" element={<DeFiSimulator />} />
            <Route path="/dapps/ide" element={<SmartContractIDE />} />
            
            {/* Community & DAO Routes */}
            <Route path="/community" element={<Community />}>
              <Route path=":tab" element={<Community />} />
            </Route>
            <Route path="/dao" element={<DAO />}>
              <Route path=":tab" element={<DAO />} />
            </Route>
            <Route path="/docs" element={<Docs />}>
              <Route path=":docId" element={<Docs />} />
            </Route>
            
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