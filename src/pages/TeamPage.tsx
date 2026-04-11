import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const team = [
  { name: "Zain Malik", role: "Founder & AI Lead", bio: "10+ years in AI/ML, previously led automation at a Fortune 500 company. Obsessed with building systems that scale." },
  { name: "Amara Chen", role: "ML Engineer", bio: "PhD in Computer Science. Specializes in NLP and predictive modeling. Published researcher with 15+ papers." },
  { name: "Ravi Patel", role: "Automation Specialist", bio: "n8n and Make.com expert. Has designed 200+ automation workflows across logistics, e-commerce, and fintech." },
  { name: "Elena Novak", role: "Full Stack Developer", bio: "React & Python powerhouse. Builds the interfaces and APIs that make our AI systems accessible and beautiful." },
  { name: "Omar Hassan", role: "Business Development", bio: "Bridges the gap between business needs and technical solutions. 8 years in B2B tech consulting." },
];

const TeamPage = () => (
  <PageWrapper>
    <section className="pt-32 pb-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-primary text-sm tracking-[0.2em] mb-4 block">[ OUR TEAM ]</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              The Minds Behind <span className="text-primary">ZetaMize</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We dare to dream. A lean, senior team of AI engineers, automation specialists, and strategists united by one mission: building intelligent systems that deliver real business impact.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-6 flex items-center justify-center text-primary font-display font-bold text-2xl">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-1">{m.name}</h3>
              <p className="text-primary font-mono text-xs tracking-widest mb-4">{m.role.toUpperCase()}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{m.bio}</p>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default TeamPage;
