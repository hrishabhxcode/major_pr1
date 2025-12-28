import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  CheckCircle, AlertTriangle, Code, MessageSquare, Bot, User, Send, Loader2, 
  ChevronDown, ChevronUp, Play, Save, FileText, FilePlus, Moon, Sun, Share2,
  Maximize2, Minimize2, Terminal, Settings, Zap, Info, X, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Formatting functionality removed
import useLocalStorage from '../hooks/useLocalStorage';

const Playground = () => {
  const BACKEND_URL = "http://localhost:3001"; //https://major-pr1.onrender.com
  const [files, setFiles] = useLocalStorage('codeFiles', [
    { id: '1', name: 'script.js', code: '// Welcome to Code Playground!\n// Try writing some code and click Run or ask me anything!', language: 'javascript' }
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activePanel, setActivePanel] = useState('chat');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const codeEditorRef = useRef(null);
  const outputRef = useRef(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];
  const activeCode = activeFile?.code || '';
  const [code, setCode] = useState(activeCode);

  // Check for mobile view and theme
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : true);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    return () => {
      // Cleanup function to remove any side effects
      html.classList.remove('dark');
    };
  }, [isDarkMode]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm your AI coding assistant. Paste some code and ask me anything!",
      isCode: false,
      timestamp: new Date()
    }
  ]);

  // Manual scroll control - auto-scroll completely disabled
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Check if user has scrolled up
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollButton(distanceFromBottom > 100);
    }
  }, []);

  // Set up scroll listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Scroll to bottom function (manual)
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setShowScrollButton(false);
    }
  }, []);

  // ========== CODE EXECUTION =============
  const executeCode = useCallback(async () => {
    setIsExecuting(true);
    setOutput('');
    
    try {
      // Create a safe sandbox for code execution
      const logs = [];
      const originalConsole = { ...console };
      
      // Override console methods to capture output
      console.log = (...args) => {
        logs.push(args.map(arg => String(arg)).join(' '));
        originalConsole.log(...args);
      };
      
      console.error = (...args) => {
        logs.push(`Error: ${args.map(arg => String(arg)).join(' ')}`);
        originalConsole.error(...args);
      };
      
      // Execute the code in a try-catch to handle any errors
      try {
        // Use Function constructor for better sandboxing
        const fn = new Function('console', `
          ${code}\n
          // Add any additional code execution logic here
          if (typeof main === 'function') {
            return main();
          }
        `);
        
        const result = fn(console);
        
        // If the code returns a promise, wait for it to resolve
        if (result && typeof result.then === 'function') {
          await result;
        }
        
        // Display the output
        if (logs.length > 0) {
          setOutput(logs.join('\n'));
        } else {
          setOutput('Code executed successfully with no output.');
        }
      } catch (error) {
        setOutput(`Error: ${error.message}\n${error.stack}`);
      }
      
    } catch (error) {
      setOutput(`Error executing code: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  }, [code]);

  // ========== CHAT FUNCTIONALITY =============
  const sendChat = useCallback(async () => {
    const message = inputMessage.trim();
    if (!message) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      isCode: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Clear the contentEditable div
    if (inputRef.current) {
      // Use a small timeout to ensure the state updates properly
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.textContent = '';
        }
      }, 0);
    }
    
    try {
      // Call the backend API
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          code: code,
          fileType: activeFile?.name.split('.').pop() || 'javascript'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: data.response || 'I received your message but have no response.',
        isCode: data.isCode || false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `Sorry, I encountered an error: ${error.message}`,
        isCode: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [inputMessage, code, activeFile]);

  // ========== HELPER FUNCTIONS =============
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'bg-red-900/20 border-red-500/30';
      case 'warning': return 'bg-yellow-900/20 border-yellow-500/30';
      case 'info':
      default:
        return 'bg-blue-900/20 border-blue-500/30';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />;
    }
  };

  const extractCode = (text) => {
    // Simple code block extraction (can be enhanced with regex for markdown code blocks)
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/;
    const match = text.match(codeBlockRegex);
    return match ? match[1].trim() : text;
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold flex items-center">
            <Code className="w-5 h-5 mr-2 text-blue-400" />
            Code Playground
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              title={isFullScreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-800/80 border-r border-gray-700/50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Files</h2>
            <button
              onClick={() => {
                const newFile = {
                  id: Date.now().toString(),
                  name: `script-${files.length + 1}.js`,
                  code: '// New file\n// Start coding here!',
                  language: 'javascript'
                };
                setFiles([...files, newFile]);
                setActiveFileId(newFile.id);
                setCode(newFile.code);
              }}
              className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="New file"
            >
              <FilePlus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => {
                  setActiveFileId(file.id);
                  setCode(file.code);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center ${
                  activeFileId === file.id
                    ? 'bg-blue-600/30 text-blue-100'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <button
              onClick={() => executeCode()}
              disabled={isExecuting}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Run Code</span>
                </>
              )}
            </button>
            
            <div className="mt-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <span>Settings</span>
                {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-400">Theme</span>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            {isDarkMode ? 'Light' : 'Dark'} Mode
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-400">Full Screen</span>
                          <button
                            onClick={() => setIsFullScreen(!isFullScreen)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            {isFullScreen ? 'Exit' : 'Enter'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center bg-gray-800/50 border-b border-gray-700/50 px-4 py-2">
              <div className="flex-1 flex overflow-x-auto">
                <div className="flex space-x-1">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => {
                        setActiveFileId(file.id);
                        setCode(file.code);
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-t-md ${
                        activeFileId === file.id
                          ? 'bg-gray-700/50 text-white'
                          : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-200'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors"
                  title={copied ? 'Copied!' : 'Copy code'}
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => executeCode()}
                  disabled={isExecuting}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Running</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <textarea
                ref={codeEditorRef}
                value={code}
                onChange={(e) => {
                  const newCode = e.target.value;
                  setCode(newCode);
                  
                  // Update the active file's code
                  setFiles(
                    files.map((file) =>
                      file.id === activeFileId ? { ...file, code: newCode } : file
                    )
                  );
                }}
                className="w-full h-full bg-transparent p-4 font-mono text-sm focus:outline-none resize-none"
                spellCheck="false"
                placeholder="// Start coding here..."
                style={{
                  lineHeight: '1.5',
                  tabSize: 2,
                }}
              />
            </div>
          </div>

          {/* Chat/Output Panel */}
          <div className="w-full md:w-96 bg-gray-800/50 border-l border-gray-700/50 flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-gray-700/50">
              <button
                onClick={() => setActivePanel('chat')}
                className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
                  activePanel === 'chat'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline-block mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActivePanel('output')}
                className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
                  activePanel === 'output'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <Terminal className="w-4 h-4 inline-block mr-2" />
                Output
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-auto">
              {activePanel === 'chat' ? (
                <div className="h-full flex flex-col">
                  {/* Chat messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 relative"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {showScrollButton && (
                      <button
                        onClick={scrollToBottom}
                        className="sticky bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-10"
                        title="Scroll to bottom"
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>New Messages</span>
                      </button>
                    )}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex items-start max-w-[85%] ${
                            msg.sender === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.sender === 'user'
                                ? 'bg-blue-600 text-white ml-3'
                                : 'bg-gray-700 text-blue-400 mr-3'
                            }`}
                          >
                            {msg.sender === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-2xl ${
                              msg.sender === 'user'
                                ? 'bg-blue-600/30 rounded-tr-none'
                                : 'bg-gray-700/50 rounded-tl-none'
                            }`}
                          >
                            {msg.isCode ? (
                              <div className="space-y-2">
                                <pre className="bg-black/30 p-3 rounded-lg text-sm sm:text-base text-green-300 overflow-x-auto">
                                  <code>{msg.text}</code>
                                </pre>
                                <button
                                  onClick={() => setCode(extractCode(msg.text))}
                                  className="flex items-center text-xs text-blue-300 hover:text-blue-200 transition-colors"
                                >
                                  <Code className="w-3 h-3 mr-1" />
                                  <span>Apply to editor</span>
                                </button>
                              </div>
                            ) : (
                              <div className="prose prose-invert max-w-none">
                                {msg.text.split('\n').map((line, i) => (
                                  <p key={i} className="text-sm sm:text-base">
                                    {line || <br />}
                                  </p>
                                ))}
                              </div>
                            )}
                            <div className="text-right mt-1">
                              <span className="text-xs text-gray-400">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendChat();
                      }}
                      className="flex items-end space-x-2"
                    >
                      <div className="flex-1 relative">
                        <div 
                          contentEditable
                          ref={inputRef}
                          className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-3 pr-12 max-h-32 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
                          placeholder="Ask me anything about your code..."
                          onInput={(e) => {
                            setInputMessage(e.currentTarget.textContent || '');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendChat();
                            }
                          }}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            if (inputRef.current) {
                              inputRef.current.textContent = '';
                              setInputMessage('');
                            }
                          }}
                          className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                          title="Clear"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          type="submit"
                          disabled={!inputMessage.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Send message"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                    
                    <div className="mt-3 space-y-2">
                      {suggestions.length === 0 ? (
                        <p className="text-gray-400 text-sm">No suggestions yet. Analyze your code to get started.</p>
                      ) : (
                        suggestions.map((s, i) => (
                          <div key={i} className={`p-3 rounded border ${getSeverityColor(s.severity)}`}>
                            <div className="flex items-start">
                              {getSeverityIcon(s.severity)}
                              <div>
                                <p className="font-semibold capitalize">{s.type}</p>
                                <p className="text-sm text-gray-300">{s.message}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full p-4 overflow-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Output</h3>
                    <button
                      onClick={() => setOutput('')}
                      className="text-xs text-gray-400 hover:text-gray-200"
                      disabled={!output}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div 
                    ref={outputRef}
                    className="bg-black/30 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto"
                    style={{ minHeight: '100px' }}
                  >
                    {output || '// Output will appear here when you run your code'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Playground;
