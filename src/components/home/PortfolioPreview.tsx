import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Activity, Eye, Star, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "../SectionLabel";
import { projects, Project } from "../../data/projects";
import ProjectModal from "../ProjectModal";

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

const PortfolioCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer group relative h-full rounded-[24px] border border-white/5 bg-[#080A10] overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500 shadow-2xl"
    >
      <BorderBeam duration={20} size={300} delay={index * 3} />

      {/* Image Container */}
      <div style={{ transform: "translateZ(20px)" }} className="relative h-64 overflow-hidden border-b border-white/5">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {project.stats && (
          <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
            <Activity size={12} className="text-primary animate-pulse" />
            <span className="text-[9px] font-mono text-primary/80 tracking-widest uppercase">{project.stats.label}: {project.stats.val}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ transform: "translateZ(40px)" }} className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-2">
            {project.title}
          </h3>
          <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all flex-shrink-0 ml-4" />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium line-clamp-2">
          {project.shortDesc}
        </p>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t: string) => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-muted-foreground rounded-full group-hover:border-primary/20 group-hover:text-primary/80 transition-all">
                {t}
              </span>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 to-transparent" />

          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
            <div className="flex items-center gap-2 text-primary whitespace-nowrap overflow-hidden text-ellipsis mr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {project.metric || "ACTIVE_SYNC"}
            </div>
            <span className="text-muted-foreground/30 uppercase tracking-[0.3em] flex-shrink-0">PROD</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionLabel
          label="OUR WORK"
          title="Impactful Engineering."
          description="Scalable, production-ready AI systems that solve real-world operational challenges."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {featuredProjects.map((project, i) => (
            <PortfolioCard key={project.title} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 text-foreground font-mono text-xs tracking-[0.2em] font-bold rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 group shadow-xl"
          >
            EXPLORE_FULL_ARCHIVE
            <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
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
