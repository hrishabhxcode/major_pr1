import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DWallet = ({ onConnect, onDisconnect, isConnected }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState({});
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState('');

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask to use this feature');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get network and balance
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);
      
      // Update state
      setProvider(provider);
      setAccount(accounts[0]);
      setNetwork(network);
      setBalance(ethers.formatEther(balance));
      
      // Call the onConnect callback if provided
      if (onConnect) onConnect(accounts[0]);
      
      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setError('Failed to connect to MetaMask: ' + error.message);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setProvider(null);
    setAccount('');
    setNetwork({});
    setBalance('0');
    
    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
    
    // Call the onDisconnect callback if provided
    if (onDisconnect) onDisconnect();
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      disconnectWallet();
    } else if (account !== accounts[0]) {
      setAccount(accounts[0]);
      // Update balance when account changes
      updateBalance(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainId) => {
    // Reload the page when the chain changes
    window.location.reload();
  };

  // Update balance
  const updateBalance = async (address) => {
    if (!provider) return;
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Format address for display
  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  };

  // Check connection status on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
        await connectWallet();
      }
    };
    
    checkConnection();
    
    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <div className="dwallet-container">
      {!account ? (
        <button 
          onClick={connectWallet}
          className="connect-wallet-button"
        >
          Connect to Blockchain
        </button>
      ) : (
        <div className="wallet-info">
          <div className="wallet-address">
            <span>Connected: {formatAddress(account)}</span>
          </div>
          <div className="wallet-balance">
            <span>Balance: {parseFloat(balance).toFixed(4)} ETH</span>
          </div>
          <div className="wallet-network">
            <span>Network: {network.name} (ID: {network.chainId})</span>
          </div>
          <button 
            onClick={disconnectWallet}
            className="disconnect-button"
          >
            Disconnect
          </button>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DWallet;