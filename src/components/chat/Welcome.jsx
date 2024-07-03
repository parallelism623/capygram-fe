/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import chat from '@/assets/images/chat.png';

import './Welcome.scss';

const Welcome = () => {
  const { t } = useTranslation('messages');

  return (
    <div className='welcome-container'>
      <div className='icon-message'>
        <img src={chat} alt='chat' />
      </div>
      <div className='tt'>
        <p>{t('yourMessage')}</p>
        <p className='title'>{t('title')}</p>
      </div>
      <button>{t('sendMessage')}</button>
    </div>
  )
}

export default Welcome;