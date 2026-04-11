import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="w-full h-[1px] relative overflow-visible flex items-center justify-center my-12 md:my-20">
      {/* Continuous Neon Line */}
      <div className="absolute inset-0 w-full h-full flex items-center">
        <div className="h-[1px] w-full bg-primary/30 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]" />
      </div>
      
      {/* Central Power Core (Modified to not look like a dash) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="absolute w-4 h-4 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="absolute w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#fff]" />
      </div>
    </div>
  );
};

export default SectionDivider;
