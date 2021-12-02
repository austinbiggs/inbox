import * as React from "react";

import styles from "./styles.module.scss";
import { useGetThreadsQuery } from "./graphql/hooks/get_threads";
import classNames from "classnames";

const Threads: React.FC = () => {
  const { data, error, loading } = useGetThreadsQuery({
    variables: { userId: 3 },
  });

  console.log({ data, error, loading });

  const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];
  const threadsLength = threads.length;

  const threadsTopRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToTopOfThreads = () => {
    threadsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToTopOfThreads();
  }, [threadsLength]);

  const renderThread = (thread: number) => {
    return (
      <div
        key={`thread-${thread}`}
        className={styles.thread}
      >{`Thread ${thread}`}</div>
    );
  };

  const renderThreads = () => {
    return threads.map((thread) => renderThread(thread));
  };

  return (
    <div className={classNames(styles.threads, "shadow", "p-3")}>
      <div ref={threadsTopRef} />
      <div className={styles.list}>{renderThreads()}</div>
    </div>
  );
};

export { Threads };
