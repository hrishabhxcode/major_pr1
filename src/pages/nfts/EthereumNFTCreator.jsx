import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';

const EthereumNFTCreator = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    imagePreview: null,
    supply: 1,
    properties: [{ key: '', value: '' }]
  });
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [mintedData, setMintedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProperty = () => {
    setFormData(prev => ({
      ...prev,
      properties: [...prev.properties, { key: '', value: '' }]
    }));
  };

  const updateProperty = (index, field, value) => {
    const newProperties = [...formData.properties];
    newProperties[index][field] = value;
    setFormData(prev => ({
      ...prev,
      properties: newProperties
    }));
  };

  const removeProperty = (index) => {
    if (formData.properties.length > 1) {
      const newProperties = formData.properties.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        properties: newProperties
      }));
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;
    
    setIsMinting(true);
    
    // Simulate blockchain transaction
    try {
      // In a real app, you would interact with a smart contract here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      setMintedData({
        txHash: mockTxHash,
        tokenId: Math.floor(Math.random() * 10000),
        contractAddress: '0x1234...abcd',
        imageUrl: formData.imagePreview
      });
      
      setMinted(true);
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const renderForm = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* NFT Preview */}
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">NFT Preview</h2>
          <div 
            className="bg-gray-700 rounded-lg p-4 h-64 flex flex-col items-center justify-center mb-4 overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {formData.imagePreview ? (
              <img 
                src={formData.imagePreview} 
                alt="NFT Preview" 
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-center p-4">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Upload an image to preview your NFT</p>
                <p className="text-sm text-gray-500 mt-1">Click to select file</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-center">{formData.name || 'Untitled'}</h3>
            <p className="text-gray-400 text-center">{formData.description || 'No description'}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Network</div>
                <div className="font-mono">Ethereum Goerli</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Standard</div>
                <div>ERC-721</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Supply</div>
                <div>{formData.supply}</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <div className="text-gray-400">Token ID</div>
                <div>#{formData.name ? '?' : '--'}</div>
              </div>
            </div>
          </div>
        </div>

        {formData.properties.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Properties</h3>
            <div className="space-y-3">
              {formData.properties.map((prop, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={prop.key}
                    onChange={(e) => updateProperty(index, 'key', e.target.value)}
                    className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
                    placeholder="Trait (e.g., Color)"
                  />
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => updateProperty(index, 'value', e.target.value)}
                    className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
                    placeholder="Value (e.g., Blue)"
                  />
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="px-3 bg-red-600 hover:bg-red-700 rounded"
                    disabled={formData.properties.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addProperty}
                className="mt-2 text-sm text-blue-400 hover:text-blue-300 flex items-center"
              >
                + Add Property
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Minting Form */}
      <div className="bg-gray-800 p-6 rounded-lg h-fit">
        <h2 className="text-2xl font-semibold mb-6">Create Your NFT</h2>
        <form onSubmit={handleMint} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="My Awesome NFT"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your NFT..."
              rows="4"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">
              Image *
            </label>
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.image ? (
                <div className="space-y-2">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="max-h-40 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-400 mt-2">Click to change image</p>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 50MB</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                required={!formData.image}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="supply">
              Supply
            </label>
            <div className="relative">
              <input
                type="number"
                id="supply"
                name="supply"
                min="1"
                max="10000"
                value={formData.supply}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  supply: Math.min(10000, Math.max(1, parseInt(e.target.value) || 1))
                }))}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {formData.supply > 1 ? 'edition' : 'edition'}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isMinting || !formData.name || !formData.image}
            className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all ${
              isMinting || !formData.name || !formData.image
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/20'
            } flex items-center justify-center`}
          >
            {isMinting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Minting...
              </>
            ) : (
              'Mint Now'
            )}
          </button>
          
          <div className="text-sm text-gray-400 text-center">
            <p>By clicking "Mint Now", you agree to our Terms of Service</p>
            <p className="mt-1">Gas fees will apply for on-chain transactions</p>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold mb-4">NFT Minted Successfully!</h2>
      <p className="text-gray-400 mb-8 max-w-lg mx-auto">
        Your NFT has been minted on the Ethereum Goerli testnet. You can view it in your wallet or on a block explorer.
      </p>
      
      <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto mb-8">
        <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
          <img 
            src={mintedData.imageUrl} 
            alt="Minted NFT" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-1">{formData.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{formData.description}</p>
        
        <div className="space-y-3 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Token ID:</span>
            <span className="font-mono">#{mintedData.tokenId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contract:</span>
            <span className="font-mono">{mintedData.contractAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Transaction:</span>
            <a 
              href={`https://goerli.etherscan.io/tx/${mintedData.txHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setMinted(false)}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          Create Another NFT
        </button>
        <a
          href="/nfts"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-colors inline-flex items-center justify-center"
        >
          View My Collection
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/nfts" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to NFTs
          </Link>
          <h1 className="text-4xl font-bold">Ethereum NFT Creator</h1>
          <p className="text-gray-400 mt-2">
            Create and mint your own ERC-721 NFT on the Ethereum Goerli testnet
          </p>
        </div>
        
        {minted ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
};

export default EthereumNFTCreator;
