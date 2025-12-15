import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const marqueeVariants: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
  animateReverse: {
    x: [-1000, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
      
      <motion.div
        className="fixed inset-0 z-[100] bg-brand-black flex flex-col justify-center items-center pointer-events-none overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: "100%" }}
        exit={{ y: "0%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <TransitionContent />
      </motion.div>

      <motion.div
        className="fixed inset-0 z-[100] bg-brand-black flex flex-col justify-center items-center pointer-events-none overflow-hidden"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <TransitionContent />
      </motion.div>
    </>
  );
};

const TransitionContent = () => (
  <div className="relative w-[120%] h-[120%] flex flex-col justify-center gap-4 rotate-[-15deg] opacity-80 select-none">
    {/* Decorative Red Shapes */}
    <div className="absolute right-1/4 bottom-1/4 w-32 h-32 border-[8px] border-brand-red z-10 opacity-50" />
    <div className="absolute left-1/4 top-1/4 w-48 h-16 bg-brand-red/20 z-10" />

    {/* Rolling Text Rows */}
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex overflow-hidden whitespace-nowrap will-change-transform">
        <motion.div
          variants={marqueeVariants}
          animate={i % 2 === 0 ? 'animate' : 'animateReverse'}
          className="flex gap-8 text-7xl md:text-9xl font-display uppercase text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "2px #ffffff" }}
        >
          {[...Array(8)].map((_, j) => (
            <span key={j} className={j % 2 === 0 ? "text-white fill-current" : ""}>
              PROYECTOS
            </span>
          ))}
        </motion.div>
      </div>
    ))}
  </div>
);

export default PageTransition;