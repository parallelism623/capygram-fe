/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

import { setPost, setStep } from '@/store/formSlice';

import muiTen from '@/assets/images/muiTen.png';
import avataxinh from '@/assets/images/avataxinh.jpg';
import icon from '@/assets/images/icon.png';
import map from '@/assets/images/map.png';

import './Step2.scss';

const Step2 = () => {
  const [describe, setDescribe] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { t } = useTranslation('createPost');
  const dispatch = useDispatch();
  const post = useSelector((state) => state.form.post);

  const inputRef = React.createRef();
  const handleChange = (e) => {
    setDescribe(e.target.value);
    dispatch(setPost({ description: describe })); //bất đồng bộ
  };

  const handleShare = () => {
    dispatch(setStep(3));
    console.log(post);
    dispatch(setPost({ imageOrVideo: '', description: '' }));
  };


  const addEmoji = (event, emojiObject) => {
    const emoji = event.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;
    const start = describe.substring(0, selectionStart);
    const end = describe.substring(selectionEnd, describe.length);
    const newDescribe = start + emoji + end;
    setDescribe(newDescribe);
    dispatch(setPost({ description: newDescribe }));
    // const newDescribe = describe + emoji;
    // setDescribe(newDescribe);
    // dispatch(setPost({ description: newDescribe }));
  };

  return (
    <div className='body-step2'>
      <div className='step2'>
        <div className='top-tep2-create-post'>
          <img src={muiTen} alt='back' onClick={() => dispatch(setStep(1))} />
          <p className='p1'>{t('createPost')}</p>
          <p className='p2' onClick={handleShare}>{t('share')}</p>
        </div>
        <div className='content-step2'>
          <div className='left-content-step2'>
            <div className='account'>
              <img src={avataxinh} alt='avata' />
              <p className='name'><b>hanglazy4</b></p>
            </div>
            <textarea ref={inputRef} typeof='text' name='describe' value={describe} placeholder={t('about')} className='input' onChange={handleChange} />
            <div className='gr-icon'>
              <img src={icon} alt='icon' onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
              {
                showEmojiPicker && (
                  <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
                )
              }
            </div>
            <div className='bonus'>
              <div className='gr'>
                <p>{t('location')}</p>
                <img src={map} alt='map' />

              </div>
            </div>
          </div>
          <div className='right-content-step2'>
            <img src={post.imageOrVideo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2;