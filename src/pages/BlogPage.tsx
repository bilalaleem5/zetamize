import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const posts = [
  { title: "The Rise of AI Agents: What It Means for Business Automation", category: "AI Trends", excerpt: "AI agents are reshaping how businesses operate. Here's what you need to know about the shift from simple chatbots to autonomous systems.", author: "Zain Malik", date: "Mar 10, 2025" },
  { title: "Building Production-Grade n8n Workflows: A Complete Guide", category: "Automation", excerpt: "From basic triggers to complex multi-step pipelines — learn how to build n8n workflows that are reliable, maintainable, and scalable.", author: "Ravi Patel", date: "Mar 5, 2025" },
  { title: "Python for Automation: 10 Scripts Every Business Should Have", category: "Python", excerpt: "Practical Python scripts for data processing, web scraping, email automation, and more. Copy, customize, and deploy.", author: "Elena Novak", date: "Feb 28, 2025" },
  { title: "LangChain vs LlamaIndex: Choosing the Right LLM Framework", category: "AI Development", excerpt: "A detailed comparison of the two most popular LLM orchestration frameworks. When to use each and how to get the most out of them.", author: "Amara Chen", date: "Feb 20, 2025" },
  { title: "How We Cut Client Support Costs by 60% with AI Chatbots", category: "Case Study", excerpt: "A deep dive into our RetailX project — from discovery workshop to deployment and the measurable results.", author: "Omar Hassan", date: "Feb 15, 2025" },
  { title: "The Future of RPA: Why AI-Hybrid Workflows Will Win", category: "Automation", excerpt: "Traditional RPA is hitting its ceiling. Here's why combining robotic process automation with AI creates exponentially better outcomes.", author: "Zain Malik", date: "Feb 8, 2025" },
];

const BlogPage = () => (
  <PageWrapper>
    <section className="pt-32 pb-24">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="font-mono text-primary text-sm tracking-[0.2em] mb-4 block">[ BLOG ]</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
            Insights & <span className="text-primary">Ideas</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Thoughts on AI, automation, and building intelligent systems from the ZetaMize team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <span className="text-primary font-mono text-xs tracking-widest opacity-40">[ {p.category.toUpperCase()} ]</span>
              </div>
              <div className="p-6">
                <span className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full">{p.category}</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-4 mb-3 leading-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span>{p.author}</span> · <span>{p.date}</span>
                  </div>
                  <a href="#" className="text-primary font-mono text-xs tracking-widest flex items-center gap-1 group/link">
                    READ <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default BlogPage;
