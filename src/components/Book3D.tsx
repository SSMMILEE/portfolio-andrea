import React from 'react';
import { motion } from 'framer-motion';

interface Book3DProps {
    frontImage: string;
    backImage?: string;
    spineImage: string;
    className?: string;
}

const Book3D: React.FC<Book3DProps> = ({ frontImage, spineImage, className = "" }) => {
    // DIMENSIONES FIJAS (Proporción Vertical 2:3)
    const width = 300;
    const height = 450;
    const depth = 40; // Reduje un poco el grosor para que sea más elegante (40px)

    return (
        <div className={`relative flex items-center justify-center perspective-[2000px] ${className} py-10`}>
            <motion.div
                style={{
                    width: width,
                    height: height,
                    transformStyle: "preserve-3d",
                }}
                // POSICIÓN ESTÁTICA: 
                // rotateY: -15deg -> Muestra la portada casi de frente y solo un poco del lomo a la izquierda.
                initial={{
                    rotateY: -15,
                    rotateX: 5,
                    y: 0
                }}
                // INTERACCIÓN: Sutil movimiento al hacer hover
                whileHover={{
                    rotateY: -20, // Se gira un poquito más para ver más lomo
                    rotateX: 2,   // Se endereza verticalmente
                    scale: 1.02,
                    transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="relative cursor-pointer group shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]" // Sombra CSS estática para rendimiento
            >
                {/* ==========================
            1. LOMO (SPINE) - IZQUIERDA
           ========================== */}
                <div
                    className="absolute top-0 bottom-0 bg-brand-black"
                    style={{
                        width: depth,
                        // Posicionamiento geométrico exacto para cerrar el cubo por la izquierda
                        transform: `translateX(-${depth / 2}px) translateZ(0px) rotateY(-90deg)`,
                        left: 0,
                        transformOrigin: "center",
                        backgroundImage: `url(${spineImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backfaceVisibility: "hidden"
                    }}
                >
                    {/* Sombra interna para dar redondez al lomo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* ==========================
            2. PORTADA (FRONT) - FRENTE
           ========================== */}
                <div
                    className="absolute inset-0 bg-brand-black"
                    style={{
                        // La portada se empuja hacia adelante la mitad del grosor
                        transform: `translateZ(${depth / 2}px)`,
                        backgroundImage: `url(${frontImage})`,
                        backgroundSize: "100% 100%", // Ajuste exacto
                        backfaceVisibility: "hidden"
                    }}
                >
                    {/* Surco del libro (Hinge) cerca del lomo */}
                    <div className="absolute left-[12px] top-0 bottom-0 w-[2px] bg-black/20 blur-[1px] pointer-events-none" />
                    <div className="absolute left-[13px] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

                    {/* Brillo premium al pasar el mouse */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                </div>

                {/* ==========================
            3. ESTRUCTURA (RELLENOS)
           ========================== */}

                {/* Tapa trasera (Oscura, apenas visible por el ángulo) */}
                <div
                    className="absolute inset-0 bg-[#0a0a0a]"
                    style={{
                        transform: `translateZ(-${depth / 2}px) rotateY(180deg)`,
                        backfaceVisibility: "hidden"
                    }}
                />

                {/* Relleno superior (Hojas) */}
                <div className="absolute top-0 left-0 bg-[#f5f5f5]"
                    style={{
                        width: width,
                        height: depth,
                        transform: `rotateX(90deg) translateZ(${depth / 2}px)`,
                        transformOrigin: "bottom center"
                    }}
                >
                    {/* Textura de hojas finas */}
                    <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)", backgroundSize: "100% 2px" }} />
                </div>

                {/* Relleno inferior (Hojas) */}
                <div className="absolute bottom-0 left-0 bg-[#f5f5f5]"
                    style={{
                        width: width,
                        height: depth,
                        transform: `rotateX(-90deg) translateZ(${depth / 2}px)`,
                        transformOrigin: "top center"
                    }}
                >
                    <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)", backgroundSize: "100% 2px" }} />
                </div>

                {/* Relleno lateral derecho (Hojas - Frente de las hojas) */}
                <div className="absolute right-0 top-0 bottom-0 bg-[#f5f5f5]"
                    style={{
                        width: depth,
                        transform: `rotateY(90deg) translateZ(${depth / 2}px)`,
                        transformOrigin: "center right",
                        left: width - depth
                    }}
                >
                    <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #d4d4d4 1px, transparent 1px)", backgroundSize: "3px 100%" }} />
                    {/* Sombra cóncava de las hojas */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
                </div>

            </motion.div>
        </div>
    );
};

export default Book3D;