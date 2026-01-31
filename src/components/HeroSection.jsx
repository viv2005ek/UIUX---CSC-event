import { motion } from 'framer-motion';
import { Activity, Sparkles, Shield, TrendingDown } from 'lucide-react';
import { motionTokens } from '../config/motion';

export default function HeroSection({ scrollY }) {
  const floatingIcons = [
    { Icon: Activity, color: 'text-blue-500', position: 'top-20 left-[15%]', delay: 0 },
    { Icon: Shield, color: 'text-purple-500', position: 'top-32 right-[20%]', delay: 0.2 },
    { Icon: TrendingDown, color: 'text-green-500', position: 'bottom-32 left-[25%]', delay: 0.4 },
    { Icon: Sparkles, color: 'text-cyan-500', position: 'bottom-20 right-[15%]', delay: 0.6 },
  ];

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2, ease: motionTokens.easing.smooth }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500"
        style={{
          transform: `translateY(${scrollY * 0.3}px) scale(1.2)`,
        }}
      />

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {floatingIcons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            rotate: 0,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 1, delay, ease: motionTokens.easing.bounce },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 },
          }}
        >
          <div className="relative">
            <div className={`absolute inset-0 ${color} opacity-20 blur-xl rounded-full`} />
            <div className="relative p-4 glass-card-premium rounded-2xl">
              <Icon className={color} size={28} strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: motionTokens.easing.smooth }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 glass-card-premium rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={motionTokens.spring.gentle}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="text-blue-500" size={20} />
            </motion.div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Real-Time Intelligence Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-black mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: motionTokens.easing.smooth }}
          >
            <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Vigilant Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              India
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 font-medium mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: motionTokens.easing.smooth }}
          >
            Empowering communities with transparent, real-time infectious disease data
            and actionable insights across India
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: motionTokens.easing.smooth }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold text-lg shadow-xl shadow-blue-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Dashboard</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl glass-card-premium font-bold text-lg text-slate-700 hover:text-blue-600 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-8 h-12 rounded-full glass-card-premium flex items-start justify-center p-2">
          <motion.div
            className="w-2 h-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
