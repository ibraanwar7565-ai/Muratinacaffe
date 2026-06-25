import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, CalendarDays, Users, Search, ChevronDown } from 'lucide-react';
import { stats } from '../../data/data';
import Counter from '../ui/Counter';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multi-layer parallax: background drifts slower than content.
      gsap.to(bgRef.current, {
        yPercent: 28,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Parallax background image */}
      <div ref={bgRef} className="absolute inset-0 -z-20 h-[120%] w-full will-change-transform">
        <img
          src={HERO_IMG}
          alt="Luxury resort infinity pool at sunset overlooking the ocean"
          className="h-full w-full object-cover"
          fetchpriority="high"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950"
      />

      {/* Floating ambient orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-72 w-72 animate-float rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-96 w-96 animate-float rounded-full bg-navy-400/10 blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="container-x relative z-10 pt-32">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="eyebrow text-white/90"
          >
            <span className="h-px w-10 bg-gold-400" />
            Aurelia Hotels &amp; Resorts
          </motion.span>

          <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-7xl lg:text-[5.5rem]">
            {['Experience Luxury', 'Beyond Expectations'].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + li * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  {li === 1 ? <span className="gold-text italic">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Discover a curated collection of the world's most exclusive resorts, private
            villas and suites — where every detail is crafted around you.
          </motion.p>
        </div>

        {/* Glassmorphism search bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="glass-strong mt-12 rounded-2xl p-3 shadow-2xl shadow-navy-950/40 lg:rounded-full"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
          >
            <Field icon={MapPin} label="Destination">
              <input
                type="text"
                placeholder="Where to?"
                defaultValue="Maldives"
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none light:text-navy-800"
              />
            </Field>
            <Field icon={CalendarDays} label="Check-in">
              <input
                type="date"
                className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark] light:text-navy-800 light:[color-scheme:light]"
              />
            </Field>
            <Field icon={CalendarDays} label="Check-out">
              <input
                type="date"
                className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark] light:text-navy-800 light:[color-scheme:light]"
              />
            </Field>
            <Field icon={Users} label="Guests">
              <select className="w-full appearance-none bg-transparent text-sm text-white outline-none light:text-navy-800">
                {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((g) => (
                  <option key={g} className="bg-navy-900">
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <button type="submit" className="btn-gold !rounded-xl lg:!rounded-full lg:!px-7">
              <Search size={18} />
              <span className="lg:hidden xl:inline">Search</span>
            </button>
          </form>
        </motion.div>

        {/* Animated booking statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-l border-white/15 pl-4">
              <div className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </div>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#hotels"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-white/5 lg:rounded-full">
      <Icon size={18} className="shrink-0 text-gold-400" />
      <span className="flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/45 light:text-navy-500">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
