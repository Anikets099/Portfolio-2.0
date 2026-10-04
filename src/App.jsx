import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import CreativeTools from './components/CreativeTools.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#06141B] text-[#CCD0CF] flex flex-col selection:bg-[#253745] selection:text-[#CCD0CF]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <CreativeTools />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
