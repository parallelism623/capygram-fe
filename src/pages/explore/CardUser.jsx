/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import addFriend from '@/assets/images/addFriend.png';
import account from '@/assets/images/account.png';

import './CardUser.scss';
import { useNavigate } from 'react-router-dom';

const CardUser = ({ user, Follow }) => {
  const { t } = useTranslation('explore');
  
  const [isFollow, setIsFollow] = useState(Follow);

  const navigate = useNavigate();

  const handleChat = () => {
    localStorage.setItem('userChat', JSON.stringify(user));
    navigate('/messages');
  };

  return (
    <div className='container'>
      <div className='info'>
        <img src={user.profile.avatarUrl !== 'string' ? user.profile.avatarUrl : account} alt='avata' />
        <p><b>{user.userName}</b></p>
      </div>

      <div className='count'>
        <div className='count-item'>
          <p><b>0</b></p>
          <p>{t('posts')}</p>
        </div>
        <div className='count-item'>
          <p><b>0</b></p>
          <p>{t("followers")}</p>
        </div>
        <div className='count-item'>
          <p><b>0</b></p>
          <p>{t('following')}</p>
        </div>
      </div>

      <div className='post-user'></div>

      <div className='bottom-card-user'>
        {
          isFollow === false ? (
            <button className='btn-follow' onClick={() => setIsFollow(true)}>
              <img src={addFriend} alt='follow' className='icon-follow'/>
              {t('follow')}
            </button>
          ) : (
              <div className='isfollow'>
                <button className='btn-message' onClick={handleChat}>{t('message')}</button>
                <button className='btn-following'>{t('following')}</button>
              </div>
          )
        }
      </div>
    </div>
  )
}

export default CardUser;