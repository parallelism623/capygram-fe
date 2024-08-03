/* eslint-disable*/
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import account from '@/assets/images/account.png';
import star1 from '@/assets/images/star1.png';
import star2 from '@/assets/images/star2.png';
import next from '@/assets/images/next.png';
import exit from '@/assets/images/exit.png';

import './FollowUserOption.scss';
const FollowUserOption = ({ onCancel, user }) => {
  const { t } = useTranslation('profile');

  return (
    <div className='body-followUserOption'>
      <div className='followUserOption'>
        <div className='top-option'>
          <div className='exit'>
            <img src={exit} alt='exit' onClick={onCancel} />
          </div>
          <div className='avatar'>
            <img src={user?.profile?.avatarUrl !== 'string' ? user?.profile?.avatarUrl : account} />
          </div>
          <div className='username'><b>{ user.userName}</b></div>
        </div>
        <div className='center-option'>
          <div className='item-option'>
            <p>{t('addCloseFriends')}</p>
            <div className='item-icon1'>
              <img src={star1} alt='star' />
            </div>
          </div>
          <div className='item-option'>
            <p>{t('addFavorites')}</p>
            <img src={star2} alt='star' />
          </div>
          <div className='item-option'>
            <p>{t('mute')}</p>
            <img src={next} alt='next' />
          </div>
          <div className='item-option'>
            <p>{t('restrict')}</p>
            <img src={next} alt='next' />
          </div>
          <div className='item-option'>
            <p>{t('unfollow')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowUserOption