/* eslint-disable */
import { getMessages } from "@/api/authApi/chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useChat = ({currentChat, currentUser}) => {
  const [hubConnection, setHubConnection] = useState(null);
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const receivedMessages = await getMessages(currentUser.id);
        if (receivedMessages) {
          const listReceivedMessages = receivedMessages.map(msg => ({
            ...msg,
            type: msg.receiver === currentUser.id ? 'received' : 'sent',
          }));
          setMessages(listReceivedMessages);
          console.log("fetchMessage", listReceivedMessages);

        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_URL_BE_CHAT}/chathub`)
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        connection.invoke('PublishUserOnConnect',
          currentUser.id,
          currentUser.fullname,
          // loggedInUser.avatarUrl
        )
          .then(() => console.log('User connected'))
          .catch(e => console.log('PublishUserOnConnect failed: ', e));

        connection.on('BroadcastUserOnConnect', (users) => {
          setConnectedUsers(users);
          makeItOnline(users);
        });

        connection.on('BroadcastUserOnDisconnect', (users) => {
          setConnectedUsers(users);
          setUsers(prevUsers =>
            prevUsers.map(user => ({ ...user, isOnline: false }))
          );
          makeItOnline(users);
        });

        connection.on('BroadCastDeleteMessage', (message) => {
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const deletedMessage = updatedMessages.find(m => m.id === message.id);
            if (deletedMessage) {
              deletedMessage.isReCeiverDeleted = message.isReCeiverDeleted;
              deletedMessage.isSenderDeleted = message.isSenderDeleted;
              if (deletedMessage.isReCeiverDeleted && (
                deletedMessage.receiver = currentUser.id ||
                deletedMessage.sender === currentUser.id
              )) {
                setDisplayMessages(
                  updatedMessages.filter(m => m.id !== message.id)
                );
              }
            }
            return updatedMessages;
          });
        });

        connection.on('ReceiveDM', message => {
          message.type = 'received';
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, message];
            if (currentChat) {
              setDisplayMessages(
                updatedMessages.filter(
                  m =>
                    (m.type === 'sent' && m.receiver === currentChat.id) ||
                    (m.type === 'received' && m.sender === currentChat.id)
                )
              );
            }
            return updatedMessages;
          });

          setUsers(prevUsers => {
            const currentUser = prevUsers.find(user => user.id === message.sender);
            return prevUsers.map(user => ({
              ...user,
              isActive: user.id === currentUser.id,
            }));
          });
        });
      })
      .catch(e => {
        console.log(e);
      });

    setHubConnection(connection);



    return () => {
      connection.stop();
    };


  }, [currentUser]);

  useEffect(() => {
    if (currentChat) {
      setDisplayMessages(
        messages.filter(
          m =>
            ((m.type === 'sent' && m.receiver === currentChat.id) ||
              (m.type === 'received' && m.sender === currentChat.id)) &&
            m.isReCeiverDeleted !== true &&
            m.isSenderDeleted !== true
        )
      );
    }
  }, [currentChat, messages]);

  const makeItOnline = (userList) => {
    if (userList.length > 0) {
      setUsers(prevUsers =>
        prevUsers.map(user => {
          const isOnline = userList.some(u => u.userId === user.id);
          return { ...user, isOnline };
        })
      );
    }
  };

  const sendDirectMessage = async (messageContent) => {
    if (messageContent.trim()) {
      const msg = {
        id: uuidv4(),
        sender: currentUser.id,
        receiver: currentChat.id,
        CreatedAt: new Date().toISOString(),
        type: 'sent',
        content: messageContent,
      };

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, msg];
        setDisplayMessages(
          updatedMessages.filter(
            m =>
              (m.type === 'sent' && m.receiver === currentChat.id) ||
              (m.type === 'received' && m.sender === currentChat.id)
          )
        );
        return updatedMessages;
      });

      try {
        await hubConnection.invoke('SendMessageToUser', msg);
        console.log("Message sent successfully");
      } catch (error) {
        console.log("Error sending message: ", error);
      }
    }
  };

  const deleteMessage = async (message, deleteType, isSender) => {
    const deleteMessage = {
      Type: deleteType,
      message,
      UserRequest: currentUser.id,
    };

    try {
      await hubConnection.invoke('DeleteMessageToUser', deleteMessage);
      console.log("Message deleted successfully");
    } catch (error) {
      console.log("Error deleting message: ", error);
    }

    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id
          ? { ...msg, isSenderDeleted: isSender, isReCeiverDeleted: !isSender }
          : msg
      )
    );
  };

  const onLogout = async () => {
    try {
      await hubConnection.invoke('RemoveOnlineUser', currentUser.id);
      setMessages(prevMessages => [
        ...prevMessages,
        'User Disconnected Successfully',
      ]);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return { users, connectedUsers, messages, displayMessages, sendDirectMessage, deleteMessage, onLogout };
};