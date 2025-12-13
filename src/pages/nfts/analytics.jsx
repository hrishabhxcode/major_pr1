import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, LineChart, PieChart, TrendingUp, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';

const NFTAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const collectionStats = {
    totalVolume: 12450.75,
    volumeChange: 12.3,
    totalSales: 8456,
    salesChange: -4.2,
    avgPrice: 1.47,
    priceChange: 2.8,
    owners: 4250,
    ownersChange: 8.7,
  };

  const topCollections = [
    {
      id: 1,
      name: 'Bored Ape Yacht Club',
      volume: 2850.25,
      change: 15.3,
      floor: 45.2,
      owners: 3450,
      items: 10000,
      verified: true
    },
    {
      id: 2,
      name: 'CryptoPunks',
      volume: 3120.50,
      change: -5.2,
      floor: 62.8,
      owners: 5120,
      items: 10000,
      verified: true
    },
    {
      id: 3,
      name: 'Doodles',
      volume: 1245.30,
      change: 28.7,
      floor: 12.5,
      owners: 4250,
      items: 10000,
      verified: true
    },
    {
      id: 4,
      name: 'Azuki',
      volume: 985.60,
      change: 42.1,
      floor: 15.8,
      owners: 3850,
      items: 10000,
      verified: true
    },
    {
      id: 5,
      name: 'CloneX',
      volume: 756.20,
      change: -3.4,
      floor: 8.9,
      owners: 2950,
      items: 20000,
      verified: true
    },
  ];

  const recentSales = [
    { id: 1, name: 'Bored Ape #1234', price: 48.2, from: '0x1a2b...c3d4', to: '0x5e4d...f2g3', time: '5m ago' },
    { id: 2, name: 'CryptoPunk #5678', price: 68.5, from: '0x2b3c...d4e5', to: '0x6f5e...g4h5', time: '12m ago' },
    { id: 3, name: 'Doodle #9012', price: 3.2, from: '0x3c4d...e5f6', to: '0x7g6f...h5i6', time: '27m ago' },
    { id: 4, name: 'Azuki #3456', price: 12.8, from: '0x4d5e...f6g7', to: '0x8h7g...i6j7', time: '42m ago' },
    { id: 5, name: 'CloneX #7890', price: 9.1, from: '0x5e6f...g7h8', to: '0x9i8h...j7k8', time: '1h ago' },
  ];

  const priceHistory = [
    { date: 'Jan', price: 1.2 },
    { date: 'Feb', price: 1.8 },
    { date: 'Mar', price: 1.5 },
    { date: 'Apr', price: 1.7 },
    { date: 'May', price: 1.9 },
    { date: 'Jun', price: 1.6 },
    { date: 'Jul', price: 1.4 },
    { date: 'Aug', price: 1.5 },
    { date: 'Sep', price: 1.8 },
    { date: 'Oct', price: 2.1 },
    { date: 'Nov', price: 1.9 },
    { date: 'Dec', price: 2.3 },
  ];

  const StatCard = ({ title, value, change, icon: Icon }) => (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/nfts" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            ← Back to NFTs
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">NFT Analytics</h1>
              <p className="text-gray-400">Market insights and collection statistics</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Search collections..."
                />
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-3 rounded-lg">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent border-0 text-sm focus:ring-0 focus:outline-none"
                >
                  <option value="24h">24h</option>
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                  <option value="all">All time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart2 },
              { id: 'collections', label: 'Collections', icon: TrendingUp },
              { id: 'activity', label: 'Activity', icon: LineChart },
              { id: 'market', label: 'Market', icon: PieChart },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Volume"
                value={`${collectionStats.totalVolume.toLocaleString()} ETH`}
                change={collectionStats.volumeChange}
                icon={BarChart2}
              />
              <StatCard
                title="Total Sales"
                value={collectionStats.totalSales.toLocaleString()}
                change={collectionStats.salesChange}
                icon={TrendingUp}
              />
              <StatCard
                title="Avg. Price"
                value={`${collectionStats.avgPrice} ETH`}
                change={collectionStats.priceChange}
                icon={LineChart}
              />
              <StatCard
                title="Unique Owners"
                value={collectionStats.owners.toLocaleString()}
                change={collectionStats.ownersChange}
                icon={PieChart}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Price History (ETH)</h3>
                <div className="h-64">
                  {/* Placeholder for chart */}
                  <div className="h-full flex items-center justify-center bg-gray-700/50 rounded-lg">
                    <LineChart className="h-16 w-16 text-gray-600" />
                    <span className="ml-2 text-gray-500">Price chart will be displayed here</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Volume Distribution</h3>
                <div className="h-64">
                  {/* Placeholder for chart */}
                  <div className="h-full flex items-center justify-center bg-gray-700/50 rounded-lg">
                    <PieChart className="h-16 w-16 text-gray-600" />
                    <span className="ml-2 text-gray-500">Volume distribution chart will be displayed here</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Collections */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Top Collections</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Collection</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">% Change</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Floor Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Owners</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {topCollections.map((collection) => (
                        <tr key={collection.id} className="hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-md"></div>
                              <div className="ml-4">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium">{collection.name}</div>
                                  {collection.verified && (
                                    <span className="ml-1 text-blue-400" title="Verified">
                                      ✓
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-400">{collection.items.toLocaleString()} items</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {collection.volume.toLocaleString()} ETH
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {collection.change >= 0 ? '+' : ''}{collection.change}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                            {collection.floor} ETH
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                            {collection.owners.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Top NFT Collections</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Collection</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h %</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">7d %</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Floor Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Owners</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {topCollections.map((collection, index) => (
                      <tr key={collection.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-md"></div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <div className="text-sm font-medium">{collection.name}</div>
                                {collection.verified && (
                                  <span className="ml-1 text-blue-400" title="Verified">
                                    ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {collection.volume.toLocaleString()} ETH
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {collection.change >= 0 ? '+' : ''}{collection.change}%
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${collection.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {collection.change >= 0 ? '+' : ''}{collection.change}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                          {collection.floor} ETH
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                          {collection.owners.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                          {collection.items.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-md"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{sale.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/30 text-green-400">
                            Sale
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {sale.price} ETH
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 hover:underline">
                          <a href={`/account/${sale.from}`} className="hover:text-blue-300">
                            {sale.from}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 hover:underline">
                          <a href={`/account/${sale.to}`} className="hover:text-blue-300">
                            {sale.to}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">
                          {sale.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Market Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-400 mb-2">Total Market Cap</h4>
                  <div className="text-2xl font-bold">$12.5B</div>
                  <div className="text-green-400 text-sm mt-1">+5.2% (30d)</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-400 mb-2">24h Volume</h4>
                  <div className="text-2xl font-bold">$245.8M</div>
                  <div className="text-red-400 text-sm mt-1">-2.1% (24h)</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-400 mb-2">Total Sales</h4>
                  <div className="text-2xl font-bold">124.5M</div>
                  <div className="text-green-400 text-sm mt-1">+8.7% (30d)</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Market Trends</h3>
              <div className="h-80">
                <div className="h-full flex items-center justify-center bg-gray-700/30 rounded-lg">
                  <LineChart className="h-16 w-16 text-gray-600" />
                  <span className="ml-2 text-gray-500">Market trends chart will be displayed here</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Top Gainers (24h)</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-600 rounded-md"></div>
                        <div className="ml-3">
                          <div className="font-medium">Collection {item}</div>
                          <div className="text-sm text-gray-400">Floor: {Math.random().toFixed(2)} ETH</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-medium">+{Math.floor(Math.random() * 50) + 10}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Top Losers (24h)</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-600 rounded-md"></div>
                        <div className="ml-3">
                          <div className="font-medium">Collection {item}</div>
                          <div className="text-sm text-gray-400">Floor: {Math.random().toFixed(2)} ETH</div>
                        </div>
                      </div>
                      <div className="text-red-400 font-medium">-{Math.floor(Math.random() * 30) + 5}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTAnalytics;
