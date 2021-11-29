import * as React from "react";

import styles from "./styles.module.css";
import { useGetThreadsQuery } from "./graphql/hooks/get_threads";

const Threads: React.FC = () => {
  const { data, error, loading } = useGetThreadsQuery({
    variables: { userId: 3 },
  });

  console.log({ data, error, loading });

  const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];

  const renderThreads = () => {
    const renderThread = (thread: any) => {
      return (
        <div key={`thread-${thread}`} className={styles.thread}>
          Sender
          <br />
          Lorem Ipsum Set Dolor
          <br />
          10 min ago
        </div>
      );
    };

    return threads.map((thread) => renderThread(thread));
  };

  return <div className={styles.threads}>{renderThreads()}</div>;
};

export { Threads };
