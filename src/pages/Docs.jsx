import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Code, Terminal, Server, Database, Lock, Settings, FileText, ChevronDown, ChevronRight, ExternalLink, Code2, Zap, Cpu, Network, Wallet, Shield, MessageSquare } from 'lucide-react';

const Docs = () => {
  // Get the docId from URL params or default to 'getting-started'
  const params = new URLSearchParams(window.location.search);
  const docIdParam = params.get('docId') || 'getting-started';
  
  // Initialize state with the docId from URL or default to 'getting-started'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
    architecture: false,
    smartContracts: false,
    api: false,
    security: false,
  });
  const [activeDoc, setActiveDoc] = useState(docIdParam);
  
  // Mock documentation data
  const docs = {
    gettingStarted: [
      { id: 'introduction', title: 'Introduction', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'quickstart', title: 'Quick Start', icon: <Zap className="h-4 w-4" /> },
      { id: 'installation', title: 'Installation', icon: <Terminal className="h-4 w-4" /> },
      { id: 'configuration', title: 'Configuration', icon: <Settings className="h-4 w-4" /> },
    ],
    architecture: [
      { id: 'overview', title: 'System Overview', icon: <Server className="h-4 w-4" /> },
      { id: 'components', title: 'Core Components', icon: <Cpu className="h-4 w-4" /> },
      { id: 'networking', title: 'Networking', icon: <Network className="h-4 w-4" /> },
      { id: 'data-storage', title: 'Data Storage', icon: <Database className="h-4 w-4" /> },
    ],
    smartContracts: [
      { id: 'overview', title: 'Smart Contracts', icon: <FileText className="h-4 w-4" /> },
      { id: 'writing', title: 'Writing Contracts', icon: <Code2 className="h-4 w-4" /> },
      { id: 'deploying', title: 'Deploying', icon: <Upload className="h-4 w-4" /> },
      { id: 'testing', title: 'Testing', icon: <FlaskConical className="h-4 w-4" /> },
    ],
    api: [
      { id: 'rest-api', title: 'REST API', icon: <Server className="h-4 w-4" /> },
      { id: 'graphql', title: 'GraphQL', icon: <Network className="h-4 w-4" /> },
      { id: 'websockets', title: 'WebSockets', icon: <Globe className="h-4 w-4" /> },
      { id: 'authentication', title: 'Authentication', icon: <Lock className="h-4 w-4" /> },
    ],
    security: [
      { id: 'overview', title: 'Security Overview', icon: <Shield className="h-4 w-4" /> },
      { id: 'best-practices', title: 'Best Practices', icon: <CheckCircle className="h-4 w-4" /> },
      { id: 'audits', title: 'Audit Reports', icon: <FileSearch className="h-4 w-4" /> },
      { id: 'bug-bounty', title: 'Bug Bounty', icon: <Bug className="h-4 w-4" /> },
    ],
  };

  // Mock documentation content
  const docContent = {
    introduction: {
      title: 'Introduction',
      content: (
        <div className="prose prose-invert max-w-none">
          <h1>Welcome to Our Documentation</h1>
          <p>
            This documentation provides comprehensive information about our platform, including guides, API references, and resources.
            Whether you're a developer, validator, or end-user, you'll find the information you need to get started.
          </p>
          
          <h2>Getting Started</h2>
          <p>
            New to our platform? Follow our <a href="#" className="text-blue-400 hover:underline">Quick Start</a> guide to get up and running quickly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mr-3">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Quick Start</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Get up and running in minutes with our step-by-step guide.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Get Started →
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mr-3">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Developer Guide</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Learn how to build and deploy applications on our platform.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View Guide →
              </a>
            </div>
          </div>
          
          <h2>Key Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>High-performance blockchain infrastructure</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Smart contract support with Solidity and WebAssembly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Scalable and secure consensus mechanism</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Interoperability with other blockchains</span>
            </li>
          </ul>
          
          <h2>Community & Support</h2>
          <p>
            Join our community to get help, share ideas, and stay updated on the latest developments.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a href="#" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Community Forum
            </a>
            <a href="#" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm flex items-center">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
            <a href="#" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm flex items-center">
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </a>
            <a href="#" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-sm flex items-center">
              <Discord className="h-4 w-4 mr-2" />
              Discord
            </a>
          </div>
        </div>
      ),
    },
    quickstart: {
      title: 'Quick Start',
      content: <div>Quick start guide content...</div>,
    },
    // Add more documentation content as needed
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDocSelect = (docId) => {
    setActiveDoc(docId);
    // Update URL without page reload
    window.history.pushState({}, '', `/docs?docId=${docId}`);
  };

  const renderDocNavItem = (section, items) => (
    <div key={section} className="mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
      >
        <div className="flex items-center">
          <span className="font-medium capitalize">
            {section.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </div>
        {expandedSections[section] ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>
      
      {expandedSections[section] && (
        <div className="mt-1 ml-2 pl-3 border-l-2 border-gray-700 space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDocClick(item.id)}
              className={`w-full flex items-center py-2 px-3 rounded-lg transition-colors text-left text-sm ${
                activeDoc === item.id
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-200'
              }`}
            >
              <span className="mr-2 opacity-70">{item.icon}</span>
              {item.title}
              {item.external && <ExternalLink className="h-3 w-3 ml-auto opacity-50" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 hidden md:block overflow-y-auto h-screen sticky top-0">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-2 flex items-center">
              <Code className="h-6 w-6 mr-2 text-blue-400" />
              Documentation
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <nav className="space-y-1">
            {Object.entries(docs).map(([section, items]) =>
              renderDocNavItem(section, items)
            )}
            
            <div className="pt-4 mt-6 border-t border-gray-800">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Resources
              </h3>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white group"
              >
                <FileText className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-300" />
                API Reference
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white group"
              >
                <Code2 className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-300" />
                Examples
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white group"
              >
                <BookOpen className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-300" />
                Tutorials
              </a>
            </div>
          </nav>
        </div>
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          {docContent[activeDoc] ? (
            <div className="prose prose-invert max-w-none">
              <h1>{docContent[activeDoc].title}</h1>
              {docContent[activeDoc].content}
              
              {/* Feedback section */}
              <div className="mt-16 pt-8 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-medium">Was this page helpful?</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      We're always looking to improve our documentation.
                    </p>
                  </div>
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                      Yes, it helped! 👍
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
                      Could be better 👎
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Still need help?</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Check out our community resources or ask a question in our Discord.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Community Forum
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Issues
                    </a>
                    <a 
                      href="#" 
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center"
                    >
                      <Discord className="h-4 w-4 mr-2" />
                      Join Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto h-16 w-16 text-gray-500 mb-4">
                <FileText className="h-full w-full opacity-30" />
              </div>
              <h2 className="text-xl font-medium text-gray-300 mb-2">Documentation Not Found</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                The requested documentation page could not be found. Please check the URL or search for what you're looking for.
              </p>
              <button 
                onClick={() => handleDocClick('introduction')}
                className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Go to Home
              </button>
            </div>
          )}
          
          {/* Table of Contents (right sidebar on large screens) */}
          <div className="hidden xl:block fixed right-8 top-24 w-64 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-300 mb-3">On this page</h3>
            <div className="space-y-2 text-sm">
              <a href="#overview" className="block text-blue-400 hover:text-blue-300">Overview</a>
              <a href="#getting-started" className="block text-gray-400 hover:text-gray-200">Getting Started</a>
              <a href="#key-features" className="block text-gray-400 hover:text-gray-200">Key Features</a>
              <a href="#community-support" className="block text-gray-400 hover:text-gray-200">Community & Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons that were referenced but not imported
const Upload = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FlaskConical = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2v7.31" />
    <path d="M14 9.3V1.99" />
    <path d="M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    <path d="M5.52 16h12.96" />
  </svg>
);

const Globe = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CheckCircle = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FileSearch = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="11" cy="11" r="1" />
    <path d="m16 16-1.5-1.5" />
  </svg>
);

const Bug = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="14" x="8" y="6" rx="4" />
    <path d="m19 7-3 2" />
    <path d="m5 7 3 2" />
    <path d="m19 19-3-2" />
    <path d="m5 19 3-2" />
    <path d="M20 13h-4" />
    <path d="M4 13h4" />
    <path d="m10 4 1 2" />
    <path d="m14 4-1 2" />
  </svg>
);

const Menu = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

// Social media icons
const Twitter = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const Github = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.2-1.8-1.2-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.6 2.4 1.1 3 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1.1-.3 3.5 1.2a12.2 12.2 0 016.2 0c2.4-1.5 3.5-1.2 3.5-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z" />
  </svg>
);

const Discord = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.3 4.1c-.7-.3-1.5-.5-2.4-.6-.1 0-.2.1-.3.1-.2.1-.3.2-.4.3-.5.6-.9 1.3-1.2 2-.1.1-.1.3-.2.4 0 0 0 .1.1.1-1.3-.2-2.7-.2-4 0 0 0 .1-.1.1-.1-.1-.1-.2-.3-.3-.4-.5-.6-1-1.3-1.4-2-.1-.1-.2-.2-.3-.2-1.5-.2-3-.2-4.5 0-.1 0-.2.1-.3.2-.5.6-1 1.3-1.4 2-.1.1-.1.3-.2.4 0 0 0 .1.1.1c-1.3-.2-2.7-.2-4 0 0 0 .1-.1.1-.1-.1-.1-.2-.3-.3-.4-.3-.7-.7-1.4-1.2-2-.1-.1-.2-.2-.3-.2-.9.1-1.7.3-2.5.6 0 0-.1 0-.1.1C.7 7.2 0 10.3 0 13.5c0 .1 0 .3.1.4.5 1.3 1.1 2.5 1.9 3.6 0 .1.1.1.1.2 0 .1 0 .1.1.1.6.4 1.2.8 1.8 1.1.1 0 .1.1.2.1.1 0 .1 0 .2.1.4.2.8.3 1.2.5.1 0 .1 0 .2.1.1 0 .1.1.2.1.4.1.8.2 1.2.3.1 0 .1 0 .2.1.1 0 .1 0 .2.1.4.1.8.1 1.2.2.1 0 .1 0 .2.1.1 0 .1 0 .2.1.4 0 .8.1 1.2.1.1 0 .1 0 .2.1.1 0 .1 0 .2-.1.4 0 .8-.1 1.2-.1.1 0 .1 0 .2-.1.1 0 .1 0 .2-.1.4 0 .8-.1 1.2-.2.1 0 .1 0 .2-.1.1 0 .1 0 .2-.1.4-.1.8-.2 1.2-.3.1 0 .1 0 .2-.1.1 0 .1-.1.2-.1.4-.2.8-.3 1.2-.5.1 0 .1 0 .2-.1.1 0 .1 0 .2-.1.6-.3 1.2-.7 1.8-1.1 0 0 .1 0 .1-.1 0 0 0-.1.1-.1.8-1.1 1.4-2.3 1.9-3.6.1-.1.1-.3.1-.4.1-3.2-.6-6.3-1.9-9.3.1 0 0-.1-.1-.1zM8 15.5c-.8 0-1.5-.8-1.5-1.7 0-1 .7-1.8 1.5-1.8s1.5.8 1.5 1.8c0 .9-.7 1.7-1.5 1.7zm8 0c-.8 0-1.5-.8-1.5-1.7 0-1 .7-1.8 1.5-1.8s1.5.8 1.5 1.8c0 .9-.7 1.7-1.5 1.7z" />
  </svg>
);

export default Docs;
