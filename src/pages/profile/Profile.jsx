/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '@/store/formSlice';

import setting from '@/assets/images/setting.png';
import Add from '@/assets/images/Add.png';
import postIcon from '@/assets/images/post.png';
import saved from '@/assets/images/saved.png';
import tagged from '@/assets/images/tagged.png';
import account from '@/assets/images/account.png';

import LayoutFooter from '@/layouts/LayoutFooter';
import Note from './Note';
import Setting from './Setting';
import HotStory from './HotStory';
import ListPost from '../post/listPost/ListPost';
import { getUserById } from '@/api/authApi/auth';
import { getCountFollower, getCountFollowing } from '@/api/authApi/graph';

import './Profile.scss';
import { getPostByUserId } from '@/api/authApi/post';
import { setUser } from '@/store/userSlice';
import ListFollowerUser from './ListFollowerUser';
import ListFollowingUser from './ListFollowingUser';

const Profile = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showFormHotStory, setShowFormHotStory] = useState(false);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [post, setPost] = useState(0);
  const [showListFollower, setShowListFollower] = useState(false);
  const [showListFollowing, setShowListFollowing] = useState(false);

  const note = useSelector((state) => state.form.note);
  const hotStory = useSelector((state) => state.form.hotStory);
  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      const me = await getUserById(userId);
      dispatch(setUser({
        id: me.id,
        email: me.email,
        fullname: me.profile.fullName,
        username: me.userName,
        avatarUrl: me.profile.avatarUrl
      }));

      const follower = await getCountFollower(localStorage.getItem('userId'));
      setFollower(follower);
      const following = await getCountFollowing(localStorage.getItem('userId'));
      setFollowing(following);

      const posts = await getPostByUserId(localStorage.getItem('userId'));
      setPost(posts.length);
    };

    fetchUser();
  }, [dispatch]);

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

  const handleShowHostStory = () => {
    setShowFormHotStory(true);
    dispatch(setStep(1));
  };


  const handleCancelListFollower = () => {
    setShowListFollower(false);
  };

  const handleCancelListFollowing = () => {
    setShowListFollowing(false);
  };

  return (

    <div className='body-profile'>
      <div className='content-top'>
        <div className='group-avata'>
          <div className='avata'>
            <img src={(me.avatarUrl === 'string' || me.avatarUrl === '') ? account : me.avatarUrl} alt='avata' />
            <div className='note'>
              <div className='content-note' onClick={() => setShowNoteForm(true)}>{note.describe === '' ? t('note') : note.describe}</div>
              <div className='cham-to'></div>
              <div className='cham-nho'></div>
            </div>
          </div>

          <div className='other-name'><b>{me.username}</b></div>

          <div className='hot-story'>
            {(hotStory.name !== '' && hotStory.coverPhoto !== '') && (
              <div className='story'>
                <div className='image'>
                  <img src={hotStory.coverPhoto} alt='hotStory' />
                </div>
                <p>{hotStory.name}</p>
              </div>
            )}
            <div className='add-post' onClick={handleShowHostStory}>
              <img src={Add} alt='add' />
              <p>{t('new')}</p>
            </div>
          </div>
        </div>

        <div className='right'>
          <div className='action'>
            <p className='name'><b>{me.fullname}</b></p>
            <div className='group-btn'>
              <button className='btn-action' onClick={handleEditProfile}><b>{t('editProfile')}</b></button>
              <button className='btn-action ' onClick={() => navigate('/archive-profile')}><b>{t('viewArchive')}</b></button>
              <img src={setting} alt='setting' onClick={() => setShowSetting(true)} />
            </div>
          </div>

          <div className='data'>
            <p><b>{post}</b> {t('posts')}</p>
            <p onClick={() => setShowListFollower(true)}><b>{follower}</b> {t('followers')}</p>
            <p onClick={() => setShowListFollowing(true)}><b>{following}</b> {t('following')}</p>
          </div>

        </div>
      </div>

      <div className='content-bottom'>
        <div className='menu-profile'>
          <div className={`menu-item ${activeItem === 'post' ? 'active' : ''}`} onClick={() => handleClick('post')}>
            <img src={postIcon} alt='post' />
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

        <div className='list-post'>
          {activeItem === 'post' && (
            <ListPost />
          )
          }
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
            <HotStory onCancel={handleCancelHotStory} />
          </motion.div>
        </div>
      )}
      {
        showListFollower && (
          <div className='overlay' onClick={handleCancelListFollower}>
            <motion.div
              className='option-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ListFollowerUser onCancel={handleCancelListFollower} Id={localStorage.getItem('userId')} />
            </motion.div>
          </div>
        )
      }

      {
        showListFollowing && (
          <div className='overlay' onClick={handleCancelListFollowing}>
            <motion.div
              className='option-container'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ListFollowingUser onCancel={handleCancelListFollowing} Id={localStorage.getItem('userId')} />
            </motion.div>
          </div>
        )
      }


      <LayoutFooter />
    </div>

  )
}

export default Profile;