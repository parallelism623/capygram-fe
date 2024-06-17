/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import '@/i18n';

import { setProfile } from '@/store/formSlice';

import './ChangePhoto.scss';

const ChangePhoto = ({onCancel}) => {
  const { t } = useTranslation('changePhoto_profile');

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setProfile({ avata: reader.result }));
      onCancel();
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    console.log(reader.result);
  };


  return (
    <div className='body-change-photo'>
      <div className='form-change-photo'>
        <p className='p1'>{t('p1')}</p>
        <label className='p2'>
          <b>{t('p2')}</b>
          <input type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
        <p className='p3'><b>{t('p3')}</b></p>
        <p className='p4' onClick={onCancel}>{t('p4')}</p>
      </div>
    </div>
  )
}

export default ChangePhoto;