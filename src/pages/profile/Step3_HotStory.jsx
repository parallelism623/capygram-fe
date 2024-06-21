/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useDispatch, useSelector } from 'react-redux';

import muiTen from '@/assets/images/muiTen.png';
import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './Step3_HotStory.scss';
import { prevStep, setHotStory, setStep } from '@/store/formSlice';

const Step3_HotStory = ({ onCancel }) => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const hotStory = useSelector((state) => state.form.hotStory);
  const step = useSelector((state) => state.form.step);

  const { t } = useTranslation('hotStory');

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setHotStory({ coverPhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = () => {
    if (image !== '') {
      console.log(hotStory);
      dispatch(setStep(0));
      onCancel();
    }
  };

  return (
    <>
      {step === 3 && (
        <div className='form-step3'>
          <div className='top-form'>
            <img src={muiTen} alt='back' onClick={() => dispatch(prevStep())} />
            <p>{t('ChoosePhoto')}</p>
            <img src={exit} alt='cancel' onClick={onCancel} />
          </div>
          <div className='content-form'>
            <div className='group-photo'>
              {(image !== '') ? (
                <img src={image} alt='photo' />
              ) : (
                <img src={account} alt='photo' />
              )}
            </div>

            <div className='btn-photo'>
              <button className='btn-choose-photo'>
                <label>
                  {t('ChoosePhoto')}
                  <input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleChangePhoto} />
                </label>
              </button>
            </div>
          </div>

          <div className='bottom-form'>
            <p className={image !== '' ? 'finished' : ''} onClick={handleSubmit}>{t('finish')}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Step3_HotStory