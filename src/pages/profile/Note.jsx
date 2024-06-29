/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";
import EmojiPicker from 'emoji-picker-react';

import exit from '@/assets/images/exit.png';
import avataxinh from '@/assets/images/avataxinh.jpg';
import icon from '@/assets/images/icon.png';
import people from '@/assets/images/people.png';
import { useDispatch, useSelector } from 'react-redux';

import './Note.scss';
import { setNote } from '@/store/formSlice';

const Note = ({ onCancel }) => {
  const [newNote, setNewNote] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { t } = useTranslation('note_profile');
  const dispatch = useDispatch();
  const note = useSelector((state) => state.form.note);

  const handleChange = (e) => {
    setNewNote(e.target.value);
    dispatch(setNote({ describe: newNote }));
  }

  const addEmoji = (event, emojiObject) => {
    const emoji = event.emoji;
    const Note = newNote + emoji;
    setNewNote(Note);
    dispatch(setNote({ describe: Note }));
  };

  const handleShare = () => {
    console.log(note);
  };

  return (
    <div className='note-form'>
      <div className='body-note'>
        <div className='top-note'>
          <img src={exit} alt='exit' onClick={onCancel} />
          <p className='newNote'><b>{t('newNote')}</b></p>
          <p className={(note.trim !== '') ? 'share' : 'notShare'} onClick={handleShare}>{t('share')}</p>
        </div>

        <div className='center-note'>
          <img src={avataxinh} alt='avata' className='avata' />
          <input className='note-input' placeholder={t('shareContent')} value={newNote} onChange={handleChange} />
          <div className='cham-to'></div>
          <div className='cham-nho'></div>
          <img src={icon} alt='icon' className='icon' onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
          {
            showEmojiPicker && (
              <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
            )
          }
        </div>

        <div className='bottom-note'>
          <img src={people} alt='people' className='people' />
          <p>{t('shareWith')}</p>
          <select className='select'>
            <option>{t('option1')}</option>
            <option>{t('option2')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Note;