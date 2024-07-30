/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { deletePostByPostId } from '@/api/authApi/post';

import './ConfirmDelete.scss';

const ConfirmDelete = ({ onCancel, post, setIscall, onCancelItem }) => {
  const { t } = useTranslation('postItem');

  const handleDeletePost = async () => {
    try {
      await deletePostByPostId(post.id);
      setIscall(true);
      onCancel();
      onCancelItem();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='body-cornfiem-delete'>
      <div className='confirm-delete-container'>
        <div className='top-container'>
          <p className='p1'>{t('deletePost')}</p>
          <p className='p2'>{t('isSure')}</p>
        </div>
        <div className='item-delete p'>
          <p className='red' onClick={handleDeletePost}>{t('delete')}</p>
        </div>
        <div className='item-delete'>
          <p onClick={onCancel}>{t('Cancel')}</p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete;