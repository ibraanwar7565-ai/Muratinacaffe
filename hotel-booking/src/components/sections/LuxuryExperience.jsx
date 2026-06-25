import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Waves, UtensilsCrossed, Presentation } from 'lucide-react';
import { experiences } from '../../data/data';
import LazyImage from '../ui/LazyImage';

gsap.registerPlugin(ScrollTrigger);

const icons = { Sparkles, Waves, UtensilsCrossed, Presentation };

const PARALLAX_IMG =
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80';

export default function LuxuryExperience() {
  const ref = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiences" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 -z-20 h-[140%] -top-[20%]">
        <img src={PARALLAX_IMG} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-navy-950/85" />

      <div className="container-x">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow text-gold-400"
          >
            <span className="h-px w-8 bg-gold-400" /> The Aurelia Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-title text-white"
          >
            Indulge in a World <span className="gold-text italic">Designed Around You</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {experiences.map((exp, i) => {
            const Icon = icons[exp.icon];
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex gap-6 overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:border-gold-400/40"
              >
                <div className="hidden h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:block">
                  <LazyImage
                    src={exp.image}
                    alt={exp.title}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/15 text-gold-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">{exp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{exp.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
