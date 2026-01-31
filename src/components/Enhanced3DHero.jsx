import { motion } from 'framer-motion';
import { Activity, ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function Enhanced3DHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 perspective-1000">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 preserve-3d"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card-premium border border-cyan-500/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="text-cyan-400" size={20} />
            </motion.div>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              AI-Powered Real-Time Intelligence
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-400">LIVE</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none"
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          <motion.span
            className="block text-gradient animate-neon-pulse"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            India's Health
          </motion.span>
          <motion.span
            className="block text-white mt-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Intelligence
            <span className="text-gradient-secondary"> Hub</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-medium mb-12 max-w-4xl mx-auto leading-relaxed px-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Track infectious diseases across all states with
          <span className="text-cyan-400 font-bold"> real-time data visualization</span>,
          <span className="text-fuchsia-400 font-bold"> predictive analytics</span>, and
          <span className="text-orange-400 font-bold"> actionable insights</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-primary text-white font-bold text-lg shadow-2xl shadow-cyan-500/50 overflow-hidden w-full sm:w-auto"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center justify-center gap-2">
              Explore Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl glass-card-premium border border-cyan-500/30 text-white font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap size={20} className="text-cyan-400" />
              View Analytics
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 px-4"
        >
          {[
            { value: '28', label: 'States Monitored', icon: Activity },
            { value: '1.2M+', label: 'Active Cases', icon: Activity },
            { value: '98.5%', label: 'Recovery Rate', icon: Activity },
            { value: '24/7', label: 'Live Updates', icon: Activity },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-card-premium rounded-2xl p-4 sm:p-6 text-center group cursor-pointer"
            >
              <stat.icon className="mx-auto mb-2 sm:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">{stat.value}</p>
              <p className="text-xs sm:text-sm text-neutral-400 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-cyan-500/50 flex items-start justify-center p-2">
          <motion.div
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
