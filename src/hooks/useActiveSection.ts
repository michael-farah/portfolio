import { useState, useEffect, useCallback } from "react";
import type { SectionId } from "../types";

const SECTIONS: SectionId[] = ["about", "experience", "projects", "contributing"];

export const useActiveSection = (): {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
} => {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Pick the one closest to the top of the detection zone
          const topEntry = intersecting.reduce((closest, entry) => {
            const closestTop = closest.boundingClientRect.top;
            const entryTop = entry.boundingClientRect.top;
            return entryTop < closestTop ? entry : closest;
          });
          setActiveSection(topEntry.target.id as SectionId);
        }
      },
      {
        // Detect sections in the top 25% of the viewport
        rootMargin: "0px 0px -75% 0px",
        threshold: 0,
      },
    );

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const setActive = useCallback((section: SectionId) => {
    setActiveSection(section);
  }, []);

  return { activeSection, setActiveSection: setActive };
};
