import { BotMessageSquare } from "lucide-react";
import { Wallet } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { HardDriveDownload } from "lucide-react";
import { GlobeLock } from "lucide-react";
import { FileCode } from "lucide-react";
import { Lock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { 
    label: "dApps", 
    href: "/dapps",
    subItems: [
      { label: "Ethereum Playground", href: "/dapps/ethereum-simulator" },
      { label: "Bitcoin Sandbox", href: "/dapps/bitcoin-sandbox" },
      { label: "DeFi Simulator", href: "/dapps/defi-simulator" },
      { label: "Smart Contract IDE", href: "/dapps/ide" },
    ]
  },
  { 
    label: "NFTs", 
    href: "/nfts",
    subItems: [
      { label: "NFT Marketplace", href: "/nfts/marketplace" },
      { label: "Ethereum NFT Creator", href: "/nfts/ethereum-creator" },
      { label: "Bitcoin Ordinals", href: "/nfts/bitcoin-ordinals" },
      { label: "NFT Analytics", href: "/nfts/analytics" },
    ]
  },
  { label: "Playground", href: "/playground" },
  { label: "DAO", href: "/dao" },
  { label: "Docs", href: "/docs" },
];

export const testimonials = [
  {
    user: "Satoshi N",
    company: "Bitcoin Foundation",
    image: user1,
    text: "The team's expertise in smart contract development helped us build a secure and scalable DeFi protocol that's now processing millions in TVL.",
  },
  {
    user: "Vitalik B",
    company: "Ethereum Foundation",
    image: user2,
    text: "Their deep understanding of blockchain technology and zero-knowledge proofs helped us optimize our Layer 2 solution.",
  },
  {
    user: "Charles H",
    company: "IOG",
    image: user3,
    text: "The team's work on our NFT marketplace was exceptional. They delivered a seamless user experience with fast transactions and low fees.",
  },
  {
    user: "Gavin W",
    company: "Polkadot",
    image: user4,
    text: "Their cross-chain interoperability solution bridged multiple ecosystems, enabling seamless asset transfers between different blockchains.",
  },
  {
    user: "Brian A",
    company: "Coinbase",
    image: user5,
    text: "The security audit conducted by the team helped us identify and fix critical vulnerabilities in our smart contracts.",
  },
  {
    user: "Alexa",
    company: "DeFI",
    image: user6,
    text: "Best in the Business",
  },
];

export const features = [
  {
    icon: <FileCode />,
    text: "Blockchain Simulators",
    description:
      "Experiment with Bitcoin and Ethereum testnets, simulate transactions, and test smart contracts in a risk-free environment.",
  },
  {
    icon: <Wallet />,
    text: "Multi-Chain Wallet",
    description:
      "Connect and manage both Bitcoin and Ethereum wallets, with testnet support for safe experimentation.",
  },
  {
    icon: <ShieldHalf />,
    text: "Security Sandbox",
    description:
      "Test smart contract vulnerabilities and security measures in our isolated sandbox environment.",
  },
  {
    icon: <HardDriveDownload />,
    text: "NFT Studio",
    description:
      "Create, mint, and simulate NFT collections on both Ethereum and Bitcoin networks with our intuitive studio.",
  },
  {
    icon: <Fingerprint />,
    text: "DeFi Playground",
    description:
      "Simulate DeFi protocols, test liquidity pools, and experiment with yield farming strategies.",
  },
  {
    icon: <Lock />,
    text: "Smart Contract IDE",
    description:
      "Write, test, and deploy smart contracts for both Ethereum and Bitcoin with our integrated development environment.",
  },
];

export const simulationFeatures = [
  {
    title: "Bitcoin Transaction Simulator",
    description:
      "Create and sign Bitcoin transactions, test different fee scenarios, and understand UTXO management.",
    icon: "₿",
    link: "/simulator/bitcoin"
  },
  {
    title: "Ethereum Smart Contract Sandbox",
    description:
      "Deploy and interact with smart contracts on a simulated Ethereum network with test ETH.",
    icon: "Ξ",
    link: "/simulator/ethereum"
  },
  {
    title: "NFT Minting Simulator",
    description:
      "Experience the complete NFT creation and minting process without spending real crypto.",
    icon: "🖼️",
    link: "/simulator/nft"
  },
  {
    title: "DeFi Protocol Testing",
    description:
      "Simulate DeFi interactions like swapping, staking, and yield farming with virtual assets.",
    icon: "🔄",
    link: "/simulator/defi"
  },
];

export const pricingOptions = [
  {
    title: "Starter",
    price: "0.1 ETH",
    features: [
      "Basic Smart Contract Deployment",
      "Ethereum & Testnet Support",
      "Community Support",
      "Basic Analytics",
    ],
  },
  {
    title: "Developer",
    price: "1 ETH",
    features: [
      "Multi-Chain Deployment",
      "Priority Support",
      "Advanced Analytics",
      "API Access",
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Custom Smart Contract Development",
      "24/7 Dedicated Support",
      "Security Audits",
      "Custom Tokenomics Design",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Web3 Documentation" },
  { href: "#", text: "Smart Contract Guides" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "Whitepaper" },
];

export const platformLinks = [
  { href: "#", text: "Blockchain Explorer" },
  { href: "#", text: "dApp Store" },
  { href: "#", text: "Node Services" },
  { href: "#", text: "Developer Tools" },
  { href: "#", text: "API Status" },
];

export const communityLinks = [
  { href: "#", text: "Governance" },
  { href: "#", text: "Grants Program" },
  { href: "#", text: "Developer Bounties" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Careers" },
];
