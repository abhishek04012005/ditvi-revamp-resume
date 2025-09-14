import React from "react";
import styles from "./heading.module.css";

interface HeaderSectionProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeaderSectionProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.headerBody}>
      <div className={styles.headingSection}>
        <span className={styles.headerSectionDesignElement}></span>
        <div className={styles.headingSectionText}>
          <p>{title}</p>
        </div>
        <span className={styles.headerSectionDesignElement}></span>
      </div>
      <div className={styles.headerSectionSubtitle}>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Heading;
