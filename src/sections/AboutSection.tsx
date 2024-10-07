import React from "react";

const AboutSection: React.FC<{}> = () => {
  return (
    <section id="about" className={`flex flex-col items-center`}>
      <h2 className={`text-5xl font-bold mb-8`}>About Me</h2>
      <p className={`text-xl leading-relaxed`}>
        {/* TODO add about me */}
      </p>
    </section>
  );
};

export default AboutSection;