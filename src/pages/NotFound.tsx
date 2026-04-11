import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const NotFound = () => (
  <PageWrapper>
    <section className="min-h-svh flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-[12rem] md:text-[16rem] font-display font-bold leading-none text-transparent" style={{ WebkitTextStroke: "2px hsl(var(--primary))" }}>
          404
        </h1>
        <p className="text-muted-foreground text-xl mb-8">Lost in the machine?</p>
        <Link
          to="/"
          className="inline-flex px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,183,255,0.4)] transition-all"
        >
          Back to Base →
        </Link>
      </motion.div>
    </section>
  </PageWrapper>
);

export default NotFound;
