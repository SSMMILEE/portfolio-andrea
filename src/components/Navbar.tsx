import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHome) return; 
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1, color: "#b91c1c" }, // brand-red
    tap: { scale: 0.95 }
  };

  const navItems = ['home', 'projects', 'about', 'contact'];

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
      className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference text-white"
    >
      <div className="w-12">
        {!isHome && (
          <Link to="/" className="cursor-hover">
            <motion.span 
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
              className="block text-2xl font-bold tracking-tighter uppercase font-display"
            >
              A.E.
            </motion.span>
          </Link>
        )}
      </div>
      
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
        {isHome ? (
          <>
            {navItems.map((section) => (
              <motion.button 
                key={section}
                onClick={() => scrollToSection(section)} 
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
                className="cursor-hover transition-colors"
              >
                {section === 'home' ? 'Inicio' : 
                 section === 'projects' ? 'Proyectos' : 
                 section === 'about' ? 'Sobre Mí' : 
                 'Contacto'}
              </motion.button>
            ))}
          </>
        ) : (
           <Link to="/" className="cursor-hover">
             <motion.span
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
                className="block"
             >
               Volver
             </motion.span>
           </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
