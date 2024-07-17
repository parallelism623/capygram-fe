/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import addFriend from '@/assets/images/addFriend.png';
import './CardUser.scss';

const CardUser = ({ user }) => {
  const { t } = useTranslation('explore');
  
  const [isFollow, setIsFollow] = useState(false);

  return (
    <div className='container'>
      <div className='info'>
        <img src={user.avatarUrl} alt='avata' />
        <p><b>{user.name}</b></p>
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
                <button className='btn-message'>{t('message')}</button>
                <button className='btn-following'>{t('following')}</button>
              </div>
          )
        }
      </div>
    </div>
  )
}

export default CardUser;