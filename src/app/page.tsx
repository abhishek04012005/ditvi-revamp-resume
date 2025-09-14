// import Image from "next/image";
import Contact from "@/component/contact/Contact";
import Hero from "@/component/hero/Hero";
import HowWeWork from "@/component/howwework/HowWeWork";
import Testimonial from "@/component/testimonial/Testimonial";
import WhyUs from "@/component/whyus/WhyUs";
import Resume from "@/component/resume/Resume";
import BlogHome from "@/component/blog/Blog";
import LeadMagnet from "@/structure/leadmagnet/LeadMagnet";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main>
        <LeadMagnet/>
        <Hero />
        <Resume />
        <WhyUs />
        <HowWeWork />
        <BlogHome />
        <Testimonial />
        <Contact />
      </main>
    </div>
  );
}
