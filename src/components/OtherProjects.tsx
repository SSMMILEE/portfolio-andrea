import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { OTHER_PROJECTS_LIST } from '../constants'; // Using dynamic list
import TiltImage from './TiltImage';

const OtherProjects: React.FC = () => {
    // Now using OTHER_PROJECTS_LIST directly to avoid duplication and manual mapping
    return (
        <section className="bg-brand-black pb-24 md:pb-32 px-4 md:px-8 relative z-10 border-t border-white/5 pt-24">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Text Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full mb-16 md:mb-24 flex flex-col items-center text-center"
                >
                    <h2 className="font-display text-5xl md:text-8xl text-white uppercase tracking-tighter leading-none mb-4">
                        Otros <span className="text-brand-red">Proyectos</span>
                    </h2>
                    <div className="h-1 w-24 bg-brand-red rounded-full" />
                </motion.div>

                {/* Grid of Composition Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20 md:gap-x-12">
                    {OTHER_PROJECTS_LIST.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <Link to={`/project/${project.id}`} className="block cursor-hover">
                                {/* Image Container */}
                                {/* Se eliminó aspect-video para que la imagen dicte su propia altura y se vea completa */}
                                <div className="relative rounded-sm shadow-2xl border border-white/5 bg-brand-gray/20 mb-6">
                                    <TiltImage
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Subtitle / Title Container */}
                                <div className="flex flex-col items-start border-l-2 border-brand-red/0 group-hover:border-brand-red/100 pl-0 group-hover:pl-4 transition-all duration-300">
                                    <h3 className="text-2xl md:text-3xl font-display uppercase text-white group-hover:text-brand-red transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 font-mono mt-1 uppercase tracking-widest group-hover:text-white transition-colors">
                                        Ver Detalles
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherProjects;