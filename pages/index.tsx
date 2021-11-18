import styles from "./index/styles.module.css";

import { DocHead } from "../frontend/components/common/doc/head";
import { Inbox } from "../frontend/components/inbox";

const Home = () => {
  return (
    <>
      <DocHead />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Inbox</h1>

          <Inbox />
        </main>
      </div>
    </>
  );
};

export default Home;