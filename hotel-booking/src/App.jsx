import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <BackToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
