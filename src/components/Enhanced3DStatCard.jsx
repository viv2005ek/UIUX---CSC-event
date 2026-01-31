import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Enhanced3DCard from './Enhanced3DCard';
import AnimatedCounter from './AnimatedCounter';

export default function Enhanced3DStatCard({ icon: Icon, label, value, change, trend, delay = 0, glowColor = 'cyan' }) {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');

  const gradientColors = {
    cyan: 'from-cyan-500 to-cyan-600',
    fuchsia: 'from-fuchsia-500 to-fuchsia-600',
    orange: 'from-orange-500 to-orange-600',
  };

  const iconBgColors = {
    cyan: 'bg-cyan-500/20',
    fuchsia: 'bg-fuchsia-500/20',
    orange: 'bg-orange-500/20',
  };

  const iconColors = {
    cyan: 'text-cyan-400',
    fuchsia: 'text-fuchsia-400',
    orange: 'text-orange-400',
  };

  return (
    <Enhanced3DCard delay={delay} glowColor={glowColor}>
      <div className="flex items-start justify-between mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className={`p-4 rounded-2xl ${iconBgColors[glowColor]} backdrop-blur-sm`}
        >
          <Icon className={iconColors[glowColor]} size={28} strokeWidth={2.5} />
        </motion.div>

        {change && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, type: 'spring' }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full glass-card-light"
          >
            {isPositive && <TrendingUp size={14} className="text-green-400" />}
            {isNegative && <TrendingDown size={14} className="text-red-400" />}
            <span className={`text-xs font-bold ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-neutral-400'}`}>
              {change}
            </span>
          </motion.div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.4 }}
        className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3"
      >
        {label}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.5, type: 'spring' }}
        className="text-4xl md:text-5xl font-black text-white mb-4"
        style={{ fontFamily: "'Orbitron', monospace" }}
      >
        <AnimatedCounter value={value} />
      </motion.div>

      <div className="relative h-2 bg-neutral-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '85%' }}
          transition={{
            duration: 1.5,
            delay: delay + 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`h-full bg-gradient-to-r ${gradientColors[glowColor]} rounded-full relative`}
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.7 }}
        className="mt-4 flex items-center justify-between text-xs text-neutral-500"
      >
        <span className="font-semibold">Last 24 hours</span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live
        </span>
      </motion.div>
    </Enhanced3DCard>
  );
}
