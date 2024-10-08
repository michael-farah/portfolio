import React from "react";
import { useFirebaseData } from "../hooks/useFirebaseData";

const AboutSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="about" className="flex flex-col">
      <h2 className="text-5xl font-bold mb-8">About Me</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <p className="text-xl leading-relaxed">{data?.about}</p>
    </section>
  );
};

export default AboutSection;
