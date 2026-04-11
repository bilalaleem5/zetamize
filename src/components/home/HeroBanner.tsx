import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/30"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const GlowOrb = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-[300px] h-[300px] rounded-full blur-[100px]"
    style={{
      left: x,
      top: y,
      background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CircuitBoard = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";
  return (
    <div className={`absolute top-0 md:top-1/4 bottom-0 w-[40vw] max-w-[500px] pointer-events-none opacity-40 z-0 ${isLeft ? "left-0" : "right-0"}`}>
      <svg viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${isLeft ? "" : "scale-x-[-1]"}`}>
        {/* Animated paths */}
        <motion.path
          d="M -50 100 L 100 100 L 150 150 L 300 150 L 350 100 L 450 100"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -50 300 L 50 300 L 100 250 L 250 250 L 300 300 L 450 300"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -50 500 L 150 500 L 200 450 L 300 450 L 320 430 L 450 430"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -50 700 L 50 700 L 150 600 L 350 600 L 450 500"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Intersecting Data Nodes */}
        <motion.circle cx="100" cy="100" r="4" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="150" cy="150" r="3" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} />
        <motion.circle cx="300" cy="150" r="4" fill="hsl(var(--primary))" animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} />
        
        <motion.circle cx="100" cy="250" r="3" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.9, repeat: Infinity }} />
        <motion.circle cx="250" cy="250" r="2" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1.2, repeat: Infinity }} />
        <motion.circle cx="300" cy="300" r="5" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], boxShadow: "0 0 10px hsl(var(--primary))" }} transition={{ duration: 2, delay: 1.5, repeat: Infinity }} />
        
        <motion.circle cx="150" cy="600" r="3" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1.8, repeat: Infinity }} />
        <motion.circle cx="350" cy="600" r="4" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 2.1, repeat: Infinity }} />
      </svg>
      {/* Blurred glow behind the circuits */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-64 h-96 bg-primary/10 blur-[100px] rounded-[100%] ${isLeft ? "-left-32" : "-right-32"}`} />
    </div>
  );
};

const HeroBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
  }));

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const title = "ZETAMIZE";

  return (
    <section ref={ref} className="relative min-h-svh flex items-center justify-center overflow-hidden">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.15, 0]) }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Animated grid scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Glow orbs */}
      <GlowOrb delay={0} x="20%" y="30%" />
      <GlowOrb delay={1.5} x="70%" y="50%" />
      <GlowOrb delay={3} x="50%" y="20%" />

      {/* Diagonal lines */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] bg-primary"
            style={{
              width: "200%",
              top: `${10 + i * 12}%`,
              left: "-50%",
              transform: "rotate(-15deg)",
            }}
          />
        ))}
      </motion.div>

      {/* Cyber Circuit Edges */}
      <CircuitBoard side="left" />
      <CircuitBoard side="right" />

      {/* Main content */}
      <motion.div style={{ y: yText, opacity, scale }} className="relative z-10 text-center px-4">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            AI-Powered Automation
          </span>
        </motion.div>

        {/* Big title with letter-by-letter animation */}
        <div className="overflow-hidden mb-6" style={{ perspective: "1000px" }}>
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-display font-bold leading-[0.85] tracking-[-0.04em]">
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block ${
                  i >= 4 ? "text-primary" : "text-foreground"
                }`}
                style={{
                  textShadow: i >= 4 ? "0 0 40px hsl(var(--primary) / 0.5)" : "none",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle with stagger */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-4 tracking-wide"
        >
          Where Intelligence Meets Automation
        </motion.p>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
        />

        {/* Typing effect tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="font-mono text-sm text-muted-foreground/60 tracking-widest"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            {"// Transforming businesses through intelligent systems"}
          </motion.span>
          <motion.span
            className="inline-block w-[2px] h-4 bg-primary ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-primary/50" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroBanner;
