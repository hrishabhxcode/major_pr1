import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Vote, Award, Clock, BarChart2, AlertCircle, CheckCircle } from 'lucide-react';

const DAO = () => {
  // Get the tab from URL params or default to 'proposals'
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab') || 'proposals';
  
  // Initialize state with the tab from URL or default to 'proposals'
  const [activeTab, setActiveTab] = useState(tabParam);
  const [stakeAmount, setStakeAmount] = useState('');
  
  // Mock data
  const proposals = [
    {
      id: 1,
      title: 'Community Treasury Allocation Q1 2024',
      description: 'Proposal to allocate 50,000 tokens from the community treasury to fund development initiatives.',
      status: 'active',
      votesFor: 12450,
      votesAgainst: 3240,
      endTime: '2d 14h',
      totalVotes: 15690
    },
    {
      id: 2,
      title: 'Update Protocol Fee Structure',
      description: 'Proposal to adjust the protocol fee from 0.3% to 0.25% to remain competitive in the market.',
      status: 'pending',
      votesFor: 0,
      votesAgainst: 0,
      endTime: 'Coming soon',
      totalVotes: 0
    },
    {
      id: 3,
      title: 'Partnership with DeFi Protocol',
      description: 'Proposal to form a strategic partnership with a leading DeFi protocol to enhance cross-chain functionality.',
      status: 'executed',
      votesFor: 18560,
      votesAgainst: 2450,
      endTime: 'Ended',
      totalVotes: 21010,
      executed: true
    },
  ];

  const members = [
    { address: '0x1a2b...c3d4', votingPower: '1,245,000', joined: '12 months ago', proposals: 24 },
    { address: '0x3c4d...e5f6', votingPower: '876,500', joined: '8 months ago', proposals: 18 },
    { address: '0x5e6f...g7h8', votingPower: '654,200', joined: '6 months ago', proposals: 15 },
    { address: '0x7g8h...i9j0', votingPower: '432,100', joined: '4 months ago', proposals: 9 },
    { address: '0x9i0j...k1l2', votingPower: '321,500', joined: '3 months ago', proposals: 7 },
  ];

  const stats = [
    { name: 'Total Members', value: '12,450', icon: Users },
    { name: 'Active Proposals', value: '3', icon: Vote },
    { name: 'Total Proposals', value: '124', icon: BarChart2 },
    { name: 'Voting Power', value: '45.2M', icon: Award },
  ];

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    window.history.pushState({}, '', `${window.location.pathname}?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Decentralized Governance</h1>
          <p className="text-gray-400">Participate in the future of the platform through decentralized governance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mr-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/3 space-y-6">
            {/* DAO Token Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-400" />
                Your Governance Power
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Voting Power</span>
                    <span>12,450 GOV</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="font-medium mb-3">Stake Tokens</h3>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
                      Stake
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Balance: 15,000 GOV
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium">
                  Delegate Votes
                </button>
              </div>
            </div>
            
            {/* Top Members */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Top Members</h2>
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{member.address}</div>
                        <div className="text-xs text-gray-400">{member.votingPower} VP</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{member.proposals} props</div>
                  </div>
                ))}
                <button className="w-full mt-2 text-sm text-blue-400 hover:text-blue-300 text-center">
                  View All Members →
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="flex border-b border-gray-800 mb-6">
              {[
                { id: 'proposals', label: 'Proposals' },
                { id: 'create', label: 'Create Proposal' },
                { id: 'delegates', label: 'Delegates' },
                { id: 'about', label: 'About' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {activeTab === 'proposals' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Proposals</h2>
                  <button 
                    onClick={() => handleTabChange('create')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm"
                  >
                    Create Proposal
                  </button>
                </div>
                
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="bg-gray-800 rounded-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold mr-3">{proposal.title}</h3>
                            {proposal.status === 'active' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400">
                                Active
                              </span>
                            )}
                            {proposal.status === 'pending' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/30 text-yellow-400">
                                Pending
                              </span>
                            )}
                            {proposal.status === 'executed' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400">
                                Executed
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{proposal.description}</p>
                          
                          <div className="flex items-center text-sm text-gray-400 space-x-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{proposal.endTime}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{proposal.totalVotes.toLocaleString()} votes</span>
                            </div>
                          </div>
                        </div>
                        
                        {proposal.status === 'executed' && proposal.executed && (
                          <div className="flex items-center text-green-400 text-sm">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            <span>Executed</span>
                          </div>
                        )}
                      </div>
                      
                      {proposal.status === 'active' && (
                        <div className="mt-6">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>For: {proposal.votesFor.toLocaleString()} votes</span>
                            <span>{Math.round((proposal.votesFor / proposal.totalVotes) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Against: {proposal.votesAgainst.toLocaleString()} votes</span>
                            <span>{Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-red-500 h-2.5 rounded-full" 
                              style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium">
                              Vote For
                            </button>
                            <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium">
                              Vote Against
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {proposal.status === 'pending' && (
                        <div className="mt-4 text-yellow-400 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Voting starts in 2 days</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-6 py-2.5 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium">
                  Load More Proposals
                </button>
              </div>
            )}
            
            {activeTab === 'create' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Create Proposal</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Proposal title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detailed description of your proposal..."
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-400">
                      You can use Markdown for formatting. Include all relevant details and links.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Proposal Type</label>
                    <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Governance</option>
                      <option>Parameter Change</option>
                      <option>Treasury</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="font-medium mb-3">Proposal Actions</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Action #1</span>
                          <button className="text-red-400 hover:text-red-300">
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Contract</label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg"
                              placeholder="0x..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Function</label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg"
                              placeholder="functionName"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Value</label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="block text-xs text-gray-400 mb-1">Parameters</label>
                          <textarea
                            rows={2}
                            className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg"
                            placeholder='["param1", "param2"]'
                          ></textarea>
                        </div>
                      </div>
                      
                      <button className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <span className="mr-1">+</span> Add Action
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button className="px-6 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg font-medium">
                      Save Draft
                    </button>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
                      Create Proposal
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'delegates' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Delegate Voting Power</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Your Voting Power</h3>
                    <div className="text-2xl font-bold mb-2">12,450 GOV</div>
                    <p className="text-sm text-gray-400">
                      Delegate your voting power to participate in governance or vote on proposals directly.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Delegate Address</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0x..."
                      />
                      <button className="px-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg font-medium">
                        Delegate
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      You can delegate to another address or yourself to vote on proposals.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Top Delegates</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Delegate</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Voting Power</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Proposals</th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {members.map((member, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium">{member.address}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                {member.votingPower}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                {member.proposals}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                <button className="text-blue-400 hover:text-blue-300 text-sm">
                                  Delegate
                                </button>
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
            
            {activeTab === 'about' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">About Governance</h2>
                <div className="prose prose-invert max-w-none">
                  <h3>How Governance Works</h3>
                  <p>
                    The platform is governed by GOV token holders who can create and vote on proposals to shape the future of the protocol.
                  </p>
                  
                  <h3 className="mt-6">Voting Process</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Proposal Creation:</strong> Any GOV token holder can create a proposal by staking a minimum of 10,000 GOV tokens.</li>
                    <li><strong>Discussion:</strong> The proposal is open for discussion for 3 days before voting begins.</li>
                    <li><strong>Voting:</strong> Voting lasts for 5 days. 1 GOV = 1 vote.</li>
                    <li><strong>Execution:</strong> If the proposal passes, it can be executed after a 2-day timelock.</li>
                  </ol>
                  
                  <h3 className="mt-6">Voting Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimum quorum: 10% of circulating supply</li>
                    <li>Approval threshold: 60% for, with at least 20% participation</li>
                    <li>Veto threshold: 33.4% can veto proposals with security risks</li>
                  </ul>
                  
                  <h3 className="mt-6">Useful Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <a href="#" className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="font-medium">Governance Forum</div>
                      <div className="text-sm text-gray-400">Discuss proposals and ideas</div>
                    </a>
                    <a href="#" className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="font-medium">Documentation</div>
                      <div className="text-sm text-gray-400">Learn about governance</div>
                    </a>
                    <a href="#" className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="font-medium">FAQ</div>
                      <div className="text-sm text-gray-400">Common questions</div>
                    </a>
                    <a href="#" className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="font-medium">Tutorial</div>
                      <div className="text-sm text-gray-400">How to participate</div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAO;
