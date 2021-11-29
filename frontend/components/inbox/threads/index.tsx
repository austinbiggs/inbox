import * as React from "react";

import styles from "./styles.module.css";
import { useGetThreadsQuery } from "./graphql/hooks/get_threads";
import classNames from "classnames";

const Threads: React.FC = () => {
  const { data, error, loading } = useGetThreadsQuery({
    variables: { userId: 3 },
  });

  console.log({ data, error, loading });

  const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];

  const renderThreads = () => {
    const renderThread = (thread: number) => {
      const sentOrReceived = thread % 2 === 0;
      return (
        <div key={`thread-${thread}`} className={classNames(styles.thread, sentOrReceived ? styles['thread-sent'] : '')}>
          <div className={classNames(styles['avatar-container'], sentOrReceived ? styles['avatar-container-sent'] : '')}>
            <img src={`https://loremflickr.com/50/50?random=${thread % 2}`} alt="avatar" className={styles.avatar} />
            {/* For some reason the Avatar component isn't behaving. Look into this later */}
            {/* <Avatar >
              <Avatar.Image src={`https://loremflickr.com/50/50?random=${thread % 2}`} alt="avatar" className={styles.avatar} />
            </Avatar> */}
            <p>09:00</p>
          </div>
          <div className={styles['message-container']}>
            <p className={classNames(styles.message, sentOrReceived ? styles['sent-message'] : styles['received-message'])}>Lorem Ipsum Set Dolor</p>
          </div>
        </div>
      );
    };

    return threads.map((thread) => renderThread(thread));
  };

  return <div className={styles.threads}>{renderThreads()}</div>;
};

export { Threads };
