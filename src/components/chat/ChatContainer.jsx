/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';

import ChatInput from './ChatInput';

import phone from '@/assets/images/phone.png';
import call from '@/assets/images/call.png';
import down from '@/assets/images/down.png';

import './ChatContainer.scss';

const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const { t } = useTranslation('messages');
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const handleSendMsg = (msg) => {
    const message = {
      type: msg.type,
      content: msg.content,
      from: currentUser.id,
      to: currentChat.id
    }

    const listMessages = JSON.parse(localStorage.getItem("messages")) || [];
    listMessages.push(message);
    localStorage.setItem("messages", JSON.stringify(listMessages));

    // socket.current.emit("sendMessage", {
    //   to: currentChat.id,
    //   msg,
    // });

    // const msgs = [...messages];
    // msgs.push({
    //   fromSelf: true,
    //   message: msg
    // });

    // setMessages(msgs);

    setMessages([...messages, message]);
  }

  const handleClickViewProfile = () => {
    navigate(`/profile/${currentChat.id}`);
  }

  useEffect(() => {
    if (currentChat) {
      const getMessage = JSON.parse(localStorage.getItem("messages"));
      if (getMessage) {
        const filterMessages = getMessage.filter(msg => (msg.from === currentChat.id && msg.to === currentUser.id) || (msg.from === currentUser.id && msg.to === currentChat.id));
        setMessages(filterMessages);
      }
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    //cuộn xuống tin nhắn mới khi danh sách tin nhắn thay đổi
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='body-chatContainer'>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={currentChat.avatarUrl} alt='avatar' />
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
              <img src={currentChat.avatarUrl} alt='avatar' />
            </div>
            <div className='username'>
              <p><b>{currentChat.fullname}</b></p>
            </div>
            <button className='btn-viewProfile' onClick={handleClickViewProfile}><b>{t('viewProfile')}</b></button>
          </div>
        </div>

        <div className='message'>
          {
            messages.map((msg, index) => (
              <div className='chat' key={index} ref={scrollRef}>
                <div className={`message-item ${msg.from === currentUser.id ? 'sent' : 'received'}`}>
                  <div className='avatar'>
                    <img src={msg.from === currentUser.id ? currentUser.avatarUrl : currentChat.avatarUrl} alt='avatar' />
                  </div>
                  <div className='message-content'>
                    {
                      msg.type === 'text' ?
                        <p>{msg.content}</p> :
                        msg.type === 'image' ?
                          <img src={msg.content} alt='image' /> :
                          msg.type === 'video' ?
                            <video src={msg.content} controls /> :
                            null
                    }
                  </div>
                </div>
              </div>
            ))

          }
        </div>

      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatContainer