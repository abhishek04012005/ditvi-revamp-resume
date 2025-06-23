"use client";
import React, { useState } from "react";
import styles from "./howwework.module.css";
import { Grid } from "@mui/material";
import Container from "../../structure/container/Container";
import Heading from "../../structure/heading/Heading";
import weWork from "../../data/wework";
import Background from "@/structure/background/Background";

interface StepItem {
  text: string;
}

interface WorkStep {
  number: number;
  icon: string;
  title: string;
  steps: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SchemaType {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  step: {
    "@type": string;
    position: number;
    name: string;
    itemListElement: StepItem[];
  }[];
}

const HowWeWork: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <Background>
        <Container>
          <Heading
            title="How We work"
            subtitle="Simple steps to get your traditional resume"
          />

          <div className={styles.processTimeline}>
            <div className={styles.timelineLine}></div>
            <Grid container spacing={4}>
              {weWork.map((step: WorkStep, index: number) => (
                <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                  <div
                    className={`${styles.processStep} ${
                      activeStep === index ? styles.active : ""
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className={styles.stepIcon}>
                      <span className={styles.icon}>{step.icon}</span>
                      <span className={styles.number}>{step.number}</span>
                    </div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <div className={styles.stepContent}>
                      <ul>
                        {step.steps.map((text: string, i: number) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Background>
    </>
  );
};

export default HowWeWork;
