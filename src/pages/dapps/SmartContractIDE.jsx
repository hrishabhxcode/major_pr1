import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Save, Copy, Check, AlertTriangle } from 'lucide-react';

const SmartContractIDE = () => {
  const [code, setCode] = useState(
    '// SPDX-License-Identifier: MIT\n' +
    'pragma solidity ^0.8.0;\n\n' +
    'contract SimpleStorage {\n' +
    '    uint256 private value;\n\n' +
    '    function store(uint256 _value) public {\n' +
    '        value = _value;\n' +
    '    }\n\n' +
    '    function retrieve() public view returns (uint256) {\n' +
    '        return value;\n' +
    '    }\n' +
    '}'
  );
  
  const [activeTab, setActiveTab] = useState('editor');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployParams, setDeployParams] = useState({
    contractName: 'SimpleStorage',
    network: 'Ethereum Goerli',
    gasLimit: '2000000',
    value: '0'
  });
  
  const textareaRef = useRef(null);
  
  const compileCode = () => {
    setIsCompiling(true);
    setOutput('Compiling contract...\n');
    
    // Simulate compilation
    setTimeout(() => {
      setOutput(prev => prev + 
        'Compiling 1 Solidity file...\n' +
        '✓ Compiled successfully!\n\n' +
        'Contract: SimpleStorage\n' +
        '- Compiler: solc 0.8.17\n' +
        '- Optimization: 200 runs\n' +
        '✓ Compiled successfully!\n'
      );
      setIsCompiling(false);
      setActiveTab('output');
    }, 1500);
  };
  
  const deployContract = () => {
    setShowDeployModal(true);
  };
  
  const confirmDeploy = () => {
    setIsDeploying(true);
    setOutput(prev => prev + '\nDeploying contract to Ethereum Goerli testnet...\n');
    
    // Simulate deployment
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setContractAddress(mockAddress);
      setOutput(prev => prev + 
        '✓ Contract deployed to: ' + mockAddress + '\n' +
        'Transaction hash: 0x' + Math.random().toString(16).substr(2, 64) + '\n' +
        'Gas used: 1,234,567\n' +
        'Block #: ' + Math.floor(Math.random() * 10000000) + '\n'
      );
      setIsDeploying(false);
      setShowDeployModal(false);
      setActiveTab('output');
    }, 2000);
  };
  
  const copyToClipboard = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  const saveToFile = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'contract.sol';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleDeployParamChange = (e) => {
    const { name, value } = e.target;
    setDeployParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Link to="/dapps" className="text-blue-400 hover:text-blue-300 mr-4">
            ← Back to dApps
          </Link>
          <h1 className="text-3xl font-bold">Smart Contract IDE</h1>
          <div className="ml-auto flex space-x-3">
            <button
              onClick={compileCode}
              disabled={isCompiling || isDeploying}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              {isCompiling ? 'Compiling...' : 'Compile'}
            </button>
            <button
              onClick={deployContract}
              disabled={isCompiling || isDeploying}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              {isDeploying ? 'Deploying...' : 'Deploy'}
            </button>
            <button
              onClick={saveToFile}
              className="flex items-center p-2 text-gray-400 hover:text-white"
              title="Save"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center p-2 text-gray-400 hover:text-white relative"
              title="Copy to clipboard"
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex bg-gray-900/50 border-b border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'editor' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('editor')}
            >
              contract.sol
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'output' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('output')}
            >
              Output
            </button>
          </div>
          
          <div className="h-[calc(100vh-250px)] overflow-auto">
            {activeTab === 'editor' ? (
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                spellCheck="false"
              />
            ) : (
              <div className="p-4 font-mono text-sm whitespace-pre overflow-auto h-full bg-gray-900">
                {output || 'No output yet. Compile or deploy your contract to see the output.'}
                {contractAddress && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <div className="font-medium mb-2">Contract Deployed Successfully!</div>
                    <div className="text-sm text-gray-400 break-all">
                      Address: {contractAddress}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <a
                        href={`https://goerli.etherscan.io/address/${contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        View on Etherscan
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(contractAddress);
                          alert('Contract address copied to clipboard!');
                        }}
                        className="text-blue-400 hover:underline text-sm"
                      >
                        Copy Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 border-t border-gray-700 p-3 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="flex-1">
                Solidity {activeTab === 'editor' ? code.split('\n').length : '1'} lines
              </div>
              <div className="flex items-center space-x-4">
                <span>UTF-8</span>
                <span>Solidity</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Deploy Contract</h3>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Contract</label>
                  <select
                    name="contractName"
                    value={deployParams.contractName}
                    onChange={handleDeployParamChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                  >
                    <option>SimpleStorage</option>
                    <option disabled>MyToken (coming soon)</option>
                    <option disabled>NFTCollection (coming soon)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Network</label>
                  <select
                    name="network"
                    value={deployParams.network}
                    onChange={handleDeployParamChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                  >
                    <option>Ethereum Goerli</option>
                    <option disabled>Ethereum Mainnet</option>
                    <option disabled>Polygon Mumbai</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Gas Limit</label>
                    <input
                      type="text"
                      name="gasLimit"
                      value={deployParams.gasLimit}
                      onChange={handleDeployParamChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Value (ETH)</label>
                    <input
                      type="text"
                      name="value"
                      value={deployParams.value}
                      onChange={handleDeployParamChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
                
                <div className="bg-yellow-900/30 border border-yellow-800 text-yellow-400 p-3 rounded-lg text-sm flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Testnet Deployment</div>
                    <div className="text-yellow-300">
                      You're about to deploy to a test network. No real funds are at risk.
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowDeployModal(false)}
                    className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeploy}
                    disabled={isDeploying}
                    className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 flex items-center"
                  >
                    {isDeploying ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deploying...
                      </>
                    ) : (
                      'Deploy'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartContractIDE;
