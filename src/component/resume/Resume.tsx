import React, { JSX } from "react";
import ResumeCard from "../../structure/resume/resume";
import resumeList from "../../data/resume";

const Resume: React.FC = (): JSX.Element => {

  return (
    <div className="biodata">
      <ResumeCard
        title="Resume"
        subtitle="Explore Premium Traditional Marriage Biodata Templates"
        resumeDetails={resumeList.map(item => ({
          ...item,
          image: typeof item.image === "string" ? item.image : item.image.src
        }))}
        isSlider={true}
      />
    </div>
  );
};

export default Resume;
