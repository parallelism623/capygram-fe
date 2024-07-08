/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';

import exit from '@/assets/images/exit.png';
import checked from '@/assets/images/checked.png';

import './SwitchAccount.scss';

const SwitchAccount = ({ onCancel, currentUser }) => {
  const { t } = useTranslation('messages');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/ft/login');
    onCancel();
  };
  return (
    <div className='body-switch'>
      <div className='switch-account'>
        <div className='top-switch'>
          <div></div>
          <p><b>{t('SwitchAccount')}</b></p>
          <img src={exit} alt='exit' onClick={onCancel} />
        </div>
        <div className='center-switch'>
          <div className='switch-item'>
            <div className='current-User'>
              <div className='avatar'>
                <img src={currentUser.avatarUrl} alt='avatar' />
              </div>
              <div className='fullname'>
                <p><b>{currentUser.fullname}</b></p>
              </div>
            </div>
            <img src={checked} alt='checked' />
          </div>
        </div>
        <div className='bottom-switch' onClick={handleNavigate}>
          <p>{t('logInto')}</p>
        </div>
      </div>
    </div>
  )
}

export default SwitchAccount