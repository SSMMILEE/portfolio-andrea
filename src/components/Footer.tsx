import React from 'react';
import { motion } from 'framer-motion';

const footerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const footerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-black text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
      <motion.div
        className="max-w-[1400px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerStagger}
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-5xl md:text-8xl font-display uppercase leading-[0.9]"
              >
                ¿Creamos algo<br /><span className="text-brand-red">Increíble?</span>
              </motion.h2>
            </div>
            <motion.p variants={footerItem} className="text-gray-400 text-lg md:text-xl font-light">
              Estoy disponible para proyectos freelance y colaboraciones.
              <br />Diseño editorial, branding e identidad visual.
            </motion.p>
            <motion.a
              variants={footerItem}
              href="mailto:hola@andreaescobar.com"
              className="inline-block mt-8 px-8 py-4 border border-white/20 rounded-full hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-300 text-sm uppercase tracking-widest cursor-hover"
            >
              Contactar Ahora
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-24 text-sm tracking-widest uppercase">
            <motion.div variants={footerItem}>
              <h4 className="font-bold text-gray-500 mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-brand-red transition-colors cursor-hover">Instagram</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors cursor-hover">Behance</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors cursor-hover">LinkedIn</a></li>
              </ul>
            </motion.div>
            <motion.div variants={footerItem}>
              <h4 className="font-bold text-gray-500 mb-6">Menú</h4>
              <ul className="space-y-4">
                <li><a href="#projects" className="hover:text-brand-red transition-colors cursor-hover">Proyectos</a></li>
                <li><a href="#about" className="hover:text-brand-red transition-colors cursor-hover">Sobre Mí</a></li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={footerItem}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600 uppercase tracking-wider"
        >
          <p>&copy; 2025 Andrea Escobar. Todos los derechos reservados.</p>
          <p>La Paz, Bolivia</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;