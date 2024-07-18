/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import  "@/i18n";

import './ShowMoreOption.scss';
const ShowMoreOption = ({ onCancel }) => {
  const { t } = useTranslation('explore');
  
  return (
    <div className='showMore-contaioner'>
      <div className='showMore-item boder-bottom red'>{t('report')}</div>
      <div className='showMore-item boder-bottom'>{t('goToPost')}</div>
      <div className='showMore-item boder-bottom'>{t('shareTo')}</div>
      <div className='showMore-item boder-bottom'>{t('copyLink')}</div>
      <div className='showMore-item boder-bottom'>{t('embed')}</div>
      <div className='showMore-item boder-bottom'>{t('aboutAccount')}</div>
      <div className='showMore-item' onClick={onCancel}>{t('cancel')}</div>
    </div>
  )
}

export default ShowMoreOption;