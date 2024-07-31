/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import EmojiPicker from 'emoji-picker-react';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';

import { updatePost } from '@/api/authApi/post';

import icon from '@/assets/images/icon.png';
import map from '@/assets/images/map.png';

import './EditPost.scss';

const EditPost = ({ postEdit, onCancel, setIscall, onCancelItem, onCancelMore }) => {
  const [describe, setDescribe] = useState(postEdit.content);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { t } = useTranslation('postItem');
  const inputRef = React.createRef();

  const user = useSelector(state => state.form.user);

  const handleChange = (e) => {
    setDescribe(e.target.value);
  };

  const handleEdit = async () => {

    try {
      const userEdit = {
        userName: user.username,
        userId: user.id,
      };
      const postToEdit = {
        id: postEdit.id,
        imageUrls: postEdit.imageUrls,
        likes: postEdit.likes,
        content: describe,
      };

      await updatePost(postToEdit, userEdit);

      setIscall(true);
      onCancel();
      onCancelMore();
      onCancelItem();
    } catch (error) {
      console.log(error);
    }

  };


  const addEmoji = (event, emojiObject) => {
    const emoji = event.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;
    const start = describe.substring(0, selectionStart);
    const end = describe.substring(selectionEnd, describe.length);
    const newDescribe = start + emoji + end;
    inputRef.current.focus();
    setDescribe(newDescribe);
  };

  const handleCancel = () => {
    onCancel();
    onCancelMore();
  };

  return (
    <div className='body-step2'>
      <div className='step2'>
        <div className='top-tep2-create-post'>
          <p onClick={handleCancel}>{t('Cancel')}</p>
          <p className='p1'><b>{t('editInfo')}</b></p>
          <p className='p2' onClick={handleEdit}>{t('done')}</p>
        </div>
        <div className='content-step2'>
          <div className='left-content-step2'>
            <div className='account'>
              <img src={user.avatarUrl} alt='avata' />
              <p className='name'><b>{user.username}</b></p>
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
            <Carousel arrows infinite={false} >
              {
                postEdit.imageUrls.map((item, index) => (
                  <div key={index} className='gr-img'>
                    <img src={item} alt='image' />
                  </div>
                ))
              }
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost;