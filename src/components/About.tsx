import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ABOUT_IMAGE_1 } from '../constants';

// Animación de texto tipo máscara (aparece desde abajo)
const maskReveal: Variants = {
  hidden: { y: "100%", rotate: 5 },
  visible: { 
    y: "0%", 
    rotate: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } 
  }
};

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemFadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4 md:px-8 bg-brand-black text-brand-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="relative pr-8 md:pr-0"
          >
             {/* Image 1: La principal, más grande (75% del ancho de la columna) */}
            <div className="relative z-10 w-[80%] md:w-[75%]">
              <div className="relative group">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 bg-brand-red translate-x-3 translate-y-3 -z-10 rounded-sm transition-transform group-hover:translate-x-4 group-hover:translate-y-4" 
                />
                <img 
                  src={ABOUT_IMAGE_1} 
                  alt="Hola Acerca de mi" 
                  className="w-full h-auto object-cover rounded-sm shadow-xl border border-brand-gray/20 relative z-10 max-h-[70vh]"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
             className="flex flex-col justify-center"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
             variants={containerStagger}
          >
            {/* Título Grande con Efecto Máscara */}
            <div className="overflow-hidden mb-8">
                <motion.h2 variants={maskReveal} className="font-display text-6xl md:text-8xl text-brand-red uppercase tracking-tighter leading-[0.9] origin-bottom-left">
                  Andrea<br/>Escobar
                </motion.h2>
            </div>
            
            <motion.div variants={itemFadeUp} className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
              <p>
                Soy estudiante de diseño gráfico en la Universidad Mayor de San Andrés, 
                actualmente cursando el cuarto año de la carrera.
              </p>
              <p>
                Mi enfoque como diseñador gráfico se basa en la experimentación con texturas, 
                formas y narrativas visuales, desde identidades de marca inspiradas en el pasado, 
                como Tiwanaku, hasta trabajos publicitarios futuristas y colaboraciones con moda.
              </p>
            </motion.div>

            <motion.div variants={itemFadeUp} className="mt-12 grid grid-cols-2 gap-8 border-t border-brand-gray/30 pt-8">
              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Habilidades</h4>
                <ul className="text-gray-400 space-y-1 text-sm">
                  {["Adobe Suite", "Branding", "Editorial Design", "Motion Graphics"].map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                        {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Software</h4>
                <ul className="text-gray-400 space-y-1 text-sm">
                   {["Photoshop", "Illustrator", "InDesign", "CapCut / Videolap"].map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (i * 0.1) }}
                    >
                        {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;