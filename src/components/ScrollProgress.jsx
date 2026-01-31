import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-orange-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[99] blur-sm"
        style={{
          scaleX,
          background: 'linear-gradient(to right, rgba(6, 182, 212, 0.5), rgba(217, 70, 239, 0.5), rgba(249, 115, 22, 0.5))',
        }}
      />
    </>
  );
}
