/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';

import account from '@/assets/images/account.png';
import post from '@/assets/images/post.png';
import tagged from '@/assets/images/tagged.png';

import LayoutFooter from '@/layouts/LayoutFooter';
import FollowUserOption from '@/components/followUserOption/FollowUserOption';
import MoreOption from '@/components/followUserOption/MoreOption';

import cute from '@/assets/images/cute.gif';
import down from '@/assets/images/down.png';
import addFriend from '@/assets/images/addFriend.png';
import more from '@/assets/images/more.png';

import './ProfileUser.scss';

const ProfileUser = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { t } = useTranslation('profile');

  const handleClick = (item) => {
    setActiveItem(item);
  }

  const handleCancel = () => {
    setShowOption(false);
  };

  const handleCancel2 = () => {
    setShowMore(false);
  };

  const hotStory = [
    {
      id: 1,
      name: 'abc',
      coverPhoto: cute
    },
    {
      id: 2,
      name: 'abc',
      coverPhoto: cute
    },
    {
      id: 3,
      name: 'abc',
      coverPhoto: cute
    },
    {
      id: 4,
      name: 'abc',
      coverPhoto: cute
    },
    {
      id: 5,
      name: 'abc',
      coverPhoto: cute
    }

  ];

  return (

    <div className='body-profile'>
      <div className='content-top'>
        <div className='group-avata'>
          <div className='avata'>
            <img src={account} alt='avata' />
          </div>

          <div className='hot-story'>
            {(hotStory.length > 0) && (
              hotStory.map((item, index) => (
                <div className='story' key={index}>
                  <div className='image'>
                    <img src={item.coverPhoto} alt='hotStory' />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='right'>
          <div className='action'>
            <p className='name'><b>hanglazy4</b></p>
            <div className='group-btn'>
              <button className='btn-action-1' onClick={() => setShowOption(true)}>
                <p><b>{t('following')}</b></p>
                <img src={down} alt='down' />
              </button>
              <button className='btn-action-2'>
                <p><b>{t('message')}</b></p>
              </button>
              <button className='btn-action-3'>
                <img src={addFriend} alt='addFriend' />
              </button>
              <img src={more} alt='more' onClick={() => setShowMore(true)} />
            </div>
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

          <div className={`menu-item ${activeItem === 'tagged' ? 'active' : ''}`} onClick={() => handleClick('tagged')}>
            <img src={tagged} alt='tagged' />
            <p>{t('tagged')}</p>
          </div>
        </div>
      </div>

      {
        showOption && (
          <div className='overlay' onClick={handleCancel}>
            <motion.div
              className='option-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <FollowUserOption onCancel={handleCancel} />
            </motion.div>
          </div>
        )
      }

      {
        showMore && (
          <div className='overlay' onClick={handleCancel2}>
            <motion.div
              className='option-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <MoreOption onCancel={handleCancel2} />
            </motion.div>
          </div>
        )
      }
      <LayoutFooter />
    </div>

  )
}

export default ProfileUser;