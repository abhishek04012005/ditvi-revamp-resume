import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Details",
  description: "View resume details and options",
};

export default function ResumePage() {
  return <ResumeDetail />;
}