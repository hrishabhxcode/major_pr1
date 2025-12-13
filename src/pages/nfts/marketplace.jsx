import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ArrowUpDown, Filter, Search } from 'lucide-react';

const NFTMarketplace = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock NFT data
  const nfts = [
    {
      id: 1,
      name: 'CryptoPunk #1234',
      price: '2.5',
      currency: 'ETH',
      likes: '1.2k',
      creator: '0x1a2b...c3d4',
      image: 'https://cryptopunks.app/cryptopunks/cryptopunk1234.png',
      collection: 'CryptoPunks',
      verified: true,
      lastSale: '2.1 ETH',
      owner: '0x5e4d...f2g3'
    },
    {
      id: 2,
      name: 'Bored Ape #5678',
      price: '45.0',
      currency: 'ETH',
      likes: '3.4k',
      creator: '0x2b3c...d4e5',
      image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xHIgjCOwYMaYmJwCdL4yBTpBGQvIx1u2g8w=s0',
      collection: 'Bored Ape Yacht Club',
      verified: true,
      lastSale: '42.0 ETH',
      owner: '0x6f5e...g4h5'
    },
    {
      id: 3,
      name: 'Doodle #9012',
      price: '3.2',
      currency: 'ETH',
      likes: '2.1k',
      creator: '0x3c4d...e5f6',
      image: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVdk674hCssoOMxrDSjWWI52T35ik4d3PiZZg7D4lX-9J0x3d4W3Z_xN5XqzIoJ3H1hgkIFydX2WARJpyV8=s0',
      collection: 'Doodles',
      verified: true,
      lastSale: '2.8 ETH',
      owner: '0x7g6f...h5i6'
    },
    {
      id: 4,
      name: 'Azuki #3456',
      price: '12.5',
      currency: 'ETH',
      likes: '5.6k',
      creator: '0x4d5e...f6g7',
      image: 'https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/3456.png',
      collection: 'Azuki',
      verified: true,
      lastSale: '10.2 ETH',
      owner: '0x8h7g...i6j7'
    },
    {
      id: 5,
      name: 'CloneX #7890',
      price: '8.9',
      currency: 'ETH',
      likes: '4.3k',
      creator: '0x5e6f...g7h8',
      image: 'https://clonex-assets.rtfkt.com/images/7890.png',
      collection: 'CloneX',
      verified: true,
      lastSale: '7.5 ETH',
      owner: '0x9i8h...j7k8'
    },
    {
      id: 6,
      name: 'World of Women #123',
      price: '6.7',
      currency: 'ETH',
      likes: '3.2k',
      creator: '0x6f7g...h8i9',
      image: 'https://ipfs.io/ipfs/QmZ3R2V9e5LfUaX7V8Jx9X9bQeQ1X9Z0Y1X9Z0Y1X9Z0Y1X9Z0',
      collection: 'World of Women',
      verified: true,
      lastSale: '5.9 ETH',
      owner: '0x0j9i...k8l9'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'art', name: 'Art' },
    { id: 'collectibles', name: 'Collectibles' },
    { id: 'music', name: 'Music' },
    { id: 'photography', name: 'Photography' },
    { id: 'sports', name: 'Sports' },
    { id: 'trading-cards', name: 'Trading Cards' },
    { id: 'utility', name: 'Utility' },
    { id: 'virtual-worlds', name: 'Virtual Worlds' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Listed' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'oldest', label: 'Oldest' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/nfts" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            ← Back to NFTs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-gray-400">Discover, collect, and sell extraordinary NFTs</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search items, collections, and accounts"
              />
            </div>
            
            <div className="flex space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
                
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-10 p-4">
                    <h3 className="font-medium mb-3">Filters</h3>
                    <div className="space-y-4">
                      <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Price Range</label>
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                placeholder="Min"
                                className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm"
                              />
                              <input
                                type="number"
                                placeholder="Max"
                                className="w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
                            <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm">
                              <option>ETH</option>
                              <option>WETH</option>
                              <option>DAI</option>
                              <option>USDC</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded text-blue-500" />
                              <span className="text-sm">Verified Only</span>
                            </label>
                          </div>
                          
                          <div className="pt-2">
                            <button 
                              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
                              onClick={() => setShowFilters(false)}
                            >
                              Apply Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Categories */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                        activeTab === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* NFT Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <div key={nft.id} className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=NFT+Image';
                      }}
                    />
                    <button className="absolute top-3 right-3 p-2 bg-gray-900/70 rounded-full hover:bg-gray-800/90 transition-colors">
                      <Heart className="h-5 w-5 text-gray-300 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
                      {nft.verified && (
                        <span className="text-blue-400" title="Verified collection">
                          ✓
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-3">{nft.collection}</div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-400">Price</div>
                        <div className="font-semibold">{nft.price} {nft.currency}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Last sale</div>
                        <div className="text-sm">{nft.lastSale}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">{nft.likes}</span>
                      </div>
                      
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-10 text-center">
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default NFTMarketplace;
