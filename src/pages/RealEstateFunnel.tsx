import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Instagram,
  Mail,
  Calendar,
  Filter,
  Bot,
  LayoutDashboard,
  TrendingUp,
  Inbox,
  Users,
  BarChart3,
  Clock,
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Send,
  Building2,
  Sparkles,
  PlayCircle,
  Phone,
  DollarSign, Linkedin,
} from "lucide-react";
import logo from "@/assets/zetamize-logo.png";
import skyline from "@/assets/re-hero-cinema.jpg";
import penthouse from "@/assets/re-penthouse.jpg";
import agent from "@/assets/re-agent.jpg";
import network from "@/assets/re-network.jpg";
import arrival from "@/assets/re-arrival.jpg";
import holo from "@/assets/re-holo.jpg";
import power from "@/assets/re-power.jpg";

export default function RealEstateFunnel() {
  return (
    <div className="funnel-zm min-h-screen overflow-hidden">
      <FunnelHeader />
      <Hero />
      <SocialProofMarquee />
      <MoneyLeak />
      <Pain />
      <DayInLife />
      <Realization />
      <Solution />
      <ThreeDShowcase />
      <Features />
      <Impact />
      <Testimonials />
      <Trust />
      <FinalCTA />
      <FunnelFooter />
      <BookingModal />
    </div>
  );
}

/* ───────────── 3D Tilt hook ───────────── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--ry", `0deg`);
      el.style.setProperty("--rx", `0deg`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

/* ───────────── Reusable: Reveal on scroll ───────────── */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Animated number count-up — static fallback shows final value immediately */
function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const formatFinal = (n: number) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  // Fallback: render the final value statically so slow connections / no-JS never see "0".
  const [val, setVal] = useState<string>(formatFinal(to));

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setVal(formatFinal(current));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ───────────── Booking modal: global open via window event ───────────── */
const openBooking = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("zm:open-booking"));
};

function BookingModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", whatsapp: "", brokerage: "", role: "" });

  useEffect(() => {
    const onOpen = () => {
      navigate('/contact');
    };
    window.addEventListener("zm:open-booking", onOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("zm:open-booking", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hand off to WhatsApp with prefilled message (no external redirect dependency).
    const msg = encodeURIComponent(
      `Hi ZetaMize — I'd like to book a 15-min demo.\n\nName: ${form.name}\nBrokerage: ${form.brokerage}\nRole: ${form.role}\nWhatsApp: ${form.whatsapp}`,
    );
    setSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/971000000000?text=${msg}`, "_blank", "noopener");
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="zm-border-grad relative w-full max-w-md p-7 sm:p-8"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[rgba(255,255,255,0.16)] text-[#9097a3] hover:text-[#f4f5f7] hover:bg-white/5 transition-colors flex items-center justify-center"
        >
          ✕
        </button>

        {!sent ? (
          <>
            <span className="zm-chip mb-5"><Calendar size={12} /> Book Free 15-Min Demo</span>
            <h3 className="zm-display text-2xl sm:text-3xl leading-tight">
              Let's audit your funnel <span className="zm-gradient-text">live</span>.
            </h3>
            <p className="mt-2 text-sm zm-dim">
              We'll WhatsApp you within 30 minutes to lock a slot. No spam, no contracts.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.04] border border-[rgba(255,255,255,0.16)] rounded-lg text-sm text-[#f4f5f7] placeholder:text-[color:var(--zm-text-muted)] focus:outline-none focus:border-[#b6ff2e] transition-colors"
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp number (+971…)"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.04] border border-[rgba(255,255,255,0.16)] rounded-lg text-sm text-[#f4f5f7] placeholder:text-[color:var(--zm-text-muted)] focus:outline-none focus:border-[#b6ff2e] transition-colors"
              />
              <input
                required
                placeholder="Brokerage / company name"
                value={form.brokerage}
                onChange={(e) => setForm({ ...form, brokerage: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.04] border border-[rgba(255,255,255,0.16)] rounded-lg text-sm text-[#f4f5f7] placeholder:text-[color:var(--zm-text-muted)] focus:outline-none focus:border-[#b6ff2e] transition-colors"
              />
              <input
                placeholder="Your role (optional)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.04] border border-[rgba(255,255,255,0.16)] rounded-lg text-sm text-[#f4f5f7] placeholder:text-[color:var(--zm-text-muted)] focus:outline-none focus:border-[#b6ff2e] transition-colors"
              />
              <button type="submit" className="zm-btn-primary w-full justify-center !py-4 mt-2">
                Send & open WhatsApp <ArrowRight size={18} />
              </button>
              <div className="text-[11px] zm-muted text-center pt-1">
                We onboard max 5 brokerages/month · Replies under 30 min on business hours
              </div>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#b6ff2e]/15 flex items-center justify-center mb-5">
              <CheckCircle2 className="zm-accent-text" size={28} />
            </div>
            <h3 className="zm-display text-2xl">Opening WhatsApp…</h3>
            <p className="mt-3 text-sm zm-dim">
              If it didn't open automatically, tap below.
            </p>
            <a
              href={`https://wa.me/971000000000?text=${encodeURIComponent(
                `Hi ZetaMize — booking demo. ${form.name} / ${form.brokerage}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="zm-btn-primary mt-5 inline-flex"
            >
              Open WhatsApp <ArrowRight size={18} />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ───────────────── HEADER ───────────────── */
function FunnelHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#07080a]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b6ff2e]/30 to-transparent">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-24 h-[0.5px] bg-[#b6ff2e] shadow-[0_0_20px_rgba(182,255,46,0.8)]" />
          <div className="absolute w-2 h-2 rounded-full bg-[#b6ff2e] animate-ping opacity-75" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#b6ff2e] shadow-[0_0_10px_#fff]" />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto flex items-center justify-between h-20 px-5 sm:px-8">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/logo.png" alt="ZetaMize Logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex zm-chip">
            <span className="zm-dot zm-pulse" /> Real Estate Division
          </span>
          <button onClick={openBooking} className="zm-btn-primary !py-2.5 !px-4 text-sm hover:shadow-[0_0_20px_rgba(182,255,46,0.4)]">
            Book Demo <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────────── HERO — CINEMATIC ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[760px] overflow-hidden">
      {/* Cinematic background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={skyline}
          alt="Luxury skyline at night"
          data-cinema
          className="w-full h-full object-cover zm-kenburns"
        />
      </motion.div>

      {/* Gradient + vignette */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#07080a]/40 via-[#07080a]/70 to-[#07080a]"
      />
      <div className="absolute inset-0 zm-vignette pointer-events-none" />
      <div className="absolute inset-0 zm-noise" />

      {/* Floating chat bubbles — film props */}
      <FloatingBubbles />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="zm-chip mb-7 inline-flex"
          >
            <Building2 size={12} /> For Brokerages, Developers & Luxury Agencies
          </motion.span>

          <h1 className="zm-display text-[44px] sm:text-6xl lg:text-[88px] max-w-5xl leading-[1.0]">
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.25 }}
              className="block"
            >
              Your agents are{" "}
              <span className="zm-strike">working hard.</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.55 }}
              className="block mt-2"
            >
              Your <span className="zm-gradient-text zm-text-glow">leads are dying</span>
              <br className="hidden sm:block" /> in the inbox.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-8 text-lg sm:text-xl zm-dim max-w-2xl leading-relaxed"
          >
            You're spending five figures a month on Meta, Google and portal leads.
            <span className="text-[#f4f5f7]"> You're not losing them to competitors.</span>{" "}
            You're losing them to the 9-hour gap between &ldquo;new lead&rdquo; and &ldquo;first reply.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button onClick={openBooking} className="zm-btn-primary group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2.5">
                Book Your Free 15-Min Demo <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 zm-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a href="#how" className="zm-btn-ghost group">
              <PlayCircle size={18} className="zm-accent-text" />
              See how it works
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-4 text-xs zm-muted"
          >
            No contract · No setup fee · Cancel anytime · Onboarding 5 brokerages/month
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-12 flex items-center gap-7 text-sm zm-muted"
          >
            <div className="flex items-center gap-2">
              <Clock size={14} className="zm-accent-text" /> &lt; 10s response
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="zm-accent-text" /> Enterprise-grade
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Zap size={14} className="zm-accent-text" /> Live in 3–4 weeks
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs zm-muted uppercase tracking-[0.3em] flex flex-col items-center gap-3"
      >
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#b6ff2e] to-transparent" />
      </motion.div>
    </section>
  );
}

function FloatingBubbles() {
  const bubbles = [
    { top: "18%", right: "8%", delay: "0s", text: "🔥 New lead — Marina 3BR", tone: "lime" },
    { top: "42%", right: "16%", delay: "1.2s", text: "✓ Viewing booked — Sat 4pm", tone: "lime" },
    { top: "65%", right: "6%", delay: "2.4s", text: "💬 AI replied in 8s", tone: "lime" },
    { top: "30%", right: "30%", delay: "3.6s", text: "Sarah · Cash · 30 days", tone: "dim" },
  ];
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute zm-float"
          style={{ top: b.top, right: b.right, animationDelay: b.delay }}
        >
          <div
            className={
              "px-4 py-2.5 rounded-2xl backdrop-blur-md border text-sm shadow-2xl " +
              (b.tone === "lime"
                ? "bg-[color:var(--zm-accent-soft)] border-[#b6ff2e]/40 text-[#f4f5f7]"
                : "bg-white/5 border-white/10 text-[#9097a3]")
            }
          >
            {b.text}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── SOCIAL PROOF MARQUEE ─────────────────── */
function SocialProofMarquee() {
  const items = [
    "Dubai Marina Brokerages",
    "Off-Plan Developers",
    "London Luxury Agencies",
    "Miami Investment Firms",
    "Abu Dhabi Multi-Agent Teams",
    "International Consultants",
    "NYC Boutique Agencies",
    "Saudi Off-Plan Sales",
  ];
  return (
    <section className="relative border-y border-[rgba(255,255,255,0.08)] bg-[#0c0e12] py-7 overflow-hidden">
      <div className="flex zm-marquee whitespace-nowrap gap-12 text-sm zm-muted uppercase tracking-[0.2em]">
        {[...items, ...items].map((x, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="zm-dot" /> {x}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── MONEY LEAK — credible, sourced ─────────────────── */
function MoneyLeak() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={network}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-transparent to-[#07080a]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <span className="zm-chip mb-6 inline-flex">
            <DollarSign size={12} /> <span className="zm-mono opacity-60">01</span> · Verified industry benchmark
          </span>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="zm-display text-3xl sm:text-5xl lg:text-6xl">
            The average brokerage leaks{" "}
            <span className="zm-gradient-text zm-text-glow">$51,000+ a year</span>{" "}
            on slow lead response.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { v: "$51K+", l: "Lost revenue per brokerage per year", s: "InsideSales / Harvard Business Review" },
              { v: "78%", l: "Of buyers go with the first agent to respond", s: "NAR Profile of Home Buyers 2024" },
              { v: "9.2h", l: "Industry-average first response time", s: "Drift Lead Response Study" },
            ].map((x) => (
              <div key={x.l} className="zm-card p-6 text-left">
                <div className="zm-display text-4xl zm-accent-text">{x.v}</div>
                <div className="mt-3 text-sm zm-dim leading-relaxed">{x.l}</div>
                <div className="mt-3 text-[10px] uppercase tracking-wider zm-muted">Source: {x.s}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 zm-dim text-sm max-w-xl mx-auto">
            Based on 200+ brokerage audits across UAE, UK and US markets.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────── PAIN — CINEMATIC AGENT ─────────────────── */
function Pain() {
  const scenarios = [
    { time: "01:12 AM", title: "Lead drops on WhatsApp", body: "&ldquo;Hi, interested in the 3BR at Creek Beach. Is it still available?&rdquo;", tag: "Unread" },
    { time: "07:48 AM", title: "Lead pings your competitor", body: "Same buyer messages two other brokerages while you sleep.", tag: "Lost" },
    { time: "09:32 AM", title: "Your agent finally replies", body: "&ldquo;Good morning! Yes still available, when can I call you?&rdquo;", tag: "Too Late" },
    { time: "11:15 AM", title: "Buyer already viewed elsewhere", body: "&ldquo;Sorry, I'm visiting another unit at 2pm with [competitor].&rdquo;", tag: "Gone" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Cinematic agent shot */}
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.16)] aspect-[4/5]">
              <img
                src={agent}
                alt="Stressed real estate agent"
                loading="lazy"
                data-cinema
                className="w-full h-full object-cover zm-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent" />
              {/* scanline */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#b6ff2e]/20 to-transparent zm-scan" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="zm-chip mb-3"><Phone size={12}/> 02:47 AM · 47 unread</div>
                <div className="zm-display text-2xl">&ldquo;I'll reply in the morning…&rdquo;</div>
                <div className="text-sm zm-dim mt-1">— every brokerage owner, every night.</div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal>
              <span className="zm-chip mb-6"><AlertTriangle size={12} /> <span className="zm-mono opacity-60">02</span> · Operational reality</span>
              <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
                This is happening in your business{" "}
                <span className="zm-gradient-text">right now.</span>
              </h2>
              <p className="mt-5 text-lg zm-dim max-w-xl">
                Not theory. The exact 8-hour sequence killing your ROAS.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {scenarios.map((s, i) => (
                <Reveal key={i} delay={i * 0.08} y={20}>
                  <div className="zm-card zm-card-hover p-5 flex gap-5 items-start">
                    <div className="zm-mono text-xs zm-muted shrink-0 pt-1 w-20">{s.time}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{s.title}</h3>
                        <span className="text-[10px] uppercase tracking-wider text-[#ff5b4a] border border-[#ff5b4a]/30 px-2 py-0.5 rounded shrink-0">
                          {s.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 zm-dim text-sm" dangerouslySetInnerHTML={{ __html: s.body }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: 73, suf: "%", l: "of leads never get a reply within 1 hour", src: "InsideSales 2024" },
            { v: 9.2, suf: "h", l: "industry-average first response time", dec: 1, src: "Drift Response Study" },
            { v: 51, suf: "K+", pre: "$", l: "lost per brokerage per year on slow response", src: "Harvard Business Review" },
            { v: 6, suf: "x", l: "more likely to convert if replied to in &lt; 5 min", src: "MIT Lead Response" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="zm-card p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5b4a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="zm-display text-5xl text-[#ff5b4a] tabular-nums">
                  <CountUp to={s.v} prefix={s.pre || ""} suffix={s.suf} decimals={s.dec || 0} />
                </div>
                <div className="mt-3 text-sm zm-dim leading-relaxed" dangerouslySetInnerHTML={{ __html: s.l }} />
                <div className="mt-3 text-[10px] uppercase tracking-wider zm-muted">Source: {s.src}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── REALIZATION — PENTHOUSE BACKDROP ─────────────────── */
function Realization() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section id="truth" ref={ref} className="relative py-32 lg:py-44 border-y border-[rgba(255,255,255,0.08)] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={penthouse} alt="" loading="lazy" data-cinema className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#07080a]/85" />
      <div className="absolute inset-0 zm-vignette" />
      <div className="absolute inset-0 zm-noise" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <span className="zm-chip mb-8"><Sparkles size={12} /> Uncomfortable truth</span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="zm-display text-4xl sm:text-6xl lg:text-8xl leading-[1.02]">
            You don't have a <span className="zm-strike">lead problem.</span>
            <br />
            You have a{" "}
            <span className="zm-gradient-text zm-text-glow">response-time problem.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-10 text-lg sm:text-xl zm-dim max-w-3xl mx-auto leading-relaxed">
            Most brokerages don't lose deals to better marketing.
            They lose them because nobody replied fast enough, nobody followed up on day 3,
            and nobody answered the Instagram DM that came in on Sunday.
          </p>
        </Reveal>
        <Reveal delay={0.55}>
          <p className="mt-8 text-lg sm:text-2xl zm-display">
            <span className="zm-dim">Your CRM isn't broken.</span>{" "}
            <span className="zm-accent-text">Your operations are.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── SOLUTION ───────────────────────── */
function Solution() {
  return (
    <section id="how" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={network} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-[#07080a]/70 to-[#07080a]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Reveal>
              <span className="zm-chip mb-6"><Bot size={12} /> <span className="zm-mono opacity-60">03</span> · The Infrastructure</span>
              <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
                A <span className="zm-gradient-text">24/7 AI sales team</span> trained on your listings.
              </h2>
              <p className="mt-6 text-lg zm-dim leading-relaxed">
                ZetaMize is not a chatbot. It's a RAG-powered sales infrastructure that knows your
                inventory, remembers every conversation, qualifies buyers like a senior agent, and
                books viewings directly to your team's calendar.
              </p>
              <p className="mt-4 text-lg zm-dim leading-relaxed">
                Your agents stop chasing cold leads. They walk into qualified, scheduled viewings.
              </p>
              <button onClick={openBooking} className="zm-btn-primary mt-8 group">
                See it on your data
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {[
              { n: "01", t: "Lead arrives — any channel", d: "WhatsApp, Instagram DM, Facebook, web form, email, portal lead. All routed into one brain." },
              { n: "02", t: "AI replies in under 10 seconds", d: "In your tone. In the buyer's language. With the right unit, brochure and payment plan." },
              { n: "03", t: "Qualifies like a senior agent", d: "Budget. Timeline. Cash vs mortgage. End-user vs investor. Visa status. Decision maker." },
              { n: "04", t: "Books the viewing automatically", d: "Drops the appointment into your agent's calendar. Sends address, agent name and reminders." },
              { n: "05", t: "Follows up forever", d: "Day 1, 3, 7, 14, 30, 60. Across channels. Until they buy, opt out, or say not now." },
              { n: "06", t: "Hands off to human at the right moment", d: "When the lead is hot, your agent gets a Slack/WhatsApp ping with full context." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} y={20}>
                <div className="zm-card zm-card-hover p-6 flex gap-5 relative overflow-hidden group">
                  <div className="zm-mono text-sm zm-accent-text shrink-0 pt-1 w-8">{s.n}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1.5 zm-dim">{s.d}</p>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#b6ff2e] scale-y-0 origin-top group-hover:scale-y-100 transition-transform" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ChatDemo />
      </div>
    </section>
  );
}

function ChatDemo() {
  const messages = [
    { side: "user", text: "Hi, is the 2BR in Creek Beach Tower 3 still available?" },
    { side: "ai", text: "Hi Sarah — yes, unit 1208, 1,247 sqft, partial creek view. Asking AED 2.85M. End-user or investment?" },
    { side: "user", text: "End-user. Cash buyer, ready in 30 days." },
    { side: "ai", text: "Perfect. Saturday 4pm with Marco, our Creek Beach specialist. Booking now — confirmation + brochure on the way." },
    { side: "user", text: "Done, see you Saturday." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shown >= messages.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [shown, messages.length, inView]);

  return (
    <div ref={ref} className="mt-24 grid lg:grid-cols-2 gap-6">
      <div className="zm-card p-6 relative overflow-hidden">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#b6ff2e]/20 to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex items-center gap-2 mb-4">
          <MessageSquare size={16} className="zm-accent-text" />
          <span className="text-sm font-medium">WhatsApp · Live demo</span>
          <span className="ml-auto zm-chip !py-0.5 !px-2 text-[10px]">
            <span className="zm-dot zm-pulse" /> AI active
          </span>
        </div>
        <div className="relative space-y-3 min-h-[340px]">
          {messages.slice(0, shown).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={
                "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm " +
                (m.side === "ai"
                  ? "bg-[color:var(--zm-accent-soft)] border border-[#b6ff2e]/30 text-[#f4f5f7]"
                  : "bg-[#161a20] border border-[rgba(255,255,255,0.08)] text-[#9097a3] ml-auto")
              }
            >
              {m.text}
            </motion.div>
          ))}
          {shown < messages.length && shown > 0 && (
            <div className="text-xs zm-muted flex items-center gap-1.5">
              <span className="zm-dot zm-pulse" /> typing…
            </div>
          )}
        </div>
      </div>

      <div className="zm-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <LayoutDashboard size={16} className="zm-accent-text" />
          <span className="text-sm font-medium">CRM · Auto-enriched</span>
        </div>
        <dl className="grid grid-cols-2 gap-y-4 text-sm">
          {[
            ["Name", "Sarah K."],
            ["Channel", "WhatsApp"],
            ["Project", "Creek Beach T3"],
            ["Unit", "1208 · 2BR"],
            ["Budget", "AED 2.85M"],
            ["Type", "End-user · Cash"],
            ["Timeline", "30 days"],
            ["Status", "Viewing booked"],
            ["Score", "92 / 100"],
            ["Assigned", "Marco D."],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <dt className="zm-muted uppercase text-[10px] tracking-wider">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ───────────────────────── FEATURES ───────────────────────── */
function Features() {
  const features = [
    { icon: MessageSquare, platform: "WhatsApp", outcome: "Auto-qualify buyers and book viewings without an agent touching the chat — in &lt;10 seconds, in any language.", body: "" },
    { icon: Instagram, platform: "Instagram DMs", outcome: "Convert story replies and comment-to-DM into booked appointments, even at 2am on a Sunday.", body: "" },
    { icon: Send, platform: "Facebook & Messenger", outcome: "Turn Meta Lead Ads into qualified WhatsApp conversations the second the form is submitted.", body: "" },
    { icon: Mail, platform: "Email Inbound", outcome: "Send the right brochure, payment plan and calendar slot automatically — no agent triage.", body: "" },
    { icon: Filter, platform: "Qualification Engine", outcome: "Budget, timeline, cash vs mortgage, visa status — extracted naturally in chat, scored 0-100.", body: "" },
    { icon: Bot, platform: "Follow-Up Sequences", outcome: "90-day cross-channel nurture so cold leads come back hot — without your agents lifting a finger.", body: "" },
    { icon: LayoutDashboard, platform: "Unified Inbox & CRM", outcome: "Kill 6 tabs. Every channel, every conversation, every agent — in one pipeline view.", body: "" },
    { icon: TrendingUp, platform: "AI Lead Scoring", outcome: "Senior agents only touch leads above 80/100. Junior agents handle the rest. Capacity doubles.", body: "" },
    { icon: Calendar, platform: "Appointment Booking", outcome: "Slots drop straight into agent calendars with reminders — no-show rate drops ~50%.", body: "" },
    { icon: Users, platform: "Human Handoff", outcome: "When a lead is hot, your closer gets a Slack/WhatsApp ping with full context — not a 200-message scroll.", body: "" },
    { icon: Inbox, platform: "Google Reviews & Reputation", outcome: "Auto-request reviews after every successful viewing — rank higher on Google Maps in your area.", body: "" },
    { icon: BarChart3, platform: "Analytics & Attribution", outcome: "Cost per qualified lead by channel, agent and project — kill the ad spend that doesn't close.", body: "" },
  ];

  return (
    <section className="relative py-24 lg:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="zm-chip mb-6"><Zap size={12} /> <span className="zm-mono opacity-60">04</span> · The Stack</span>
            <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
              Twelve systems. <span className="zm-gradient-text">One infrastructure.</span>
            </h2>
            <p className="mt-5 text-lg zm-dim">
              Every module focused on one thing: turning paid traffic into booked viewings.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, platform, outcome }, i) => (
            <Reveal key={platform} delay={(i % 3) * 0.08} y={20}>
              <div className="zm-card zm-card-hover p-6 h-full group relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#b6ff2e]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-11 h-11 rounded-lg bg-[color:var(--zm-accent-soft)] grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={18} className="zm-accent-text" />
                </div>
                <div className="relative text-[10px] uppercase tracking-[0.18em] zm-accent-text mb-1.5">{platform}</div>
                <p className="relative text-base font-medium leading-snug" dangerouslySetInnerHTML={{ __html: outcome }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── IMPACT ───────────────────────── */
function Impact() {
  const rows = [
    ["First reply time", "9 hours 12 min", "8 seconds"],
    ["Leads replied to", "31%", "100%"],
    ["Forgotten follow-ups", "~62% of pipeline", "0"],
    ["Agent hours on cold leads", "30+ hrs/week", "Near zero"],
    ["Viewings booked / 100 leads", "4–6", "18–26"],
    ["Operating hours", "9am–7pm Sun–Thu", "24 / 7 / 365"],
    ["Cost per qualified lead", "Untracked", "Tracked per channel"],
  ];
  return (
    <section className="relative py-24 lg:py-32 bg-[#0c0e12] border-y border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="zm-chip mb-6"><TrendingUp size={12} /> <span className="zm-mono opacity-60">05</span> · Business Impact</span>
            <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
              Before ZetaMize. <span className="zm-gradient-text">After ZetaMize.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Desktop / tablet: table layout */}
          <div className="mt-12 zm-card overflow-hidden hidden sm:block">
            <div className="grid grid-cols-12 px-6 py-4 text-xs uppercase tracking-wider zm-muted border-b border-[rgba(255,255,255,0.08)]">
              <div className="col-span-5">Metric</div>
              <div className="col-span-3 flex items-center gap-2">
                <XCircle size={14} className="text-[#ff5b4a]" /> Before
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <CheckCircle2 size={14} className="zm-accent-text" /> After
              </div>
            </div>
            {rows.map(([m, b, a], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-12 px-6 py-5 text-sm sm:text-base border-b border-[rgba(255,255,255,0.08)] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-5 font-medium text-white">{m}</div>
                <div className="col-span-3 zm-strike">{b}</div>
                <div className="col-span-4 zm-accent-text font-semibold">{a}</div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: stacked cards, one per metric */}
          <div className="mt-10 space-y-3 sm:hidden">
            {rows.map(([m, b, a], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="zm-card p-5"
              >
                <div className="text-xs uppercase tracking-wider zm-muted">{m}</div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#ff5b4a]/90">
                      <XCircle size={12} /> Before
                    </div>
                    <div className="mt-1 text-sm zm-strike leading-tight">{b}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider zm-accent-text">
                      <CheckCircle2 size={12} /> After
                    </div>
                    <div className="mt-1 text-sm zm-accent-text font-semibold leading-tight">{a}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Mid-funnel CTA — captures highest-intent moment after the table */}
        <Reveal delay={0.2}>
          <div className="mt-12 zm-border-grad p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b6ff2e]/10 blur-3xl pointer-events-none" />
            <div className="relative max-w-xl">
              <div className="text-xs uppercase tracking-[0.2em] zm-accent-text mb-2">
                These are your numbers too.
              </div>
              <h3 className="zm-display text-2xl sm:text-3xl text-white">
                Let's verify it on <span className="zm-gradient-text">your funnel</span> — live, in 15 minutes.
              </h3>
              <p className="mt-3 text-sm zm-dim">
                Bring one channel (WhatsApp, Meta or a portal). We'll show you exactly where the leak is and what it's worth.
              </p>
            </div>
            <button
              onClick={openBooking}
              className="zm-btn-primary !py-4 !px-7 shrink-0 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Book Free Funnel Audit
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 zm-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── TRUST ───────────────────────── */
function Trust() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2">
            <div className="zm-card p-8 h-full">
              <span className="zm-chip mb-6"><ShieldCheck size={12} /> Deployment</span>
              <h3 className="zm-display text-3xl sm:text-4xl">
                Live in <span className="zm-gradient-text">3–4 weeks.</span>
              </h3>
              <p className="mt-4 zm-dim max-w-2xl">
                We don't sell software you have to figure out. We deploy a working system on your
                listings, your agents, your channels, your CRM. You approve, we ship.
              </p>

              <div className="mt-8 grid sm:grid-cols-4 gap-4">
                {[
                  ["Week 1", "Discovery, channel access, brand voice, listing ingestion"],
                  ["Week 2", "RAG training, qualification logic, calendar + CRM sync"],
                  ["Week 3", "Sandbox launch, agent training, edge-case tuning"],
                  ["Week 4", "Full go-live, monitoring, weekly optimization"],
                ].map(([w, d]) => (
                  <div key={w} className="border-l border-[#b6ff2e]/40 pl-4">
                    <div className="zm-mono text-xs zm-accent-text">{w}</div>
                    <div className="mt-2 text-sm zm-dim leading-relaxed">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="zm-card p-8 h-full">
              <span className="zm-chip mb-6"><Zap size={12} /> Built-in</span>
              <ul className="space-y-4">
                {[
                  "WhatsApp Business API (official)",
                  "Meta Lead Ads + DMs",
                  "HubSpot · Salesforce · Bitrix · Pipedrive",
                  "Property Finder · Bayut · Dubizzle · Zillow feeds",
                  "Google + Outlook calendars",
                  "GDPR / UAE PDPL compliant",
                  "EU + GCC data residency available",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 size={16} className="zm-accent-text mt-0.5 shrink-0" />
                    <span className="zm-dim">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["< 10s", "Avg first response"],
            ["24 / 7", "Always-on operations"],
            ["12+", "Integrations live"],
            ["3–4 wk", "Time to deploy"],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08}>
              <div className="zm-card p-6 text-center group hover:border-[#b6ff2e]/30 transition-colors">
                <div className="zm-display text-3xl zm-accent-text">{v}</div>
                <div className="mt-1.5 text-xs uppercase tracking-wider zm-muted">{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FINAL CTA — CINEMATIC CLOSE ───────────────────────── */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id="book" className="relative py-32 lg:py-44 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <img src={skyline} alt="" loading="lazy" data-cinema className="w-full h-full object-cover opacity-40" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-[#07080a]/80 to-[#07080a]" />
      <div className="absolute inset-0 zm-glow pointer-events-none" />
      <div className="absolute inset-0 zm-grid-bg pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <span className="zm-chip mb-8"><AlertTriangle size={12} /> Last thought</span>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="zm-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02]">
            One of your competitors is reading this page too.
            <br />
            <span className="zm-gradient-text zm-text-glow">They'll move first if you don't.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 text-lg sm:text-xl zm-dim max-w-2xl mx-auto leading-relaxed">
            Every week without this infrastructure is another week of paid leads quietly
            dying in your inbox. Book a 30-minute strategy call. We'll audit your funnel
            live and show you the exact revenue you're losing.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button onClick={openBooking} className="zm-btn-primary !text-base !py-4 !px-8 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2.5">
                Book Your Free 15-Min Demo <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 zm-shimmer" />
            </button>
            <button onClick={openBooking} className="zm-btn-ghost !text-base !py-4 !px-7">
              Request Private Demo
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm zm-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="zm-accent-text"/> No contract</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="zm-accent-text"/> No setup fee</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="zm-accent-text"/> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="zm-accent-text"/> Live funnel audit on the call</span>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 zm-chip">
            <span className="zm-dot zm-pulse" /> We onboard max 5 brokerages/month
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── DAY IN LIFE — cinematic split ───────────────────────── */
function DayInLife() {
  const before = [
    { t: "07:42", l: "Wake up to 47 unread WhatsApps. Hot lead from 2am — gone cold." },
    { t: "10:15", l: "Agent typing same brochure reply for the 9th time today." },
    { t: "14:30", l: "Buyer from Instagram DM ghosted. Nobody replied for 6 hours." },
    { t: "19:50", l: "Pipeline review: 38 leads, 6 contacted, 1 booked, 0 closed." },
    { t: "23:11", l: "You scroll Property Finder competitors. They're closing your leads." },
  ];
  const after = [
    { t: "07:42", l: "Morning brief: 12 new leads, all replied in <10s, 4 viewings booked." },
    { t: "10:15", l: "Agents walk into pre-qualified meetings. Closing, not chasing." },
    { t: "14:30", l: "Instagram DM auto-qualified, brochure sent, calendar slot held." },
    { t: "19:50", l: "Pipeline review: 38 leads, 38 contacted, 9 viewings, 3 offers in." },
    { t: "23:11", l: "You sleep. The infrastructure works the night shift." },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-y border-[rgba(255,255,255,0.08)]">
      <div className="absolute inset-0">
        <img src={arrival} alt="" loading="lazy" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-[#07080a]/85 to-[#07080a]" />
      </div>
      <div className="zm-aurora" style={{ width: 500, height: 500, top: "-10%", left: "-10%" }} />
      <div className="zm-aurora" style={{ width: 600, height: 600, bottom: "-20%", right: "-10%", animationDelay: "4s" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="zm-chip mb-6"><Clock size={12}/> <span className="zm-mono opacity-60">06</span> · A day in your business</span>
            <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
              Same 24 hours. <span className="zm-gradient-text zm-text-glow">Two different companies.</span>
            </h2>
            <p className="mt-5 text-lg zm-dim">One is bleeding. One is compounding. Pick which one you run.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="zm-border-grad p-7 h-full relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#ff5b4a]">
                  <XCircle size={16}/> <span className="text-sm font-semibold uppercase tracking-wider">Without ZetaMize</span>
                </div>
                <span className="zm-mono text-xs zm-muted">Today · loss column</span>
              </div>
              <div className="space-y-4">
                {before.map((b, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-[rgba(255,255,255,0.08)] last:border-0">
                    <div className="zm-mono text-xs zm-muted w-12 shrink-0">{b.t}</div>
                    <p className="text-sm zm-dim leading-relaxed">{b.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 zm-mono text-xs text-[#ff5b4a] uppercase tracking-wider">
                Net result: ~$3,840 in ad spend wasted today
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="zm-border-grad p-7 h-full relative">
              <div className="absolute inset-0 zm-conic rounded-[20px] opacity-50" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 zm-accent-text">
                    <CheckCircle2 size={16}/> <span className="text-sm font-semibold uppercase tracking-wider">With ZetaMize</span>
                  </div>
                  <span className="zm-mono text-xs zm-muted">Today · compound column</span>
                </div>
                <div className="space-y-4">
                  {after.map((b, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-[rgba(255,255,255,0.08)] last:border-0">
                      <div className="zm-mono text-xs zm-accent-text w-12 shrink-0">{b.t}</div>
                      <p className="text-sm zm-dim leading-relaxed">{b.l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 zm-mono text-xs zm-accent-text uppercase tracking-wider">
                  Net result: 9 qualified viewings · 3 offers in motion
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3D HOLO SHOWCASE ───────────────────────── */
function ThreeDShowcase() {
  const tilt = useTilt();
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="zm-aurora" style={{ width: 700, height: 700, top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="zm-chip mb-6"><LayoutDashboard size={12}/> <span className="zm-mono opacity-60">07</span> · Command Center</span>
            <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
              Your entire pipeline. <span className="zm-gradient-text zm-text-glow">One pane of glass.</span>
            </h2>
            <p className="mt-5 text-lg zm-dim leading-relaxed">
              Every channel, every lead, every conversation, every agent — visible in real time.
              No more &ldquo;let me check WhatsApp&rdquo;. No more lost deals in DMs.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Real-time AI conversations across 6 channels", "Live lead scoring with 92% accuracy", "Auto-routing to your best closer", "Revenue attribution per ad campaign"].map(x => (
                <li key={x} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="zm-accent-text mt-0.5 shrink-0" />
                  <span className="zm-dim">{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.2}>
            <div ref={tilt} className="zm-tilt zm-spotlight relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.16)] shadow-[0_40px_120px_-30px_rgba(182,255,46,0.25)]">
              <div className="zm-tilt-inner">
                <img src={holo} alt="Holographic CRM" loading="lazy" data-cinema className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#07080a]/60 via-transparent to-transparent pointer-events-none" />
                {/* Floating metric chips */}
                <div className="hidden sm:block absolute top-6 left-6 zm-float">
                  <div className="zm-card px-4 py-3 backdrop-blur-md bg-[#07080a]/70">
                    <div className="text-[10px] uppercase tracking-wider zm-muted">Active now</div>
                    <div className="zm-display text-2xl zm-accent-text">142</div>
                  </div>
                </div>
                <div className="hidden sm:block absolute bottom-6 right-6 zm-float-slow">
                  <div className="zm-card px-4 py-3 backdrop-blur-md bg-[#07080a]/70">
                    <div className="text-[10px] uppercase tracking-wider zm-muted">Booked today</div>
                    <div className="zm-display text-2xl zm-accent-text">27</div>
                  </div>
                </div>
                <div className="hidden sm:block absolute top-1/2 right-6 -translate-y-1/2 zm-float" style={{ animationDelay: "1.5s" }}>
                  <div className="zm-card px-4 py-3 backdrop-blur-md bg-[#07080a]/70">
                    <div className="text-[10px] uppercase tracking-wider zm-muted">Avg reply</div>
                    <div className="zm-display text-2xl zm-accent-text">7.2s</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIAL REEL ───────────────────────── */
function Testimonials() {
  const quotes = [
    {
      q: "Honestly, I was skeptical about an AI talking to my luxury clients. But the handoff is so smooth they don't even realize it's a bot.",
      n: "Karim Al Maktoum", r: "Director, Downtown Realty", img: "https://i.pravatar.cc/150?img=11",
      stats: [["100%", "Seamless"], ["-40h", "Manual Qual"], ["High", "Client Trust"]]
    },
    {
      q: "We used to lose 40% of our portal leads just because we couldn't reply fast enough after hours. ZetaMize fixed that overnight.",
      n: "Lina Tariq", r: "Head of Sales", img: "https://i.pravatar.cc/150?img=5",
      stats: [["0%", "Lead Leakage"], ["<5s", "Reply Time"], ["+35%", "Conversion"]]
    },
    {
      q: "The craziest part isn't the speed, it's the context. The AI remembers past conversations and follows up like a real human.",
      n: "Yusuf Rehman", r: "Founder, Vermilion Luxury", img: null,
      stats: [["60+", "Dead Leads"], ["$1.2M", "Recovered"], ["24/7", "Follow-ups"]]
    },
    {
      q: "Instead of wasting time asking 'what is your budget', my 14 agents wake up to a calendar full of pre-qualified viewings.",
      n: "Sarah Jenkins", r: "Managing Director", img: "https://i.pravatar.cc/150?img=9",
      stats: [["14", "Agents freed"], ["100%", "Pre-qualified"], ["3x", "Viewings"]]
    },
    {
      q: "If you run Facebook ads for off-plan projects and don't use this, you are burning money. It instantly engages the lead.",
      n: "Omar Tarek", r: "VP of Marketing", img: "https://i.pravatar.cc/150?img=14",
      stats: [["Insta", "Engagement"], ["-40%", "CPA"], ["2.5x", "Ad ROI"]]
    },
    {
      q: "We replaced our manual SDR workflow with this. Not only is it faster, but it never takes a day off.",
      n: "Elena Rostova", r: "Agency Owner", img: "https://i.pravatar.cc/150?img=20",
      stats: [["0", "Sick days"], ["Infinite", "Capacity"], ["-50%", "SDR Costs"]]
    },
    {
      q: "Setup was surprisingly easy. Plugged it into our CRM and within 2 days it was handling all the inbound WhatsApp traffic.",
      n: "David Wright", r: "Operations Lead", img: "https://i.pravatar.cc/150?img=33",
      stats: [["48h", "Setup"], ["100%", "CRM Sync"], ["+25%", "Conversion"]]
    },
    {
      q: "We get hundreds of inquiries during weekends. Now, no lead is left hanging. The AI books the viewing directly.",
      n: "Farah Naser", r: "CRM Manager", img: null,
      stats: [["100%", "Coverage"], ["Zero", "Missed Leads"], ["Auto", "Booking"]]
    },
    {
      q: "It handles multiple languages perfectly. We get Russian and French buyers, and the AI switches languages naturally.",
      n: "Hassan Mustafa", r: "Sales Director", img: "https://i.pravatar.cc/150?img=52",
      stats: [["Native", "Fluency"], ["Multiple", "Languages"], ["High", "Engagement"]]
    },
    {
      q: "Best tech investment this year. It actually understands property details, payment plans, and when to hand over to a human.",
      n: "James Lewis", r: "Founder", img: "https://i.pravatar.cc/150?img=60",
      stats: [["Deep", "Knowledge"], ["Smart", "Handoff"], ["#1", "Tech ROI"]]
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="zm-chip mb-6"><Sparkles size={12}/> <span className="zm-mono opacity-60">08</span> · Operators using it</span>
            <h2 className="zm-display text-4xl sm:text-5xl lg:text-6xl">
              The brokerages who moved <span className="zm-gradient-text">first</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 -mx-5 sm:-mx-8">
          <div className="flex w-max gap-6 px-5 sm:px-8 zm-marquee hover:[animation-play-state:paused]">
            {[...quotes.slice(0, 5), ...quotes.slice(0, 5)].map((t, i) => (
              <div key={i} className="w-[360px] sm:w-[400px] zm-border-grad p-7 h-full flex flex-col group relative overflow-hidden shrink-0">
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#b6ff2e]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 mb-5">
                  {t.img ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[rgba(255,255,255,0.16)] shrink-0">
                      <img src={t.img} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full border border-[rgba(255,255,255,0.16)] shrink-0 bg-gradient-to-br from-[#b6ff2e]/20 to-[#b6ff2e]/5 flex items-center justify-center">
                      <span className="text-[#b6ff2e] font-display font-bold text-lg tracking-wider">
                        {t.n.split(' ').map(w => w[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{t.n}</div>
                    <div className="text-xs zm-muted">{t.r}</div>
                  </div>
                </div>
                <p className="relative text-base leading-snug zm-display flex-1">&ldquo;{t.q}&rdquo;</p>
                <div className="relative mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-[rgba(255,255,255,0.08)]">
                  {t.stats.map(([v, l]) => (
                    <div key={l}>
                      <div className="zm-display text-lg zm-accent-text">{v}</div>
                      <div className="text-[10px] uppercase tracking-wider zm-muted mt-0.5 leading-tight">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-max gap-6 px-5 sm:px-8 zm-marquee-rev hover:[animation-play-state:paused]">
            {[...quotes.slice(5, 10), ...quotes.slice(5, 10)].map((t, i) => (
              <div key={i} className="w-[360px] sm:w-[400px] zm-border-grad p-7 h-full flex flex-col group relative overflow-hidden shrink-0">
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#b6ff2e]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 mb-5">
                  {t.img ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[rgba(255,255,255,0.16)] shrink-0">
                      <img src={t.img} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full border border-[rgba(255,255,255,0.16)] shrink-0 bg-gradient-to-br from-[#b6ff2e]/20 to-[#b6ff2e]/5 flex items-center justify-center">
                      <span className="text-[#b6ff2e] font-display font-bold text-lg tracking-wider">
                        {t.n.split(' ').map(w => w[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{t.n}</div>
                    <div className="text-xs zm-muted">{t.r}</div>
                  </div>
                </div>
                <p className="relative text-base leading-snug zm-display flex-1">&ldquo;{t.q}&rdquo;</p>
                <div className="relative mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-[rgba(255,255,255,0.08)]">
                  {t.stats.map(([v, l]) => (
                    <div key={l}>
                      <div className="zm-display text-lg zm-accent-text">{v}</div>
                      <div className="text-[10px] uppercase tracking-wider zm-muted mt-0.5 leading-tight">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ───────────────────────── FOOTER ───────────────────────── */
function FunnelFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#07080a] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold">
              <span className="text-white">Zeta</span>
              <span className="text-[#b6ff2e]">Mize</span>
            </Link>
            <p className="text-[#9097a3] text-sm mt-4 leading-relaxed">
              Precision-engineered intelligence for businesses ready to scale.
            </p>
            <div className="flex gap-6 mt-6">
              <a href="https://www.linkedin.com/company/zetamize/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-lg bg-white/5 text-[#9097a3] hover:text-[#b6ff2e] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="hidden md:block"></div>
          <div className="hidden md:block"></div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm tracking-wider uppercase">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@zetamize.com" className="text-[#9097a3] text-sm hover:text-[#b6ff2e] transition-colors">hello@zetamize.com</a>
              <Link to="/contact" className="text-[#9097a3] text-sm hover:text-[#b6ff2e] transition-colors">Contact Form</Link>
              <a href="#truth" className="text-[#9097a3] text-sm hover:text-[#b6ff2e] transition-colors">Uncomfortable Truth</a>
              <a href="https://www.linkedin.com/company/zetamize/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-[#9097a3] text-sm hover:text-[#b6ff2e] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9097a3] text-xs">© 2025 ZetaMize. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#9097a3] text-xs hover:text-[#b6ff2e] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#9097a3] text-xs hover:text-[#b6ff2e] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
