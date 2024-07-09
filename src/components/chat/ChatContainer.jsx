/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';

import ChatInput from './ChatInput';

import phone from '@/assets/images/phone.png';
import call from '@/assets/images/call.png';
import down from '@/assets/images/down.png';

import './ChatContainer.scss';

const ChatContainer = ({ currentChat, currentUser }) => {

  const { t } = useTranslation('messages');
  const navigate = useNavigate();
  const handleSendMsg = (msg) => {
  }

  const handleClickViewProfile = () => {
    navigate(`/profile/${currentChat.id}`);
  }

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
            <button className='btn-viewProfile' onClick={ handleClickViewProfile}><b>{t('viewProfile')}</b></button>
          </div>
        </div>

      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatContainer