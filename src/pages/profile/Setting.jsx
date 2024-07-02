/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '@/i18n';

import { logout } from '@/api/authApi/auth';

import './Setting.scss';

const Setting = ({onCancel}) => {
  const { t } = useTranslation('setting');

  const navigate = useNavigate();  

  const handleLogOut = async () => {
    await logout();
    //localstorage
    navigate('/ft/login');
  }

  return (
    <div className='form-setting'>
      <div className='div-p'><p>{t('p1')}</p></div>
      <div className='div-p'><p>{t('p2')}</p></div>
      <div className='div-p'><p>{t('p3')}</p></div>
      <div className='div-p'><p>{t('p4')}</p></div>
      <div className='div-p'><p>{t('p5')}</p></div>
      <div className='div-p'><p>{t('p6')}</p></div>
      <div className='div-p'><p>{t('p7')}</p></div>
      <div className='div-p' onClick={handleLogOut}><p>{t('p8')}</p></div>
      <div className='div-p' onClick={onCancel}><p>{t('p9')}</p></div>
    </div>
  )
}

export default Setting;