import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BitcoinOrdinals = () => {
  const [inscriptionData, setInscriptionData] = useState({
    content: '',
    feeRate: 'medium',
    isInscribing: false
  });

  const handleInscribe = (e) => {
    e.preventDefault();
    if (!inscriptionData.content) return;
    
    setInscriptionData(prev => ({ ...prev, isInscribing: true }));
    
    // Simulate inscription process
    setTimeout(() => {
      alert('Inscription created successfully!');
      setInscriptionData({
        content: '',
        feeRate: 'medium',
        isInscribing: false
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Bitcoin Ordinals</h1>
        <p className="text-gray-400 mb-8">Inscribe data on the Bitcoin blockchain</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inscription Form */}
          <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/50">
            <h2 className="text-2xl font-semibold mb-4">Create Inscription</h2>
            <form onSubmit={handleInscribe}>
              <div className="mb-4">
                <label className="block text-amber-200 mb-2" htmlFor="content">
                  Content to Inscribe (text or hex)
                </label>
                <textarea
                  id="content"
                  value={inscriptionData.content}
                  onChange={(e) => setInscriptionData({...inscriptionData, content: e.target.value})}
                  className="w-full p-3 rounded bg-amber-900/30 text-white border border-amber-700/50 h-32"
                  placeholder="Enter text or hex data to inscribe..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-amber-200 mb-2">
                  Fee Rate
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['slow', 'medium', 'fast'].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setInscriptionData({...inscriptionData, feeRate: speed})}
                      className={`py-2 px-4 rounded ${
                        inscriptionData.feeRate === speed
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-900/30 text-amber-200 hover:bg-amber-800/50'
                      }`}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-amber-400 text-sm mt-2">
                  {inscriptionData.feeRate === 'slow' && '~30-60 min confirmation'}
                  {inscriptionData.feeRate === 'medium' && '~10-20 min confirmation'}
                  {inscriptionData.feeRate === 'fast' && '~1-5 min confirmation'}
                </p>
              </div>
              
              <div className="mb-6 p-4 bg-amber-900/20 rounded border border-amber-800/30">
                <h3 className="font-medium text-amber-200 mb-2">Estimated Cost</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Network Fee:</span>
                  <span>0.00012 BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service Fee:</span>
                  <span>0.00005 BTC</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t border-amber-800/50">
                  <span>Total:</span>
                  <span>0.00017 BTC</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!inscriptionData.content || inscriptionData.isInscribing}
                className={`w-full py-3 px-4 rounded font-medium ${
                  !inscriptionData.content || inscriptionData.isInscribing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {inscriptionData.isInscribing ? 'Inscribing...' : 'Inscribe on Bitcoin'}
              </button>
            </form>
          </div>
          
          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">What are Bitcoin Ordinals?</h3>
              <p className="text-gray-300 mb-4">
                Bitcoin Ordinals allow you to inscribe data like text, images, or other media
                directly onto individual satoshis (the smallest unit of Bitcoin).
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Inscriptions are stored directly on the Bitcoin blockchain</li>
                <li>• Each inscription is unique and immutable</li>
                <li>• No smart contracts or sidechains required</li>
                <li>• Pay once, store forever</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Recent Inscriptions</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center p-3 bg-gray-700/50 rounded">
                    <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center mr-3">
                      {item}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Inscription #{1234567 + item}</div>
                      <div className="text-xs text-gray-400">2{Math.floor(Math.random() * 5) + 1} minutes ago</div>
                    </div>
                    <div className="text-xs bg-gray-600 px-2 py-1 rounded">
                      {['text', 'image', 'json'][Math.floor(Math.random() * 3)]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Link to="/nfts" className="text-blue-400 hover:text-blue-300">
            ← Back to NFTs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BitcoinOrdinals;
