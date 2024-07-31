/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';

import ConfirmDelete from '../confirmDelete/ConfirmDelete';

import './More.scss';
import EditPost from '../editPost/EditPost';

const More = ({ onCancel, post, setIscall, onCancelItem }) => {
  const { t } = useTranslation('postItem');

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCancelConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
  };

  return (
    <div className='body-more'>
      {(showConfirmDelete === false) ? (
        <div className='more-container'>
          <div className='more-item p'>
            <p className='red' onClick={() => setShowConfirmDelete(true)}>{t('delete')}</p>
          </div>
          <div className='more-item p'>
            <p onClick={() => setShowEdit(true)}>{t('edit')}</p>
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
        <ConfirmDelete onCancel={onCancel} post={post} setIscall={setIscall} onCancelItem={onCancelItem} />
      )}

      {showEdit && (
        <div className='overlay' onClick={handleCancelEdit}>
          <motion.div
            className='item-edit-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <EditPost onCancel={handleCancelEdit} postEdit={post} setIscall={setIscall} onCancelItem={onCancelItem} onCancelMore={onCancel} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default More