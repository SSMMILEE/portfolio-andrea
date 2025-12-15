import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VinylRecordProps {
    image: string;
    className?: string;
}

const VinylRecord: React.FC<VinylRecordProps> = ({ image, className = "" }) => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div className={`relative w-full aspect-[1.8/1] flex items-center justify-center perspective-[1000px] ${className}`}>

            {/* Container relativo para centrar */}
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">

                {/* EL DISCO DE VINILO (The Record) */}
                {/* Se mueve hacia la derecha al cargar */}
                <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: "50%" }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                    style={{ rotate }} // Rota al hacer scroll también para efecto extra
                    className="absolute top-2 left-2 right-2 bottom-2 rounded-full bg-[#111] shadow-xl flex items-center justify-center z-0"
                >
                    {/* Textura de surcos (Grooves) */}
                    <div
                        className="absolute inset-0 rounded-full opacity-80"
                        style={{
                            background: `repeating-radial-gradient(
                #111 0, 
                #111 2px, 
                #222 3px, 
                #222 4px
              )`
                        }}
                    />

                    {/* Brillo realista (Reflection) */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-white/5 to-transparent opacity-30 pointer-events-none" />

                    {/* Etiqueta del centro (Label) */}
                    <motion.div
                        className="w-1/3 h-1/3 rounded-full overflow-hidden relative z-10 border-4 border-[#0a0a0a]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <img src={image} alt="Vinyl Label" className="w-full h-full object-cover scale-150" />
                    </motion.div>
                </motion.div>

                {/* LA PORTADA (The Sleeve) */}
                <motion.div
                    className="absolute inset-0 z-20 shadow-2xl rounded-sm bg-brand-black"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src={image}
                        alt="Album Cover"
                        className="w-full h-full object-cover rounded-sm shadow-[5px_0_30px_rgba(0,0,0,0.5)]"
                    />

                    {/* Brillo sutil sobre la portada */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-sm" />

                    {/* Sombra interna del lado de la apertura */}
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                </motion.div>

            </div>
        </div>
    );
};

export default VinylRecord;