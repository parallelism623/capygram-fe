/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useDispatch } from 'react-redux';

import { updateAvatar } from '@/store/userSlice';

import './ChangePhoto.scss';

const ChangePhoto = ({ onCancel, handleRemovePhoto, setNewAvatar }) => {
  const { t } = useTranslation('changePhoto_profile');

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const fileToUpload = e.target.files[0];
    if (!fileToUpload) return;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64 = fileReader.result;
      setNewAvatar(base64);
    };
    fileReader.readAsDataURL(fileToUpload);
    
    dispatch(updateAvatar({ fileToUpload, userId: localStorage.getItem('userId') }));
    onCancel();
  };


  return (
    <div className='body-change-photo'>
      <div className='form-change-photo'>
        <p className='p1'>{t('p1')}</p>
        <label className='p2'>
          <b>{t('p2')}</b>
          <input type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
        <p className='p3' onClick={handleRemovePhoto}><b>{t('p3')}</b></p>
        <p className='p4' onClick={onCancel}>{t('p4')}</p>
      </div>
    </div>
  )
}

export default ChangePhoto;