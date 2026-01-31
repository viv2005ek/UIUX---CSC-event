import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Filter,
  Activity,
  Users,
  Heart,
  Shield,
  Info,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

import Enhanced3DBackground from './components/Enhanced3DBackground';
import Enhanced3DHero from './components/Enhanced3DHero';
import Enhanced3DCard from './components/Enhanced3DCard';
import Enhanced3DStatCard from './components/Enhanced3DStatCard';
import TrendChart from './components/TrendChart';
import IndiaMap3D from './components/IndiaMap3D';
import ScrollProgress from './components/ScrollProgress';

function AppEnhanced() {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState("Influenza-A");
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);

  const stats = [
    {
      label: "Total Cases",
      value: 1240500,
      change: "+2.3%",
      icon: Users,
      glowColor: "cyan",
    },
    {
      label: "Recovered",
      value: 1180200,
      change: "+5.2%",
      icon: Heart,
      glowColor: "fuchsia",
    },
    {
      label: "Active Cases",
      value: 45300,
      change: "-3.1%",
      icon: Activity,
      glowColor: "orange",
    },
    {
      label: "Awareness",
      value: 82,
      change: "+8.4%",
      icon: Shield,
      glowColor: "cyan",
    }
  ];

  const resources = [
    {
      label: "Symptom Checker",
      detail: "AI-powered self-assessment",
      icon: Activity,
      color: "cyan",
    },
    {
      label: "Vaccination Locator",
      detail: "Find nearest centers",
      icon: Shield,
      color: "fuchsia",
    },
    {
      label: "Emergency Helpline",
      detail: "24/7 Support: 1075",
      icon: Heart,
      color: "orange",
    },
    {
      label: "Prevention Guide",
      detail: "WHO approved protocols",
      icon: Info,
      color: "cyan",
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Enhanced3DBackground />
      <ScrollProgress />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        className="fixed top-0 left-0 right-0 z-50 glass-card-premium border-b border-cyan-500/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-cyan-500/30"
                >
                  <Activity className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-cyan-500/30 blur-md"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Vigilant Health India
                </h1>
                <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Live Intelligence Hub
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-2xl mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  type="text"
                  placeholder="Search states, districts, diseases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-card-premium border border-cyan-500/30 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 rounded-2xl glass-card-premium border border-cyan-500/30 font-bold text-sm text-white flex items-center gap-2 hover:border-cyan-500/50 transition-all"
              >
                <Filter size={16} />
                <span className="hidden xl:inline">{selectedDisease}</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex px-5 py-3 rounded-2xl bg-gradient-primary text-white font-bold text-sm items-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Sparkles size={16} />
                <span className="hidden md:inline">AI Insights</span>
              </motion.button>

              <button
                className="lg:hidden p-3 rounded-xl glass-card-premium border border-cyan-500/30 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 space-y-3"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full glass-card-premium border border-cyan-500/30 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-white placeholder-neutral-500"
                />
              </div>
              <button className="w-full px-5 py-3 rounded-2xl bg-gradient-primary text-white font-bold text-sm flex items-center justify-center gap-2">
                <Sparkles size={16} />
                AI Insights
              </button>
            </motion.div>
          )}
        </div>
      </motion.header>

      <div className="pt-20">
        <Enhanced3DHero />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {stats.map((stat, index) => (
              <Enhanced3DStatCard
                key={index}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
            <div className="lg:col-span-8">
              <Enhanced3DCard delay={0.4} glowColor="cyan">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/20 backdrop-blur-sm">
                      <MapPin className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                        Geographic View
                      </h2>
                      <p className="text-sm font-semibold text-neutral-400">
                        Interactive state-level data
                      </p>
                    </div>
                  </div>

                  {hoveredState && (
                    <motion.div
                      key={hoveredState}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="px-4 py-2 bg-gradient-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-cyan-500/30"
                    >
                      {hoveredState}
                    </motion.div>
                  )}
                </div>

                <div className="h-[400px] sm:h-[500px] mb-6">
                  <IndiaMap3D onStateHover={setHoveredState} hoveredState={hoveredState} />
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 glass-card-light rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded border-2 border-green-500" />
                    <span className="text-xs font-bold text-neutral-300">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-200 rounded border-2 border-yellow-500" />
                    <span className="text-xs font-bold text-neutral-300">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 rounded border-2 border-red-500" />
                    <span className="text-xs font-bold text-neutral-300">High Risk</span>
                  </div>
                </div>
              </Enhanced3DCard>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <Enhanced3DCard delay={0.5} glowColor="fuchsia">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-fuchsia-500/20 backdrop-blur-sm">
                    <TrendingUp className="text-fuchsia-400" size={24} />
                  </div>
                  <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                    Trend Analysis
                  </h2>
                </div>

                <div className="h-56 mb-6">
                  <TrendChart />
                </div>

                <div className="p-4 glass-card-light rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-fuchsia-400" size={16} />
                    <span className="text-xs font-black text-fuchsia-400 uppercase">
                      Key Insight
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-300">
                    Recovery rates improving. Active cases down 3.1% this week.
                  </p>
                </div>
              </Enhanced3DCard>

              <Enhanced3DCard delay={0.6} glowColor="orange">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-orange-500/20 backdrop-blur-sm">
                    <Info className="text-orange-400" size={24} />
                  </div>
                  <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                    Resources
                  </h2>
                </div>

                <div className="space-y-2 mb-6">
                  {resources.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className="w-full p-4 rounded-2xl glass-card-light hover:glass-card-premium transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-${item.color}-500/20 group-hover:bg-${item.color}-500/30 transition-colors`}>
                            <item.icon className={`text-${item.color}-400`} size={20} strokeWidth={2} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-white">
                              {item.label}
                            </span>
                            <span className="block text-xs font-medium text-neutral-400">
                              {item.detail}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="text-neutral-500 group-hover:text-cyan-400 transition-colors" size={18} />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Shield size={28} />
                      </div>
                      <div>
                        <span className="block text-sm font-black text-white">Recovery Rate</span>
                        <span className="block text-xs text-white/90">National Average</span>
                      </div>
                    </div>
                    <span className="text-4xl font-black text-white" style={{ fontFamily: "'Orbitron', monospace" }}>94.2%</span>
                  </div>
                </motion.div>
              </Enhanced3DCard>
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-12 border-t border-cyan-500/20"
          >
            <Enhanced3DCard delay={0.9} glowColor="cyan">
              <div className="flex flex-col items-center justify-center gap-6 p-4 sm:p-8">
                <div className="flex items-center gap-3">
                  <Shield className="text-cyan-400" size={24} />
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-400">
                    Official Data Source
                  </p>
                </div>
                <p className="text-center text-sm font-semibold text-neutral-400">
                  Ministry of Health & Family Welfare, Government of India
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-cyan-400" />
                    <span className="text-xs font-semibold">Last Updated: Today, 6:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-cyan-400" />
                    <span className="text-xs font-semibold">Refreshes Every 6 Hours</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-cyan-500/20 w-full text-center">
                  <p className="text-xs font-semibold text-neutral-500">
                    © 2024 Vigilant Health India. Built for public health awareness with AI-powered insights.
                  </p>
                </div>
              </div>
            </Enhanced3DCard>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

export default AppEnhanced;
