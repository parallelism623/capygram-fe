/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Note from '@/pages/profile/Note';

import down from '@/assets/images/down.png';
import edit from '@/assets/images/edit.png';
import mess from '@/assets/images/mess.png';

import './Contacts.scss';

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const { t } = useTranslation('messages');

  const note = useSelector((state) => state.form.note);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact, index);
  }

  const handleCancel = () => {
    setShowNoteForm(false);
  };
  return (
    <>
      {currentUser && (
        <div className='body-contacts'>
          <div className='contacts-container'>
            <div className='current-user'>
              <div className='top-current-user'>
                <div className='current-name'>
                  <p><b>{currentUser.fullname}</b></p>
                  <img src={down} alt='down' />
                </div>
                <img src={edit} alt='editAccount' />
              </div>
              <div className='current-avatar'>
                <div className='avatar'>
                  <img src={currentUser.avatarUrl} alt='avatar' />
                  <p>{t('yourNote')}</p>
                </div>
                <div className='note'>
                  <div className='content-note' onClick={() => setShowNoteForm(true)}>{note.describe === '' ? t('note') : note.describe}</div>
                  <div className='cham-to'></div>
                </div>
              </div>
            </div>
            <div className='title'>
              <p className='p1'><b>{t('messages')}</b></p>
              <p className='p2'>{t('request')}</p>
              <img src={mess} alt='mess' />
            </div>
            <div className='contacts'>
              {contacts.map((contact, index) => {
                return (<div
                  className={`contact ${currentSelected === index ? 'selected' : ''}`}
                  key={index}
                  onClick={() => { changeCurrentChat(contact, index) }}
                >
                  <div className='contact-avatar'>
                    <img src={contact.avatarUrl} alt='avatar' />
                  </div>
                  <div className='contact-info'>
                    <p>{contact.fullname}</p>
                  </div>
                </div>
                )
              })}
            </div>
          </div>

          {showNoteForm && (
            <div className='overlay' onClick={handleCancel}>
              <motion.div
                className='note-container'
                onClick={(e) => e.stopPropagation()}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Note onCancel={handleCancel} />
              </motion.div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Contacts;