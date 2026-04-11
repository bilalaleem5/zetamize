import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Sparkles, Zap, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const AnimatedWord = ({ word, delay, glow }: { word: string; delay: number; glow?: boolean }) => (
  <motion.span
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`inline-block ${glow ? "text-primary glow-text" : "text-foreground"}`}
  >
    {word}
  </motion.span>
);

const FloatingIcon = ({ icon: Icon, x, y, delay }: { icon: any; x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute text-primary/10"
    style={{ left: x, top: y }}
    animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon size={40} />
  </motion.div>
);

const TypewriterLine = ({ lines }: { lines: { text: string; color?: string; highlights?: { text: string; color: string }[] }[] }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className={`min-h-[1.5em] flex flex-wrap ${line.color || "text-foreground"}`}>
          {line.text === "" ? (
            <span className="opacity-0">{"\u00A0"}</span>
          ) : (
            line.text.split("").map((char, charIndex) => {
              let highlightColor = "";
              if (line.highlights) {
                let currentPos = 0;
                for (const h of line.highlights) {
                  const start = line.text.indexOf(h.text, currentPos);
                  if (start !== -1 && charIndex >= start && charIndex < start + h.text.length) {
                    highlightColor = h.color;
                    break;
                  }
                  currentPos = start + 1;
                }
              }

              // Calculate delay: base delay + line delay + character delay
              const delay = (lineIndex * 0.4) + (charIndex * 0.02);

              return (
                <motion.span
                  key={charIndex}
                  variants={{
                    hidden: { opacity: 0, width: 0, display: "none" },
                    visible: {
                      opacity: 1,
                      width: "auto",
                      display: "inline-block",
                      transition: { delay, duration: 0.01 }
                    }
                  }}
                >
                  <span className={highlightColor || ""}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                </motion.span>
              );
            })
          )}
          {lineIndex === lines.length - 1 && (
            <motion.span
              className="inline-block w-2 h-5 bg-primary ml-1 self-center"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: [1, 0],
                  transition: {
                    delay: (lineIndex * 0.4) + (line.text.length * 0.02),
                    duration: 0.6,
                    repeat: Infinity
                  }
                }
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Floating icons */}
      <FloatingIcon icon={Sparkles} x="5%" y="20%" delay={0} />
      <FloatingIcon icon={Zap} x="90%" y="30%" delay={1} />
      <FloatingIcon icon={Bot} x="85%" y="70%" delay={2} />

      {/* Radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 relative">
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase">
              AI Automation Agency
            </span>
          </motion.div>

          {/* Heading with word-by-word animation */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.88] mb-8 tracking-[-0.03em]">
            <AnimatedWord word="Building" delay={0.1} />
            <br />
            <AnimatedWord word="the" delay={0.2} />{" "}
            <AnimatedWord word="Intelligent" delay={0.3} glow />{" "}
            <br />
            <AnimatedWord word="Future" delay={0.4} />
          </h2>

          {/* Animated separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] bg-primary mb-8 origin-left"
          />

          {/* Staggered keywords */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4 text-lg md:text-xl">
            {["Automate", "Scale", "Dominate"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                className="text-muted-foreground"
              >
                {i > 0 && <span className="text-primary mr-3">✦</span>}
                {word}.
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-muted-foreground text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          >
            ZetaMize builds intelligent systems that turn complex business workflows into automated, scalable operations.
          </motion.p>


          {/* CTAs with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10">Start a Project</span>
              <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
              />
            </Link>
            <Link
              to="/portfolio"
              className="group px-8 py-4 border border-border text-foreground font-bold rounded-full hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">View Our Work</span>
              <motion.div
                className="absolute inset-0 bg-primary/5"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "9999px" }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Code terminal with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
          style={{ perspective: "1000px" }}
        >
          {/* Glow behind card */}
          <motion.div
            className="absolute -inset-2 rounded-2xl blur-2xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)" }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative bg-card border border-border rounded-2xl overflow-hidden card-shadow group-hover:border-primary/30 transition-colors duration-500">
            {/* Terminal header */}
            <div className="flex items-center gap-1.5 p-4 border-b border-border bg-surface/50">
              <motion.div className="w-3 h-3 rounded-full bg-destructive" whileHover={{ scale: 1.3 }} />
              <motion.div className="w-3 h-3 rounded-full bg-[#FFBD2E]" whileHover={{ scale: 1.3 }} />
              <motion.div className="w-3 h-3 rounded-full bg-[#27C93F]" whileHover={{ scale: 1.3 }} />
              <span className="ml-4 font-mono text-xs text-muted-foreground/50">zetamize_core.py</span>
            </div>

            {/* Code with typewriter animation */}
            <div className="p-4 sm:p-6 font-mono text-[10px] xs:text-xs sm:text-sm md:text-base leading-relaxed overflow-hidden">
              <TypewriterLine
                lines={[
                  { text: "# ZetaMize Intelligence Engine", color: "text-muted-foreground" },
                  { text: "" },
                  { text: "from zetamize import intelligence", color: "text-foreground", highlights: [{ text: "from", color: "text-primary" }, { text: "import", color: "text-primary" }] },
                  { text: "" },
                  { text: "workflow = automate(business_ops)", color: "text-foreground" },
                  { text: "result = scale(workflow)", color: "text-foreground" },
                  { text: "" },
                  { text: "return dominate(result)", color: "text-foreground", highlights: [{ text: "return", color: "text-primary" }] },
                ]}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
