import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const notifications = [
  {
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-500',
    text: 'Karnataka: 250 new recoveries',
    type: 'success'
  },
  {
    icon: TrendingDown,
    color: 'from-blue-500 to-cyan-500',
    text: 'Active cases down 3.2% nationwide',
    type: 'info'
  },
  {
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    text: 'Vaccination rate up 15% this week',
    type: 'info'
  },
  {
    icon: AlertCircle,
    color: 'from-orange-500 to-red-500',
    text: 'Delhi: Medium risk alert',
    type: 'warning'
  },
];

export default function FloatingStats() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = notifications[currentIndex];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-8 left-8 z-50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-card-premium rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-sm cursor-pointer group"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div
            className={`p-3 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center`}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="text-white" size={24} strokeWidth={2.5} />
          </motion.div>

          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {current.text}
            </p>
            <p className="text-xs font-bold text-slate-500 mt-1">Just now</p>
          </div>

          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {notifications.map((_, index) => (
              <motion.div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
                }`}
                animate={index === currentIndex ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
