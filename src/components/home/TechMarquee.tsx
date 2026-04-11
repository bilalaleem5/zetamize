import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionLabel from "../SectionLabel";
import { useEffect, useState, useRef } from "react";
import {
  Bot,
  Code2,
  Cloud,
  Zap,
  Workflow,
  Layout,
  Layers,
  Database,
  Box,
  BrainCircuit,
  Flame,
  Infinity as InfinityIcon,
  Binary,
  ShieldCheck,
  Terminal,
  Cpu,
  Globe
} from "lucide-react";

const techStack = [
  { name: "OpenAI", icon: Bot, color: "#74AA9C", desc: "AI_CORE: GPT-4o / o1" },
  { name: "Python", icon: Code2, color: "#3776AB", desc: "LOGIC: High-Perf Core" },
  { name: "AWS", icon: Cloud, color: "#FF9900", desc: "INFRA: Edge Compute" },
  { name: "LangChain", icon: Zap, color: "#1389FD", desc: "ORCHESTRATION: Agentic" },
  { name: "n8n", icon: Workflow, color: "#FF6D5B", desc: "AUTOMATION: Live Flow" },
  { name: "Zapier", icon: Zap, color: "#FF4F00", desc: "AUTOMATION: Ecosystem Connect" },
  { name: "React", icon: Layout, color: "#61DAFB", desc: "INTERFACE: Next-Gen UI" },
  { name: "Next.js", icon: Layers, color: "#FFFFFF", desc: "NETWORK: SSR Optimized" },
  { name: "PostgreSQL", icon: Database, color: "#336791", desc: "DATA: Relational Mesh" },
  { name: "MongoDB", icon: Database, color: "#47A248", desc: "STORAGE: Document Core" },
  { name: "Docker", icon: Box, color: "#2496ED", desc: "DEVOPS: Container Hub" },
  { name: "Anthropic", icon: BrainCircuit, color: "#D97757", desc: "AI_LLM: Claude 3.5" },
  { name: "FastAPI", icon: Flame, color: "#05998B", desc: "BACKEND: Async Engine" },
  { name: "Supabase", icon: InfinityIcon, color: "#3ECF8E", desc: "DATABASE: Serverless" },
  { name: "Pinecone", icon: Binary, color: "#241D3B", desc: "VECTOR: Semantic Search" },
  { name: "HuggingFace", icon: ShieldCheck, color: "#FFD21E", desc: "MODELS: Open Source" },
];

const TiltCard = ({ tech, index }: { tech: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 5) * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col items-center justify-center p-4 rounded-[20px] border border-white/5 bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:border-primary/40 hover:bg-black/60 group cursor-default"
    >
      {/* Decorative inner glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[20px]"
        style={{ background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)` }}
      />

      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 flex flex-col items-center text-center">
        <tech.icon
          size={36}
          style={{ color: tech.color }}
          className="mb-2 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500"
        />
        <h4 className="text-[9px] font-display font-black text-foreground/40 group-hover:text-foreground tracking-[0.2em] uppercase transition-colors">
          {tech.name}
        </h4>

        {/* Hidden detail revealed on hover */}
        <div className="h-0 opacity-0 group-hover:h-3 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-1">
          <span className="text-[7px] font-mono text-primary font-bold tracking-widest whitespace-nowrap">
            {tech.desc}
          </span>
        </div>
      </div>

      {/* Dynamic Reflection Reflection */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px] pointer-events-none" />
    </motion.div>
  );
};

const TechMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden bg-[#020408]">
      {/* Cinematic Spotlight System */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-opacity duration-1000 opacity-20"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <SectionLabel
            label="OUR STACK"
            title="Technologies We Master"
            description="The high-octane engine powering our agentic deployments."
          />
        </div>

        {/* Spacious Gallery Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {techStack.map((tech, i) => (
            <TiltCard key={i} tech={tech} index={i} />
          ))}
        </div>

        {/* Global Technical Registry */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 px-4 opacity-40">
          <div className="flex items-center gap-4">
            <Cpu size={20} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-primary uppercase font-bold">
              SYSTEM_INTEGRITY: HIGH_PERFORMANCE_READY
            </span>
          </div>

          <div className="hidden lg:flex gap-12">
            {[
              { label: "ORCHESTRATION", val: "LangChain/OpenAI" },
              { label: "DATA_LAYER", val: "Vector/SQL/NoSQL" },
              { label: "INFRA", val: "AWS/Docker/n8n" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col text-left">
                <span className="text-[8px] font-mono text-primary/60 tracking-widest">{stat.label}</span>
                <span className="text-xs font-display font-black text-foreground">{stat.val}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Globe size={14} className="text-primary/40" />
            <span className="text-[10px] font-mono tracking-widest">ZML_CORE_v8.4.2</span>
          </div>
        </div>
      </div>

      {/* Background Ambience: Floating Bits */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full blur-[1px] pointer-events-none"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * 100 + "%"],
            opacity: [0, 0.3, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </section>
  );
};

export default TechMarquee;
