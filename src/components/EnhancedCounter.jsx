import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

export default function EnhancedCounter({ value, duration = 2.5, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const endValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;

    const controls = animate(spring, endValue, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      }
    });

    return () => controls.stop();
  }, [value, duration, spring]);

  return (
    <motion.span
      className="tabular-nums inline-block"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.span>
  );
}
