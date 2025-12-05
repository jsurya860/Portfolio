import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';

function App() {
  const [page, setPage] = useState<'home' | 'admin'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session && page === 'admin') {
        setPage('home');
      }
    });

    return () => subscription?.unsubscribe();
  }, [page]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setPage('admin');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (page === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setPage('admin')} />;
    }
    return <Admin />;
  }

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
