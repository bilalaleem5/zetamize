import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Star, Clock, X } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { projects, Project } from "../data/projects";
import ProjectModal from "../components/ProjectModal";

const filters = ["All", "Request Scraping", "Selenium Scraping", "Social Automation", "N8n Automation"];

const PortfolioPage = () => {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <PageWrapper>
      <section className="pt-32 pb-24 relative min-h-screen">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="font-mono text-primary text-sm tracking-[0.2em] mb-4 block">[ PORTFOLIO ]</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              Our <span className="text-primary">Work</span>
            </h1>
          </motion.div>

          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full font-mono text-sm transition-all duration-300 ${active === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layoutId={`card-${p.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedProject(p)}
                className="cursor-pointer break-inside-avoid group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/10"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 transform-gpu" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent/20" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-primary font-mono text-[10px] tracking-widest border border-primary/20">
                    [ {p.category.toUpperCase()} ]
                  </span>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 bg-primary text-primary-foreground font-bold text-sm rounded-full flex items-center gap-2">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-1">{p.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PortfolioPage;
