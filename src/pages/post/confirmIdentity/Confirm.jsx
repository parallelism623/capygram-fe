/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import './Confirm.scss';
const Confirm = ({ onCancel }) => {
  const { t } = useTranslation('createPost');
  return (
    <div className='body-confirm'>
      <div className='confirm'>
        <div className='top-cf'>
          <p className='p1'><b>{t('discard')}</b></p>
          <p className='p2'>{t('if')}</p>
        </div>
        <div className='center-cf'>
          <p onClick={() => onCancel('bo')}>{t('dis')}</p>
        </div>
        <div className='bottom-cf'>
          <p onClick={() => onCancel('huy')}>{t('cancel')}</p>
        </div>
      </div>
    </div>
  )
}

export default Confirm;