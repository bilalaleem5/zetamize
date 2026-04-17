import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/#services" },
  { name: "Technologies", path: "/#technologies" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("/#")) {
      const id = path.substring(2);
      
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      {/* FULL-WIDTH Neon Header Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-24 h-[0.5px] bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)]" />
          <div className="absolute w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#fff]" />
        </div>
      </div>

      <div className="container mx-auto flex items-center h-20 px-4">
        {/* Logo - Left */}
        <div className="w-1/4 flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="ZetaMize Logo" className="h-12 md:h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
          {links.map((l) => {
            const isActive = l.path === "/" 
              ? location.pathname === "/" && !location.hash
              : l.path.startsWith("/#")
                ? location.hash === l.path.substring(1)
                : location.pathname === l.path;

            return (
              <Link
                key={l.path}
                to={l.path}
                onClick={(e) => handleLinkClick(e, l.path)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`} />
              </Link>
            );
          })}
        </div>

        {/* Action Button - Right */}
        <div className="hidden lg:flex w-1/4 justify-end">
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-full hover:glow-box transition-all duration-300 active:scale-95 translate-z-0"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2 hover:text-primary transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto py-6 flex flex-col gap-4 px-4">
              {links.map((l) => {
                const isActive = l.path === "/" 
                  ? location.pathname === "/" && !location.hash
                  : l.path.startsWith("/#")
                    ? location.hash === l.path.substring(1)
                    : location.pathname === l.path;

                return (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={(e) => handleLinkClick(e, l.path)}
                    className={`text-lg font-medium py-2 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {l.name}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-center rounded-full"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
