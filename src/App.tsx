import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-gray-100">
      <Hero />
      <About />
      <Achievements />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
