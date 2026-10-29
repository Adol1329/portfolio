import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';

const PublicLayout = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Resume />
    <Contact />
    <Footer />
  </div>
);

export default PublicLayout;
