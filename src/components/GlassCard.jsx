import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? {
        y: -5,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.2 }
      } : {}}
      className={`glass-card-light rounded-3xl p-6 relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
