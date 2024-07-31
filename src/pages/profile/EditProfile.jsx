/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile, setUser } from '@/store/formSlice';
import ChangePhoto from './changePhoto';

import { editProfile, getUserById } from '@/api/authApi/auth';
import LayoutFooter from '@/layouts/LayoutFooter';
import account from '@/assets/images/account.png';

import './EditProfile.scss';

const EditProfile = () => {
  const { t } = useTranslation('edit_profile');
  const [toogle, setToogle] = useState('ON');
  const [avata, setAvata] = useState(true);
  const [showChangePhoto, setShowChangePhoto] = useState(false);
  const [newAvatar, setNewAvatar] = useState('');
  
  const me = useSelector((state) => state.form.user);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.form.profile);

  const navigate = useNavigate();

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
    };

    fetchUser();
  }, [dispatch]);

  const handleRemovePhoto = () => {
    setAvata(false);
    dispatch(setProfile({ avata: '' }));
    handleCancel();
    setNewAvatar('');
  };

  const handleToogle = () => {
    setToogle(toogle === 'ON' ? 'OFF' : 'ON');
    dispatch(setProfile({ isShow: toogle === 'ON' ? false : true }));
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    dispatch(setProfile({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(profile, localStorage.getItem('userId'));
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowChangePhoto(false);
  }
  return (
    <div className='body-edit-profile'>
      <div className='edit-profile'>
        <p className='title'><b>{t('title')}</b> </p>

        <div className='group-profile'>
          {newAvatar !== '' ? <img src={newAvatar} /> : (me.avatarUrl !== ('string' && "")) ? (<img src={me.avatarUrl} alt='avata' />) : (<img src={account} alt='avata' />)}
          <div className='name'>
            <p className='p1'><b>{me.fullname !== '' ? me.fullname : 'Hanglazy'}</b></p>
            <p className='p2'>{me.username !== '' ? me.username : 'Hangcute'}</p>
          </div>
          <button className='edit-avata' onClick={() => setShowChangePhoto(true)}><b>{t('btn1')}</b></button>
        </div>

        <div className='group-1'>
          <p className='title-group'><b>{t('web')}</b></p>
          <input placeholder={t('web')} value={profile.website} onChange={handleChange} name='website' />
        </div>

        <div className='group-1'>
          <p className='title-group'><b>{t('story')}</b></p>
          <input placeholder={t('story')} value={profile.bio} onChange={handleChange} name='bio' />
        </div>

        <div className='group-2'>
          <p className='title-group'><b>{t('sex')}</b></p>
          <select value={profile.sex} onChange={handleChange} name='sex'>
            <option value='male'>{t('male')}</option>
            <option value='female'>{t('female')}</option>
            <option value='other'>{t('other')}</option>
          </select>
        </div>

        <div className='group-3'>
          <p className='title-3'><b>{t('display')}</b></p>
          <div className='div-toogle'>
            <p>{t('display')}</p>
            <div className='toogle'>
              <button className={toogle === 'ON' ? 'ON' : 'OFF'} onClick={handleToogle} value={toogle === 'ON' ? true : false} name='isShow' onChange={handleChange}>
                <div className='circle'></div>
              </button>
            </div>
          </div>
        </div>

        <button className='btn-submit' onClick={handleSubmit}>{t('submit')}</button>
      </div>

      {showChangePhoto && (
        <div className='overlay' onClick={handleCancel}>
          <motion.div
            className='change-photo-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <ChangePhoto
              onCancel={handleCancel}
              handleRemovePhoto={handleRemovePhoto}
              setNewAvatar={setNewAvatar}
            />
          </motion.div>
        </div>
      )}
      <LayoutFooter />
    </div>
  )
}

export default EditProfile;