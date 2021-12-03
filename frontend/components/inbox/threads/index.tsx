import { useReactiveVar } from "@apollo/client";
import classNames from "classnames";
import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../../../components/Avatar";
import { selectedThreadVar } from "../index";
import { formattedTimeFromTimestamp } from "../message/utils";
import { ThreadData } from "../types";
import { useGetThreadsQuery } from "./graphql/hooks/get_threads";
import styles from "./styles.module.scss";

interface Props {
  threadData: ThreadData[];
}

// Sloppy but we need to get rid of type errors
interface FreshThread {
  __typename?: "threads";
  id: number;
  messages: {
    __typename?: "messages";
    body: string;
    created_at: string;
    created_by: number;
  }[];
  threads_users: {
    __typename?: "threads_users";
    user: {
      __typename?: "users";
      id: number;
      gif_url?: string | null | undefined;
      name: string;
    };
  }[];
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

  const freshThreads: FreshThread[] = data?.threads || [];
  const threads = [...prefetchedThreads, ...freshThreads] as ThreadData[];
  const threadsLength = threads.length;
  const threadsTopRef = React.useRef<HTMLDivElement | null>(null);

  // console.log({ threads, freshThreads, prefetchedThreads });

  const scrollToTopOfThreads = () => {
    threadsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToTopOfThreads();
  }, [threadsLength]);

  const handleSelect = (thread: FreshThread) => {
    selectedThreadVar(thread?.id);
  };

  const renderThread = (thread: FreshThread) => {
    const selected = thread?.id === selectedThread;
    const threadUsers = thread?.threads_users.filter(
      (threadUser) => threadUser?.user?.id !== CURRENT_USER_ID
    );

    const renderAvatars = () => {
      return threadUsers.map((threadUser) => {
        const user = threadUser?.user;

        return (
          // @ts-ignore
          <Avatar
            size="sm"
            className={classNames(
              styles.avatar,
              styles[user?.name.toLowerCase()],
              "rounded-circle"
            )}
            key={`avatar-${user?.name.toLowerCase()}`}
          >
            <OverlayTrigger overlay={<Tooltip>{user?.name}</Tooltip>}>
              {/* @ts-ignore */}
              <Avatar.Image
                src={user?.gif_url}
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
        <div className={styles["avatar-timestamp-wrapper"]}>
          {/* @ts-ignore */}
          <Avatar.Group>{renderAvatars()}</Avatar.Group>
          <p className={styles.timestamp}>
            {formattedTimeFromTimestamp(thread.messages[0].created_at)}
          </p>
        </div>
        <p className={styles.message}>{thread.messages[0].body}</p>
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
