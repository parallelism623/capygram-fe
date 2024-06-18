/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import avataxinh from '@/assets/images/avataxinh.jpg'
import setting from '@/assets/images/setting.png';
import Add from '@/assets/images/Add.png';
import post from '@/assets/images/post.png';
import saved from '@/assets/images/saved.png';
import tagged from '@/assets/images/tagged.png';

import LayoutFooter from '@/layouts/LayoutFooter';
import Note from './Note';
import Setting from './Setting';
import Step1_HotStory from './Step1_HotStory';

import '@/i18n';

import './Profile.scss';

const Profile = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showFormHotStory, setShowFormHotStory] = useState(false);

  const handleCancel = () => {
    setShowNoteForm(false);
  }

  const handleCancel2 = () => {
    setShowSetting(false);
  }

  const handleCancelHotStory = () => {
    setShowFormHotStory(false);
  };

  const handleClick = (item) => {
    setActiveItem(item);
  }

  const { t } = useTranslation('profile');

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (

    <div className='body-profile'>
      <div className='content-top'>
        <div className='group-avata'>
          <div className='avata'>
            <img src={avataxinh} alt='avata' />
            <div className='note'>
              <div className='content-note' onClick={() => setShowNoteForm(true)}>{t('note')}</div>
              <div className='cham-to'></div>
              <div className='cham-nho'></div>
            </div>
          </div>

          <div className='other-name'><b>Hanglazy</b></div>

          <div className='add-post' onClick={() => setShowFormHotStory(true)}>
            <img src={Add} alt='add' />
            <p>{t('new')}</p>
          </div>
        </div>

        <div className='right'>
          <div className='action'>
            <p className='name'><b>hanglazy4</b></p>
            <button className='btn-action' onClick={handleEditProfile}><b>{t('editProfile')}</b></button>
            <button className='btn-action' onClick={() => navigate('/archive-profile')}><b>{t('viewArchive')}</b></button>
            <img src={setting} alt='setting' onClick={() => setShowSetting(true)} />
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

      {showNoteForm && (
        <div className='overlay' onClick={handleCancel}>
          <motion.div
            className='note-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Note onCancel={handleCancel} />
          </motion.div>
        </div>
      )}

      {showSetting && (
        <div className='overlay' onClick={handleCancel2}>
          <motion.div
            className='note-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Setting onCancel={handleCancel2} />
          </motion.div>
        </div>
      )}

      {showFormHotStory && (
        <div className='overlay' onClick={handleCancelHotStory}>
          <motion.div
            className='note-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Step1_HotStory onCancel={handleCancelHotStory} />
          </motion.div>
        </div>
      )}


      <LayoutFooter />
    </div>

  )
}

export default Profile;