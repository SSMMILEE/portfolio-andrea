import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Newspaper3DProps {
    images: string[];
    className?: string;
}

const Newspaper3D: React.FC<Newspaper3DProps> = ({ images, className = "" }) => {
    // Solo usaremos las primeras 3 imágenes si hay más
    const displayImages = images.slice(0, 3);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Físicas ligeras para simular papel
    const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { damping: 20, stiffness: 80 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { damping: 20, stiffness: 80 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Variantes para cada hoja de papel en la pila
    const stackOffsets = [
        { z: 0, r: 0, x: 0, y: 0 },         // Frente (Más arriba)
        { z: -20, r: -4, x: -10, y: 5 },    // Medio
        { z: -40, r: 3, x: 10, y: 10 }      // Fondo (Más abajo)
    ];

    return (
        <div
            className={`relative flex items-center justify-center perspective-[1200px] ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                // Animación de flotación suave
                animate={{
                    y: [-10, 10, -10],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-[280px] h-[400px] md:w-[320px] md:h-[450px] cursor-pointer"
            >
                {/* Renderizamos las 3 hojas en orden inverso (fondo -> frente) para que el Z-index funcione naturalmente en DOM order 
            O usamos transformZ. Usaremos reverse map para dibujar primero la de atrás.
        */}
                {[...displayImages].reverse().map((img, i) => {
                    // El índice original en el array 'displayImages'
                    const originalIndex = displayImages.length - 1 - i;
                    const config = stackOffsets[originalIndex] || stackOffsets[2];

                    return (
                        <motion.div
                            key={i}
                            className="absolute inset-0 bg-[#f5f5f0] shadow-lg origin-center"
                            style={{
                                transform: `translateZ(${config.z}px) rotate(${config.r}deg) translate(${config.x}px, ${config.y}px)`,
                                transformStyle: "preserve-3d",
                            }}
                            whileHover={originalIndex === 0 ? {
                                translateZ: 20,
                                transition: { duration: 0.3 }
                            } : {}}
                        >
                            {/* Textura de papel (ruido) */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none z-20" />

                            {/* Imagen */}
                            <img
                                src={img}
                                alt={`Newspaper page ${originalIndex + 1}`}
                                className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.95]" // Filtro ligero para look papel
                            />

                            {/* Sombras y brillos */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-30" />
                            {originalIndex === 0 && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-30 mix-blend-overlay" />
                            )}

                            {/* Borde sutil */}
                            <div className="absolute inset-0 border border-black/5 z-40" />
                        </motion.div>
                    );
                })}

                {/* Sombra de suelo */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-black/40 blur-2xl rounded-full transform scale-y-50" />

            </motion.div>
        </div>
    );
};

export default Newspaper3D;