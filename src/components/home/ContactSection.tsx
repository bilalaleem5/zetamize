import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MessageCircle, Phone, Globe, Shield } from "lucide-react";
import SectionLabel from "../SectionLabel";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactCells = [
    { icon: Mail, label: "Email Support", value: "hello@zetamize.com", color: "text-primary" },
    { icon: MessageCircle, label: "WhatsApp Connect", value: "+92 (333) 333-2460", color: "text-primary" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#020408]">
      {/* Circuit Flow Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" className="text-primary/30">
          <motion.path
            d="M -100 400 Q 200 100 720 400 T 1540 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10 20"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M -100 500 Q 400 800 1000 400 T 1540 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 15"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Global Label Only */}
        <div className="text-center mb-16">
          <span className="font-mono text-primary text-sm tracking-[0.2em] block uppercase opacity-80">
            [ CONNECT ]
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Vision & Contact Cells (Restored Alignment) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
                Start Your Technical Evolution
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Consult with our AI architects to blueprint your automated future.
              </p>
            </div>

            <div className="grid gap-6 mt-8">
              {contactCells.map((cell, i) => (
                <div 
                  key={i}
                  className="group flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors duration-500 relative overflow-hidden`}>
                    <cell.icon size={22} className={`${cell.color} relative z-10`} />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em] mb-1">{cell.label}</p>
                    <p className="text-foreground font-display font-bold text-xl group-hover:text-primary transition-colors">{cell.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 flex gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 text-xs font-mono"><Shield size={14} className="text-primary"/> SECURE PROTOCOL</div>
               <div className="flex items-center gap-2 text-xs font-mono"><Globe size={14} className="text-primary"/> GLOBAL DEPLOYMENT</div>
            </div>
          </motion.div>

          {/* Right Column: 3D Perspective Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ rotateY: -2, rotateX: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="p-10 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-[40px] shadow-2xl relative overflow-hidden group"
            >
              {/* Internal Accent Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] group-hover:bg-primary/30 transition-colors" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-muted-foreground'}`}>System.Init(Name)</label>
                    <input
                      type="text"
                      placeholder="Input ID"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-white/20 focus:border-primary focus:bg-primary/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'}`}>System.Init(Email)</label>
                    <input
                      type="email"
                      placeholder="Address@Relay"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-white/20 focus:border-primary focus:bg-primary/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${focusedField === 'service' ? 'text-primary' : 'text-muted-foreground'}`}>Execute.Process(Service)</label>
                  <select 
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-muted-foreground focus:border-primary focus:bg-primary/5 transition-all outline-none appearance-none"
                  >
                    <option value="">Select Service Core</option>
                    <option>AI Automation</option>
                    <option>Large Language Models</option>
                    <option>Neural Architecture</option>
                    <option>Process Evolution</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${focusedField === 'msg' ? 'text-primary' : 'text-muted-foreground'}`}>Transmission.Payload(Message)</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the evolution..."
                    onFocus={() => setFocusedField('msg')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-white/20 focus:border-primary focus:bg-primary/5 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`relative w-full overflow-hidden group/btn px-10 py-5 font-display font-black tracking-widest uppercase transition-all duration-700 rounded-2xl ${
                    submitted 
                    ? "bg-primary/20 text-primary border border-primary" 
                    : "bg-primary text-black hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] active:scale-[0.98]"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {submitted ? "MISSION LOGGED ✓" : (<>INITIATE CONNECTION <Send size={18} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform"/> </>)}
                  </span>
                  
                  {/* Sweep Animation */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_infinite] transition-transform" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Extreme Neon Section Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent">
          {/* Central Pulse Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-24 h-[1px] bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)]" />
            <div className="absolute w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#fff]" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
