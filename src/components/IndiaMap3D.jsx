import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export default function IndiaMap3D({ onStateHover, hoveredState }) {
  const [mapData, setMapData] = useState({ paths: [], viewBox: "0 0 612 792" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef();

  const stateData = {
    "Maharashtra": { cases: 245000, recovered: 230000, active: 12000, risk: "High", trend: "down" },
    "Karnataka": { cases: 112000, recovered: 108000, active: 3000, risk: "Low", trend: "down" },
    "Tamil Nadu": { cases: 158000, recovered: 140000, active: 15000, risk: "Medium", trend: "up" },
    "Uttar Pradesh": { cases: 98000, recovered: 92000, active: 5000, risk: "Medium", trend: "down" },
    "Kerala": { cases: 85000, recovered: 82000, active: 2000, risk: "Low", trend: "down" },
    "Gujarat": { cases: 72000, recovered: 68000, active: 4000, risk: "Medium", trend: "down" },
    "Rajasthan": { cases: 65000, recovered: 60000, active: 5000, risk: "Medium", trend: "stable" },
    "Delhi": { cases: 210000, recovered: 200000, active: 10000, risk: "High", trend: "down" },
    "West Bengal": { cases: 130000, recovered: 122000, active: 8000, risk: "Medium", trend: "down" },
    "Madhya Pradesh": { cases: 94000, recovered: 88000, active: 6000, risk: "Medium", trend: "stable" },
    "Bihar": { cases: 42000, recovered: 38000, active: 4000, risk: "Low", trend: "down" },
    "Andhra Pradesh": { cases: 55000, recovered: 51000, active: 4000, risk: "Medium", trend: "down" },
    "Telangana": { cases: 48000, recovered: 45000, active: 3000, risk: "Low", trend: "down" },
    "Odisha": { cases: 39000, recovered: 36000, active: 3000, risk: "Low", trend: "down" }
  };

  useEffect(() => {
    const fetchMap = async () => {
      try {
     const response = await fetch(
  'https://unpkg.com/@svg-maps/india@1.0.1/india.svg'
); 
        if (!response.ok) throw new Error('Failed to fetch map data');

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "image/svg+xml");

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
          throw new Error('Error parsing map SVG');
        }

        const svgElement = xmlDoc.querySelector("svg");
        if (!svgElement) throw new Error('SVG element not found');

        const viewBox = svgElement.getAttribute("viewBox") || "0 0 612 792";
        const paths = Array.from(xmlDoc.getElementsByTagName("path")).map(path => ({
          d: path.getAttribute("d"),
          id: path.getAttribute("id"),
          name: path.getAttribute("name") || path.getAttribute("title") || path.getAttribute("id")
        }));

        if (paths.length === 0) throw new Error('No map paths found');

        setMapData({ paths, viewBox });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load map:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMap();
  }, []);

  const getRiskColor = (stateName) => {
    const data = stateData[stateName];
    if (!data) return '#e0f2fe';

    switch(data.risk) {
      case 'High': return '#fee2e2';
      case 'Medium': return '#fef3c7';
      case 'Low': return '#dcfce7';
      default: return '#e0f2fe';
    }
  };

  const getHoverColor = (stateName) => {
    const data = stateData[stateName];
    if (!data) return '#3b82f6';

    switch(data.risk) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600 animate-pulse">Loading Interactive Map...</p>
        </motion.div>
      ) : error ? (
        <div className="text-center p-8 glass-card-light rounded-2xl">
          <Activity className="mx-auto text-red-400 mb-3" size={40} />
          <p className="text-sm text-red-600 font-semibold mb-2">Unable to load map</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      ) : (
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full flex items-center justify-center relative"
        >
          <svg
            viewBox={mapData.viewBox}
            className="w-auto h-full max-h-[550px] drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(59, 130, 246, 0.15))',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            {mapData.paths.map((path, idx) => (
              <motion.path
                key={idx}
                d={path.d}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.01, duration: 0.3 }}
                onMouseEnter={() => onStateHover(path.name)}
                onMouseLeave={() => onStateHover(null)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  fill: hoveredState === path.name ? getHoverColor(path.name) : getRiskColor(path.name),
                  stroke: hoveredState === path.name ? '#fff' : 'rgba(59, 130, 246, 0.2)',
                  strokeWidth: hoveredState === path.name ? 2 : 1,
                  filter: hoveredState === path.name ? 'url(#glow)' : 'none',
                  transform: hoveredState === path.name ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'center',
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              />
            ))}
          </svg>

          <AnimatePresence>
            {hoveredState && stateData[hoveredState] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute top-4 right-4 glass-card rounded-2xl p-6 w-80 z-50 border-2 border-white/30"
                style={{
                  backdropFilter: 'blur(30px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{hoveredState}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stateData[hoveredState].risk === 'High'
                          ? 'bg-red-100 text-red-700'
                          : stateData[hoveredState].risk === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {stateData[hoveredState].risk} Risk
                      </span>
                      {stateData[hoveredState].trend === 'down' ? (
                        <TrendingDown size={16} className="text-green-500" />
                      ) : stateData[hoveredState].trend === 'up' ? (
                        <TrendingUp size={16} className="text-red-500" />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Total Cases</span>
                    <span className="text-lg font-bold text-blue-600">
                      {stateData[hoveredState].cases.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Recovered</span>
                    <span className="text-lg font-bold text-green-600">
                      {stateData[hoveredState].recovered.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Active Cases</span>
                    <span className="text-lg font-bold text-orange-600">
                      {stateData[hoveredState].active.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-600">Recovery Rate</span>
                    <span className="text-sm font-bold text-slate-900">
                      {((stateData[hoveredState].recovered / stateData[hoveredState].cases) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(stateData[hoveredState].recovered / stateData[hoveredState].cases) * 100}%`
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
