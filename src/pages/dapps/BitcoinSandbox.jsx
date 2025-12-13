import React from 'react';
import { Link } from 'react-router-dom';

const BitcoinSandbox = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Bitcoin Sandbox</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-900/30 p-6 rounded-lg border border-amber-700/50">
            <h2 className="text-2xl font-semibold mb-4">Transaction Builder</h2>
            <p className="mb-4 text-gray-300">
              Create and sign Bitcoin transactions. Test different fee scenarios and UTXO management.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
              Build Transaction
            </button>
          </div>
          <div className="bg-amber-900/30 p-6 rounded-lg border border-amber-700/50">
            <h2 className="text-2xl font-semibold mb-4">Wallet Simulator</h2>
            <p className="mb-4 text-gray-300">
              Experiment with HD wallets, addresses, and key management in a safe environment.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
              Open Wallet
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/dapps" className="text-blue-400 hover:text-blue-300">
            ← Back to dApps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BitcoinSandbox;
