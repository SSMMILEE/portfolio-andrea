import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { PROJECTS } from '../constants';
import VinylRecord from './VinylRecord';
import Book3D from './Book3D';
import Hoodie3D from './Hoodie3D'; 
import Newspaper3D from './Newspaper3D'; 

// --- ANIMACIONES DE TEXTO ---
const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

// --- NUEVA ANIMACIÓN PARA OBJETOS 3D ---
const objectEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 100,      // Empieza desplazado a la derecha
    scale: 0.8,  // Empieza un poco más pequeño
    rotate: 5    // Ligera rotación inicial
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1], // Curva "custom ease" suave y elegante
      delay: 0.4               // Espera un poco a que cargue el texto
    }
  }
};

const SplitText = ({ text, className }: { text: string, className: string }) => {
  const words = text.split(" ");
  return (
    <div className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]">
          <motion.span
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

// --- ICONOS SVG ---
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
);
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const ArrowRightLong = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const ArrowLeftLong = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
);


// --- LIGHTBOX CON NAVEGACIÓN ---
interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9
  })
};

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation(); // Evitar conflicto con navegación de página
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, onClose]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let nextIndex = index + newDirection;
    if (nextIndex >= images.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = images.length - 1;
    setIndex(nextIndex);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
      >
        <span className="sr-only">Cerrar</span>
        <XIcon />
      </button>

      <div className="absolute top-6 left-6 text-white/50 font-mono text-sm tracking-widest z-50">
        {index + 1} / {images.length}
      </div>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
         <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img 
              key={index}
              src={images[index]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-sm select-none absolute"
            />
         </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          >
            <ChevronLeft />
          </button>
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1. Encontrar índice actual
  const currentIndex = PROJECTS.findIndex(p => p.id === id);
  const project = PROJECTS[currentIndex];
  
  // 2. Calcular índices Previo y Siguiente (Ciclo infinito)
  const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reset scroll al cambiar de proyecto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Navegación con Teclado (Flechas del Proyecto)
  useEffect(() => {
    const handleProjectNav = (e: KeyboardEvent) => {
        // Solo navegar si NO estamos viendo el lightbox
        if (selectedIndex === null) {
            if (e.key === 'ArrowRight') navigate(`/project/${nextProject.id}`);
            if (e.key === 'ArrowLeft') navigate(`/project/${prevProject.id}`);
        }
    };
    window.addEventListener('keydown', handleProjectNav);
    return () => window.removeEventListener('keydown', handleProjectNav);
  }, [navigate, nextProject.id, prevProject.id, selectedIndex]);


  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white">
        <h2 className="text-4xl font-display mb-4">Proyecto no encontrado</h2>
        <button onClick={() => navigate('/')} className="text-brand-red underline cursor-hover">Volver al inicio</button>
      </div>
    );
  }

  const isKusillos = project.id === 'kusillos';
  const isConfesiones = project.id === 'confesiones';
  const isTiwanaku = project.id === 'tiwanaku';
  const isPeriodico = project.id === 'periodico-voltaige';

  return (
    <motion.div 
      className="bg-brand-black min-h-screen text-brand-offwhite pt-24 relative overflow-x-hidden"
    >
      {/* --- NAVEGACIÓN FLOTANTE (DESKTOP) --- */}
      <div className="hidden lg:block">
          {/* Botón Izquierdo (Anterior) */}
          <Link to={`/project/${prevProject.id}`} className="fixed left-6 top-1/2 -translate-y-1/2 z-40 group mix-blend-difference text-white">
              <div className="flex items-center gap-4 cursor-hover p-4">
                  <motion.div 
                    initial={{ x: 0 }}
                    whileHover={{ x: -5 }}
                    className="p-3 border border-white/20 rounded-full backdrop-blur-sm bg-white/5"
                  >
                      <ChevronLeft />
                  </motion.div>
                  {/* Título aparece en hover */}
                  <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Anterior</span>
                      <span className="font-display uppercase text-sm">{prevProject.title}</span>
                  </div>
              </div>
          </Link>

          {/* Botón Derecho (Siguiente) */}
          <Link to={`/project/${nextProject.id}`} className="fixed right-6 top-1/2 -translate-y-1/2 z-40 group mix-blend-difference text-white text-right">
              <div className="flex items-center gap-4 flex-row-reverse cursor-hover p-4">
                  <motion.div 
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="p-3 border border-white/20 rounded-full backdrop-blur-sm bg-white/5"
                  >
                      <ChevronRight />
                  </motion.div>
                  <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Siguiente</span>
                      <span className="font-display uppercase text-sm">{nextProject.title}</span>
                  </div>
              </div>
          </Link>
      </div>

      {/* --- NAVEGACIÓN FLOTANTE (MOBILE) --- */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 1 }}
             className="flex items-center gap-6 px-6 py-3 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
          >
              <Link to={`/project/${prevProject.id}`} className="text-white/70 hover:text-white p-2">
                  <ChevronLeft />
              </Link>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <Link to="/" className="text-white/70 hover:text-brand-red p-2">
                  <HomeIcon />
              </Link>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <Link to={`/project/${nextProject.id}`} className="text-white/70 hover:text-white p-2">
                  <ChevronRight />
              </Link>
          </motion.div>
      </div>


      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={project.images} 
            initialIndex={selectedIndex} 
            onClose={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="px-6 md:px-12 max-w-[1400px] mx-auto mb-8">
        <motion.div 
          className="border-b border-white/10 pb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 relative">
             <div className="flex flex-col gap-4 flex-1">
                 <motion.span 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="text-brand-red font-mono text-sm tracking-widest uppercase"
                 >
                   {project.category}
                 </motion.span>
                 
                 <SplitText 
                   text={project.title} 
                   className="text-5xl md:text-8xl lg:text-9xl font-display uppercase text-white break-words z-10" 
                 />
             </div>

             {/* OBJETOS 3D CON ENTRADA SUAVE */}

             {isKusillos && (
                <motion.div 
                   variants={objectEntranceVariants}
                   initial="hidden"
                   animate="visible"
                   className="w-full lg:w-auto lg:min-w-[400px] flex-shrink-0 flex justify-center lg:justify-end z-0"
                >
                   <VinylRecord image={project.coverImage} className="scale-90 lg:scale-100" />
                </motion.div>
             )}

             {isConfesiones && project.bookCovers && (
                <motion.div 
                   variants={objectEntranceVariants}
                   initial="hidden"
                   animate="visible"
                   className="w-full lg:w-auto lg:min-w-[400px] flex-shrink-0 flex justify-center lg:justify-end z-0"
                >
                    <Book3D 
                        frontImage={project.bookCovers.front} 
                        backImage={project.bookCovers.back} 
                        spineImage={project.bookCovers.spine} 
                    />
                </motion.div>
             )}

             {isTiwanaku && project.hoodieImage && (
                <motion.div 
                   variants={objectEntranceVariants}
                   initial="hidden"
                   animate="visible"
                   className="w-full lg:w-auto lg:min-w-[400px] flex-shrink-0 flex justify-center lg:justify-end z-0"
                >
                    <Hoodie3D image={project.hoodieImage} />
                </motion.div>
             )}
             
             {isPeriodico && project.newspaperImages && (
                <motion.div 
                   variants={objectEntranceVariants}
                   initial="hidden"
                   animate="visible"
                   className="w-full lg:w-auto lg:min-w-[400px] flex-shrink-0 flex justify-center lg:justify-end z-0"
                >
                    <Newspaper3D images={project.newspaperImages} />
                </motion.div>
             )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 overflow-hidden">
              <motion.p 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl"
              >
                {project.description}
              </motion.p>
            </div>
            <div className="md:col-span-4 space-y-8 md:pl-12 md:border-l border-white/10">
              <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.8 }}
              >
                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Año</h4>
                <p className="font-display text-2xl">{project.year}</p>
              </motion.div>
              
              {project.tools && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                >
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Herramientas</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={tool} className="border border-white/20 px-3 py-1 text-xs rounded-full hover:bg-white hover:text-black transition-colors cursor-default">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Sección Abanico de Cartas (Deck of Cards Animation) */}
      <section className="w-full min-h-[50vh] flex flex-col items-center relative overflow-visible pt-4 pb-20 md:pb-32">
        
        {/* Fondo decorativo sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-[#0f0f0f] to-brand-black -z-10" />

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
            className="text-center mb-8 md:mb-12"
        >
           <p className="text-xs uppercase tracking-[0.3em] animate-pulse">Galería de Imágenes</p>
        </motion.div>

        {/* Contenedor del Abanico */}
        <div className="relative flex flex-wrap justify-center items-center w-full max-w-[1600px] px-4 perspective-[1000px] gap-4 md:gap-0">
          {project.images.map((img, index) => {
            const total = project.images.length;
            const mid = (total - 1) / 2;
            const rotation = (index - mid) * 3; 
            const yOffset = Math.abs(index - mid) * 10; 
            
            return (
              <motion.div
                key={index}
                initial={{ 
                  y: 50, 
                  opacity: 0, 
                  rotate: 0,
                  scale: 0.8,
                }}
                whileInView={{ 
                  y: yOffset, 
                  opacity: 1, 
                  rotate: rotation,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "20%" }} 
                transition={{ 
                  type: "spring", 
                  stiffness: 70,
                  damping: 15,
                  mass: 1,
                  delay: 0.1 + (index * 0.1)
                }}
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 50, 
                  rotate: 0,
                  y: -20,
                  transition: { duration: 0.3 }
                }}
                className="relative cursor-pointer md:-ml-12 lg:-ml-16 first:ml-0 flex-shrink-0"
                style={{ 
                  zIndex: index,
                  transformOrigin: "bottom center"
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="w-full max-w-[300px] md:w-80 lg:w-96 aspect-[3/4] bg-white p-2 md:p-3 shadow-2xl rounded-sm transform transition-all duration-300 group hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                   <div className="w-full h-full overflow-hidden bg-gray-100 relative">
                      <img 
                        src={img} 
                        alt={`Project view ${index}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                   </div>
                   <div className="absolute bottom-1 right-2 text-[8px] text-gray-400 font-mono tracking-widest">
                      {index + 1} / {total}
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- NAVEGACIÓN GRANDE INFERIOR (FOOTER STYLE) --- */}
      {/* Se mantiene visible al final del scroll para cerrar el ciclo de lectura */}
      <section className="border-t border-white/10 bg-neutral-900/30 relative overflow-hidden mt-12 py-20">
        <div className="absolute inset-0 bg-brand-red/5 skew-y-1 transform origin-bottom-right opacity-30 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            
            {/* Proyecto Anterior */}
            <Link to={`/project/${prevProject.id}`} className="group flex flex-col items-start text-left">
               <motion.div 
                 className="flex items-center gap-4 text-gray-500 group-hover:text-white transition-colors mb-4"
                 whileHover={{ x: -10 }}
               >
                 <ArrowLeftLong />
                 <span className="text-xs uppercase tracking-[0.2em]">Proyecto Anterior</span>
               </motion.div>
               <h3 className="text-3xl md:text-5xl font-display uppercase text-white group-hover:text-brand-red transition-colors duration-300 leading-none">
                 {prevProject.title}
               </h3>
               <span className="text-xs font-mono text-gray-600 mt-2">{prevProject.category}</span>
            </Link>

            {/* Siguiente Proyecto */}
            <Link to={`/project/${nextProject.id}`} className="group flex flex-col items-end text-right">
               <motion.div 
                 className="flex items-center gap-4 text-gray-500 group-hover:text-white transition-colors mb-4"
                 whileHover={{ x: 10 }}
               >
                 <span className="text-xs uppercase tracking-[0.2em]">Siguiente Proyecto</span>
                 <ArrowRightLong />
               </motion.div>
               <h3 className="text-3xl md:text-5xl font-display uppercase text-white group-hover:text-brand-red transition-colors duration-300 leading-none">
                 {nextProject.title}
               </h3>
               <span className="text-xs font-mono text-gray-600 mt-2">{nextProject.category}</span>
            </Link>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;