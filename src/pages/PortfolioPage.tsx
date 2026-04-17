import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Star, Eye, Search, Filter } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { projects, Project } from "../data/projects";
import ProjectModal from "../components/ProjectModal";

const filters = ["All", "Voice AI", "Autonomous Agents", "AI Marketplace", "Request Scraping", "Selenium Scraping", "Social Automation", "N8n Automation"];

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
          offsetPath: "rect(0 auto auto 0 round 24px)",
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

const PrimeCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer group relative h-[500px] rounded-[24px] border border-primary/20 bg-[#080A10] overflow-hidden flex flex-col hover:border-primary/60 transition-all duration-500 shadow-2xl"
    >
      <BorderBeam duration={20} size={300} delay={index * 0.5} />

      <div style={{ transform: "translateZ(20px)" }} className="relative h-1/2 overflow-hidden border-b border-white/5">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A10] via-transparent to-transparent opacity-90" />
        
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="px-6 py-2 bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-[0.2em] rounded-full flex items-center gap-2 shadow-2xl">
            DETAILS <Eye size={14} />
          </div>
        </div>
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="p-6 flex flex-col flex-grow relative bg-[#080A10]/80 backdrop-blur-md">
        <div className="mb-4">
          <span className="text-primary font-mono text-[9px] tracking-widest uppercase mb-1 block">
            {project.category}
          </span>
          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors pr-8">
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground text-[13px] leading-relaxed mb-6 font-medium line-clamp-2">
          {project.shortDesc}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] font-mono text-muted-foreground rounded-lg group-hover:border-primary/30 group-hover:text-primary transition-colors">
                {t}
              </span>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Rating:
              </span>
              <div className="flex items-center gap-1 text-primary">
                <Star size={10} fill="currentColor" />
                <span className="text-[11px] font-bold">5.0</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-muted-foreground border border-white/10 rounded p-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 relative min-h-screen bg-background overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[2px] bg-primary" />
              <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase font-bold">Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8">
              The <span className="text-primary italic">Collection.</span>
            </h1>
          </motion.div>

          {/* Static Filter Grid for Mobile & Flex for Desktop */}
          <div className="sticky top-24 z-40 mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-4 py-3 rounded-xl font-mono text-[10px] tracking-widest uppercase font-black transition-all duration-300 border ${
                    active === f
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PrimeCard
                  key={p.title}
                  project={p}
                  index={i}
                  onClick={() => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-mono text-muted-foreground text-sm tracking-widest uppercase">
                ERROR: NO_PROJECTS_FOUND_IN_NAMESPACE
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PortfolioPage;
