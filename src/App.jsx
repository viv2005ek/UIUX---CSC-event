import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Filter,
  Activity,
  Users,
  TrendingUp,
  Heart,
  Shield,
  AlertCircle,
  Info,
  ArrowUpRight,
  Play,
  Pause,
  ChevronDown,
  Zap,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

import AdvancedParticles from './components/AdvancedParticles';
import EnhancedGlobe from './components/EnhancedGlobe';
import EnhancedGlassCard from './components/EnhancedGlassCard';
import EnhancedCounter from './components/EnhancedCounter';
import TrendChart from './components/TrendChart';
import IndiaMap3D from './components/IndiaMap3D';
import HeroSection from './components/HeroSection';
import FloatingStats from './components/FloatingStats';
import ScrollProgress from './components/ScrollProgress';
import { motionTokens, buttonHover, buttonTap } from './config/motion';

function App() {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState("Influenza-A");
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    {
      label: "Total Cases",
      value: 1240500,
      change: "+2.3%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      label: "Recovered",
      value: 1180200,
      change: "+5.2%",
      icon: Heart,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      label: "Active Cases",
      value: 45300,
      change: "-3.1%",
      icon: Activity,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      label: "Awareness",
      value: 82,
      suffix: "%",
      change: "+8.4%",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  const knowledgeItems = [
    {
      label: "Symptom Checker",
      detail: "AI-powered self-assessment",
      icon: Activity,
      color: "text-blue-500"
    },
    {
      label: "Vaccination Locator",
      detail: "Find nearest centers",
      icon: Shield,
      color: "text-green-500"
    },
    {
      label: "Emergency Helpline",
      detail: "24/7 Support: 1075 / 102",
      icon: Heart,
      color: "text-red-500"
    },
    {
      label: "Prevention Guide",
      detail: "WHO approved protocols",
      icon: Info,
      color: "text-purple-500"
    }
  ];

  const { scrollY: scrollYMotion } = useScroll();
  const headerOpacity = useTransform(scrollYMotion, [0, 100], [0.8, 1]);
  const headerBlur = useTransform(scrollYMotion, [0, 100], [20, 40]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollProgress />
      <AdvancedParticles />
      <EnhancedGlobe />

      <div className="relative z-10 min-h-screen">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: motionTokens.easing.smooth }}
          style={{
            opacity: headerOpacity,
            backdropFilter: useTransform(headerBlur, (blur) => `blur(${blur}px) saturate(180%)`)
          }}
          className="sticky top-0 z-50 bg-white/80 border-b border-white/30 shadow-2xl shadow-blue-500/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-4 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={motionTokens.spring.gentle}
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
                  >
                    <Activity className="text-white" size={28} strokeWidth={2.5} />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 blur-xl"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                    Vigilant Health India
                  </h1>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Real-Time Intelligence
                  </p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
                <motion.div
                  className="relative flex-1"
                  whileFocus={{ scale: 1.02 }}
                  transition={motionTokens.spring.gentle}
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                  <motion.input
                    type="text"
                    placeholder="Search states, districts, diseases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glass-card-premium rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder:text-slate-400"
                    whileFocus={{ boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)' }}
                  />
                </motion.div>

                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="glass-card-premium rounded-2xl px-6 py-4 flex items-center gap-3 font-bold text-slate-700 hover:text-blue-600 transition-colors group"
                >
                  <Filter size={18} className="group-hover:rotate-12 transition-transform" />
                  {selectedDisease}
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold cursor-pointer shadow-xl shadow-green-500/20 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Zap size={20} className="relative z-10 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
                <span className="relative z-10">Live Updates</span>
                <motion.span
                  className="w-2 h-2 bg-white rounded-full relative z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </div>
          </div>
        </motion.header>

        <HeroSection scrollY={scrollY} />

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <EnhancedGlassCard
                key={index}
                delay={index * 0.08}
                className="relative overflow-hidden cursor-pointer group"
                tiltEffect={true}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`p-4 rounded-2xl ${stat.bgColor} relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={motionTokens.spring.bouncy}
                  >
                    <stat.icon className={stat.textColor} size={28} strokeWidth={2.5} />
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl`}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08 + 0.4,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className={`text-xs font-black px-3 py-1.5 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    } shadow-lg`}
                  >
                    {stat.change}
                  </motion.span>
                </div>

                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.15em] mb-3">
                  {stat.label}
                </p>

                <div className="flex items-end gap-1 mb-4">
                  <h3 className={`text-4xl font-black ${stat.textColor} leading-none`}>
                    <EnhancedCounter value={stat.value} suffix={stat.suffix || ''} />
                  </h3>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{
                      duration: 1.8,
                      delay: index * 0.08 + 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/40"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.08 + 1
                      }}
                      style={{ width: '50%' }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${stat.color} rounded-full blur-3xl`}
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </EnhancedGlassCard>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8 mb-12">
            <EnhancedGlassCard delay={0.4} className="col-span-8 min-h-[700px] flex flex-col" hover={false} tiltEffect={false}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={motionTokens.spring.bouncy}
                  >
                    <MapPin className="text-blue-600" size={28} strokeWidth={2.5} />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                      Geographic Intelligence
                    </h2>
                    <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                      <Sparkles size={14} className="text-purple-500" />
                      Interactive 3D state-level visualization
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredState && (
                    <motion.div
                      key={hoveredState}
                      initial={{ scale: 0.8, opacity: 0, y: -10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 10 }}
                      transition={motionTokens.spring.bouncy}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-sm shadow-2xl shadow-blue-500/30 flex items-center gap-2"
                    >
                      <MapPin size={16} strokeWidth={3} />
                      {hoveredState}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1 relative">
                <IndiaMap3D
                  onStateHover={setHoveredState}
                  hoveredState={hoveredState}
                />
              </div>

              <div className="mt-8 flex items-center gap-6 p-5 glass-card-premium rounded-2xl">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-green-50">
                  <motion.div
                    className="w-4 h-4 bg-green-200 rounded-lg border-2 border-green-500 shadow-lg shadow-green-500/30"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={motionTokens.spring.bouncy}
                  />
                  <span className="text-xs font-black text-green-700 uppercase tracking-wide">Low Risk</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-yellow-50">
                  <motion.div
                    className="w-4 h-4 bg-yellow-200 rounded-lg border-2 border-yellow-500 shadow-lg shadow-yellow-500/30"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={motionTokens.spring.bouncy}
                  />
                  <span className="text-xs font-black text-yellow-700 uppercase tracking-wide">Medium Risk</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-red-50">
                  <motion.div
                    className="w-4 h-4 bg-red-200 rounded-lg border-2 border-red-500 shadow-lg shadow-red-500/30"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={motionTokens.spring.bouncy}
                  />
                  <span className="text-xs font-black text-red-700 uppercase tracking-wide">High Risk</span>
                </div>

                <div className="flex-1" />

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold shadow-xl shadow-blue-500/30 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                    className="relative z-10"
                  >
                    {isPlaying ? <Pause size={18} strokeWidth={2.5} /> : <Play size={18} strokeWidth={2.5} />}
                  </motion.div>
                  <span className="relative z-10">{isPlaying ? 'Pause' : 'Play'} Timeline</span>
                </motion.button>
              </div>
            </EnhancedGlassCard>

            <div className="col-span-4 flex flex-col gap-8">
              <EnhancedGlassCard delay={0.5} tiltEffect={false}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={motionTokens.spring.bouncy}
                  >
                    <TrendingUp className="text-blue-600" size={28} strokeWidth={2.5} />
                  </motion.div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Trend Analysis
                  </h2>
                </div>

                <div className="h-64">
                  <TrendChart />
                </div>

                <motion.div
                  className="mt-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-2xl border-2 border-blue-100/50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={motionTokens.spring.gentle}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles className="text-blue-600" size={18} />
                      </motion.div>
                      <span className="text-xs font-black text-blue-700 uppercase tracking-[0.15em]">
                        Key Insight
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      Recovery rates show consistent improvement across all regions. Active cases declining by 3.1% this week.
                    </p>
                  </div>
                </motion.div>
              </EnhancedGlassCard>

              <EnhancedGlassCard delay={0.6} className="flex-1" tiltEffect={false}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={motionTokens.spring.bouncy}
                  >
                    <Info className="text-purple-600" size={28} strokeWidth={2.5} />
                  </motion.div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Resources
                  </h2>
                </div>

                <div className="space-y-3">
                  {knowledgeItems.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, ...motionTokens.spring.gentle }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group p-4 rounded-2xl hover:bg-white/70 border-2 border-transparent hover:border-white/50 transition-all text-left relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-br ${item.color === 'text-blue-500' ? 'from-blue-100 to-blue-50' : item.color === 'text-green-500' ? 'from-green-100 to-green-50' : item.color === 'text-red-500' ? 'from-red-100 to-red-50' : 'from-purple-100 to-purple-50'} shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={motionTokens.spring.bouncy}
                          >
                            <item.icon className={item.color} size={22} strokeWidth={2.5} />
                          </motion.div>
                          <div>
                            <span className="block text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-xs font-bold text-slate-500 mt-1">
                              {item.detail}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 3, y: -3 }}
                          transition={motionTokens.spring.snappy}
                        >
                          <ArrowUpRight
                            className="text-slate-300 group-hover:text-blue-500 transition-colors"
                            size={20}
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(34, 197, 94, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white cursor-pointer shadow-2xl shadow-green-500/30 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={motionTokens.spring.bouncy}
                      >
                        <Shield size={32} strokeWidth={2.5} />
                      </motion.div>
                      <div>
                        <span className="block text-base font-black tracking-tight">Recovery Rate</span>
                        <span className="block text-xs font-bold opacity-90 mt-1">National Average</span>
                      </div>
                    </div>
                    <motion.span
                      className="text-5xl font-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, ...motionTokens.spring.bouncy }}
                    >
                      94.2%
                    </motion.span>
                  </div>
                </motion.div>
              </EnhancedGlassCard>
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: motionTokens.easing.smooth }}
            className="mt-16 pt-12 border-t-2 border-slate-200/50"
          >
            <div className="glass-card-premium rounded-3xl p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Shield className="text-blue-600" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                  Official Data Source
                </p>
              </div>
              <p className="text-center text-sm font-bold text-slate-500 mb-8">
                Ministry of Health & Family Welfare, Government of India
              </p>

              <div className="flex items-center justify-center gap-8 text-slate-400">
                <motion.div
                  whileHover={{ scale: 1.05, color: '#3b82f6' }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Clock size={16} />
                  <span className="text-xs font-bold">Last Updated: Today, 6:30 PM IST</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#3b82f6' }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Activity size={16} />
                  <span className="text-xs font-bold">Data Refreshes Every 6 Hours</span>
                </motion.div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs font-bold text-slate-400">
                © 2024 Vigilant Health India. Built with care for public health awareness.
              </p>
            </div>
          </motion.footer>
        </main>

        <FloatingStats />
      </div>
    </div>
  );
}

export default App;
