import * as React from 'react';
import styles from './styles.module.scss';
import { Icon as FeatherIcon } from "ts-react-feather-icons";

const MessageBox = (): JSX.Element => {
  return (
    <div className={styles['message-container']}>
      <div className={styles['message-bar']}>
        <FeatherIcon name="smile" size={45} />
        <label htmlFor="message-input" className="visually-hidden">Type a message</label>
        <input type="text" placeholder="Type a message" id="message-input" className={styles.input} />
      </div>
      <button className={styles['send-button']}>
        <FeatherIcon name="send" size={24} />
      </button>
    </div>
  );
}

export { MessageBox };
