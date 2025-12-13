import React from 'react';
import { Link } from 'react-router-dom';

const NFTsHome = () => {
  const nftFeatures = [
    {
      title: "Ethereum NFT Creator",
      description: "Mint and manage ERC-721/1155 NFTs on Ethereum testnet",
      icon: "🖼️",
      link: "/nfts/ethereum-creator",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "Bitcoin Ordinals",
      description: "Create and inscribe digital artifacts on Bitcoin",
      icon: "₿",
      link: "/nfts/bitcoin-ordinals",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "NFT Marketplace",
      description: "Buy, sell and trade NFTs in a simulated marketplace",
      icon: "🛒",
      link: "/nfts/marketplace",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "NFT Analytics",
      description: "Track and analyze NFT collections and performance",
      icon: "📊",
      link: "/nfts/analytics",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NFT Creation Hub</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Create, manage and explore NFTs across multiple blockchains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {nftFeatures.map((feature, index) => (
            <Link 
              to={feature.link}
              key={index}
              className={`group bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-${feature.gradient.split(' ')[0]}/20`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Why Use Our NFT Tools?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "No-Code Creation",
                description: "Create NFTs without writing a single line of code"
              },
              {
                icon: "🔒",
                title: "Testnet Support",
                description: "Experiment with test networks before going live"
              },
              {
                icon: "🌐",
                title: "Multi-Chain",
                description: "Support for Ethereum, Bitcoin, and more"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="space-y-4">
            {[
              "Connect your wallet (or use our test wallet)",
              "Choose a blockchain network",
              "Create or import your digital assets",
              "Mint and manage your NFTs"
            ].map((step, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold mr-4">
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTsHome;
