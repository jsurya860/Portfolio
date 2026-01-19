import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Hero from './components/Hero';
import FaviconAnimator from './components/FaviconAnimator';
import SmoothScroll from './components/SmoothScroll';
import About from './components/About';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import ResetPassword from './components/ResetPassword';
import SystemIntro from './components/SystemIntro';
import FloatingElements from './components/FloatingElements';

function App() {
  const [page, setPage] = useState<'home' | 'admin' | 'reset-password'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (event === 'SIGNED_OUT' && page === 'admin') {
        setPage('home');
      } else if (event === 'PASSWORD_RECOVERY') {
        setPage('reset-password');
      }
    });

    return () => subscription?.unsubscribe();
  }, [page]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        setPage('admin');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (page === 'reset-password') {
    return <ResetPassword onSuccess={() => setPage('admin')} />;
  }

  if (page === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setPage('admin')} onBack={() => setPage('home')} />;
    }
    return <Admin onBack={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] text-gray-100 selection:bg-green-500/30">
      <SystemIntro />
      <FloatingElements />
      <SmoothScroll />
      <FaviconAnimator />
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
