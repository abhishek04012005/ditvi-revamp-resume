import React, { PropsWithChildren } from "react";
import styles from "./container.module.css";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles["container-item"]}>{children}</div>
    </div>
  );
};

export default Container;
