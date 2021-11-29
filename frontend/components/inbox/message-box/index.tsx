import * as React from 'react';
import styles from './styles.module.scss';
import FeatherIcon from 'feather-icons-react';

const MessageBox = (): JSX.Element => {
  return (
    <div className={styles['message-container']}>
      <div className={styles['message-bar']}>
        <FeatherIcon icon="smile" size={45} />
        <label htmlFor="message-input" className="visually-hidden">Type a message</label>
        <input type="text" placeholder="Type a message" id="message-input" className={styles.input} />
      </div>
      <button className={styles['send-button']}>
        <FeatherIcon icon="send" size={24} />
      </button>
    </div>
  );
}

export { MessageBox };
