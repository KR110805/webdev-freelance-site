import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import TrustSection from './components/TrustSection';
import Contact from './components/Contact';
import WhatsAppPopup from './components/WhatsAppPopup';

/**
 * Main App Component
 * - Assembles all portfolio sections in order
 * - Navbar is fixed, sections scroll underneath
 * - WhatsApp popup floats above everything
 */
function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Pricing />
        <TrustSection />
        <Contact />
      </main>
      <WhatsAppPopup />
    </div>
  );
}

export default App;
