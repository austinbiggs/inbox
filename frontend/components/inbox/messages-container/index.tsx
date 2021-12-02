import { maybe } from '@perfective/common/maybe';
import * as React from 'react';
import { MessageBox } from '../message-box';
import { Messages } from '../messages';
import { Message } from '../messages/types';
import { useGetMessagesQuery } from './graphql/hooks/get-messages';
import { useInsertMessageMutation } from './graphql/hooks/insert-message';
import styles from './styles.module.scss';

interface Props {
  threadId: number;
}

const CURRENT_USER_ID = 3; // First user ID in the users table

const MessagesContainer = ({ threadId }: Props): JSX.Element => {
  const { data } = useGetMessagesQuery({
    variables: {
      threadId,
    }
  })

  const [insertMessageMutation, { data: mutationData }] = useInsertMessageMutation({
    refetchQueries: [
      'GetMessages'
    ]
  })

  const messages = maybe(data)
    .pick("messages")
    .to(messages => messages.map<Message>(message => ({
      id: message.id,
      message: message.body,
      timestamp: message.created_at,
      user: {
        id: message.created_by,
        avatar: message.user.image_url
      }
    })))
    .or(undefined)
  
  const updateMessages = (newMessage: string): void => {
    insertMessageMutation({
      variables: {
        message: {
          body: newMessage,
          created_by: CURRENT_USER_ID, // hardcoded for now
          status: "sent",
          thread_id: threadId,
        }
      }
    }).then(res => {
      console.log({res}, {mutationData}, {data});
    })
  }
  
  return (
    <>
      <div className={styles.messages}>
        {messages && <Messages messages={messages} />}
      </div>
      <MessageBox updateMessages={updateMessages} />
    </>
  );
}

export { MessagesContainer };
