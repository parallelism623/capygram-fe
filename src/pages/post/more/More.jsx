/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';

import ConfirmDelete from '../confirmDelete/ConfirmDelete';

import './More.scss';

const More = ({ onCancel }) => {
  const { t } = useTranslation('postItem');

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCancelConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className='body-more'>
      {showConfirmDelete === false ? (
        <div className='more-container'>
          <div className='more-item p'>
            <p className='red' onClick={() => setShowConfirmDelete(true)}>{t('delete')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('edit')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('hideLike')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('turnOff')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('goToPost')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('ShareTo')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('CopyLink')}</p>
          </div>
          <div className='more-item p'>
            <p >{t('Embed')}</p>
          </div>
          <div className='more-item'>
            <p onClick={onCancel}>{t('Cancel')}</p>
          </div>
        </div>
      ) : (
        <ConfirmDelete onCancel={handleCancelConfirmDelete}/>
      )}
    </div>
  )
}

export default More