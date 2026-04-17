import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Activity, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, Project } from "../../data/projects";
import ProjectModal from "../ProjectModal";
import SectionLabel from "../SectionLabel";

const featuredProjects = projects.filter(p => [
  "ZetaFin",
  "ZetAI",
  "ZetaAgent"
].includes(p.title));

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer group relative h-[500px] rounded-[24px] border border-primary/20 bg-[#080A10] overflow-hidden flex flex-col hover:border-primary/60 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      <BorderBeam duration={20} size={300} delay={index * 2} />

      {/* Image Section */}
      <div style={{ transform: "translateZ(20px)" }} className="relative h-2/3 overflow-hidden border-b border-white/5">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A10] via-transparent to-transparent opacity-90" />
        
        {/* HUD: Scanning Line */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* View Details Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="px-6 py-2 bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-[0.2em] rounded-full flex items-center gap-2 shadow-2xl">
            VIEW_PROJECT <Eye size={14} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ transform: "translateZ(40px)" }} className="p-8 flex flex-col flex-grow relative bg-[#080A10]/80 backdrop-blur-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-primary font-mono text-[9px] tracking-widest uppercase mb-1 block">
              {project.category}
            </span>
            <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              {project.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45 transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium line-clamp-2">
          {project.shortDesc}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {project.stats?.label || "Status"}: {project.stats?.val || "Active"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-mono font-bold tracking-widest">5.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPreview = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionLabel
          label="SHOWCASE"
          title="Impactful Engineering."
          description="A curated collection of autonomous agents and high-performance AI systems built for production."
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuredProjects.map((project, i) => (
            <PrimeCard key={project.title} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/portfolio"
            className="group relative px-10 py-5 bg-white/5 border border-white/10 text-foreground font-mono text-xs tracking-[0.3em] font-bold rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">VIEW_FULL_ARCHIVE</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioPreview;
