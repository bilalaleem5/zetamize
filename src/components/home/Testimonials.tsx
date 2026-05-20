import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionLabel from "../SectionLabel";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Total transformation.",
    name: "Ahmed R.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5
  },
  {
    quote: "The AI chatbot cut support tickets by 60%. Incredible ROI.",
    name: "Sara K.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4
  },
  {
    quote: "Professional, fast, and strategically aware. They understood our complex business nuances perfectly.",
    name: "Usman A.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.5
  },
  {
    quote: "Technical depth is truly unmatched. Our AI core is now functionally indestructible.",
    name: "Elena M.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => {
      const isFull = i + 1 <= Math.floor(rating);
      const isHalf = i + 1 > Math.floor(rating) && i < rating;
      return (
        <div key={i} className="relative w-[14px] h-[14px]">
          <Star size={14} className="text-white/10 fill-white/10" />
          {isFull && (
            <Star size={14} className="absolute inset-0 text-primary fill-primary animate-pulse" />
          )}
          {isHalf && (
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star size={14} className="text-primary fill-primary" />
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const TestimonialCard = ({ t, offset = false }: { t: typeof testimonials[0]; offset?: boolean }) => (
  <div className={`flex-shrink-0 w-[340px] mx-6 group relative ${offset ? 'translate-y-8' : ''}`}>
    <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-3xl hover:border-primary/20 transition-all duration-500 overflow-hidden translate-z-0">
      {/* Decorative Quote Mark */}
      <Quote className="absolute -top-4 -right-4 w-32 h-32 text-primary/5 -rotate-12 group-hover:text-primary/10 transition-colors" />
      
      <StarRating rating={t.rating} />

      <p className="text-foreground/80 leading-relaxed mb-8 text-lg font-medium relative z-10 italic whitespace-normal">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-4 relative z-10 mt-auto">
        <div className="w-12 h-12 rounded-full border border-primary/20 p-0.5 overflow-hidden group-hover:border-primary/40 transition-colors duration-500">
          <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
        </div>
        <div>
          <p className="text-foreground font-bold text-base tracking-tight">{t.name}</p>
        </div>
      </div>
      
      {/* Active Bottom Pulse */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </div>
  </div>
);

const NeuralHeartbeat = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1440 400" className="text-primary">
      <path
        d="M 0 200 L 200 200 L 230 150 L 260 250 L 290 200 L 500 200 L 530 50 L 570 350 L 610 200 L 1000 200 L 1030 180 L 1060 220 L 1090 200 L 1440 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="animate-[dash_10s_linear_infinite]"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
    </svg>
    <style>{`
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
  </div>
);

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials]; // Triple items for smoother seamless scroll

  return (
    <section className="py-12 relative overflow-hidden bg-[#020408]">
      <NeuralHeartbeat />
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-video bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10 mb-8">
        <SectionLabel 
          label="CLIENT EXPERIENCE" 
          title="Where Strategy Meets Execution" 
          description="Real partners. Measurable outcomes. Systems that scale."
        />
      </div>

      <div className="relative flex overflow-hidden py-4 will-change-transform">
        <motion.div
          animate={{ x: [0, "-33.33%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden py-10 mt-2 will-change-transform">
        <motion.div
          animate={{ x: ["-33.33%", 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`${t.name}-rev-${i}`} t={t} offset={true} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
