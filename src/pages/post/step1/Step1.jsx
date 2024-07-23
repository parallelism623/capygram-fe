/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useDispatch } from 'react-redux';
import { Carousel } from 'antd';

import { setPost, setStep } from '@/store/formSlice';

import uploadImage from '@/assets/images/uploadImage.png';
import uploadVideo from '@/assets/images/uploadVideo.png';
import muiTen from '@/assets/images/muiTen.png';
import images from '@/assets/images/images.png';
import exit from '@/assets/images/exit.png';

import './Step1.scss';

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ data: reader.result, type: file.type.startsWith('video/') ? 'video' : 'image' });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const Step1 = () => {
  const { t } = useTranslation('createPost');
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = [];

    try {
      for (const file of selectedFiles) {
        const fileData = await readFileAsync(file);
        newFiles.push(fileData);
      }

      dispatch(setPost({ media: [...files, ...newFiles] }));
      setFiles((prev) => [...prev, ...newFiles]);

      console.log(newFiles);
      console.log(files);

    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBack = () => {
    dispatch(setPost({ media: [] }));
    setFiles([]);
  };

  const handleClickNext = () => {
    dispatch(setStep(2));
  };


  const handleDeleteItem = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    dispatch(setPost({ media: newFiles }));
  }

  return (
    <div className='body-step1'>
      <div className='step1'>
        {files.length === 0 && (
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
                      <input type='file' accept='image/*, video/*' style={{ display: 'none' }} onChange={handleFileChange} multiple />
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {
          files.length > 0 && (
            <>
              <div className='top2-show-image'>
                <img src={muiTen} alt='back' onClick={handleClickBack} />
                <p className='p1'>{t('crop')}</p>
                <p className='p2' onClick={handleClickNext}>{t('next')}</p>
              </div>
              <div className='show-image'>
                <Carousel arrows infinite={false} >
                  {
                    files.map((file, index) => (
                      <div key={index} className='file-preview'>
                        {
                          file.type === 'image' ? (
                            <img src={file.data} alt='image' />
                          ) : (
                            <video controls src={file.data} alt='video' />
                          )
                        }
                      </div>
                    ))
                  }
                </Carousel>
              </div>
              <div className={isAdd ? '' : "bottom-step1"}>
                <div className={isAdd ? '' : "group-add-file"}>
                  <img src={images} alt='addFiles' onClick={() => setIsAdd(true)} />
                </div>
              </div>

              {
                isAdd && files.length > 0 && (
                  <div className='list-imagesOrVideo'>
                    {
                      files.map((file, index) => (
                        <div key={index} className='file-preview2'>
                          {
                            file.type === 'image' ? (
                              <div className='preview-item'>
                                <img src={file.data} alt='image' className='item' />
                                <div className='gr-exit'>
                                  <img src={exit} alt='exit' className='exit' onClick={() => handleDeleteItem(index)}/>
                                </div>
                              </div>
                            ) : (
                              <div className='preview-item'>
                                <video controls src={file.data} alt='video' className='item' />
                                  <div className='gr-exit'>
                                    <img src={exit} alt='exit' className='exit' onClick={() => handleDeleteItem(index)} />
                                  </div>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                    <label>
                      <input type='file' accept='image/*, video/*' style={{ display: 'none' }} onChange={handleFileChange} multiple />
                      <img src={images} alt='add' className='add-item' />
                    </label>
                  </div>
                )
              }
            </>

          )
        }
      </div>
    </div>
  )
}

export default Step1;
