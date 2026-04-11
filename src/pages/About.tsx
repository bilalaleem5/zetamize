import { motion } from "framer-motion";
import { Lightbulb, Target, TrendingUp, Eye, Shield, Cpu, Rocket, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import SectionLabel from "../components/SectionLabel";
import SectionDivider from "../components/SectionDivider";

const values = [
  { icon: Lightbulb, title: "Innovation", description: "Pushing boundaries with neural-core AI that didn't exist yesterday." },
  { icon: Target, title: "Precision", description: "Every integration is engineered with surgical accuracy and military-grade protocols." },
  { icon: TrendingUp, title: "Impact", description: "Measuring success with real-world KPIs and accelerated autonomous growth." },
  { icon: Eye, title: "Transparency", description: "Zero-latency communication and open-source ethics in strategic delivery." },
];

const roadmap = [
  { year: "2024.Q1", title: "Neural Lab Start", desc: "Foundation of our R&D center focused on autonomous agentic workflows." },
  { year: "2024.Q2", title: "Protocol Zero", desc: "Implementation of military-grade security layers for private enterprise LLM deployments." },
  { year: "2024.Q3", title: "Aura V1 Core", desc: "Launch of the flagship engine integrating predictive ML pipelines into production." },
  { year: "2024.Q4", title: "Agent Synthesis", desc: "Cross-system agentic communication allowing multi-agent task delegation and solving." },
  { year: "2025.Q1", title: "Global Expansion", desc: "Scaling high-speed AI infrastructure across three primary continental data hubs." },
  { year: "2025.Q2", title: "Cognitive Edge", desc: "Deployment of specialized on-device LLMs for zero-latency industrial applications." },
  { year: "2025.Q4", title: "Self-Optimization", desc: "Release of architectures that auto-refactor workflows based on real-time usage data." },
];

const About = () => (
  <PageWrapper>
    {/* Hero Section: The Mission */}
    <section className="pt-40 pb-32 relative overflow-hidden bg-[#020408]">
      {/* Neural Flow Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" className="text-primary/30">
          <motion.path
            d="M -100 400 Q 200 100 720 400 T 1540 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10 20"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M -100 500 Q 400 800 1000 400 T 1540 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 15"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <SectionLabel label="THE MISSION" title="Innovating with Precision" />
          
          <h1 className="text-4xl xs:text-5xl md:text-8xl font-display font-black text-foreground mb-10 tracking-tighter leading-[0.9] uppercase">
            Designed for <br /><span className="text-primary glow-text">Autonomous</span> <br />Evolution
          </h1>
          
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto font-medium">
            At ZetaMize, we don't just build technology — we design intelligent systems that move businesses forward. Our team blends deep technical expertise with practical problem-solving to create AI ecosystems that performance, scale, and deliver real impact.
          </p>
        </motion.div>
      </div>
    </section>

    <SectionDivider />

    {/* Values Section: Core Architecture */}
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <SectionLabel label="CORE ARCHITECTURE" title="What Drives the Code" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-3xl hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Neon Left Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] transition-all duration-500" />
              
              <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                <v.icon size={26} className="group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <SectionDivider />

    {/* New Section: Technical Roadmap (ZetaMize Timeline) */}
    <section className="py-32 bg-[#05070a] relative overflow-hidden">
      {/* Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(45deg) scale(2)',
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionLabel label="TECHNICAL EVOLUTION" title="The ZetaMize Roadmap" />
        
        <div className="mt-20 max-w-5xl mx-auto relative px-4">
          {/* Central Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />
          
          <div className="space-y-24">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} space-y-4`}>
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-primary font-mono text-xs font-black tracking-[0.4em] uppercase">{item.year}</span>
                    <div className="w-8 h-[1px] bg-primary/20" />
                  </div>
                  <h3 className="text-2xl xs:text-3xl md:text-4xl font-display font-black text-foreground uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-medium">{item.desc}</p>
                </div>
                
                {/* Visual Dot on Line */}
                <div className="relative z-10 hidden md:block">
                  <div className="w-14 h-14 rounded-full bg-black border border-primary/20 flex items-center justify-center group">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(var(--primary-rgb),1)]" />
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 group-hover:scale-150 transition-transform duration-700" />
                  </div>
                </div>
                
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <SectionDivider />

    {/* New Section: Technical Backbone (Consolidated Tech) */}
    <section className="py-32 relative bg-black">
      <div className="container mx-auto px-4">
        <SectionLabel label="TECHNICAL BACKBONE" title="The ZetaMize Tech Stack" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {[
            { cat: "INTELLIGENCE", techs: ["OpenAI", "Anthropic", "Llama 3", "LangChain"] },
            { cat: "AUTOMATION", techs: ["n8n", "Make.com", "Python", "FastAPI"] },
            { cat: "INFRASTRUCTURE", techs: ["AWS", "Vercel", "Docker", "Kubernetes"] },
            { cat: "DATA ENGINE", techs: ["Pinecone", "Supabase", "PostgreSQL", "Redis"] },
          ].map((group, i) => (
            <motion.div
              key={group.cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-black text-primary tracking-[0.3em] uppercase">{group.cat}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.techs.map((t) => (
                  <div key={t} className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs font-bold text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all cursor-default">
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <SectionDivider />

    {/* CTA: Team Connection */}
    <section className="py-32 relative bg-black">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-16 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden group"
        >
          {/* Sweep Animation */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] font-mono font-black text-primary tracking-[0.4em] uppercase">PROTOCOL_CONNECT</span>
          </div>
          <SectionLabel label="JOIN THE CELL" title="Future-Proof Your Team" />
          <h2 className="text-3xl xs:text-4xl md:text-6xl font-display font-black text-foreground mb-8 uppercase tracking-tighter leading-none">
            Architecting <br /><span className="text-primary">Human-AI</span> Synergy
          </h2>
          <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join a lean, senior collective of automation specialists and neural strategists building the next generation of autonomous business systems.
          </p>
          
          <Link
            to="/team"
            className="group/btn relative inline-flex items-center gap-4 px-14 py-7 bg-primary text-black font-display font-black tracking-widest uppercase rounded-2xl hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.6)] transition-all duration-700 overflow-hidden active:scale-95"
          >
            <span className="relative z-10">Access The Collective</span>
            <ChevronRight size={24} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default About;
