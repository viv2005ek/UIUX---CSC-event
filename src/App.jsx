import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap
} from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import Globe3D from './components/Globe3D';
import GlassCard from './components/GlassCard';
import AnimatedCounter from './components/AnimatedCounter';
import TrendChart from './components/TrendChart';
import IndiaMap3D from './components/IndiaMap3D';

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Globe3D />

      <div
        className="absolute inset-0 -z-5"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          opacity: 0.05,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />

      <div className="relative z-10 min-h-screen">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                  >
                    <Activity className="text-white" size={24} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-blue-400/30 blur-md"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Vigilant Health India
                  </h1>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Real-Time Disease Intelligence
                  </p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search states, districts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glass-card-light rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card-light rounded-2xl px-6 py-3 flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Filter size={18} />
                  {selectedDisease}
                  <ChevronDown size={16} />
                </motion.button>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold cursor-pointer shadow-lg shadow-green-500/30"
              >
                <Zap size={18} />
                <span>Live Updates</span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} delay={index * 0.1} className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                    <stat.icon className={stat.textColor} size={24} />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {stat.change}
                  </motion.span>
                </div>

                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {stat.label}
                </p>

                <div className="flex items-end gap-1">
                  <h3 className={`text-3xl font-black ${stat.textColor}`}>
                    <AnimatedCounter value={stat.value} />
                    {stat.suffix}
                  </h3>
                </div>

                <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>

                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`} />
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8 mb-8">
            <GlassCard delay={0.4} className="col-span-8 min-h-[700px] flex flex-col" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">
                    Geographic Intelligence
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Interactive 3D state-level visualization
                  </p>
                </div>

                {hoveredState && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg"
                  >
                    {hoveredState}
                  </motion.div>
                )}
              </div>

              <div className="flex-1 relative">
                <IndiaMap3D
                  onStateHover={setHoveredState}
                  hoveredState={hoveredState}
                />
              </div>

              <div className="mt-6 flex items-center gap-6 p-4 glass-card rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded border-2 border-green-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 rounded border-2 border-yellow-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 rounded border-2 border-red-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase">High Risk</span>
                </div>

                <div className="flex-1" />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'} Timeline
                </motion.button>
              </div>
            </GlassCard>

            <div className="col-span-4 flex flex-col gap-6">
              <GlassCard delay={0.5}>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="text-blue-500" size={24} />
                  <h2 className="text-xl font-black text-slate-900">
                    Trend Analysis
                  </h2>
                </div>

                <div className="h-64">
                  <TrendChart />
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-blue-600" size={16} />
                    <span className="text-xs font-black text-blue-600 uppercase tracking-wide">
                      Key Insight
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    Recovery rates show consistent improvement across all regions. Active cases declining by 3.1% this week.
                  </p>
                </div>
              </GlassCard>

              <GlassCard delay={0.6} className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <Info className="text-purple-500" size={24} />
                  <h2 className="text-xl font-black text-slate-900">
                    Resources
                  </h2>
                </div>

                <div className="space-y-2">
                  {knowledgeItems.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group p-4 rounded-2xl hover:bg-white/50 border border-transparent hover:border-white/30 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color === 'text-blue-500' ? 'from-blue-100 to-blue-50' : item.color === 'text-green-500' ? 'from-green-100 to-green-50' : item.color === 'text-red-500' ? 'from-red-100 to-red-50' : 'from-purple-100 to-purple-50'}`}>
                            <item.icon className={item.color} size={20} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-xs font-medium text-slate-500 mt-0.5">
                              {item.detail}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight
                          className="text-slate-300 group-hover:text-blue-500 transition-colors"
                          size={18}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-pointer shadow-lg shadow-green-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Shield size={24} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold">Recovery Rate</span>
                        <span className="block text-xs opacity-90">National Average</span>
                      </div>
                    </div>
                    <span className="text-3xl font-black">94.2%</span>
                  </div>
                </motion.div>
              </GlassCard>
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <AlertCircle size={16} />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Official Source: Ministry of Health & Family Welfare, Government of India
              </p>
            </div>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

export default App;
