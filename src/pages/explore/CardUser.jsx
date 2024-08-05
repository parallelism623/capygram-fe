/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { getPostByUserId } from '@/api/authApi/post';
import { getCountFollower, getCountFollowing } from '@/api/authApi/graph';
import UnfollowUser from './UnfollowUser';

import addFriend from '@/assets/images/addFriend.png';
import account from '@/assets/images/account.png';

import './CardUser.scss';

const CardUser = ({ user, Follow, setIsRender, isRender, handleClickFollow }) => {
  const { t } = useTranslation('explore');

  const [isFollow, setIsFollow] = useState(Follow);
  const [post, setPost] = useState(0);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [showUnfollow, setShowUnfollow] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const getInfo = async () => {
      try {
        const posts = await getPostByUserId(user.id);
        setPost(posts.length);
        const follower = await getCountFollower(user.id);
        setFollower(follower);
        const following = await getCountFollowing(user.id);
        setFollowing(following);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [isRender]);

  const handleChat = () => {
    localStorage.setItem('userChat', JSON.stringify(user));
    navigate('/messages');
  };

  const handleCancelShowUnfollow = () => {
    setShowUnfollow(false);
  };

  const handleFollow = () => {
    handleClickFollow();
    setIsFollow(true);
  };

  return (
    <div className='container'>
      <div className='info'>
        <img src={user.profile.avatarUrl !== 'string' ? user.profile.avatarUrl : account} alt='avata' />
        <p><b>{user.userName}</b></p>
      </div>

      <div className='count'>
        <div className='count-item'>
          <p><b>{post}</b></p>
          <p>{t('posts')}</p>
        </div>
        <div className='count-item'>
          <p><b>{follower}</b></p>
          <p>{t("followers")}</p>
        </div>
        <div className='count-item'>
          <p><b>{following}</b></p>
          <p>{t('following')}</p>
        </div>
      </div>

      <div className='post-user'></div>

      <div className='bottom-card-user'>
        {
          isFollow === false ? (
            <button className='btn-follow' onClick={handleFollow}>
              <img src={addFriend} alt='follow' className='icon-follow' />
              {t('follow')}
            </button>
          ) : (
            <div className='isfollow'>
              <button className='btn-message' onClick={handleChat}>{t('message')}</button>
              <button className='btn-following' onClick={() => setShowUnfollow(true)}>{t('following')}</button>
            </div>
          )
        }
      </div>
      {showUnfollow && (
        <div className='overlay' onClick={handleCancelShowUnfollow}>
          <motion.div
            className='item-explore-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <UnfollowUser onCancel={handleCancelShowUnfollow} user={user} setIsRender={setIsRender} isRender={isRender} setIsFollow={setIsFollow} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CardUser;