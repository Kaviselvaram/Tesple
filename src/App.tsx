import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ImpactSection from "./components/ImpactSection";
import ApproachSection from "./components/ApproachSection";
import FoundersSection from "./components/FoundersSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="relative min-h-screen bg-black w-full overflow-x-hidden selection:bg-white selection:text-black">
      {/* Floating Global Navbar */}
      <Navbar />

      {/* Main Cinematic Journey Container */}
      <main className="relative w-full">
        {/* Section 1 — Hero */}
        <HeroSection />

        {/* Section 2 — About Tesple */}
        <AboutSection />

        {/* Section 3 — Services */}
        <ServicesSection />

        {/* Section 4 — Impact */}
        <ImpactSection />

        {/* Section 5 — Our Approach */}
        <ApproachSection />

        {/* Section 6 — Founders */}
        <FoundersSection />

        {/* Section 7 — Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
