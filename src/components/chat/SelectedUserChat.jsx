/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { getUserByName } from '@/api/authApi/auth';
import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './SelectedUserChat.scss';

const SelectedUserChat = ({ onCancel, setCurrentChat }) => {

  const { t } = useTranslation('messages');

  const [input, setInput] = useState('');
  const [result, setResult] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserName = input;
        if (UserName !== '') {
          const user = await getUserByName(UserName);
          setResult({
            id: user.id,
            username: user.userName,
            fullname: user.profile.fullName,
            avatarUrl: user.profile.avatarUrl,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [input]);

  const handleDelete = () => {
    setResult(undefined);
    setInput('');
    setSelectedUser(undefined);
  }

  const handleChat = () => {
    setCurrentChat(selectedUser);
  };

  return (

    <div className='selectedChat-container'>
      <div className='header-selected'>
        <div></div>
        <div>
          <p><b>{t('newMessage')}</b></p>
        </div>
        <div className='img-icon'>
          <img src={exit} alt='exit' onClick={onCancel} />
        </div>
      </div>
      <div className='input-search'>
        <p><b>{t('to')}</b></p>
        {
          selectedUser === undefined ? (
            <input
              type='text'
              placeholder={t('search')}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <div className='se'>
              <div className='input-result'>
                <p>{result.username}</p>
              </div>
              <div className='dt' onClick={handleDelete}>
                <img src={exit} alt='delete' />
              </div>
            </div>
          )
        }
      </div>
      <div className='result-search'>
        {
          result && (
            <div className='info' key={result.id}>
              <div className='user'>
                <div className='avatar'>
                  <img src={result.avatarUrl !== ('string' && '') ? result.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p><b>{result.fullname}</b></p>
                  <p className='username'>{result.username}</p>
                </div>
              </div>

              <div className='item-selected' onClick={() => selectedUser !== undefined ? setSelectedUser(undefined) : setSelectedUser(result)}>
                <div className={selectedUser !== undefined ? 'selected' : ''}></div>
              </div>
            </div>
          )
        }
      </div>
      <div className='bottom-search'>
        <button
          className={selectedUser !== undefined ? 'chat' : 'NotChat'}
          onClick={handleChat}
        >{t('chat')}</button>
      </div>
    </div>
  )
}

export default SelectedUserChat;