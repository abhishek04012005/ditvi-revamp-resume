"use client";
import React, { useState } from "react";
import styles from "./whyus.module.css";
import Heading from "../../structure/heading/Heading";
import Container from "../../structure/container/Container";
import whyUsData from "../../data/whyus";
import Background from "@/structure/background/Background";

interface WhyUsItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  hoverBg: string;
  animationDelay: string;
}

interface CustomCSSProperties extends React.CSSProperties {
  "--hover-bg"?: string;
  "--animation-delay"?: string;
}

const WhyUs: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
     
        <Background>
            <Container>
              <Heading
                title="Why Us?"
                subtitle="Create lasting impressions with our expertly crafted traditional resume designs"
              />

              <div className={styles.whyusInner}>
                <div className={styles.whyusGrid}>
                  {whyUsData.map((item: WhyUsItem) => (
                    <div
                      className={`${styles.whyusCard} ${
                        activeId === item.id ? styles.active : ""
                      }`}
                      key={item.id}
                      onMouseEnter={() => setActiveId(item.id)}
                      onMouseLeave={() => setActiveId(null)}
                      style={
                        {
                          "--hover-bg": item.hoverBg,
                          "--animation-delay": item.animationDelay,
                        } as CustomCSSProperties
                      }
                    >
                      <div className={styles.cardIcon}>
                        <span>{item.icon}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className={styles.cardOverlay}></div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
        </Background>
    </>
  );
};

export default WhyUs;
