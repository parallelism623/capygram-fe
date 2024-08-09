import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { v4 as uuidv4 } from 'uuid';
import { getMessages } from "@/api/authApi/chat";

export const useSignalR = (loggedInUser, currentChat) => {
  const [hubConnection, setHubConnection] = useState(null);
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [chatUser, setChatUser] = useState(currentChat);
  const [error, setError] = useState(null);


  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_URL_BE_CHAT}/chathub`)
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        connection.invoke('PublishUserOnConnect',
          loggedInUser.id,
          loggedInUser.fullname,
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
                deletedMessage.receiver = loggedInUser.id ||
                deletedMessage.sender === loggedInUser.id
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
            if (chatUser) {
              setDisplayMessages(
                updatedMessages.filter(
                  m =>
                    (m.type === 'sent' && m.receiver === chatUser.id) ||
                    (m.type === 'received' && m.sender === chatUser.id)
                )
              );
            }
            return updatedMessages;
          });

          setUsers(prevUsers => {
            const currentUser = prevUsers.find(user => user.id === message.sender);
            setChatUser(currentUser);
            return prevUsers.map(user => ({
              ...user,
              isActive: user.id === currentUser.id,
            }));
          });
        });
      })
      .catch(e => {
        console.log(e);
        setError(e)
      });

    setHubConnection(connection);

    return () => {
      connection.stop();
    };
  }, [loggedInUser, chatUser]);

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

  const fetchMessages = async () => {
    try {
      const receivedMessages = await getMessages(loggedInUser.id);
      if (receivedMessages) {
        const listReceivedMessages = receivedMessages.map(msg => ({
          ...msg,
          type: msg.received === loggedInUser.id ? 'received' : 'sent',
        }));
        setMessages(listReceivedMessages);
        console.log("fetchMessage", listReceivedMessages);

        return listReceivedMessages;
      }

      return [];
    } catch (error) {
      console.log(error);
    }
  };

  const sendDirectMessage = async (messageContent) => {
    if (messageContent.trim()) {
      const msg = {
        id: uuidv4(),
        sender: loggedInUser.id,
        receiver: chatUser.id,
        CreatedAt: new Date().toISOString(),
        type: 'sent',
        content: messageContent,
      };

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, msg];
        setDisplayMessages(
          updatedMessages.filter(
            m =>
              (m.type === 'sent' && m.receiver === chatUser.id) ||
              (m.type === 'received' && m.sender === chatUser.id)
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
      UserRequest: loggedInUser.id,
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
      await hubConnection.invoke('RemoveOnlineUser', loggedInUser.id);
      setMessages(prevMessages => [
        ...prevMessages,
        'User Disconnected Successfully',
      ]);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return {
    users,
    hubConnection,
    connectedUsers,
    messages,
    displayMessages,
    chatUser,
    setChatUser,
    error,
    fetchMessages,
    sendDirectMessage,
    deleteMessage,
    onLogout,
  };
};
