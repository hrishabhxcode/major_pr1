import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';
import DWallet from '../components/DWallet';

const Features = () => {
  const [simulationResult, setSimulationResult] = useState('');
  
  // Token Launchpad state
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('18');
  const [tokenAddress, setTokenAddress] = useState('');
  const [deployStatus, setDeployStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [keyPair, setKeyPair] = useState({ privateKey: '', publicKey: '', mnemonic: '' });
  const [encryptionInput, setEncryptionInput] = useState('');
  const [encryptionResult, setEncryptionResult] = useState('');
  const [encryptionType, setEncryptionType] = useState('sha256');
  const [copied, setCopied] = useState(false);
  const [ecdsaMessage, setEcdsaMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const deployToken = async () => {
    if (!tokenName || !tokenSymbol || !totalSupply || !tokenDecimals) {
      setDeployStatus('Please fill in all fields');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('Deploying token contract...');

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to deploy tokens');
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tokenABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function totalSupply() view returns (uint256)',
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address to, uint256 amount) returns (bool)',
        'event Transfer(address indexed from, address indexed to, uint256 value)'
      ];

      const tokenBytecode = '0x608060405234801561001057600080fd5b50600436106100a95760003560e01c806370a082311161007157806370a082311461011957806395d89b4114610142578063a9059cbb1461014a578063d28d88521461015d578063dd62ed3e14610165578063f2fde38b1461017857600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b661018b565b6040516100c39190610b3d565b60405180910390f35b6100df6100da366004610b6d565b61021d565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610b97565b610237565b604051601281526020016100c3565b6100f3610127366004610bd3565b6001600160a01b031660009081526020819052604090205490565b6100b661025b565b6100df610158366004610b6d565b61026a565b6100b6610278565b6100f3610173366004610bf5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61018b6102e3565b005b60606003805461019a90610c28565b80601f01602080910402602001604051908101604052809291908181526020018280546101c690610c28565b80156102135780601f106101e857610100808354040283529160200191610213565b820191906000526020600020905b8154815290600101906020018083116101f657829003601f168201915b5050505050905090565b60003361022b818585610310565b60019150505b92915050565b600033610245858285610322565b6102508585856103a0565b506001949350505050565b60606004805461019a90610c28565b60003361022b8185856103a0565b6005805461028590610c28565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610c28565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e1575b5050505061030d8160016103ff565b90565b61031d838383600161043a565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461039a578181101561038b57828183604051637dc7a0d960e11b815260040161038293929190610c62565b60405180910390fd5b6103998484848403600061043a565b505b50505050565b6001600160a01b0383166103ca576000604051634b637e8f60e11b815260040160405180910390fd5b6001600160a01b0382166103f457600060405163ec442f0560e01b81526004016103829190610c8c565b61031d83838361050f565b60008282604051610411929190610c9a565b6040519081900390206000908152600660205260409020805460ff191660ff9290921691909117905550565b6001600160a01b03841661046457600060405163e602df0560e01b815260040160405180910390fd5b6001600160a01b03831661048e576000604051634a1406b160e11b815260040160405180910390fd5b6001600160a01b038085166000908152600160209081526040808320938716835292905290812080548492906104c5908490610cbf565b90915550506001600160a01b038416600090815260208190526040812080548492906104f2908490610cd2565b90915550610503905084848461063a565b50505050565b505050565      ';

      const tokenFactory = new ethers.ContractFactory(tokenABI, tokenBytecode, signer);
      
      // Deploy the token contract
      const token = await tokenFactory.deploy(
        tokenName,
        tokenSymbol,
        ethers.parseUnits(totalSupply, tokenDecimals),
        tokenDecimals
      );

      setDeployStatus('Waiting for transaction confirmation...');
      await token.waitForDeployment();
      
      const address = await token.getAddress();
      setTokenAddress(address);
      setDeployStatus(`✅ Token deployed successfully!\nContract Address: ${address}`);
      
    } catch (error) {
      console.error('Error deploying token:', error);
      setDeployStatus(`❌ Deployment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsDeploying(false);
    }
  };

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

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnect = (address) => {
    setWalletConnected(true);
    setWalletAddress(address);
    // Update the simulation result when wallet connects
    updateBlockchainInfo(address);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setSimulationResult('Disconnected from wallet');
  };

  const updateBlockchainInfo = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const blockNumber = await provider.getBlockNumber();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);
      
      setSimulationResult(
        `Connected to ${network.name} (Chain ID: ${network.chainId}) at block ${blockNumber}\n` +
        `Your address: ${address}\n` +
        `Balance: ${parseFloat(ethBalance).toFixed(4)} ETH`
      );
    } catch (error) {
      console.error('Error getting blockchain info:', error);
      setSimulationResult('Error connecting to blockchain: ' + error.message);
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

  
  const features = [
    {
      id: 1,
      title: "Web3 Wallet",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: "blue",
      description: "Connect your Web3 wallet to interact with the Ethereum network and manage your assets.",
      action: async () => {
        if (walletConnected) {
          handleWalletDisconnect();
        } else {
          if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              if (accounts && accounts.length > 0) {
                handleWalletConnect(accounts[0]);
              }
            } catch (error) {
              console.error("Error connecting to wallet:", error);
              setSimulationResult('Error connecting to wallet: ' + error.message);
            }
          } else {
            setSimulationResult('No Web3 provider detected. Please install MetaMask!');
          }
        }
      },
      buttonText: walletConnected ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Disconnect Wallet
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Connect to Blockchain
        </>
      ),
      buttonClass: walletConnected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
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
      id: 11,
      title: "Token Launchpad",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "emerald",
      description: "Create and deploy your own ERC20 token on the Ethereum network with just a few clicks.",
      buttonText: "Launch Token"
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

  // Add emerald to color classes
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
      emerald: 'border-emerald-500/30 hover:shadow-emerald-500/10 bg-emerald-500/10',
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
      emerald: 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/20',
      cyan: 'bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/20',
      rose: 'bg-rose-600 hover:bg-rose-700 hover:shadow-rose-500/20'
    };
    return colors[color] || colors.blue;
  };

  const renderFeatureContent = (feature) => {
    if (feature.id === 1) {
      // Web3 Wallet Card
      return (
        <div className="space-y-4">
          <DWallet 
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            isConnected={walletConnected}
          />
          {walletConnected && simulationResult && (
            <div className="mt-3 p-3 bg-neutral-700/50 rounded-lg border border-neutral-700">
              <p className="text-xs text-neutral-300 break-all font-mono">{simulationResult}</p>
            </div>
          )}
        </div>
      );
    } else if (feature.id === 2) {
      // Key Generator Card
      return (
        <div className="space-y-4">
          <button
            onClick={generateKeyPair}
            className={`w-full flex items-center justify-center gap-2 ${getButtonClass('purple')} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
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
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
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
      );
    } else if (feature.id === 3) {
      // Encryption Tools Card
      return (
        <div className="space-y-4">
          <select
            value={encryptionType}
            onChange={(e) => setEncryptionType(e.target.value)}
            className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="sha256" className="bg-neutral-800">SHA-256 (Hashing)</option>
            <option value="aes" className="bg-neutral-800">AES (Symmetric Encryption)</option>
            <option value="base64" className="bg-neutral-800">Base64 (Encoding)</option>
          </select>
          <div className="mb-3">
            <textarea
              value={encryptionInput}
              onChange={(e) => setEncryptionInput(e.target.value)}
              className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={`Enter text to ${encryptionType === 'sha256' ? 'hash' : encryptionType === 'aes' ? 'encrypt' : 'encode'}...`}
            />
          </div>
          <button
            onClick={handleEncryption}
            className={`w-full flex items-center justify-center gap-2 ${getButtonClass('green')} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {encryptionType === 'sha256' ? 'Hash Text' : encryptionType === 'aes' ? 'Encrypt' : 'Encode'}
          </button>
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
      );
    } else if (feature.id === 11) {
      // Token Launchpad Card
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="MyToken"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Token Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="MTK"
                maxLength="10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Total Supply</label>
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="1000000"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Decimals</label>
              <input
                type="number"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(e.target.value)}
                className="w-full p-2.5 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="18"
                min="0"
                max="18"
              />
            </div>
          </div>
          
          <button
            onClick={deployToken}
            disabled={isDeploying}
            className={`w-full flex items-center justify-center gap-2 ${getButtonClass('emerald')} text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed`}
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
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Deploy Token
              </>
            )}
          </button>
          
          {deployStatus && (
            <div className={`p-3 rounded-lg ${
              deployStatus.includes('✅') 
                ? 'bg-emerald-900/30 border border-emerald-800/50' 
                : deployStatus.includes('❌')
                ? 'bg-rose-900/30 border border-rose-800/50'
                : 'bg-neutral-800/50 border border-neutral-700'
            }`}>
              <p className="text-sm font-mono whitespace-pre-wrap">
                {deployStatus}
              </p>
              {tokenAddress && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Contract Address:</span>
                  <button 
                    onClick={() => copyToClipboard(tokenAddress)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    title="Copy contract address"
                  >
                    {tokenAddress.substring(0, 10)}...{tokenAddress.substring(38)}
                    <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    } else if (feature.id === 10) {
      // ECDSA Signature Card
      return (
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
              className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-rose-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!signature}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify Signature
            </button>
          </div>
          
          {signature && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between bg-neutral-800/50 p-3 rounded-lg border border-neutral-700">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-400 mb-1">Signature</p>
                  <p className="text-sm text-white font-mono truncate">{signature}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(signature)}
                  className="ml-3 p-2 rounded-full hover:bg-neutral-700/50 transition-colors duration-200"
                  title="Copy signature"
                >
                  <svg className="w-4 h-4 text-neutral-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              
              {verificationResult && (
                <div className={`p-3 rounded-lg ${
                  verificationResult.includes('✅') 
                    ? 'bg-green-900/30 border border-green-800/50' 
                    : 'bg-rose-900/30 border border-rose-800/50'
                }`}>
                  <p className="text-sm font-medium flex items-center gap-2">
                    {verificationResult.includes('✅') ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={verificationResult.includes('✅') ? 'text-green-400' : 'text-rose-400'}>
                      {verificationResult.replace('✅', '').replace('❌', '').trim()}
                    </span>
                  </p>
                </div>
              )}
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
      );
    } else {
      // Default card layout for other features
      return (
        <div className="space-y-4">
          <button
            onClick={feature.action}
            className={`w-full flex items-center justify-center gap-2 ${
              feature.buttonClass || getButtonClass(feature.color)
            } text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/20`}
          >
            {feature.buttonText}
          </button>
          
          {feature.id === 1 && walletConnected && simulationResult && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                {simulationResult}
              </pre>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="features-container">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Powerful Web3 Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 border-l-4 border-${feature.color}-500`}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-gray-700 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              {renderFeatureContent(feature)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
