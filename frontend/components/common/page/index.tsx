import * as React from "react";

import { DocHead } from "../doc/head";

import styles from "./styles.module.css";

const PageBase: React.FC = () => {
  return (
    <div className={styles.page}>
      <DocHead />
    </div>
  );
};

export { PageBase };
