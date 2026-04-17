import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link to="/" className="text-2xl font-display font-bold">
            <span className="text-foreground">Zeta</span>
            <span className="text-primary">Mize</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
            Precision-engineered intelligence for businesses ready to scale.
          </p>
          <div className="flex gap-6 mt-6">
            {[Linkedin, Instagram, Mail].map((Icon, i) => {
              const href = Icon === Linkedin ? "https://www.linkedin.com/company/zetamize/?viewAsMember=true" : 
                           Icon === Mail ? "mailto:hello@zetamize.com" : "#";
              return (
                <a key={i} href={href} target={Icon !== Mail ? "_blank" : undefined} rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg bg-white/5 text-muted-foreground hover:text-primary transition-colors">
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-sm tracking-wider uppercase">Company</h4>
          <div className="flex flex-col gap-3">
            {[["About", "/about"], ["Team", "/team"], ["Contact", "/contact"]].map(([n, p]) => (
              <Link key={p} to={p} className="text-muted-foreground text-sm hover:text-primary transition-colors">{n}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-sm tracking-wider uppercase">Services</h4>
          <div className="flex flex-col gap-3">
            {["AI Automation", "Machine Learning", "Chatbot Development", "Process Automation", "Custom Python Apps"].map((s) => (
              <Link key={s} to="/#services" className="text-muted-foreground text-sm hover:text-primary transition-colors">{s}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-sm tracking-wider uppercase">Connect</h4>
          <div className="flex flex-col gap-3">
            <a href="mailto:hello@zetamize.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">hello@zetamize.com</a>
            <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">Contact Form</Link>
            <a href="https://www.linkedin.com/company/zetamize/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-xs">© 2025 ZetaMize. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
