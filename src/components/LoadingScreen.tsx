import { motion } from "framer-motion";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-display font-bold mb-8"
    >
      <span className="text-foreground">Zeta</span>
      <span className="text-primary">Mize</span>
    </motion.div>
    <div className="w-48 h-0.5 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full origin-center"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  </motion.div>
);

export default LoadingScreen;
