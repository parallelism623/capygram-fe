/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';

import exit from '@/assets/images/exit.png';

import Step2_HotStory from './Step2_HotStory';

import './Step1_HotStory.scss';

const Step1_HotStory = ({ onCancel }) => {
  const { t } = useTranslation('hotStory');
  const [name, setName] = useState('');
  const [showListStory, setShowListStory] = useState(false);

  const handleCancelFormListStory = () => {
    setShowListStory(false);
  };

  const handleClickNext = () => {
    //logic
    setShowListStory(true);
  };

  return (
    <div className='body-hotStory'>
      <div className='step1_HotStory'>
        <div className='div-p'>
          <p>{t('highlight')}</p>
          <img src={exit} onClick={onCancel} />
        </div>
        <div className='div-input'>
          <input value={name} type='text' placeholder={t('highlightName')} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='div-btn'>
          <p className={name !== '' ? 'p1' : 'p2'} onClick={handleClickNext}>{t('next')}</p>
        </div>
      </div>
      {
        showListStory && (
          <div className='overlay' onClick={handleCancelFormListStory}>
            <motion.div
              className='list-Story-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Step2_HotStory onCancel={handleCancelFormListStory} />
            </motion.div>
          </div>
        )
      }
    </div>
  )
}

export default Step1_HotStory;