import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { navLinks } from '../data/data';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled ? 'glass-strong py-3 shadow-lg shadow-navy-950/20' : 'py-5'
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2" aria-label="Aurelia home">
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-white light:text-navy-800">
              AUREL<span className="gold-text">IA</span>
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium uppercase tracking-widest text-white/75 transition-colors hover:text-gold-300 light:text-navy-700"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300 light:border-navy-900/15 light:text-navy-700"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link
              to="/admin"
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300 sm:flex light:border-navy-900/15 light:text-navy-700"
            >
              <LayoutDashboard size={15} /> Admin
            </Link>

            <a href="#booking" className="btn-gold hidden md:inline-flex !px-5 !py-2.5">
              Book Now
            </a>

            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden light:border-navy-900/15 light:text-navy-800"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Animated mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-lg" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col border-l border-white/10 bg-navy-900 p-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-serif text-xl tracking-[0.2em] text-white">
                  AUREL<span className="gold-text">IA</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/5 py-4 font-serif text-2xl text-white/85 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <Link to="/admin" onClick={() => setOpen(false)} className="btn-ghost w-full">
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
                <a href="#booking" onClick={() => setOpen(false)} className="btn-gold w-full">
                  Book Your Stay
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
