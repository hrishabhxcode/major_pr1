import React from 'react';
import { Link } from 'react-router-dom';

const EthereumSimulator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop')] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-8 pt-8">Ethereum Playground</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Smart Contract Sandbox</h2>
              <p className="mb-6 text-gray-300">
                Deploy and interact with smart contracts on a simulated Ethereum network.
                Test your Solidity code with virtual ETH in a risk-free environment.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                Launch Sandbox
              </button>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Transaction Simulator</h2>
              <p className="mb-6 text-gray-300">
                Simulate Ethereum transactions, test gas fees, and understand how transactions work on the blockchain.
                Perfect for learning and testing before going live.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                Try Transaction
              </button>
            </div>
          </div>
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-6">More Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
                <h3 className="text-lg font-medium mb-2 text-green-400">Token Creator</h3>
                <p className="text-sm text-gray-400 mb-4">Create and deploy your own ERC-20 or ERC-721 tokens in minutes.</p>
                <button className="text-sm text-green-400 hover:text-green-300">Launch →</button>
              </div>
              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-yellow-500 transition-colors">
                <h3 className="text-lg font-medium mb-2 text-yellow-400">DeFi Simulator</h3>
                <p className="text-sm text-gray-400 mb-4">Experiment with DeFi protocols like Uniswap and Aave in a test environment.</p>
                <button className="text-sm text-yellow-400 hover:text-yellow-300">Explore →</button>
              </div>
              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-pink-500 transition-colors">
                <h3 className="text-lg font-medium mb-2 text-pink-400">NFT Marketplace</h3>
                <p className="text-sm text-gray-400 mb-4">Mint, buy and sell test NFTs on a simulated marketplace.</p>
                <button className="text-sm text-pink-400 hover:text-pink-300">Browse →</button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800">
            <Link to="/dapps" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to dApps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthereumSimulator;
