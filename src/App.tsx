import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import OtherProjects from './components/OtherProjects';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import SmoothScroll from './components/SmoothScroll';

const HomePage = () => (
  <PageTransition>
    <Hero />
    <Gallery />
    <OtherProjects />
    <About />
    <Footer />
  </PageTransition>
);

const ProjectPage = () => (
  <PageTransition>
    <ProjectDetail />
  </PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    /* mode="wait" espera a que termine la animación de salida antes de montar la nueva ruta */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      {/* SmoothScroll ahora maneja el reset del scroll al cambiar de ruta */}
      <SmoothScroll>
        <div className="cursor-none bg-brand-black min-h-screen text-white selection:bg-brand-red selection:text-white">
          <CustomCursor />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;