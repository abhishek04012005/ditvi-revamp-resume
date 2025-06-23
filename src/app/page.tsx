// import Image from "next/image";
import Contact from "@/component/contact/Contact";
import Hero from "@/component/hero/Hero";
import HowWeWork from "@/component/howwework/HowWeWork";
import Testimonial from "@/component/testimonial/Testimonial";
import WhyUs from "@/component/whyus/WhyUs";
import Resume from "@/component/resume/Resume";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Resume />
        <WhyUs />
        <HowWeWork />
        <Testimonial />
        <Contact />
      </main>
    </div>
  );
}
