import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

export const InteractiveStar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuración de físicas simplificada para móviles
  const springConfig = isMobile ? { damping: 30, stiffness: 100, mass: 0.5 } : { damping: 20, stiffness: 50, mass: 1 };
  
  // Rotación basada en el mouse (tilt) - solo en desktop
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], isMobile ? [10, -10] : [25, -25]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], isMobile ? [-10, 10] : [-25, 25]), springConfig);

  // Rotación continua automática - más lenta en móviles
  const baseRotate = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    // Gira más lentamente en móviles
    const speed = isMobile ? 0.005 : 0.015;
    baseRotate.set(baseRotate.get() + delta * speed);
  });

  // Combinar rotación automática con la interacción del mouse (solo desktop)
  const rotateY = useTransform([baseRotate, tiltY], ([base, tilt]) => (base as number) + (isMobile ? 0 : (tilt as number)));

  useEffect(() => {
    if (isMobile) return; // No mouse tracking en móviles
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Forma de la estrella (4 puntas clásica)
  const StarPath = "M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z";

  // En móviles, usamos menos planos para mejor rendimiento
  const planeAngles = isMobile ? [0, 90] : [0, 45, 90, 135];
  
  const planes = planeAngles.map((deg, i) => (
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
      <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(185,28,28,0.3)]">
        {/* Stroke brillante */}
        <path 
          d={StarPath} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Relleno sutil rojo */}
        <path 
          d={StarPath} 
          fill="rgba(185, 28, 28, 0.05)" 
          stroke="none"
        />
        {/* Puntos de luz en las esquinas - menos animaciones en móviles */}
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
          rotateX: tiltX,
          rotateY, // Usa la rotación combinada
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative transform-gpu"
      >
        {planes}
        
        {/* Núcleo brillante central - más simple en móviles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white blur-md rounded-full" />
        {!isMobile && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-red blur-2xl opacity-40 rounded-full" />
        )}
      </motion.div>
    </div>
  );
};