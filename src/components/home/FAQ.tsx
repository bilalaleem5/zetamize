import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionLabel from "../SectionLabel";

const faqs = [
  {
    q: "What industries do you work with?",
    a: "We work across a wide range of industries including e-commerce, logistics, healthcare, finance, real estate, and SaaS. Our solutions are adaptable to any sector that has repetitive processes, data-heavy operations, or customer-facing workflows.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects range from 2 to 8 weeks depending on complexity. A focused chatbot or workflow automation can be delivered in 2–3 weeks, while end-to-end ML pipelines or multi-system integrations may take 6–8 weeks.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Absolutely. Every project includes a post-launch support window. We offer monitoring, bug fixes, performance tuning, and offer long-term retainer packages for clients who want ongoing optimization.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes. We specialize in integrating with tools like Salesforce, HubSpot, Slack, Google Workspace, Zapier, n8n, Airtable, and custom APIs. If it has an API, we can connect it into your automated workflows.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We work with both. Startups love us because we move fast and build scrappy, effective solutions. Enterprises value our structured delivery process and ability to navigate complex environments.",
  },
  {
    q: "What makes ZetaMize different?",
    a: "Three things: ownership, outcomes, and transparency. We own the full lifecycle from strategy through deployment. Every deliverable is measured against real business KPIs, with zero surprises.",
  },
];

const FAQItem = ({ faq, isOpen, onClick, index }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    className={`group relative rounded-2xl border border-white/5 bg-black/20 backdrop-blur-3xl transition-all duration-500 overflow-hidden ${
      isOpen ? "ring-1 ring-primary/30" : "hover:border-primary/20 hover:bg-white/5"
    }`}
  >
    {/* Noise Texture Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

    {/* Neon Left Pulse Bar */}
    <div 
      className={`absolute left-0 top-0 bottom-0 w-[4px] bg-primary transition-all duration-500 ${
        isOpen ? "opacity-100 shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]" : "opacity-0 shadow-none"
      }`} 
    />

    <button
      onClick={onClick}
      className="w-full relative flex items-center justify-between p-7 text-left group-hover:pl-8 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <HelpCircle size={18} className={`transition-colors duration-300 ${isOpen ? "text-primary" : "text-primary/40"}`} />
        <span className="text-foreground font-display font-bold text-lg tracking-tight">{faq.q}</span>
      </div>
      <ChevronDown
        size={20}
        className={`text-primary flex-shrink-0 transition-transform duration-500 ${
          isOpen ? "rotate-180" : "opacity-50"
        }`}
      />
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="px-7 pb-7 pl-[52px] text-muted-foreground leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
            <p className="border-l border-primary/20 pl-4">{faq.a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-[#020408]">
      {/* Aura Perspective Grid Background */}
      <div
        className="absolute bottom-0 left-0 w-full h-[30%] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
          maskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      {/* Global Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-video bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.02)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionLabel 
          label="FAQ" 
          title="Deeply Intelligent Support" 
          description="Answers to your most critical technical and strategic inquiries."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-12 items-start">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              faq={faq}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
