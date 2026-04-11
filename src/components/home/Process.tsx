import { motion } from "framer-motion";
import { Search, PenTool, Rocket, Settings } from "lucide-react";
import SectionLabel from "../SectionLabel";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    badge: "01",
    title: "Discover & Align",
    description: "We map your workflows, pain points, and automation opportunities through deep discovery workshops.",
  },
  {
    icon: PenTool,
    badge: "02",
    title: "Design & Validate",
    description: "Rapid prototyping and system design — validated before a single line of production code is written.",
  },
  {
    icon: Rocket,
    badge: "03",
    title: "Build & Launch",
    description: "Iterative sprints with QA, performance benchmarks, and client feedback loops baked in.",
  },
  {
    icon: Settings,
    badge: "04",
    title: "Operate & Evolve",
    description: "Post-launch monitoring, fine-tuning, and roadmap co-creation for continued impact.",
  },
];

const RoadmapNode = ({ step, index }: { step: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center group w-full lg:w-1/4"
    >
      {/* Connection line for mobile (vertical) */}
      {index < steps.length - 1 && (
        <div className="lg:hidden absolute top-20 bottom-[-4rem] left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary/50 to-transparent z-0" />
      )}

      {/* Node Orb Container */}
      <div className="relative z-10 w-24 h-24 mb-8">
        {/* Outer Glow */}
        <div className="absolute inset-x-[-20%] inset-y-[-20%] bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Main Circle */}
        <div className="relative w-full h-full bg-card border border-primary/20 rounded-full flex items-center justify-center text-primary group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(0,183,255,0.4)] transition-all duration-500 overflow-hidden">
          {/* Subtle background rotation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <step.icon size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />

          {/* Scanning Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-1/2 w-full"
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.7 }}
          />
        </div>

        {/* Step Marker Badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.2) + 0.5, type: "spring" }}
          className="absolute -top-1 -right-1 w-9 h-9 bg-background border border-primary/40 rounded-full flex items-center justify-center shadow-lg z-20"
        >
          <span className="text-[11px] font-mono font-bold text-primary">{step.badge}</span>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="text-center px-4 relative z-10">
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[280px] mx-auto group-hover:text-foreground/90 transition-colors duration-300">
          {step.description}
        </p>
      </div>

      {/* Decorative pulse point */}
      <div className="mt-10 hidden lg:block">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Diagonal Light Streaks */}
        <div className="absolute top-0 left-[-10%] w-[120%] h-full opacity-[0.02] transform -rotate-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionLabel
          label="THE BLUEPRINT"
          title="A delivery rhythm tuned for momentum."
          description="We've codified our delivery process into a streamlined roadmap designed to eliminate friction and maximize velocity."
        />

        <div className="relative mt-24" ref={containerRef}>
          {/* Main Roadmap Path - Desktop (Animated SVG) */}
          <div className="hidden lg:block absolute top-[48px] left-[12.5%] right-[12.5%] z-0 h-[4px]">
            <svg width="100%" height="20" viewBox="0 0 1000 20" preserveAspectRatio="none" className="overflow-visible">
              {/* Shadow Path */}
              <path
                d="M 0 10 H 1000"
                fill="none"
                stroke="hsl(var(--primary) / 0.1)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Main Animated Path */}
              <motion.path
                d="M 0 10 H 1000"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="12 12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Traveling Data Packet (Particle) */}
              <motion.circle
                r="4"
                fill="hsl(var(--primary))"
                initial={{ cx: 0, cy: 10 }}
                animate={{ cx: [0, 1000] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
              />

              {/* Secondary Packet */}
              <motion.circle
                r="3"
                fill="hsl(var(--primary))"
                initial={{ cx: 0, cy: 10 }}
                animate={{ cx: [0, 1000] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 3 }}
                style={{ filter: 'drop-shadow(0 0 6px hsl(var(--primary)))', opacity: 0.5 }}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 relative">
            {steps.map((step, i) => (
              <RoadmapNode key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
