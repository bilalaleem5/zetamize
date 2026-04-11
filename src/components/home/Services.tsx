import { motion } from "framer-motion";
import { Bot, Brain, MessageSquare, Workflow, Code, ChevronRight, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "../SectionLabel";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    description: "Automate complex workflows end-to-end using intelligent agents and no-code pipelines.",
    isFeatured: true,
    image: "/imageforourcapability - Copy.jpg",
    features: ["Agentic Workflows", "Low-Code Pipelines", "SDR Automation", "HR & Recuitment AI"]
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Custom AI models and neural networks tailored to your needs.",
    features: ["Deep Learning Models", "Computer Vision", "NLP", "Predictive Analytics"]
  },
  {
    icon: MessageSquare,
    title: "Chatbot Development",
    description: "Intelligent conversational AI systems that enhance experiences.",
    features: ["LLM Integration", "Multi-platform", "Context Awareness", "24/7 Automation"]
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline operations with intelligent automation.",
    features: ["Workflow Automation", "Data Processing", "API Integration", "Scheduling"]
  },
  {
    icon: Code,
    title: "Custom Python Apps",
    description: "Scalable Python applications built with modern frameworks.",
    features: ["FastAPI", "Django Apps", "Data Science Tools", "Cloud Integration"]
  },
];

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

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const isFeatured = service.isFeatured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={`relative group h-full rounded-[24px] border border-primary/20 bg-[#080A10] hover:border-primary/60 transition-all duration-500 overflow-hidden flex flex-col ${isFeatured ? 'lg:col-span-2' : ''} shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
    >
      <BorderBeam duration={isFeatured ? 12 : 20} size={isFeatured ? 400 : 200} delay={index * 2} />

      <div className={`p-6 md:p-8 flex flex-col h-full ${isFeatured ? 'lg:flex-row lg:items-center gap-10' : ''}`}>
        <div className={`flex flex-col h-full flex-grow ${isFeatured ? 'lg:max-w-[50%]' : ''}`}>
          {/* Icon Box */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <service.icon size={24} />
          </div>

          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-6 font-medium">
            {service.description}
          </p>

          {/* Features List */}
          <div className={`grid ${isFeatured ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-3 mb-8`}>
            {service.features?.map((feature: string) => (
              <div key={feature} className="flex items-center gap-3 group/item">
                <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/item:scale-125 transition-transform shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)] shrink-0" />
                <span className="text-[11px] md:text-xs text-muted-foreground font-semibold group-hover/item:text-foreground transition-colors tracking-wide truncate">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-mono text-[9px] tracking-widest uppercase hover:gap-3 transition-all duration-300 pb-1 border-b-2 border-primary/20 hover:border-primary"
            >
              LEARN MORE
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>

        {isFeatured && (
          <div className="hidden lg:block relative flex-grow h-[300px] rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-500 shadow-2xl">
            <img
              src={service.image}
              alt="AI Core"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />

            {/* HUD Elements */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-xl"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/30 rounded-bl-xl"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            />

            {/* Scanning Line */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Background Icon */}
      <div className="absolute -bottom-8 -right-8 opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-1000 pointer-events-none">
        <service.icon size={200} strokeWidth={1} />
      </div>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="py-24 relative overflow-hidden bg-background">
    {/* Global Background Ambiance */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <SectionLabel
        label="OUR CAPABILITIES"
        title="High-velocity engineering-as-a-service."
        description="Scalable, intelligent systems built for high-performance enterprise workflows."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
