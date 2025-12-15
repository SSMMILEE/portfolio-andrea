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
        duration: 25, // Más lento para consumir menos GPU
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
        duration: 25,
        ease: "linear",
      },
    },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }} // Transición más rápida del contenido
        className="w-full"
      >
        {children}
      </motion.div>
      
      {/* Cortina de Entrada (Slide Up) */}
      <motion.div
        className="fixed inset-0 z-[100] bg-brand-black flex flex-col justify-center items-center pointer-events-none overflow-hidden will-change-transform"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "0%" }} // Al salir, baja de nuevo
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} // Curva de Bezier suave
      >
        <TransitionContent />
      </motion.div>
    </>
  );
};

const TransitionContent = () => (
  // Optimización: will-change-transform ayuda al navegador a priorizar esta capa
  <div className="relative w-[120%] h-[120%] flex flex-col justify-center gap-4 rotate-[-15deg] opacity-80 select-none will-change-transform">
    {/* Decorative Red Shapes */}
    <div className="absolute right-1/4 bottom-1/4 w-32 h-32 border-[8px] border-brand-red z-10 opacity-50" />
    <div className="absolute left-1/4 top-1/4 w-48 h-16 bg-brand-red/20 z-10" />

    {/* Rolling Text Rows - REDUCIDO: Menos filas y menos repeticiones para mejorar rendimiento */}
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex overflow-hidden whitespace-nowrap will-change-transform">
        <motion.div
          variants={marqueeVariants}
          animate={i % 2 === 0 ? 'animate' : 'animateReverse'}
          className="flex gap-8 text-7xl md:text-9xl font-display uppercase text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "1px #ffffff" }} // Borde más fino
        >
          {/* Reducido de 8 a 4 repeticiones para menos nodos DOM */}
          {[...Array(4)].map((_, j) => (
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