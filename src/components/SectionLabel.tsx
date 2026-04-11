import { motion } from "framer-motion";

interface SectionLabelProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionLabel = ({ label, title, description, center = true }: SectionLabelProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`mb-16 ${center ? "text-center" : ""}`}
  >
    <span className="font-mono text-primary text-sm tracking-[0.2em] mb-4 block uppercase">
      [ {label} ]
    </span>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
);

export default SectionLabel;
