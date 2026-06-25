import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Send, CheckCircle2,
} from 'lucide-react';
import { navLinks } from '../../data/data';

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer className="relative border-t border-white/10 bg-navy-950 pt-20 light:border-navy-900/10 light:bg-navy-900">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand + newsletter */}
          <div>
            <span className="font-serif text-3xl font-semibold tracking-[0.2em] text-white">
              AUREL<span className="gold-text">IA</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              A curated collection of the world's finest hotels and resorts. Luxury, redefined for the modern traveller.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
                setEmail('');
              }}
              className="mt-6"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/70">
                Join our newsletter
              </p>
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-4 text-sm text-white placeholder-white/40 outline-none"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </div>
              {done && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-green-300">
                  <CheckCircle2 size={14} /> Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold-400">Explore</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold-300">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/admin" className="transition-colors hover:text-gold-300">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold-400">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                12 Marina Boulevard, Singapore 018982
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold-400" />
                +65 6123 4567
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold-400" />
                stay@aurelia-hotels.com
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold-400">Find Us</h4>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Aurelia flagship location"
                src="https://www.google.com/maps?q=Marina+Bay+Singapore&output=embed"
                className="h-44 w-full grayscale transition-all duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurelia Hotels &amp; Resorts. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold-300">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-gold-300">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-gold-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
