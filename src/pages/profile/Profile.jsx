/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import avataxinh from '@/assets/images/avataxinh.jpg'
import setting from '@/assets/images/setting.png';
import Add from '@/assets/images/Add.png';
import post from '@/assets/images/post.png';
import saved from '@/assets/images/saved.png';
import tagged from '@/assets/images/tagged.png';

import '@/i18n';
import './Profile.scss';
import LayoutFooter from '@/layouts/LayoutFooter';

const Profile = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
  }

  const { t } = useTranslation('profile');


  return (

    <div className='body-profile'>
      <div className='content-top'>
        <div className='group-avata'>
          <div className='avata'>
            <img src={avataxinh} alt='avata' />
            <div className='note'>
              <div className='content-note'>{t('note')}</div>
              <div className='cham-to'></div>
              <div className='cham-nho'></div>
            </div>
          </div>

          <div className='other-name'><b>Hanglazy</b></div>

          <div className='add-post'>
            <img src={Add} alt='add' />
            <p>{t('new')}</p>
          </div>
        </div>

        <div className='right'>
          <div className='action'>
            <p className='name'><b>hanglazy4</b></p>
            <button className='btn-action'><b>{t('editProfile')}</b></button>
            <button className='btn-action'><b>{t('viewArchive')}</b></button>
            <img src={setting} alt='setting' />
          </div>

          <div className='data'>
            <p><b>0</b> {t('posts')}</p>
            <p><b>4</b> {t('followers')}</p>
            <p><b>4</b> {t('following')}</p>
          </div>

        </div>
      </div>

      <div className='content-bottom'>
        <div className='menu-profile'>
          <div className={`menu-item ${activeItem === 'post' ? 'active' : ''}`} onClick={() => handleClick('post')}>
            <img src={post} alt='post' />
            <p>{t('post')}</p>
          </div>

          <div className={`menu-item ${activeItem === 'saved' ? 'active' : ''}`} onClick={() => handleClick('saved')}>
            <img src={saved} alt='saved' />
            <p>{t('saved')}</p>
          </div>

          <div className={`menu-item ${activeItem === 'tagged' ? 'active' : ''}`} onClick={() => handleClick('tagged')}>
            <img src={tagged} alt='tagged' />
            <p>{t('tagged')}</p>
          </div>
        </div>
      </div>
      <LayoutFooter />
    </div>

  )
}

export default Profile;