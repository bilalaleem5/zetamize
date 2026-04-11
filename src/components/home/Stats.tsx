import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Users, Clock, HeadphonesIcon, ArrowUpRight } from "lucide-react";
import SectionLabel from "../SectionLabel";

const BorderBeam = ({ duration = 12, size = 150, delay = 0 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] [mask-image:linear-gradient(black,black),linear-gradient(black,black)] [mask-clip:content-box,padding-box] [mask-composite:intersect]">
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        style={{
          offsetPath: "rect(0 auto auto 0 round 16px)",
          position: "absolute",
          aspectRatio: "1/1",
          width: `${size}px`,
          height: "2px",
          background: "linear-gradient(to right, transparent, hsl(var(--primary)), transparent)",
        }}
      >
        <div className="absolute inset-0 bg-primary/20 blur-[2px] rounded-full animate-pulse" />
      </motion.div>
    </div>
  );
};

const stats = [
  { icon: Zap, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Clock, value: 3, suffix: "+", label: "Years of Experience" },
  { icon: HeadphonesIcon, value: 24, suffix: "/7", label: "Support Available" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000; // Slightly longer for more "drawn out" feel
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Easing function for smoother finish
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tighter">
      {count}{suffix}
    </span>
  );
};

const StatCard = ({ stat, index }: { stat: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
    >
      {/* Glow effect behind card */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Card */}
      <div className="relative h-full p-8 bg-card/40 backdrop-blur-sm border border-primary/10 rounded-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center">
        <BorderBeam duration={15} size={150} delay={index * 1.5} />

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-primary/20 group-hover:border-primary/60 transition-colors" />

        {/* Blinking Corner Arrow */}
        <motion.div
          className="absolute top-4 right-4 text-primary/30 group-hover:text-primary transition-colors"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        >
          <ArrowUpRight size={14} />
        </motion.div>

        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-primary/20 group-hover:border-primary/60 transition-colors" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-primary/20 group-hover:border-primary/60 transition-colors" />

        {/* Floating tech detail */}
        <div className="absolute top-0 right-12 px-2 py-0.5 bg-primary/5 border-x border-b border-primary/10 text-[8px] font-mono text-primary/30 group-hover:text-primary/60 transition-colors">
          ST_DATA_{index + 1}
        </div>

        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <stat.icon size={32} className="text-primary relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
        </div>

        <Counter value={stat.value} suffix={stat.suffix} />

        <div className="mt-4 flex flex-col items-center">
          <div className="h-[1px] w-8 bg-primary/20 group-hover:w-16 transition-all duration-500 mb-4" />
          <p className="text-muted-foreground text-sm font-mono tracking-wider uppercase group-hover:text-foreground transition-colors">
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Stats = () => (
  <section className="py-32 relative overflow-hidden">
    {/* Background Ambiance */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="container mx-auto relative z-10 px-4">
      <SectionLabel
        label="THE IMPACT"
        title="Numbers that speak for the mission."
        description="We don't just build software; we deliver measurable excellence and operational mastery for global enterprises."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
