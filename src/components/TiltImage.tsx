import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const TiltImage: React.FC<TiltImageProps> = ({ src, alt, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics configuration
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };

  // Transformations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Glare positioning
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      // OPTIMIZACIÓN: 'will-change-transform' prepara al navegador.
      className={`relative w-full h-auto cursor-pointer group will-change-transform ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-auto relative"
      >
         {/* Main Image Container */}
        <div 
            className="w-full h-auto rounded-sm overflow-hidden bg-[#111] shadow-2xl relative"
            // OPTIMIZACIÓN: Forzar capa GPU y ocultar cara trasera evita parpadeos
            style={{ 
                transform: 'translateZ(0)', 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden' 
            }}
        >
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto block object-cover transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              loading="lazy"
              decoding="async"
            />
            
            {/* Overlay */}
            <motion.div 
                className="absolute inset-0 bg-black/10 pointer-events-none"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Glare Effect */}
            <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
                style={{
                    background: glareBackground,
                    opacity: isHovered ? 1 : 0
                }}
            />
            
            {/* Border highlight */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
        </div>
        
        {/* Shadow Elevation */}
         <motion.div 
            className="absolute inset-0 bg-black/50 blur-xl -z-10 translate-y-4 rounded-sm"
            animate={{ 
              opacity: isHovered ? 0.7 : 0.4,
              scale: isHovered ? 0.95 : 0.9,
              y: isHovered ? 20 : 10
            }}
            transition={{ duration: 0.4 }}
         />
      </motion.div>
    </motion.div>
  );
};

export default TiltImage;