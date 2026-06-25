import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative h-24 w-24">
          <span className="absolute inset-0 rounded-full border border-gold-400/30" />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-400"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-gold-400">
            A
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="font-serif text-2xl tracking-[0.3em] text-white">AURELIA</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-gold-400/80">
            Hotels &amp; Resorts
          </p>
        </motion.div>

        <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-200"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
