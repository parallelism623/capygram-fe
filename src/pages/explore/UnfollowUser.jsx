/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { unFollow } from '@/api/authApi/graph';
import account from '@/assets/images/account.png';

import './UnfollowUser.scss';

const UnfollowUser = ({ onCancel, user, setIsRender, isRender, setIsFollow }) => {
  const { t } = useTranslation('explore');

  const handleClickUnfollow = async () => {
    try {
      const id = localStorage.getItem('userId');
      const did = user.id;
      await unFollow(id, did);
      setIsFollow(false);
      setIsRender(!isRender);
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='unfollow-container'>
      <div className='avatar'>
        <img src={user?.profile?.avatarUrl !== 'string' ? user?.profile?.avatarUrl : account} alt='avatar' />
        <p>{t('unfollow')} <b> @{user.userName}</b></p>
      </div>
      <div className='item-unfollow border' >
        <p className='red' onClick={handleClickUnfollow}>{t('unfollow')}</p>
      </div>
      <div className='item-unfollow'>
        <p onClick={onCancel}>{t('cancel')}</p>
      </div>
    </div>
  )
}

export default UnfollowUser;