import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Zap, Activity, ChevronRight, Sparkles, BotMessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const AuraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("aura_chat_opened") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
      localStorage.setItem("aura_chat_opened", "true");
    }
  }, [isOpen, hasBeenOpened]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "ZetaMize Intelligence Online. Systems primed for evolution. How can I architect your automation today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const categories = [
    {
      id: "SERVICE_RETAIL",
      keywords: ["restu", "restaurant", "food", "dining", "hospitality", "barber", "shop", "salon", "retail", "store"],
      response: "Service and retail automation is where ZetaMize excels. We architect digital staff agents, AI-powered inventory tracking, and seamless POS/booking integrations to maximize your business flow.",
      more: "Beyond POS, we implement 'Protocol One' for automated scheduling and 'Protocol Two' for predictive inventory management, reducing waste by up to 40%."
    },
    {
      id: "LOGISTICS",
      keywords: ["logistic", "truck", "delivery", "shipping", "warehouse", "supply"],
      response: "Logistics automation requires 'Aura Protocol Zero' security and real-time data sync. We build autonomous dispatch systems and AI-driven route optimization engines to kill operational latency.",
      more: "Our neural pipelines can integrate directly with GPS and warehouse APIs, providing a 100% autonomous tracking and notification loop."
    },
    {
      id: "ECOMMERCE",
      keywords: ["ecom", "online store", "shopify", "product", "inventory", "sales", "amazon"],
      response: "E-commerce is a primary ZetaMize field. From autonomous customer support agents to real-time inventory-to-sales synchronization, we build the engine of the modern digital storefront.",
      more: "We specialize in 'Agentic Upselling'—AI agents that understand customer behavior and proactively manage lead qualification in your CRM."
    },
    {
      id: "REAL_ESTATE",
      keywords: ["real estate", "property", "listing", "agent", "home", "landlord"],
      response: "Real Estate automation is about lead-velocity. We build scrapers to find undervalued listings and AI-agents to qualify buyers/renters before your team even picks up the phone.",
      more: "Protocol Two (Multi-Agent Synthesis) allows us to deploy arrays of agents that handle thousands of inquiries simultaneously, 24/7."
    },
    {
      id: "SALES_CRM",
      keywords: ["crm", "sales", "lead", "scrap", "customer", "outreach", "cold email", "whatsapp"],
      response: "Lead acquisition and CRM synchronization are our core protocols. We build stateful scrapers and Python-based agents that qualify leads and sync data in real-time across your stack for maximum conversion.",
      more: "We support integrations with Salesforce, HubSpot, and custom SQL databases, ensuring no lead is ever lost in the data silo."
    },
    {
      id: "ZETAFIN",
      keywords: ["zetafin", "zeta fin", "finance", "profit", "loss", "p&l", "accounting", "money", "rupee", "expense"],
      response: "ZetaFin is our AI Financial Intelligence System. It tracks Profit & Loss, expenses, and employee metrics in real-time — helping you know exactly where every rupee goes.",
      more: "It includes automated auditing and net profit estimation, acting as a unified platform for efficient business operations."
    },
    {
      id: "ZETAI",
      keywords: ["zetai", "zeta ai", "zetaai", "voice", "assistant", "call", "jarvis", "speak", "voice agent"],
      response: "ZetAI is our voice-driven AI execution agent. It can research topics, send messages, and handle emails based on your spoken commands.",
      more: "It acts as a personal operational assistant, executing tasks automatically through a smart voice interface."
    },
    {
      id: "ZETAAGENT",
      keywords: ["zetaagent", "zeta agent", "autonomous", "system", "growth", "engine", "multi agent"],
      response: "ZetaAgent is an autonomous multi-agent system. Just define your business, and it builds/deploys agents for lead gen, research, and outreach.",
      more: "It independently performs lead generation and follow-ups, creating a fully automated business growth engine."
    },
    {
      id: "MARKETPLACE",
      keywords: ["fb", "facebook", "marketplace", "listing", "bot", "auto post", "reply", "vehicle", "marketplace bot"],
      response: "We offer powerful Marketplace automation, including FB bulk listing bots and AI-powered reply agents for instant customer engagement.",
      more: "This includes our Vehicle AI Listing System which filters fake listings and automates meeting scheduling between buyers and sellers."
    },
    {
      id: "AURA_PROTOCOLS",
      keywords: ["protocol", "zero", "one", "two", "core", "infrastructure", "engine"],
      response: "The AURA Core consists of three primary protocols: Protocol Zero (Secure Infrastructure), Protocol One (Agentic Orchestration), and Protocol Two (Neural Prediction). These are the blueprints of ZetaMize engineering.",
      more: "Every implementation starts with Protocol Zero to ensure your data foundation is impenetrable before we layer on our autonomous agentic workflows."
    },
    {
      id: "ABOUT_ZETAMIZE",
      keywords: ["zetamize", "zeta mize", "who are you", "what is this", "history", "about", "mission", "background", "company", "team", "services", "what you do", "offer", "package"],
      response: "ZetaMize is a senior engineering collective dedicated to replacing manual rot with neural speed. We build high-density automation systems, AI agents, and custom technical infrastructure.",
      more: "Founded by technical architects, we specialize in Finance (ZetaFin), Voice AI (ZetAI), and Autonomous Growth Engines. We've scaled across multiple industries in under 2 years."
    }
  ];

  const suggestedTopics = [
    "Tell me about ZetaFin",
    "How does ZetAI work?",
    "Show me Portfolio",
    "Lead Gen Automation"
  ];

  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase().trim();
    if (!text) return "Please provide an input for analysis.";

    // Handle Greeting
    if (text.match(/^(hi|hello|hey|greetings|aoa|salam)/)) {
      return "Greetings. ZetaMize systems are online. I can architect solutions for Finance (ZetaFin), Voice AI (ZetAI), or General Automation. What protocol shall we initiate?";
    }
    
    // Handle "Tell me more" / "More"
    if ((text === "more" || text.includes("tell me more") || text.includes("explain") || text.includes("detail")) && lastTopic) {
      const topic = categories.find(c => c.id === lastTopic);
      if (topic) {
        return `Extending Protocol Analysis... ${topic.more}`;
      }
    }

    const words = text.split(/\s+/);
    let bestCategory = null;
    let maxScore = 0;

    for (const cat of categories) {
      let catScore = 0;
      for (const keyword of cat.keywords) {
        const k = keyword.toLowerCase();
        
        // Exact match in the whole text (High Weight)
        if (text === k || text === `what is ${k}` || text === `who is ${k}` || text === `tell me about ${k}`) {
           catScore += 100;
        }
        
        // Keyword as a distinct word in the input
        if (words.includes(k)) {
          catScore += 50;
        } else if (text.includes(k)) {
          // Substring match
          catScore += 20;
        } else if (k.length > 4 && text.length > 4) {
          // Partial/Prefix match
          const prefix = k.substring(0, Math.floor(k.length * 0.8));
          if (text.includes(prefix)) {
            catScore += 5;
          }
        }
      }

      if (catScore > maxScore) {
        maxScore = catScore;
        bestCategory = cat;
      }
    }

    if (bestCategory && maxScore >= 20) {
      setLastTopic(bestCategory.id);
      return bestCategory.response;
    }

    // Direct Portfolio/Contact redirection
    if (text.includes("port") || text.includes("work") || text.includes("project")) {
       setLastTopic("PORTFOLIO");
       return "I have multiple technical proofs available. You can explore our full /portfolio to see ZetaFin, ZetAI, and our advanced scrapers in action.";
    }

    return "Input analyzed. While I don't have a specific protocol for that phrase yet, I am currently specialized in ZetaFin (Finance), ZetAI (Voice), and Autonomous Agents. Check our /portfolio for more.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMsg.text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-32px)] sm:w-[420px] h-[calc(100vh-140px)] sm:max-h-[640px] bg-[#020408]/95 border border-primary/20 rounded-[32px] shadow-[0_0_80px_rgba(var(--primary-rgb),0.2)] flex flex-col overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/10 bg-primary/5 flex items-center justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
               <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-black border border-primary/40 flex items-center justify-center">
                    <Bot size={20} className="text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-black text-foreground uppercase tracking-wider">ZetaMize AI Strategist</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                       <span className="text-[10px] font-mono text-primary/60 font-bold uppercase tracking-widest">NEURAL_LINK::ACTIVE</span>
                    </div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 text-white/40 hover:text-primary transition-colors">
                 <X size={20} />
               </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative">
               {/* Noise Overlay - SUBTLE */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
               {/* Central Radiance */}
               <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

               {messages.map((m) => (
                 <motion.div
                   key={m.id}
                   initial={{ opacity: 0, x: m.sender === "bot" ? -10 : 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className={`flex ${m.sender === "bot" ? "justify-start" : "justify-end"} relative z-10`}
                 >
                   <div className={`max-w-[85%] p-5 rounded-3xl border shadow-xl text-sm leading-relaxed ${
                     m.sender === "bot" 
                       ? "bg-[#0a0c10] border-white/10 text-foreground/90 rounded-tl-none font-medium" 
                       : "bg-primary/20 border-primary/40 text-white rounded-tr-none font-bold"
                   }`}>
                     {m.text}
                     {m.sender === "bot" && (
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                          <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-[10px] font-mono text-primary font-black uppercase tracking-tighter hover:gap-3 transition-all">
                             Contact <ChevronRight size={12} />
                          </Link>
                          <Link to="/portfolio" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-[10px] font-mono text-primary/60 font-black uppercase tracking-tighter hover:text-primary transition-all">
                             View Work <ChevronRight size={12} />
                          </Link>
                        </div>
                     )}
                   </div>
                 </motion.div>
               ))}
               
               {/* Suggestions */}
               {messages.length < 5 && !isTyping && (
                  <div className="flex flex-wrap gap-2 relative z-10 px-2 mt-4">
                    {suggestedTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setInputValue(topic);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-primary/70 hover:bg-primary/10 hover:text-primary transition-all uppercase tracking-widest"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
               )}

               {isTyping && (
                 <div className="flex justify-start relative z-10">
                   <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                     <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                     <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                     <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                   </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-6 border-t border-primary/10 bg-black/40 backdrop-blur-md">
               <div className="relative flex items-center">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="DESCRIBE_TECHNICAL_CHALLENGE..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-foreground placeholder:text-white/20 focus:border-primary focus:bg-primary/5 transition-all outline-none font-mono"
                  />
                  <button onClick={handleSend} className="absolute right-2 p-3 bg-primary text-black rounded-xl hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-all">
                    <Send size={18} />
                  </button>
               </div>
               <p className="text-[9px] text-white/20 mt-3 font-mono uppercase tracking-widest text-center">SYSTEM_READY // SECURE_LINE_AUTHENTICATED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group h-16 w-16"
      >
        <div className="absolute inset-0 bg-primary/40 blur-[20px] rounded-full group-hover:bg-primary/60 transition-all animate-pulse" />
        <div className={`relative h-full w-full rounded-2xl border flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden ${
          isOpen ? "bg-red-500/10 border-red-500/40 text-red-500" : "bg-gradient-to-br from-primary via-primary/80 to-primary/50 border-primary/40 text-[#020408]"
        }`}>
          {/* Internal premium glow */}
          {!isOpen && <div className="absolute inset-0 bg-white/20 blur-md rounded-full pointer-events-none mix-blend-overlay" />}
          {isOpen ? <X size={28} className="relative z-10" /> : <BotMessageSquare size={32} className="relative z-10 drop-shadow-md group-hover:scale-110 transition-transform" />}
        </div>
        
        {/* Active Badge */}
        {!isOpen && !hasBeenOpened && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[8px] text-black font-bold items-center justify-center">1</span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AuraChatbot;
