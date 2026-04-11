import { motion } from "framer-motion";
import { X, Eye, Star, Clock, Activity, ChevronDown } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl"
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 pointer-events-none">
        <motion.div
          layoutId={`card-${project.title}`}
          className="bg-[#080A10] w-full h-full md:h-[90vh] md:max-w-7xl md:rounded-[2.5rem] md:border border-white/10 overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row relative"
        >
          {/* Close Button mobile & absolute */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md z-50 border border-white/10 group shadow-2xl"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left Side: Media Gallery (Sticky) */}
          <div className="w-full md:w-1/2 h-64 md:h-full bg-black relative flex-shrink-0 border-r border-white/5 overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory hide-scroll">
            <style>{`.hide-scroll::-webkit-scrollbar { display: none; } .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            
            {/* Primary Cover Image */}
            <div className="w-full h-full min-h-full snap-start relative group flex items-center justify-center bg-black/90 overflow-hidden">
              {/* Blurred Backing for Premium Feel across mixed aspect ratios */}
              <div className="absolute inset-0 pointer-events-none">
                <img src={project.image} alt="" loading="lazy" className="w-full h-full object-cover blur-[40px] opacity-20 scale-110 transform-gpu" />
              </div>

              <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-contain relative z-10 p-4 drop-shadow-2xl" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A10] via-transparent to-transparent opacity-60 md:hidden z-10" />
              
              <div className="absolute bottom-6 left-6 md:hidden z-20">
                <span className="text-primary font-mono text-xs tracking-[0.3em] font-bold opacity-80 uppercase px-3 py-1 bg-black/50 rounded-full border border-primary/20 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Scroll Indicator if videos exist */}
              {project.videos && project.videos.length > 0 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
                  <span className="text-white/80 font-mono text-[10px] tracking-[0.2em] uppercase bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                    Scroll for Proof
                  </span>
                  <ChevronDown size={20} className="text-white/70" />
                </div>
              )}
            </div>

            {/* Render video proofs if available */}
            {project.videos && project.videos.map((vid, idx) => (
              <div key={idx} className="w-full h-full min-h-full snap-start relative border-t border-white/5 bg-black/50 flex items-center justify-center">
                 <video 
                  src={vid} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls
                  preload="metadata"
                  className="w-full max-h-full object-contain"
                />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <Activity size={16} className="text-red-500 animate-pulse" />
                  <span className="text-white/60 font-mono text-xs tracking-widest uppercase bg-black/60 px-2 py-1 rounded border border-white/10">Proof Recording {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Detailed Content (Scrollable) */}
          <div className="w-full md:w-1/2 h-[calc(100%-16rem)] md:h-full bg-gradient-to-br from-[#080A10] to-[#0A0D14] overflow-y-auto custom-scrollbar p-8 md:p-14 relative z-10">
            
            <div className="hidden md:inline-block mb-10">
              <span className="text-primary font-mono text-xs tracking-[0.3em] font-bold opacity-80 uppercase px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md">
                [ {project.category} ]
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 leading-tight tracking-tight">
              {project.title}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-white/5 text-white/80 font-mono text-xs font-bold tracking-wider rounded-lg border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-10" />

            <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium prose-headings:text-white prose-a:text-primary">
              <div className="whitespace-pre-wrap text-base md:text-lg">
                {project.fullDesc}
              </div>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-6 md:gap-10 text-muted-foreground text-sm font-mono pt-10 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Eye size={18} className="text-primary" />
                </div>
                <span>{project.views.toLocaleString()} <span className="opacity-50 text-xs tracking-widest uppercase">Views</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Star size={18} className="text-primary" />
                </div>
                <span>{project.rating} <span className="opacity-50 text-xs tracking-widest uppercase">Rating</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Clock size={18} className="text-primary" />
                </div>
                <span>{project.time} <span className="opacity-50 text-xs tracking-widest uppercase">Timeline</span></span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProjectModal;
