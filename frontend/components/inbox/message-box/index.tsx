import { Unary } from "@perfective/common/function";
import { IEmojiData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import * as React from "react";
import { Icon as FeatherIcon } from "ts-react-feather-icons";
import styles from "./styles.module.scss";

interface Props {
  updateMessages: Unary<string, void>;
}

const MessageBox = ({ updateMessages }: Props): JSX.Element => {
  // TODO: (adam) Look into refactoring to use React Hook Form
  // For now, useState works just fine
  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (message) {
      setMessage("");
      setShowEmojiPicker(false);
      updateMessages(message);
    }
  };

  const handleEmojiClick = (
    _event: React.MouseEvent,
    emojiObject: IEmojiData
  ) => {
    // console.log({emojiObject});
    setMessage(`${message}${emojiObject.emoji}`);
    setShowEmojiPicker(false);
  };

  const handlePickerOpenerClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

  return (
    <form onSubmit={handleSubmit} className={styles["message-container"]}>
      <div className={styles["message-bar"]}>
        <button
          type="button"
          onClick={handlePickerOpenerClick}
          className={styles["picker-button"]}
        >
          <FeatherIcon name="smile" size={45} />
        </button>
        <label htmlFor="message-input" className="visually-hidden">
          Type a message
        </label>
        <input
          type="text"
          placeholder="Type a message"
          id="message-input"
          className={styles.input}
          value={message}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className={styles["send-button"]}>
        <FeatherIcon name="send" size={24} />
      </button>
      {showEmojiPicker && (
        <div className={styles.picker}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export { MessageBox };
