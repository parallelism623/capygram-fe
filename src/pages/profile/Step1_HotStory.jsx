/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import exit from '@/assets/images/exit.png';

import './Step1_HotStory.scss';

const Step1_HotStory = ({ onCancel }) => {
  const { t } = useTranslation('hotStory');
  const [name, setName] = useState('');

  return (
    <div className='step1_HotStory'>
      <div className='div-p'>
        <p>{t('highlight')}</p>
        <img src={exit} onClick={onCancel} />
      </div>
      <div className='div-input'>
        <input value={name} type='text' placeholder={t('highlightName')} onChange={(e)=> setName(e.target.value)}/>
      </div>
      <div className='div-btn'>
        <p className={name !== '' ? 'p1' : 'p2'}>{t('next')}</p>
      </div>
    </div>
  )
}

export default Step1_HotStory;