import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Users, BedDouble, Check } from 'lucide-react';
import { rooms } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';

function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)` });
  };
  const reset = () => setStyle({ transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)' });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ ...style, transition: 'transform 0.2s ease-out' }}
      className="will-change-transform"
    >
      {children}
    </div>
  );
}

export default function RoomShowcase() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [slide, setSlide] = useState(0);
  const room = rooms[activeRoom];

  const selectRoom = (i) => {
    setActiveRoom(i);
    setSlide(0);
  };
  const next = () => setSlide((s) => (s + 1) % room.gallery.length);
  const prev = () => setSlide((s) => (s - 1 + room.gallery.length) % room.gallery.length);

  return (
    <section id="rooms" className="relative bg-navy-900/30 py-24 sm:py-32 light:bg-navy-50">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Suites & Villas"
          title="The Room Showcase"
          subtitle="Step inside spaces crafted for serenity — every suite a sanctuary of light, comfort and considered design."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Gallery slider */}
          <TiltCard>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-navy-950/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeRoom}-${slide}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LazyImage
                    src={room.gallery[slide]}
                    alt={`${room.name} view ${slide + 1}`}
                    className="aspect-[4/3] w-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />

              <button
                onClick={prev}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/50 text-white backdrop-blur transition-colors hover:bg-gold-400 hover:text-navy-950"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/50 text-white backdrop-blur transition-colors hover:bg-gold-400 hover:text-navy-950"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {room.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slide ? 'w-7 bg-gold-400' : 'w-1.5 bg-white/50'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Room details */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {rooms.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => selectRoom(i)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                    i === activeRoom
                      ? 'bg-gold-400 text-navy-950'
                      : 'border border-white/15 text-white/70 hover:border-gold-400 light:border-navy-900/15 light:text-navy-600'
                  }`}
                >
                  {r.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-4xl font-semibold text-white light:text-navy-800">
                  {room.name}
                </h3>
                <p className="mt-4 leading-relaxed text-white/65 light:text-navy-600">
                  {room.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/70 light:text-navy-600">
                  <span className="flex items-center gap-2">
                    <Maximize size={16} className="text-gold-400" /> {room.size}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-gold-400" /> {room.guests} Guests
                  </span>
                  <span className="flex items-center gap-2">
                    <BedDouble size={16} className="text-gold-400" /> {room.beds}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {room.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-2 text-sm text-white/70 light:text-navy-600">
                      <Check size={15} className="text-gold-400" /> {a}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between rounded-2xl glass p-5">
                  <div>
                    <span className="font-serif text-3xl font-semibold gold-text">${room.price}</span>
                    <span className="text-sm text-white/55 light:text-navy-500"> / night</span>
                  </div>
                  <a href="#booking" className="btn-gold">
                    Reserve Suite
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
