import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SvgIcon from './ui/SvgIcon';
import ContactForm from './ContactForm';
import ParticleField from './effects/ParticleField';
import ShootingStar from './effects/ShootingStar';
import AnimatedText from './ui/AnimatedText';
import { useActiveSection } from '../hooks/useActiveSection';
import type { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'contributing', label: 'Open Source', icon: 'link-square' },
];
const NavigationPanel: React.FC = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <>
      <div className="w-full md:h-screen md:sticky md:top-0 flex flex-col justify-between overflow-hidden">
        <div className="relative h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
          {/* Particle background */}
          <div className="absolute inset-0 opacity-100">
            <ParticleField />
          </div>

          {/* Shooting stars (dark mode only) */}
          <div className="absolute inset-0 pointer-events-none block">
            <ShootingStar />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

          <div className="relative z-10 flex flex-col h-full text-white">
            {/* Header */}
            <header className="px-8 md:px-12 pt-8 md:pt-16 pb-4 md:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                  <AnimatedText text="Michael Farah" delay={0.2} />
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl text-white/80 max-w-md leading-relaxed font-light"
              >
                Crafting beautiful, performant &amp; user-friendly web experiences.
              </motion.p>
            </header>
            {/* Navigation */}
            <nav
              className="hidden md:flex flex-grow flex-col justify-center space-y-2 px-8 md:px-12"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`navigation-link group py-3 pl-6 ${activeSection === item.id ? 'active' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <span className="nav-indicator" />
                  <SvgIcon name={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Social links */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-5 px-8 md:px-12 pb-8 md:pb-12 flex-wrap"
            >
              {[
                {
                  href: 'https://github.com/michael-farah',
                  icon: 'github-outline',
                  label: 'GitHub',
                },
                {
                  href: 'https://www.linkedin.com/in/michaelfarah-dev/',
                  icon: 'linkedin',
                  label: 'LinkedIn',
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-white/70 hover:text-white"
                  aria-label={`${link.label} Profile`}
                >
                  <SvgIcon name={link.icon} title={`${link.label} Profile`} />
                </a>
              ))}
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="footer-link text-white/70 hover:text-white p-0"
                title="Contact me"
                aria-label="Contact me"
              >
                <SvgIcon name="mail" />
              </button>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mx-auto md:ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                Open to opportunities
              </motion.div>
            </motion.footer>
          </div>
        </div>
      </div>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </>
  );
};

export default NavigationPanel;
