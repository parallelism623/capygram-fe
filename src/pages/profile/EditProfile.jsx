/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import avataxinh from '@/assets/images/avataxinh.jpg';
import LayoutFooter from '@/layouts/LayoutFooter';

import './EditProfile.scss';

const EditProfile = () => {
  const { t } = useTranslation('edit_profile');
  const [toogle, setToogle] = useState('ON');

  const handleToogle = () => {
    setToogle(toogle === 'ON' ? 'OFF' : 'ON');
  };

  const [profile, setProfile] = useState({
    avata: '',
    website: '',
    bio: '',
    sex: '',
    isShow: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };

  return (
    <div className='body-edit-profile'>
      <div className='edit-profile'>
        <p className='title'><b>{t('title')}</b> </p>

        <div className='group-profile'>
          <img src={avataxinh} alt='avata' />
          <div className='name'>
            <p className='p1'><b>hanglazy4</b></p>
            <p className='p2'>Hanglazy</p>
          </div>
          <button className='edit-avata'><b>{t('btn1')}</b></button>
        </div>

        <div className='group-1'>
          <p className='title-group'><b>{t('web')}</b></p>
          <input placeholder={t('web')} value={profile.website} onChange={handleChange}/>
        </div>

        <div className='group-1'>
          <p className='title-group'><b>{t('story')}</b></p>
          <input placeholder={t('story')} value={profile.bio} onChange={handleChange}/>
        </div>

        <div className='group-2'>
          <p className='title-group'><b>{t('sex')}</b></p>
          <select value={profile.sex} onChange={handleChange}>
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
              <button className={toogle === 'ON' ? 'ON' : 'OFF'} onClick={handleToogle}>
                <div className='circle'></div>
              </button>
            </div>
          </div>
        </div>

        <button className='btn-submit' onClick={handleSubmit}>{t('submit')}</button>
      </div>

      <LayoutFooter />
    </div>
  )
}

export default EditProfile;