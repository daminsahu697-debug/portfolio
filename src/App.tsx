import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { ProjectSection } from './components/ProjectSection';
import { Achievements } from './components/Achievements';
import { CurrentlyExploring } from './components/CurrentlyExploring';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './index.css';

function Portfolio() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Education />
        <Skills />
        <ProjectSection />
        <Achievements />
        <CurrentlyExploring />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
