import React, { useState } from "react";
import SvgIcon from "./SvgIcon";
import ContactForm from "./ContactForm";

const NavigationPanel: React.FC = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const toggleContactForm = () => {
    setIsContactFormOpen(!isContactFormOpen);
  };

  return (
    <>
      <div className="w-full md:h-screen md:sticky md:top-0 flex flex-col justify-between overflow-hidden dark:text-white">
        <div className="relative h-full flex flex-col bg-gradient-to-b from-sky-300 to-white dark:from-slate-900 dark:to-black">
          <header className="relative z-10 px-8 md:px-16">
            <h1 className="text-5xl font-bold py-4 md:py-8">Michael Farah</h1>
            <p className="text-2xl italic mb-6">
              I create beautiful, performant, and user-friendly web
              applications.
            </p>
          </header>

          <nav
            className="hidden md:flex flex-grow flex-col justify-center space-y-4 px-8 md:px-16"
            aria-label="Main navigation"
          >
            <a href="#about" title="About section" className="navigation-link">
              <SvgIcon name="user" />
              <span>About</span>
            </a>
            <a
              href="#experience"
              title="Experience section"
              className="navigation-link"
            >
              <SvgIcon name="briefcase" />
              <span>Experience</span>
            </a>
            <a
              href="#projects"
              title="Projects section"
              className="navigation-link"
            >
              <SvgIcon name="code" />
              <span>Projects</span>
            </a>
          </nav>

          <footer className="space-x-11 px-8 mb-6 md:px-16">
            <a href="https://github.com/michael-farah" className="footer-link">
              <SvgIcon name="github-outline" title="GitHub Profile" />
            </a>
            <a
              href="https://www.linkedin.com/in/michaelfarah-dev/"
              className="footer-link"
            >
              <SvgIcon name="linkedin" title="LinkedIn Profile" />
            </a>
            <button
              onClick={toggleContactForm}
              className="footer-link"
              title="Contact me"
            >
              <SvgIcon name="mail" />
            </button>
          </footer>
        </div>
      </div>

      <ContactForm isOpen={isContactFormOpen} onClose={toggleContactForm} />
    </>
  );
};

export default NavigationPanel;