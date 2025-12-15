import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Hoodie3DProps {
    image: string;
    className?: string;
}

const Hoodie3D: React.FC<Hoodie3DProps> = ({ image, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Físicas más suaves para ropa (tela)
    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 25, stiffness: 100 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 25, stiffness: 100 });

    // La sombra se mueve en dirección opuesta para dar sensación de levitación
    const shadowX = useSpring(useTransform(x, [-100, 100], [10, -10]), { damping: 25, stiffness: 100 });

    // Highlight dinámico que recorre la tela
    const sheenX = useTransform(x, [-100, 100], [0, 100]);

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
                // Animación de respiración/flotación lenta
                animate={{
                    y: [-15, 0, -15],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-[320px] md:w-[400px] cursor-pointer z-10"
            >
                {/* ==========================
            CANGURO (Hoodie)
           ========================== */}

                {/* Imagen Principal recortada (PNG) */}
                <div className="relative z-10">
                    <img
                        src={image}
                        alt="Tiwanaku Hoodie"
                        className="w-full h-auto drop-shadow-2xl select-none"
                        draggable={false}
                    />

                    {/* Capa de Brillo/Sheen para simular tela satinada/algodón */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-40"
                        style={{
                            background: useTransform(sheenX, (val) =>
                                `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) ${val}%, transparent 80%)`
                            )
                        }}
                    />

                    {/* Capa de Sombra Volumétrica Interna (para pliegues) */}
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply bg-gradient-to-t from-black/20 to-transparent opacity-50" />
                </div>

                {/* ==========================
            SOMBRA DE PISO
           ========================== */}
                <motion.div
                    style={{ x: shadowX }}
                    animate={{
                        scale: [0.9, 1, 0.9],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-black blur-xl rounded-[100%]"
                />

                {/* Elemento decorativo flotante (etiqueta o detalle) */}
                <motion.div
                    className="absolute top-[30%] right-[10%] w-3 h-3 bg-brand-red rounded-full shadow-[0_0_10px_#b91c1c] z-30 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ transform: "translateZ(30px)" }}
                />

            </motion.div>
        </div>
    );
};

export default Hoodie3D;    