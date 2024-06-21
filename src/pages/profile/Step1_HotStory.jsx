/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import exit from '@/assets/images/exit.png';

import Step2_HotStory from './Step2_HotStory';
import { nextStep, setHotStory, setStep } from '@/store/formSlice';

import './Step1_HotStory.scss';

const Step1_HotStory = ({onCancel}) => {
  const { t } = useTranslation('hotStory');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const step = useSelector((state) => state.form.step);

  const handleClickNext = () => {
    dispatch(setHotStory({ name }));
    dispatch(nextStep());
  };

  const handleClickCancel = () => {
    dispatch(setStep(0));
    onCancel();
  };

  return (
    <>
      <div className='body-hotStory'>
        {step === 1 && (
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
        )}
        {
          step === 2 && (
            <div className='overlay' onClick={handleClickCancel}>
              <motion.div
                className='list-Story-container'
                onClick={(e) => e.stopPropagation()}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Step2_HotStory />
              </motion.div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Step1_HotStory;