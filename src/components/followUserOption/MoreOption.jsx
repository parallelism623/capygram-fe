/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import './MoreOption.scss';

const MoreOption = ({onCancel}) => {
  const { t } = useTranslation('profile');
  return (
    <div className='body-option'>
      <div className='moreOption'>
        <div className='item'>
          <p className='p1'><b>{t('block')}</b></p>
        </div>
        <div className='item'>
          <p className='p1'><b>{t('restrict')}</b></p>
        </div>
        <div className='item'>
          <p className='p1'><b>{t('report')}</b></p>
        </div>
        <div className='item'>
          <p >{t('shareTo')}</p>
        </div>
        <div className='item'>
          <p >{t('aboutAccount')}</p>
        </div>
        <div className='item'>
          <p onClick={onCancel}>{t('cancel')}</p>
        </div>
      </div>
    </div>
  )
}

export default MoreOption