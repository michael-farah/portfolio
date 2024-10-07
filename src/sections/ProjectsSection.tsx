import React from "react";

const AboutSection: React.FC<{}> = () => {
  return (
    <section id="about" className={`flex flex-col items-center`}>
      <h2 className={`text-5xl font-bold mb-8`}>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TODO add projects list component */}
      </div>
    </section>
  );
};

export default AboutSection;
