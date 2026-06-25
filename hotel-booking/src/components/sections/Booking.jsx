import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { rooms } from '../../data/data';
import SectionHeading from '../ui/SectionHeading';

const NIGHTLY = rooms.map((r) => ({ id: r.id, name: r.name, price: r.price }));
const TAX_RATE = 0.12;
const SERVICE_FEE = 45;

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    roomId: NIGHTLY[1].id,
    checkin: '',
    checkout: '',
    guests: 2,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const nights = useMemo(() => {
    if (!form.checkin || !form.checkout) return 0;
    const diff =
      (new Date(form.checkout) - new Date(form.checkin)) / 86400000;
    return diff > 0 ? Math.round(diff) : 0;
  }, [form.checkin, form.checkout]);

  const room = NIGHTLY.find((r) => r.id === form.roomId);
  const subtotal = nights * room.price;
  const tax = subtotal * TAX_RATE;
  const total = subtotal ? subtotal + tax + SERVICE_FEE : 0;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <section id="booking" className="relative bg-navy-900/30 py-24 sm:py-32 light:bg-navy-50">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Reserve Your Escape"
          title="Book Your Stay"
          subtitle="Secure your suite in moments. Real-time pricing, instant confirmation and encrypted payment."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-3xl glass-strong p-7 sm:p-9"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input label="Full Name" placeholder="Jane Doe" value={form.name} onChange={set('name')} required />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={set('email')}
                required
              />
              <Input label="Check-in" type="date" value={form.checkin} onChange={set('checkin')} required />
              <Input label="Check-out" type="date" value={form.checkout} onChange={set('checkout')} required />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55 light:text-navy-500">
                  Room Type
                </label>
                <select
                  value={form.roomId}
                  onChange={set('roomId')}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold-400 light:border-navy-900/10 light:bg-white light:text-navy-800"
                >
                  {NIGHTLY.map((r) => (
                    <option key={r.id} value={r.id} className="bg-navy-900">
                      {r.name} — ${r.price}/night
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55 light:text-navy-500">
                  Guests
                </label>
                <select
                  value={form.guests}
                  onChange={set('guests')}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold-400 light:border-navy-900/10 light:bg-white light:text-navy-800"
                >
                  {[1, 2, 3, 4, 5].map((g) => (
                    <option key={g} value={g} className="bg-navy-900">
                      {g} {g === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 light:border-navy-900/10 light:text-navy-500">
              <Lock size={15} className="text-gold-400" />
              Card details are encrypted & processed securely (demo — no real charge).
            </div>

            <button type="submit" className="btn-gold mt-6 w-full !rounded-xl">
              <CreditCard size={18} /> Confirm & Pay {total ? fmt(total) : ''}
            </button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-3 rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300"
              >
                <CheckCircle2 size={18} />
                Booking confirmed! A confirmation has been sent to {form.email || 'your email'}.
              </motion.div>
            )}
          </motion.form>

          {/* Live price summary */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-3xl border border-gold-400/20 bg-gradient-to-b from-navy-900/60 to-navy-950/60 p-7 light:from-white light:to-navy-50"
          >
            <span className="eyebrow text-gold-400">
              <Sparkles size={14} /> Price Summary
            </span>
            <h3 className="font-serif text-2xl font-semibold text-white light:text-navy-800">{room.name}</h3>

            <dl className="mt-6 space-y-4 text-sm">
              <Row label={`${fmt(room.price)} × ${nights} night${nights === 1 ? '' : 's'}`} value={fmt(subtotal)} />
              <Row label="Taxes & fees (12%)" value={fmt(tax)} />
              <Row label="Service fee" value={nights ? fmt(SERVICE_FEE) : fmt(0)} />
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6 light:border-navy-900/10">
              <span className="text-sm uppercase tracking-widest text-white/60 light:text-navy-500">Total</span>
              <motion.span
                key={total}
                initial={{ scale: 1.15, color: '#e2b53a' }}
                animate={{ scale: 1 }}
                className="font-serif text-4xl font-semibold gold-text"
              >
                {fmt(total)}
              </motion.span>
            </div>

            {nights === 0 && (
              <p className="mt-3 text-xs text-white/45 light:text-navy-400">
                Select your dates to see the live total.
              </p>
            )}

            <div className="mt-auto space-y-3 pt-8">
              {[
                { icon: ShieldCheck, t: 'Free cancellation up to 48h' },
                { icon: Lock, t: 'Secure 256-bit SSL encryption' },
                { icon: CheckCircle2, t: 'Instant booking confirmation' },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 text-sm text-white/70 light:text-navy-600">
                  <Icon size={16} className="text-gold-400" /> {t}
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-white/55 light:text-navy-500">
        {label}
      </label>
      <input
        {...props}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/30 focus:border-gold-400 [color-scheme:dark] light:border-navy-900/10 light:bg-white light:text-navy-800 light:[color-scheme:light]"
      />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-white/70 light:text-navy-600">
      <dt>{label}</dt>
      <dd className="font-medium text-white light:text-navy-800">{value}</dd>
    </div>
  );
}
