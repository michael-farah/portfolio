import React from "react";

const NavigationPanel: React.FC = () => {
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
            className="hidden md:flex flex-grow flex-col justify-center px-8 md:px-16"
            aria-label="Main navigation"
          >
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </nav>

          <footer className="space-x-11 px-8 mb-6 md:px-16">
            <a
              href="https://github.com/michael-farah"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/michaelfarah-dev/"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NavigationPanel;