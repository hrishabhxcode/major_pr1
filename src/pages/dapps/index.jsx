import React from 'react';
import { Link } from 'react-router-dom';

const DAppsHome = () => {
  const dappCards = [
    {
      title: "Ethereum Playground",
      description: "Deploy and interact with smart contracts on a simulated Ethereum network",
      icon: "Ξ",
      link: "/dapps/ethereum-simulator",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Bitcoin Sandbox",
      description: "Create and test Bitcoin transactions in a safe environment",
      icon: "₿",
      link: "/dapps/bitcoin-sandbox",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      title: "DeFi Simulator",
      description: "Experiment with DeFi protocols like Uniswap and Aave",
      icon: "🔄",
      link: "/dapps/defi-simulator",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Smart Contract IDE",
      description: "Write, test and deploy smart contracts with our browser-based IDE",
      icon: "</>",
      link: "/dapps/ide",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Web3 dApp Simulators</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore blockchain technology with our interactive simulators. No crypto required!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dappCards.map((dapp, index) => (
            <Link 
              to={dapp.link}
              key={index}
              className={`group bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-${dapp.gradient.split(' ')[0]}/20`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${dapp.gradient} flex items-center justify-center text-2xl font-bold mb-4`}>
                {dapp.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{dapp.title}</h3>
              <p className="text-gray-400">{dapp.description}</p>
              <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors flex items-center">
                Launch Simulator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">How to Use Our Simulators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Choose a Simulator",
                description: "Select from our range of blockchain simulators"
              },
              {
                step: 2,
                title: "Interact Freely",
                description: "Use test networks and virtual assets"
              },
              {
                step: 3,
                title: "Learn & Experiment",
                description: "No risk, just pure learning experience"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAppsHome;
