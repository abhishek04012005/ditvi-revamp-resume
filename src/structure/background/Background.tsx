import styles from "./background.module.css";

interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ className, children }) => {
  return (
    <div className={styles.background}>
      <div className={`${styles.heroBackground} ${className || ""}`}>
        <div className={`${styles.animatedCircle} ${styles.circle1}`} />
        <div className={`${styles.animatedCircle} ${styles.circle2}`} />
        <div className={`${styles.animatedCircle} ${styles.circle3}`} />
      </div>
	  <div className={styles.content}>
	    {children}
	  </div>
    </div>
  );
};

export default Background;
