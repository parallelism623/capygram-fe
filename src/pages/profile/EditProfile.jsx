/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import LayoutFooter from '@/layouts/LayoutFooter';
import account from '@/assets/images/account.png';

import './EditProfile.scss';
import ChangePhoto from './changePhoto';
import { setProfile } from '@/store/formSlice';

const EditProfile = () => {
  const { t } = useTranslation('edit_profile');
  const [toogle, setToogle] = useState('ON');
  const [avata, setAvata] = useState(true);
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.form.profile);
  const user = useSelector((state) => state.form.user);

  const handleRemovePhoto = () => {
    setAvata(false);
    dispatch(setProfile({ avata: '' }));
  };

  const handleToogle = () => {
    setToogle(toogle === 'ON' ? 'OFF' : 'ON');
    dispatch(setProfile({ isShow: toogle === 'ON' ? false : true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProfile({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setProfile(profile));
    console.log(profile);
  };

  const handleCancel = () => {
    setShowChangePhoto(false);
  }
  return (
    <div className='body-edit-profile'>
      <div className='edit-profile'>
        <p className='title'><b>{t('title')}</b> </p>

        <div className='group-profile'>
          {(profile.avata !== '') ? (<img src={profile.avata} alt='avata' />) : (<img src={account} alt='avata' />)}
          <div className='name'>
            <p className='p1'><b>{user.fullname !== '' ? user.fullname : 'Hanglazy'}</b></p>
            <p className='p2'>{user.username !== '' ? user.username : 'Hangcute'}</p>
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
            <ChangePhoto onCancel={handleCancel} />
          </motion.div>
        </div>
      )}
      <LayoutFooter />
    </div>
  )
}

export default EditProfile;