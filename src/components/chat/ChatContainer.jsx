/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';

import phone from '@/assets/images/phone.png';
import call from '@/assets/images/call.png';
import down from '@/assets/images/down.png';
import account from '@/assets/images/account.png';

import './ChatContainer.scss';
import { useChat } from '@/hooks/useChat';

const ChatContainer = ({ currentChat, currentUser }) => {

  const { t } = useTranslation('messages');
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const scrollRef = useRef();

  const { users, connectedUsers, messages, displayMessages, sendDirectMessage, deleteMessage, onLogout } = useChat({ currentChat, currentUser });

  const handleClickViewProfile = () => {
    navigate(`/profile/${currentChat.id}`);
  }

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
                    <img src={msg.type === 'sent' ?
                      (currentUser.avatarUrl !== ('string' && '') ? currentUser.avatarUrl : account) :
                      (currentChat.avatarUrl !== ('string' && '') ? currentChat.avatarUrl : account)} alt='avatar' />
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