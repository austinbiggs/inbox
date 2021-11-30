import * as React from 'react';
import styles from './styles.module.scss';
import { Icon as FeatherIcon } from "ts-react-feather-icons";
import { Unary } from "@perfective/common/function";

interface Props {
  updateMessages: Unary<string, void>;
}

const MessageBox = ({ updateMessages }: Props): JSX.Element => {
  // TODO: (adam) Look into refactoring to use React Hook Form
  // For now, useState works just fine

  const [message, setMessage] = React.useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setMessage(event.target.value)
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (message) {
      updateMessages(message)
      setMessage('')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={styles['message-container']}
    >
      <div className={styles['message-bar']}>
        <FeatherIcon name="smile" size={45} />
        <label htmlFor="message-input" className="visually-hidden">Type a message</label>
        <input 
          type="text" 
          placeholder="Type a message" 
          id="message-input" 
          className={styles.input}
          value={message}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className={styles['send-button']}>
        <FeatherIcon name="send" size={24} />
      </button>
    </form>
  );
}

export { MessageBox };
