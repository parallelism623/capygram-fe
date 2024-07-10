/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useDispatch } from 'react-redux';

import { setPost, setStep } from '@/store/formSlice';

import uploadImage from '@/assets/images/uploadImage.png';
import uploadVideo from '@/assets/images/uploadVideo.png';
import muiTen from '@/assets/images/muiTen.png';

import './Step1.scss';

const Step1 = () => {
  const { t } = useTranslation('createPost');
  const dispatch = useDispatch();

  const [imageOrVideo, setImageOrVideo] = useState('');
  const [fileType, setFileType] = useState(''); // [image, video]

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const fileType = file.type.startsWith('video/') ? 'video' : 'image';

    reader.onloadend = () => {
      dispatch(setPost({ imageOrVideo: reader.result }));
      dispatch(setPost({ fileType }));
      setImageOrVideo(reader.result);
      setFileType(fileType);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  };

  const handleClickBack = () => {
    dispatch(setPost({ imageOrVideo: '' }));
    setImageOrVideo('');
  };

  const handleClickNext = () => {
    dispatch(setStep(2));
  };

  return (
    <div className='body-step1'>
      <div className='step1'>
        {imageOrVideo === '' && (
          <>
            <div className='top-step1'>
              <p><b>{t('createPost')}</b></p>
            </div>
            <div className='bettwen-step1'>
              <div className='group-drop'>
                <div className='gr-image'>
                  <img src={uploadImage} alt='uploadImage' className='img1' />
                  <img src={uploadVideo} alt='uploadVideo' className='img2' />
                </div>
                <p>{t('drag')}</p>
                <div className='btn-select-image'>
                  <button className='btn-select'>
                    <label>
                      {t('select')}
                      <input type='file' accept='image/*, video/*' style={{ display: 'none' }} onChange={handleFileChange} />
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {
          imageOrVideo !== '' && (
            <>
              <div className='top2-show-image'>
                <img src={muiTen} alt='back' onClick={handleClickBack} />
                <p className='p1'>{t('crop')}</p>
                <p className='p2' onClick={handleClickNext}>{t('next')}</p>
              </div>
              <div className='show-image'>
                {
                  fileType === 'image' ? (
                    <img src={imageOrVideo} alt='image' />
                  ) : (
                    <video controls src={imageOrVideo} alt='video' />
                  )
                }
              </div>
            </>

          )
        }
      </div>
    </div>
  )
}

export default Step1;
