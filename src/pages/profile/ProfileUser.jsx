/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import account from '@/assets/images/account.png';
import postIcon from '@/assets/images/post.png';
import tagged from '@/assets/images/tagged.png';

import { getUserById } from '@/api/authApi/auth';
import LayoutFooter from '@/layouts/LayoutFooter';
import FollowUserOption from '@/components/followUserOption/FollowUserOption';
import MoreOption from '@/components/followUserOption/MoreOption';
import { getCountFollower, getCountFollowing } from '@/api/authApi/graph';
import { getPostByUserId } from '@/api/authApi/post';

import cute from '@/assets/images/cute.gif';
import down from '@/assets/images/down.png';
import addFriend from '@/assets/images/addFriend.png';
import more from '@/assets/images/more.png';

import './ProfileUser.scss';

const ProfileUser = () => {
  const { id } = useParams();
  const [activeItem, setActiveItem] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState({});
  const [post, setPost] = useState(0);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  const { t } = useTranslation('profile');

  useEffect(() => {
    const getInfo = async () => {
      console.log(id);
      const user = await getUserById(id);
      setUser(user);
      const posts = await getPostByUserId(id);
      setPost(posts.length);
      const follower = await getCountFollower(id);
      setFollower(follower);
      const following = await getCountFollowing(id);
      setFollowing(following);
    }

    getInfo();
  }, []);

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
            <img src={user?.profile?.avatarUrl ? user?.profile?.avatarUrl : account} alt='avata' />
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
            <p className='name'><b>{user?.profile?.fullName}</b></p>
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
            <p><b>{post}</b> {t('posts')}</p>
            <p><b>{follower}</b> {t('followers')}</p>
            <p><b>{following}</b> {t('following')}</p>
          </div>

        </div>
      </div>

      <div className='content-bottom'>
        <div className='menu-profile'>
          <div className={`menu-item ${activeItem === 'post' ? 'active' : ''}`} onClick={() => handleClick('post')}>
            <img src={postIcon} alt='post' />
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