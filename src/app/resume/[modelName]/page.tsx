import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Details",
  description: "View resume details and options",
};

// Add this function to generate static parameters
export async function generateStaticParams() {
  // Replace these with your actual resume model names
  const modelNames = ['template1', 'template2', 'template3'];
  
  return modelNames.map((name) => ({
    modelName: name,
  }));
}

export default function ResumePage() {
  return <ResumeDetail />;
}