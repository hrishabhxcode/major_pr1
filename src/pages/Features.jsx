import React, { useState } from "react";
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';

const Features = () => {
  const [simulationResult, setSimulationResult] = useState('');
  const [keyPair, setKeyPair] = useState({ privateKey: '', publicKey: '', mnemonic: '' });
  const [encryptionInput, setEncryptionInput] = useState('');
  const [encryptionResult, setEncryptionResult] = useState('');
  const [encryptionType, setEncryptionType] = useState('sha256');
  const [copied, setCopied] = useState(false);
  const [ecdsaMessage, setEcdsaMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const signMessage = () => {
    try {
      const wallet = new ethers.Wallet(keyPair.privateKey);
      const message = ecdsaMessage || 'Default message for signing';
      const signature = wallet.signMessageSync(ethers.getBytes(ethers.toUtf8Bytes(message)));
      setSignature(signature);
      setVerificationResult('Message signed successfully!');
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      setVerificationResult('Error: ' + (error.message || 'Failed to sign message'));
      return null;
    }
  };

  const verifySignature = () => {
    try {
      if (!signature || !ecdsaMessage) {
        setVerificationResult('Please sign a message first');
        return false;
      }
      
      const signer = ethers.verifyMessage(
        ethers.getBytes(ethers.toUtf8Bytes(ecdsaMessage)),
        signature
      );
      
      const isValid = signer.toLowerCase() === keyPair.publicKey.toLowerCase();
      setVerificationResult(
        isValid 
          ? '✅ Signature is valid!'
          : '❌ Signature verification failed!'
      );
      return isValid;
    } catch (error) {
      console.error('Error verifying signature:', error);
      setVerificationResult('Error: ' + (error.message || 'Failed to verify signature'));
      return false;
    }
  };

  const simulateBlockchain = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const blockNumber = await provider.getBlockNumber();
      const network = await provider.getNetwork();
      setSimulationResult(`Connected to ${network.name} at block ${blockNumber}`);
    } catch (error) {
      setSimulationResult('Please install MetaMask to use this feature');
    }
  };

  const generateKeyPair = () => {
    const wallet = ethers.Wallet.createRandom();
    setKeyPair({
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic: wallet.mnemonic?.phrase || 'No mnemonic generated'
    });
  };

  const handleEncryption = () => {
    if (!encryptionInput) return;
    
    let result = '';
    switch(encryptionType) {
      case 'sha256':
        result = CryptoJS.SHA256(encryptionInput).toString();
        break;
      case 'aes':
        const key = 'secret-key-123';
        result = CryptoJS.AES.encrypt(encryptionInput, key).toString();
        break;
      case 'base64':
        result = Buffer.from(encryptionInput).toString('base64');
        break;
      default:
        result = 'Unsupported encryption type';
    }
    setEncryptionResult(result);
  };

  // Additional features data
  const features = [
    {
      id: 1,
      title: "Web3 Blockchain",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "blue",
      description: "Simulate Web3 interactions and connect to Ethereum network with just one click.",
      action: simulateBlockchain,
      result: simulationResult,
      buttonText: "Connect to Blockchain"
    },
    {
      id: 2,
      title: "Key Generator",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      color: "purple",
      description: "Generate secure cryptographic key pairs with mnemonic phrases for blockchain wallets.",
      action: generateKeyPair,
      result: keyPair.privateKey ? "Key pair generated successfully" : "",
      buttonText: "Generate Key Pair"
    },
    {
      id: 3,
      title: "Encryption Tools",
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "green",
      description: "Encrypt, hash, and encode your data with multiple cryptographic algorithms.",
      action: handleEncryption,
      result: encryptionResult,
      buttonText: "Encrypt/Encode"
    },
    {
      id: 4,
      title: "Smart Contract Interaction",
      icon: (
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "yellow",
      description: "Deploy and interact with smart contracts on various blockchain networks.",
      action: () => console.log("Smart Contract Interaction"),
      buttonText: "Connect to Contract"
    },
    {
      id: 5,
      title: "NFT Tools",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "pink",
      description: "Create, mint, and manage your NFT collections with our easy-to-use tools.",
      action: () => console.log("NFT Tools"),
      buttonText: "Explore NFTs"
    },
    {
      id: 6,
      title: "Token Swaps",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: "indigo",
      description: "Swap tokens across different blockchains with best rates and low fees.",
      action: () => console.log("Token Swaps"),
      buttonText: "Swap Tokens"
    },
    {
      id: 7,
      title: "Portfolio Tracker",
      icon: (
        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "teal",
      description: "Track your crypto portfolio across multiple wallets and exchanges.",
      action: () => console.log("Portfolio Tracker"),
      buttonText: "View Portfolio"
    },
    {
      id: 8,
      title: "Staking & Yield",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "amber",
      description: "Earn passive income by staking your crypto assets in secure protocols.",
      action: () => console.log("Staking & Yield"),
      buttonText: "Start Earning"
    },
    {
      id: 9,
      title: "Cross-Chain Bridge",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: "cyan",
      description: "Transfer assets between different blockchain networks seamlessly.",
      action: () => console.log("Cross-Chain Bridge"),
      buttonText: "Bridge Assets"
    },
    {
      id: 10,
      title: "ECDSA Signatures",
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "rose",
      description: "Generate ECDSA key pairs, sign messages, and verify signatures using Elliptic Curve Digital Signature Algorithm.",
      action: generateKeyPair,
      buttonText: "Generate Keys"
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'border-blue-500/30 hover:shadow-blue-500/10 bg-blue-500/10',
      purple: 'border-purple-500/30 hover:shadow-purple-500/10 bg-purple-500/10',
      green: 'border-green-500/30 hover:shadow-green-500/10 bg-green-500/10',
      yellow: 'border-yellow-500/30 hover:shadow-yellow-500/10 bg-yellow-500/10',
      pink: 'border-pink-500/30 hover:shadow-pink-500/10 bg-pink-500/10',
      indigo: 'border-indigo-500/30 hover:shadow-indigo-500/10 bg-indigo-500/10',
      teal: 'border-teal-500/30 hover:shadow-teal-500/10 bg-teal-500/10',
      amber: 'border-amber-500/30 hover:shadow-amber-500/10 bg-amber-500/10',
      cyan: 'border-cyan-500/30 hover:shadow-cyan-500/10 bg-cyan-500/10',
      rose: 'border-rose-500/30 hover:shadow-rose-500/10 bg-rose-500/10'
    };
    return colors[color] || colors.blue;
  };

  const getButtonClass = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20',
      purple: 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/20',
      green: 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/20',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 hover:shadow-yellow-500/20',
      pink: 'bg-pink-600 hover:bg-pink-700 hover:shadow-pink-500/20',
      indigo: 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/20',
      teal: 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-500/20',
      amber: 'bg-amber-600 hover:bg-amber-700 hover:shadow-amber-500/20',
      cyan: 'bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/20',
      rose: 'bg-rose-600 hover:bg-rose-700 hover:shadow-rose-500/20'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Advanced Features</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore our powerful suite of blockchain tools and encryption utilities designed for the decentralized web.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 hover:border-${feature.color}-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-${feature.color}-500/10 w-full max-w-md`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 ${getColorClass(feature.color).split(' ')[2]} rounded-lg mr-3`}>
                  {feature.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              </div>
              <p className="text-neutral-400 text-sm mb-5">{feature.description}</p>
              
              {feature.id === 3 ? (
                // Special handling for Encryption Tools card
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Input Text</label>
                    <textarea
                      value={encryptionInput}
                      onChange={(e) => setEncryptionInput(e.target.value)}
                      className="w-full p-3 bg-neutral-700/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                      rows="3"
                      placeholder="Enter text to encrypt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Algorithm</label>
                    <select
                      value={encryptionType}
                      onChange={(e) => setEncryptionType(e.target.value)}
                      className="w-full p-3 bg-neutral-700/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white text-sm"
                    >
                      <option value="sha256" className="bg-neutral-800">SHA-256 (Hashing)</option>
                      <option value="aes" className="bg-neutral-800">AES (Symmetric Encryption)</option>
                      <option value="base64" className="bg-neutral-800">Base64 (Encoding)</option>
                    </select>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={handleEncryption}
                      className={`w-full flex items-center justify-center gap-2 ${getButtonClass(feature.color).split(' ')[0]} ${getButtonClass(feature.color).split(' ')[1]} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ${getButtonClass(feature.color).split(' ')[2]}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {encryptionType === 'sha256' ? 'Hash Text' : encryptionType === 'aes' ? 'Encrypt' : 'Encode'}
                    </button>
                  </div>
                  {encryptionResult && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        {encryptionType === 'sha256' ? 'Hash' : encryptionType === 'aes' ? 'Encrypted' : 'Encoded'} Result
                      </label>
                      <div className="p-3 bg-neutral-700/50 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-300 break-all font-mono">{encryptionResult}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : feature.id === 2 ? (
                // Special handling for Key Generator card
                <div className="space-y-4">
                  <button
                    onClick={feature.action}
                    className={`w-full flex items-center justify-center gap-2 ${getButtonClass(feature.color).split(' ')[0]} ${getButtonClass(feature.color).split(' ')[1]} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ${getButtonClass(feature.color).split(' ')[2]}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {feature.buttonText}
                  </button>
                  {keyPair.privateKey && (
                    <div className="space-y-3 mt-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1">Private Key</label>
                        <div className="p-2 bg-neutral-700/50 rounded-lg border border-neutral-700">
                          <p className="text-xs text-neutral-300 break-all font-mono">{keyPair.privateKey}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1">Public Key</label>
                        <div className="p-2 bg-neutral-700/50 rounded-lg border border-neutral-700">
                          <p className="text-xs text-neutral-300 break-all font-mono">{keyPair.publicKey}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-medium text-neutral-400">Mnemonic Phrase</label>
                          <button 
                            onClick={() => copyToClipboard(keyPair.mnemonic)}
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            title="Copy mnemonic phrase"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="p-2 bg-neutral-700/50 rounded-lg border border-neutral-700">
                          <p className="text-xs text-neutral-300 break-all font-mono">{keyPair.mnemonic}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : feature.id === 10 ? (
                // ECDSA Signature Tools
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Message to Sign</label>
                    <textarea
                      value={ecdsaMessage}
                      onChange={(e) => setEcdsaMessage(e.target.value)}
                      className="w-full p-3 bg-neutral-700/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                      rows="2"
                      placeholder="Enter message to sign"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={signMessage}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Sign Message
                    </button>
                    <button
                      onClick={verifySignature}
                      className="bg-rose-700 hover:bg-rose-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Verify Signature
                    </button>
                  </div>
                  
                  {signature && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-neutral-300">Signature</label>
                        <button 
                          onClick={() => copyToClipboard(signature)}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                          title="Copy signature"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="p-2 bg-neutral-700/50 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-300 break-all font-mono">{signature}</p>
                      </div>
                    </div>
                  )}
                  
                  {verificationResult && (
                    <div className="mt-2 p-2 rounded-lg text-sm text-center">
                      <p className={verificationResult.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                        {verificationResult}
                      </p>
                    </div>
                  )}
                </div>
              ) : feature.id === 1 ? (
                // Special handling for Web3 Blockchain card
                <div className="space-y-4">
                  <button
                    onClick={feature.action}
                    className={`w-full flex items-center justify-center gap-2 ${getButtonClass(feature.color).split(' ')[0]} ${getButtonClass(feature.color).split(' ')[1]} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ${getButtonClass(feature.color).split(' ')[2]}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {feature.buttonText}
                  </button>
                  {simulationResult && (
                    <div className="mt-3 p-3 bg-neutral-700/50 rounded-lg border border-neutral-700">
                      <p className="text-xs text-neutral-300 break-all font-mono">{simulationResult}</p>
                    </div>
                  )}
                </div>
              ) : (
                // Default card layout for other features
                <div className="space-y-4">
                  <button
                    onClick={feature.action}
                    className={`w-full flex items-center justify-center gap-2 ${getButtonClass(feature.color).split(' ')[0]} ${getButtonClass(feature.color).split(' ')[1]} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ${getButtonClass(feature.color).split(' ')[2]}`}
                  >
                    {feature.buttonText}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
