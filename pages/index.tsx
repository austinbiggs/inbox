import styles from "../styles/home.module.css";

import { DocHead } from "../frontend/components/common/doc/head";
import { Inbox } from "../frontend/components/inbox";

const Home = () => {
  return (
    <>
      <DocHead />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Messenger</h1>

          <Inbox />
        </main>
      </div>
    </>
  );
};

export default Home;
