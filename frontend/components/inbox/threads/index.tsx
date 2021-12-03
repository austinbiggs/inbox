import * as React from "react";
import { OverlayTrigger } from "react-bootstrap";

import styles from "./styles.module.scss";
import { useGetThreadsQuery } from "./graphql/hooks/get_threads";
import classNames from "classnames";
import { ThreadData } from "../types";
import { useReactiveVar } from "@apollo/client";
import { selectedThreadVar } from "../index";
import { Avatar } from "../../../../components";
import { Tooltip } from "react-bootstrap";

interface Props {
  threadData: ThreadData[];
}

const CURRENT_USER_ID = 3;

const Threads = ({
  threadData: prefetchedThreads = [],
}: Props): JSX.Element => {
  // hooks
  const selectedThread = useReactiveVar(selectedThreadVar);

  const { data } = useGetThreadsQuery({
    variables: { userId: CURRENT_USER_ID },
  });

  const freshThreads = data?.threads || [];
  const threads = [...prefetchedThreads, ...freshThreads] as ThreadData[];
  const threadsLength = threads.length;
  const threadsTopRef = React.useRef<HTMLDivElement | null>(null);

  console.log({ threads, freshThreads, prefetchedThreads });

  const scrollToTopOfThreads = () => {
    threadsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToTopOfThreads();
  }, [threadsLength]);

  const handleSelect = (thread: ThreadData) => {
    selectedThreadVar(thread?.id);
  };

  const renderThread = (thread: ThreadData) => {
    const selected = thread?.id === selectedThread;
    const threadUsers = thread?.threads_users.filter(
      (threadUser) => threadUser?.user?.id !== CURRENT_USER_ID
    );

    console.log({ thread, threadUsers });

    const renderAvatars = () => {
      return threadUsers.map((threadUser) => {
        const user = threadUser?.user;

        return (
          <Avatar
            size="sm"
            className={classNames(
              styles.avatar,
              styles[user?.name.toLowerCase()],
              "rounded-circle",
              "me-3"
            )}
          >
            <OverlayTrigger overlay={<Tooltip>{user?.name}</Tooltip>}>
              <Avatar.Image
                src={user?.image_url}
                className={styles.image}
                alt={user?.name}
              />
            </OverlayTrigger>
          </Avatar>
        );
      });
    };

    return (
      <div
        key={`thread-${thread?.id}`}
        className={classNames(styles.thread, selected && styles.selected)}
        onClick={() => handleSelect(thread)}
      >
        <Avatar.Group>{renderAvatars()}</Avatar.Group>
        {`Thread ${thread?.id}`}
      </div>
    );
  };

  const renderThreads = () => {
    return freshThreads.map((thread) => renderThread(thread));
  };

  return (
    <div className={classNames(styles.threads, "shadow", "p-3")}>
      <div ref={threadsTopRef} />
      <div className={styles.list}>{renderThreads()}</div>
    </div>
  );
};

export { Threads };
