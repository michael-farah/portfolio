import React from "react";
import { useFirebaseData } from "../context/FirebaseDataContext";
import SectionReveal from "../components/ui/SectionReveal";
import { Skeleton } from "../components/ui/Skeleton";
import SectionDataWrapper from "../components/ui/SectionDataWrapper";

const AboutSection: React.FC = () => {
  const { data, loading, error, refetch } = useFirebaseData();

  return (
    <section id="about" className="flex flex-col py-16">
      <SectionReveal>
        <h2 className="section-title">About Me</h2>
      </SectionReveal>

      <SectionDataWrapper
    loading={loading}
    error={error}
    refetch={refetch}
    loadingContent={<Skeleton lines={4} className="max-w-2xl" />}
      >
        {data?.about && (
          <SectionReveal delay={0.2}>
            <p className="text-lg sm:text-xl leading-relaxed text-slate-400 max-w-2xl">
              {data.about}
            </p>
          </SectionReveal>
        )}
      </SectionDataWrapper>
    </section>
  );
};

export default React.memo(AboutSection);
