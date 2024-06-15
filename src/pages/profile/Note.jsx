/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";

import exit from '@/assets/images/exit.png';
import avataxinh from '@/assets/images/avataxinh.jpg';
import icon from '@/assets/images/icon.png';
import people from '@/assets/images/people.png';

import './Note.scss';

const Note = ({ onCancel }) => {
  const [note, setNote] = useState('');

  const handleChange = (e) => {
    setNote(e.target.value);
  }

  const { t } = useTranslation('note_profile');
  return (
    <div className='note-form'>
      <div className='body-note'>
        <div className='top-note'>
          <img src={exit} alt='exit' onClick={onCancel} />
          <p className='newNote'><b>{t('newNote')}</b></p>
          <p className={(note.trim() !== '') ? 'share' : 'notShare'}>{t('share')}</p>
        </div>

        <div className='center-note'>
          <img src={avataxinh} alt='avata' className='avata' />
          <input className='note-input' placeholder={t('shareContent')} value={note} onChange={handleChange} />
          <div className='cham-to'></div>
          <div className='cham-nho'></div>
          <img src={icon} alt='icon' className='icon' />
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