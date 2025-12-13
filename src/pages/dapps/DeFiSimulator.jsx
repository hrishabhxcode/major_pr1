import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeFiSimulator = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('DAI');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const protocols = [
    { name: 'Uniswap', tvl: '3.2B', volume24h: '1.1B' },
    { name: 'Aave', tvl: '6.5B', volume24h: '850M' },
    { name: 'Compound', tvl: '2.8B', volume24h: '320M' },
    { name: 'Curve', tvl: '4.1B', volume24h: '420M' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/dapps" className="text-blue-400 hover:text-blue-300 mr-4">
            ← Back to dApps
          </Link>
          <h1 className="text-4xl font-bold">DeFi Simulator</h1>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex space-x-4 mb-6 border-b border-gray-700">
            {['swap', 'lend', 'stake', 'farm'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {activeTab === 'swap' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Token Swap</h2>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">From</span>
                  <span className="text-gray-400">Balance: 1.5 ETH</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="flex-1 bg-transparent text-2xl outline-none"
                  />
                  <select 
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="bg-gray-800 text-white rounded-lg px-3 py-2"
                  >
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="USDC">USDC</option>
                    <option value="WBTC">WBTC</option>
                  </select>
                </div>
                
                <div className="flex justify-center my-2">
                  <button className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full">
                    ↓
                  </button>
                </div>
                
                <div className="mb-2 text-gray-400">To</div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={amount ? (parseFloat(amount) * 1800).toFixed(6) : '0.0'}
                    className="flex-1 bg-transparent text-2xl outline-none text-gray-400"
                  />
                  <select 
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="bg-gray-800 text-white rounded-lg px-3 py-2"
                  >
                    <option value="DAI">DAI</option>
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="WBTC">WBTC</option>
                  </select>
                </div>
                
                <div className="mt-6 space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Price Impact</span>
                    <span>0.05%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liquidity Provider Fee</span>
                    <span>0.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Route</span>
                    <span>ETH → DAI</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg">
                  Swap
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'lend' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Lend & Borrow</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Supply Assets</h3>
                  <div className="space-y-4">
                    {['ETH', 'DAI', 'USDC'].map((token) => (
                      <div key={token} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium">{token}</div>
                          <div className="text-sm text-gray-400">APY: {token === 'ETH' ? '2.5%' : token === 'DAI' ? '3.2%' : '2.8%'}</div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                          Supply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Your Supplies</h3>
                  <div className="text-center py-8 text-gray-400">
                    No supplies yet
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'stake' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Staking</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { token: 'ETH', apy: '5.5%', staked: '0.0', rewards: '0.0' },
                  { token: 'DAI', apy: '7.2%', staked: '0.0', rewards: '0.0' },
                  { token: 'USDC', apy: '6.8%', staked: '0.0', rewards: '0.0' },
                ].map((pool) => (
                  <div key={pool.token} className="bg-gray-700/50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xl font-medium">{pool.token} Pool</div>
                      <div className="text-green-400">{pool.apy} APY</div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="text-sm text-gray-400">Staked</div>
                        <div className="text-lg">{pool.staked} {pool.token}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Rewards</div>
                        <div className="text-lg">{pool.rewards} {pool.token}</div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                      Stake {pool.token}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'farm' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Yield Farming</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3">Pool</th>
                      <th className="pb-3">TVL</th>
                      <th className="pb-3">APY</th>
                      <th className="pb-3">Your Stake</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pair: 'ETH/DAI', tvl: '$12.5M', apy: '45.2%', stake: '0.0' },
                      { pair: 'ETH/USDC', tvl: '$8.7M', apy: '38.6%', stake: '0.0' },
                      { pair: 'WBTC/ETH', tvl: '$15.2M', apy: '52.1%', stake: '0.0' },
                    ].map((pool, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="font-medium">{pool.pair}</div>
                          </div>
                        </td>
                        <td>{pool.tvl}</td>
                        <td className="text-green-400">{pool.apy}</td>
                        <td>{pool.stake} LP</td>
                        <td>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Stake
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">DeFi Protocols</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {protocols.map((protocol, i) => (
              <div key={i} className="bg-gray-700/50 p-4 rounded-lg">
                <div className="font-medium">{protocol.name}</div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>TVL: {protocol.tvl}</span>
                  <span>24h Vol: {protocol.volume24h}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiSimulator;
