import { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertTriangle, User, Bot } from 'lucide-react';

const Playground = () => {
  const [code, setCode] = useState('// Paste your code here');
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm your AI coding assistant. Paste some code and ask me anything!",
      isCode: false,
      timestamp: new Date()
    }
  ]);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extract code inside ``` ```
  const extractCode = (text) => {
    const match = text.match(/```[\s\S]*?```/);
    if (!match) return text;

    return match[0]
      .replace(/```[\w]*/g, "")
      .replace(/```/g, "")
      .trim();
  };

  // ========== ANALYZE CODE =============
  const analyzeCode = async () => {
    setIsAnalyzing(true);

    try {
      addMessage("Analyzing code with Groq AI...", "assistant");

      const res = await fetch("https://your-backend.onrender.com/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.error) {
        addMessage("❌ Error analyzing code.", "assistant");
      } else {
        setSuggestions(data.suggestions || []);

        if (data.improved_code) {
          addMessage("Here is the improved version:", "assistant");
          addMessage("```js\n" + data.improved_code + "\n```", "assistant", true);
        }
      }
    } catch (err) {
      addMessage("❌ Server error analyzing code.", "assistant");
    }

    setIsAnalyzing(false);
  };

  // ========== CHAT WITH AI =============
  const sendChat = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      isCode: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");

    const typingMsg = {
      id: messages.length + 2,
      sender: "assistant",
      text: "⏳ Assistant is typing...",
      isCode: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, typingMsg]);

    const chatHistory = [...messages, userMsg].map(m => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text
    }));

    try {
      const res = await fetch("https://your-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();

      const isCode = data.reply.includes("```");

      setMessages(prev =>
        prev.map(msg =>
          msg.id === typingMsg.id
            ? { ...msg, text: data.reply, isCode }
            : msg
        )
      );

    } catch (err) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === typingMsg.id ? { ...msg, text: "❌ Chat error!" } : msg
        )
      );
    }
  };

  const addMessage = (text, sender = "assistant", isCode = false) => {
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender, text, isCode, timestamp: new Date() }
    ]);
  };

  const time = d => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getSeverityColor = s =>
    s === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" :
    s === "medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
    "bg-blue-500/10 text-blue-400 border-blue-500/20";

  const getSeverityIcon = s =>
    s === "high" ? <AlertTriangle className="w-5 h-5 text-red-500 mr-2" /> :
    s === "medium" ? <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" /> :
    <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CODE EDITOR */}
        <div>
          <h2 className="text-xl font-semibold">Code Editor</h2>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-gray-800 rounded-lg p-3 font-mono border border-gray-700"
          />

          <button
            onClick={analyzeCode}
            disabled={isAnalyzing}
            className="w-full bg-blue-600 mt-3 p-2 rounded-lg"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>

        {/* CHAT + ANALYSIS */}
        <div className="lg:col-span-2 space-y-6">

          {/* CHAT */}
          <div className="bg-gray-800 p-4 rounded-lg h-[550px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3">

              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-600/30" : "bg-gray-700/50"}`}>

                    {/* Render code */}
                    {msg.isCode ? (
                      <>
                        <pre className="bg-black/40 p-3 rounded text-green-300 text-sm overflow-x-auto">
                          {msg.text}
                        </pre>

                        {/* APPLY AI CODE */}
                        <button
                          onClick={() => setCode(extractCode(msg.text))}
                          className="mt-2 bg-emerald-600 px-3 py-1 rounded text-white text-xs"
                        >
                          Apply Code →
                        </button>
                      </>
                    ) : (
                      <p>{msg.text}</p>
                    )}

                    <div className="text-xs text-gray-400">{time(msg.timestamp)}</div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef}></div>
            </div>

            {/* CHAT INPUT */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendChat(); }}
              className="flex gap-2 mt-3"
            >
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-gray-700 p-2 rounded"
              />
              <button className="bg-blue-600 px-4 rounded">Send</button>
            </form>
          </div>

          {/* ANALYSIS RESULTS */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Suggestions</h3>

            <div className="mt-3 space-y-2">
              {suggestions.length === 0 ? (
                <p className="text-gray-400">No suggestions yet.</p>
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
      </div>
    </div>
  );
};

export default Playground;
