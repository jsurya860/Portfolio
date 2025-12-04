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

      <button
        onClick={() => setPage('admin')}
        className="fixed bottom-6 right-6 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl z-50 text-sm"
      >
        Admin
      </button>
    </div>
  );
}

export default App;
