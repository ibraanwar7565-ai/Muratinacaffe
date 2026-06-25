import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, center = false, light }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`eyebrow ${center ? 'justify-center' : ''}`}
        >
          <span className="h-px w-8 bg-gold-400" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className={`section-title ${light ? 'text-white' : ''}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`mt-5 text-base leading-relaxed text-white/60 light:text-navy-600 ${
            light ? 'text-white/70' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
