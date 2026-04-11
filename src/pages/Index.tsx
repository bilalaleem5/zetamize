import PageWrapper from "../components/PageWrapper";
import HeroBanner from "../components/home/HeroBanner";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Services from "../components/home/Services";
import Process from "../components/home/Process";
import WhyUs from "../components/home/WhyUs";
import TechMarquee from "../components/home/TechMarquee";
import PortfolioPreview from "../components/home/PortfolioPreview";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import ContactSection from "../components/home/ContactSection";
import SectionDivider from "../components/SectionDivider";

const Index = () => (
  <PageWrapper>
    <HeroBanner />
    <SectionDivider />
    <Hero />
    <SectionDivider />
    <Stats />
    <SectionDivider />
    <Services />
    <SectionDivider />
    <Process />
    <SectionDivider />
    <WhyUs />
    <SectionDivider />
    <TechMarquee />
    <SectionDivider />
    <PortfolioPreview />
    <SectionDivider />
    <Testimonials />
    <SectionDivider />
    <FAQ />
    <SectionDivider />
    <ContactSection />
  </PageWrapper>
);

export default Index;
