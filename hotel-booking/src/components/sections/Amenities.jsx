import { motion } from 'framer-motion';
import { Dumbbell, Wifi, Plane, UtensilsCrossed, Waves, BellRing } from 'lucide-react';
import { amenities } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';

const icons = { Dumbbell, Wifi, Plane, UtensilsCrossed, Waves, BellRing };

export default function Amenities() {
  return (
    <section id="amenities" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Everything You Need"
          title="World-Class Amenities"
          subtitle="Thoughtful services and facilities at every property, designed to make your stay effortless."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex flex-col items-center rounded-3xl glass p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/40"
              >
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-400/12 text-gold-400">
                  <span className="absolute inset-0 rounded-2xl border border-gold-400/30 transition-transform duration-700 group-hover:rotate-45" />
                  <Icon
                    size={28}
                    className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white light:text-navy-800">
                  {a.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55 light:text-navy-500">
                  {a.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
