import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { InteractiveStar } from './InteractiveStar';

const Star4Point = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
  </svg>
);

const Asterisk = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2V22M2 12H22M4.929 4.929L19.071 19.071M19.071 4.929L4.929 19.071" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const RevealText = ({ text, className = "", delay = 0 }: { text: string; className?: string, delay?: number }) => {
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible" // Aseguramos que se active al verse
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Configuración de Parallax
  const yBackground = useTransform(scrollY, [0, 1000], [0, 200]);
  const yDecor = useTransform(scrollY, [0, 1000], [0, -150]);
  const yTitle = useTransform(scrollY, [0, 1000], [0, 400]);
  const yBadge = useTransform(scrollY, [0, 1000], [0, 600]);

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-white">

      {/* Background Animation & Noise */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yBackground }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 rounded-full blur-[120px] opacity-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            scale: { duration: 1.5, ease: "easeOut" },
            default: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          style={{ y: yBackground }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            opacity: { duration: 2 },
            default: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* 3D STAR */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ y: yBackground }}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 0.8, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
        >
          <InteractiveStar className="w-[300px] h-[300px] md:w-[650px] md:h-[650px]" />
        </motion.div>
      </div>

      {/* Top Left Sparkles */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-[15%] left-[5%] md:left-[8%] flex flex-col gap-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star4Point className="w-12 h-12 md:w-20 md:h-20 text-white" />
        </motion.div>
        <Star4Point className="w-6 h-6 md:w-8 md:h-8 text-white ml-8 opacity-70" />
      </motion.div>

      {/* Top Right Date */}
      <motion.div
        style={{ y: yDecor }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        className="absolute top-[12%] right-[5%] md:right-[8%] font-display text-xl md:text-2xl tracking-widest z-10 overflow-hidden"
      >
        <RevealText text="2025" delay={1.6} />
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1600px] px-4">

        {/* Pill Badge */}
        <motion.div style={{ y: yTitle }} className="relative z-20">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
            className="border border-white/30 rounded-full px-5 py-2 md:px-8 md:py-3 mb-2 md:mb-4 backdrop-blur-sm bg-white/5 overflow-hidden whitespace-nowrap"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] md:text-sm tracking-[0.2em] font-bold text-gray-200 uppercase"
            >
              Diseño Gráfico - Ilustración
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          style={{ y: yTitle }}
          className="relative leading-[0.85] flex justify-center w-full"
        >
          <div className="relative z-10 mix-blend-overlay">
            <RevealText
              text="PORTFOLIO"
              className="text-[18vw] md:text-[20vw] font-display uppercase text-white tracking-tighter text-center"
              delay={0.2}
            />
          </div>

          {/* Red Asterisk */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute top-[12%] right-[2%] md:right-[4%] text-brand-red w-[6vw] h-[6vw] z-20"
          >
            <Asterisk className="w-full h-full" />
          </motion.div>
        </motion.div>

        {/* Name Badge */}
        <motion.div
          style={{ y: yBadge }}
          className="relative z-20 flex justify-center w-full"
        >
          <motion.div
            initial={{ y: 100, opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: -2 }}
            transition={{ delay: 1, type: "spring", bounce: 0.5 }}
            className="bg-brand-red text-white px-8 py-3 md:px-14 md:py-5 rounded-2xl md:rounded-[2rem] transform -translate-y-[40%] md:-translate-y-[50%] hover:rotate-0 transition-transform duration-300 shadow-[0_10px_40px_rgba(185,28,28,0.5)] border border-white/10"
          >
            <h2 className="text-xl md:text-4xl font-display uppercase tracking-widest">
              Andrea Escobar
            </h2>
          </motion.div>
        </motion.div>

      </div>

      {/* Bottom Right Sparkles */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-[10%] right-[5%] md:right-[8%] flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 1.8 }}
      >
        <Star4Point className="w-8 h-8 md:w-12 md:h-12 text-white" />
        <motion.div
          className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

    </section>
  );
};

export default Hero;