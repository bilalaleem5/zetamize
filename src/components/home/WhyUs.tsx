import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Cpu, Shield, Zap, Target, Globe, Activity, Workflow, Radio } from "lucide-react";
import SectionLabel from "../SectionLabel";
import { useEffect, useState, useRef } from "react";

const OrbitingFeature = ({ title, desc, icon: Icon, angle, index }: { title: string; desc: string; icon: any; angle: number; index: number }) => {
  const radius = 340; // Orbit radius
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * (radius * (angle === 90 ? 0.81 : 0.7)); // Ellantical orbit for better 3D feel, extra space for Tier-1 (angle 90)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: `calc(-50% + ${x}px)`,
        y: `calc(-50% + ${y}px)`,
        zIndex: y > 0 ? 30 : 10, // Depth sorting
      }}
      className="group"
    >
      <div className="relative p-5 rounded-2xl border border-white/5 bg-black/60 shadow-2xl backdrop-blur-3xl hover:border-primary/40 transition-all duration-500 w-64">
        {/* Internal Glow */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-2xl" />

        <div className="flex items-center gap-4 mb-3">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-all duration-500">
            <Icon size={20} />
          </div>
          <h4 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight uppercase">
            {title}
          </h4>
        </div>
        <p className="text-muted-foreground text-[11px] leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity line-clamp-2">
          {desc}
        </p>

        {/* Connection Port Pin */}
        <div className={`absolute ${angle > 180 ? 'top-0 left-1/2 -translate-x-1/2' : 'bottom-0 left-1/2 -translate-x-1/2'} w-1.5 h-1.5 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] group-hover:scale-150 transition-transform`} />
      </div>
    </motion.div>
  );
};

const EnergyLinkmesh = ({ angles }: { angles: number[] }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block opacity-30">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {angles.map((angle, i) => {
          const radius = 340;
          const x = 500 + Math.cos((angle * Math.PI) / 180) * (radius * 1.3); // Map to SVG coordinates
          const y = 500 + Math.sin((angle * Math.PI) / 180) * (radius * (angle === 90 ? 1.05 : 0.9));

          return (
            <g key={i}>
              <motion.path
                d={`M 500 500 L ${x} ${y}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
              {/* Pulse Packet */}
              <motion.circle
                r="1.5"
                fill="hsl(var(--primary))"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                style={{ offsetPath: `M 500 500 L ${x} ${y}`, filter: "drop-shadow(0 0 4px hsl(var(--primary)))" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const WhyUs = () => {
  const points = [
    { title: "Strategic Ownership", desc: "End-to-end accountability from strategy to scale.", icon: Target, angle: 210 },
    { title: "Performance Engineering", desc: "Built for high-velocity enterprise impact.", icon: Workflow, angle: 150 },
    { title: "Tier-1 Architects", desc: "Senior AI engineering on every module.", icon: Cpu, angle: 90 },
    { title: "Live Transparency", desc: "Real-time project tracking & visibility.", icon: Activity, angle: 30 },
    { title: "Global Infrastructure", desc: "Cloud-native AI that grows with you.", icon: Globe, angle: 330 },
    { title: "Sovereign Security", desc: "Private AI frameworks with zero-leakage protocols.", icon: Shield, angle: 270 },
  ];

  return (
    <section id="technologies" className="py-8 relative overflow-hidden bg-[#020408]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        {/* Holographic Grid Floor */}
        <div
          className="absolute bottom-0 left-0 w-full h-[50%] opacity-30"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(var(--primary-rgb), 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(var(--primary-rgb), 0.25) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionLabel
          label="WHY ZETAMIZE"
          title="The Intelligence Partner."
          description="A unified engine built to bridge the gap between vision and operational AI."
        />

        <div className="relative mt-0 min-h-[600px] flex flex-col lg:flex-row items-center justify-center">
          {/* Central Energy Reactor */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 group"
          >
            {/* Multi-layered radiation halos */}
            <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full group-hover:bg-primary/30 transition-colors duration-1000 animate-pulse" />

            <div className="relative rounded-full p-0.5 border border-primary/10 bg-black/80 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] backdrop-blur-3xl group-hover:border-primary/30 transition-colors">
              <div className="w-56 h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-primary/5 shadow-inner relative">
                <img
                  src="/giphy.gif"
                  alt="ZetaMize Core"
                  className="w-full h-full object-cover scale-[1.3] opacity-100 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Spinning Registry Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-dashed border-primary/30 rounded-full pointer-events-none"
              />

              {/* Status Indicator Badge */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 min-w-[280px]">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-full font-mono text-[9px] text-primary tracking-[0.5em] font-bold backdrop-blur-2xl text-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                >
                  ENGINE_SYNC::ACTIVE_PULSE
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Symmetrical Network Links */}
          <EnergyLinkmesh angles={points.map(p => p.angle)} />

          {/* Orbital Features Map */}
          <div className="absolute inset-0 hidden lg:block">
            {points.map((p, i) => (
              <OrbitingFeature key={i} {...p} index={i} />
            ))}
          </div>

          {/* Mobile Layout (Stacked) */}
          <div className="lg:hidden grid grid-cols-1 gap-4 w-full mt-24 px-2">
            {points.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-black/60 shadow-xl">
                <div className="flex items-center gap-4 mb-3 text-primary">
                  <p.icon size={24} />
                  <h4 className="font-bold uppercase tracking-wider text-sm">{p.title}</h4>
                </div>
                <p className="text-muted-foreground text-[13px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Registry Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 border-t border-primary/10 py-12 grid grid-cols-2 lg:flex lg:flex-row justify-center items-center gap-8 lg:gap-24"
        >
          {[
            { label: "ENGINE_FREQ", val: "432MHz", icon: Activity },
            { label: "SYNC_STABILITY", val: "99.98%", icon: Radio },
            { label: "AGENT_BANDWIDTH", val: "PEAK_LOAD", icon: Workflow },
            { label: "ENCRYPTION_MODE", val: "AES_512_HYBRID", icon: Shield },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={12} className="text-primary/40 group-hover:text-primary transition-colors" />
                <div className="text-[9px] font-mono text-primary/40 tracking-widest uppercase group-hover:text-primary transition-colors">{s.label}</div>
              </div>
              <div className="text-xl lg:text-3xl font-display font-black text-foreground group-hover:scale-105 transition-transform tracking-tighter">{s.val}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
