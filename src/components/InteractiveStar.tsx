import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

export const InteractiveStar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Detectar si es dispositivo móvil para desactivar físicas pesadas
  useEffect(() => {
    const checkMobile = () => {
      // Si el dispositivo es táctil o tiene pantalla pequeña, lo tratamos como móvil
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- CONFIGURACIÓN DESKTOP (FÍSICAS) ---
  const springConfig = { damping: 20, stiffness: 50, mass: 1 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const baseRotate = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!isMobile) {
      baseRotate.set(baseRotate.get() + delta * 0.015);
    }
  });

  const combinedRotateY = useTransform([baseRotate, tiltY], ([base, tilt]) => (base as number) + (tilt as number));

  // --- EVENTOS DE MOUSE (Solo Desktop) ---
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Forma de la estrella
  const StarPath = "M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z";

  // En móvil reducimos la complejidad visual (quitamos el drop-shadow pesado)
  const shadowClass = isMobile ? "" : "drop-shadow-[0_0_15px_rgba(185,28,28,0.3)]";

  const planes = [0, 45, 90, 135].map((deg, i) => (
    <motion.div
      key={i}
      style={{ 
        rotateY: deg,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
      }}
    >
      <svg viewBox="0 0 24 24" className={`w-full h-full overflow-visible ${shadowClass}`}>
        <path 
          d={StarPath} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <path 
          d={StarPath} 
          fill="rgba(185, 28, 28, 0.05)" 
          stroke="none"
        />
        {/* Puntos de luz: Reducimos animaciones en móvil */}
        {!isMobile && (
          <>
            <circle cx="12" cy="0" r="0.4" fill="white" className="animate-pulse" />
            <circle cx="12" cy="24" r="0.4" fill="white" className="animate-pulse" />
            <circle cx="0" cy="12" r="0.4" fill="white" className="animate-pulse" />
            <circle cx="24" cy="12" r="0.4" fill="white" className="animate-pulse" />
          </>
        )}
      </svg>
    </motion.div>
  ));

  return (
    <div className={`relative perspective-[1200px] pointer-events-none select-none ${className}`}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          // Si es móvil, usamos rotación simple CSS/Framer sin hooks pesados
          rotateX: isMobile ? 0 : tiltX,
          rotateY: isMobile ? 0 : combinedRotateY,
          transformStyle: 'preserve-3d',
        }}
        // Animación fallback optimizada para móvil
        animate={isMobile ? { rotateY: 360 } : {}}
        transition={isMobile ? { duration: 15, repeat: Infinity, ease: "linear" } : {}}
        className="w-full h-full relative transform-gpu"
      >
        {planes}
        
        {/* Núcleo central simplificado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white blur-md rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-red blur-2xl opacity-40 rounded-full" />
      </motion.div>
    </div>
  );
};