import React from "react";
import { useFirebaseData } from "../hooks/useFirebaseData";
import TimelineItem from "../components/TimelineItem";

const ExperienceSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="experience" className="py-16">
      <h2 className="mb-16 text-center text-5xl font-bold">Experience</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-black/40 dark:bg-white/40 rounded-full" />

        <div className="relative">
          {data?.timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} isOdd={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;