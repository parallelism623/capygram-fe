/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
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

  let deleteNoteTimeoutRef = useRef(null);

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
    setNoteCookie(note.describe);
    sendNoteToServer(note.describe);
    clearTimeout(deleteNoteTimeoutRef.current);
    deleteNoteTimeoutRef.current = setTimeout(() => {
      checkAndDeleteCookie();
    }, 24 * 60 * 60 * 1000);//sau 24h se xoa
    onCancel();
  };

  const handleUpdate = () => {
    setNoteCookie(newNote);
    sendNoteToServer(newNote);
    dispatch(setNote({ describe: newNote }));
    onCancel();
  };

  const handleDelete = () => {
    deleteNoteCookie();
    setNewNote("");
    dispatch(setNote({ describe: "" }));
    sendNoteToServer("");
    onCancel();
  };
  //set note vao cookie voi thoi gian ton tai la 24h
  const setNoteCookie = (noteContent) => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); //time hien tai + 24h
    const expires = "expires=" + d.toUTCString();
    document.cookie = "note=" + noteContent + ";" + expires + ";path=/";
  };

  //Ham lay note tu cookie neu ton tai
  const getNoteCookie = () => {
    const name = "note=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  //ham xoa cookie
  const deleteNoteCookie = () => {
    document.cookie = "note=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  };

  //kiem tra va xoa cookie neu qua 24h
  const checkAndDeleteCookie = () => {
    const noteContent = getNoteCookie();
    if (noteContent !== "") {
      deleteNoteCookie();
      setNewNote("");
      dispatch(setNote({ describe: "" }));
      sendNoteToServer("");
    }
  };

  //chi chay mot lan sau khi render
  useEffect(() => {
    const noteContent = getNoteCookie();
    if (noteContent !== "") {
      setNewNote(noteContent);
      dispatch(setNote({ describe: noteContent }));
    }
  }, []);


  //gui note len server
  const sendNoteToServer = async (noteContent) => {
    try {
      ///api
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='note-form'>
      <div className='body-note'>
        <div className='top-note'>
          <img src={exit} alt='exit' onClick={onCancel} />
          <p className='newNote'><b>{t('newNote')}</b></p>
          {
            note.describe === '' ?
              (<p className={(note.trim !== '') ? 'share' : 'notShare'} onClick={handleShare}>{t('share')}</p>)
              :
              (<p className={(note.trim !== '') ? 'share' : 'notShare'} onClick={handleUpdate}>{t('update')}</p>)
          }
        </div>

        <div className='center-note'>
          <img src={avataxinh} alt='avata' className='avata' />
          <input className='note-input' placeholder={t('shareContent')} value={newNote} onChange={handleChange} />
          <div className='cham-to'></div>
          <div className='cham-nho'></div>
          <img src={icon} alt='icon' className='icon' onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          {
            showEmojiPicker && (
              <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
            )
          }
        </div>

        <div className='btn-delete'>
          <button onClick={handleDelete}>{t('delete')}</button>
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