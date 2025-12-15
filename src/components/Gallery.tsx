import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { MAIN_PROJECTS } from '../constants'; 
import { Project } from '../types';
import TiltImage from './TiltImage';

interface ProjectItemProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
  anyHovered: boolean;
}

// OPTIMIZACIÓN: Usamos 'easeOut' en lugar de 'spring' para la entrada.
// Esto evita que el navegador calcule físicas complejas mientras hace scroll,
// eliminando el "bug" o lag inicial.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 }, // Reducimos la distancia de movimiento
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0] // Cubic Bezier suave y elegante
    }
  }
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, isHovered, onHover, anyHovered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax sutil: Las columnas impares bajan más lento, las pares suben un poco
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -30 : 30]);

  return (
    <motion.div 
      ref={ref} 
      variants={itemVariants}
      style={{ y: parallaxY }}
      // will-change-transform ayuda al navegador a prepararse para la animación
      className={`group ${index % 2 !== 0 ? 'md:mt-24' : ''} transition-opacity duration-500 will-change-transform ${anyHovered && !isHovered ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <Link to={`/project/${project.id}`} className="cursor-hover block w-full">
        <div className="w-full">
            <div className="relative mb-6 overflow-hidden">
              <motion.div
                 whileHover={{ scale: 0.98 }}
                 transition={{ duration: 0.5 }}
                 className="aspect-[4/3] w-full"
              >
                <TiltImage 
                  src={project.coverImage} 
                  alt={project.title}
                />
              </motion.div>
            </div>
            
            <div className="flex flex-col gap-2 overflow-hidden">
              <div className="flex justify-between items-baseline border-b border-white/20 pb-2 group-hover:border-brand-red transition-colors duration-500">
                <motion.h3 
                  className="text-3xl md:text-4xl font-display text-white group-hover:text-brand-red transition-colors duration-300 uppercase"
                  layoutId={`title-${project.id}`}
                >
                  {project.title}
                </motion.h3>
                <span className="text-gray-500 font-mono text-xs md:text-sm">0{index + 1}</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center text-sm font-light text-gray-400"
              >
                <span>{project.category}</span>
                <span>{project.year}</span>
              </motion.div>
            </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 bg-neutral-900 relative z-10 overflow-hidden">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end overflow-hidden">
          <motion.h2 
            initial={{ y: "100%", skewY: 5 }}
            whileInView={{ y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display text-5xl md:text-8xl text-white uppercase tracking-tighter origin-bottom-left"
          >
            Proyectos
          </motion.h2>
          <motion.span 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="hidden md:block text-gray-500 font-mono text-sm"
          >
             [ SELECCIÓN 2023-2024 ]
          </motion.span>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "10%" }} // Margin más permisivo para cargar antes
          variants={{
            visible: { transition: { staggerChildren: 0.1 } } // Stagger más rápido
          }}
        >
          {MAIN_PROJECTS.map((project, index) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              isHovered={hoveredIndex === index}
              onHover={(isHovering) => setHoveredIndex(isHovering ? index : null)}
              anyHovered={hoveredIndex !== null}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;