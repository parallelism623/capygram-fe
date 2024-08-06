/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';

import SelectedUserChat from './SelectedUserChat';

import chat from '@/assets/images/chat.png';

import './Welcome.scss';

const Welcome = ({ setCurrentChat }) => {
  const { t } = useTranslation('messages');
  const [showSelectedUserChat, setShowSelectedUserChat] = useState(false);

  const handleCancleSelected = () => {
    setShowSelectedUserChat(false);
  }

  return (
    <div className='welcome-container'>
      <div className='icon-message'>
        <img src={chat} alt='chat' />
      </div>
      <div className='tt'>
        <p>{t('yourMessage')}</p>
        <p className='title'>{t('title')}</p>
      </div>
      <button onClick={() => setShowSelectedUserChat(true)}>{t('sendMessage')}</button>
      {
        showSelectedUserChat && (
          <div className='overlay' onClick={handleCancleSelected}>
            <motion.div
              className='item-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <SelectedUserChat onCancel={handleCancleSelected} setCurrentChat={setCurrentChat} />
            </motion.div>
          </div>

        )
      }
    </div>

  )
}

export default Welcome;