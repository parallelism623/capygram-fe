/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { v4 as uuidv4 } from 'uuid';
import { getMessages } from "@/api/authApi/chat";
import ChatInput from './ChatInput';

import phone from '@/assets/images/phone.png';
import call from '@/assets/images/call.png';
import down from '@/assets/images/down.png';
import account from '@/assets/images/account.png';

import './ChatContainer.scss';

const ChatContainer = ({ currentChat, currentUser }) => {
  const [hubConnection, setHubConnection] = useState(null);
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [chatUser, setChatUser] = useState(currentChat);
  const [error, setError] = useState(null);

  const { t } = useTranslation('messages');
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const scrollRef = useRef();

  const handleClickViewProfile = () => {
    navigate(`/profile/${currentChat.id}`);
  }

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
            if (chatUser) {
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

  useEffect(() => {
    console.log("displayMessages", displayMessages);
  }, [displayMessages]);

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

  useEffect(() => {
    //cuộn xuống tin nhắn mới khi danh sách tin nhắn thay đổi
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='body-chatContainer'>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={currentChat.avatarUrl !== ('string' && '') ? currentChat.avatarUrl : account} alt='avatar' />
          </div>
          <div className='username'>
            <p><b>{currentChat.fullname}</b></p>
          </div>
        </div>
        <div className='action'>
          <img src={phone} alt='phone' />
          <img src={call} alt='call' />
          <img src={down} alt='down' />
        </div>
      </div>
      <div className='chat-message'>
        <div className='top-chat-message'>
          <div className='infor'>
            <div className='avatar'>
              <img src={currentChat.avatarUrl !== ('string' && '') ? currentChat.avatarUrl : account} alt='avatar' />
            </div>
            <div className='username'>
              <p><b>{currentChat.fullname}</b></p>
            </div>
            <button className='btn-viewProfile' onClick={handleClickViewProfile}><b>{t('viewProfile')}</b></button>
          </div>
        </div>

        <div className='message'>
          {
            displayMessages.length > 0 && displayMessages.map((msg, index) => (
              <div className='chat' key={index} ref={scrollRef}>
                <div className={`message-item ${msg.type}`}>
                  <div className='avatar'>
                    <img src={msg.type === 'sent' ? currentUser.avatarUrl : currentChat.avatarUrl} alt='avatar' />
                  </div>
                  <div className='message-content'>
                    <p>{msg.content}</p>
                  </div>
                </div>
              </div>
            ))

          }
        </div>

      </div>

      <ChatInput handleSendMsg={sendDirectMessage} />
    </div>
  )
}

export default ChatContainer