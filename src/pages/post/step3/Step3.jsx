/* eslint-disable no-unused-vars */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import successfully from '@/assets/images/successfully.png';

import './Step3.scss';

const Step3 = () => {
  const { t } = useTranslation('createPost');

  return (
    <div className='body-step3'>
      <div className='step3'>
        <div className='top-step3'>
          <p>{t('shared')}</p>
        </div>
        <div className='content-step3'>
          <img src={successfully} alt='successfully' />
          <p>{t('message')}</p>
        </div>
      </div>
    </div>
  )
}

export default Step3;