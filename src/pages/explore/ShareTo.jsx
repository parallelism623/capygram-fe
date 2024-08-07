/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";

import { getUserByName } from '@/api/authApi/auth';
import { getFollowing } from '@/api/authApi/graph';
import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './ShareTo.scss';

const ShareTo = ({ onCancel }) => {
  const { t } = useTranslation('explore');
  const [suggestedUser, setSuggestedUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const fakeSuggestedUser = async () => {
      const Id = localStorage.getItem('userId');
      const listFollowing = await getFollowing(Id);
      // console.log("listfollowing", listFollowing);

      const listUser = listFollowing.map((user) => ({
        id: user.id,
        fullname: user.fullName,
        username: user.userName,
        avatarUrl: user.avatarUrl,
      }));

      setSuggestedUser(listUser);
    };

    fakeSuggestedUser();
    
  }, []);

  useEffect(() => {
    const filterUser = async () => {
      const UserName = input;
      const user = await getUserByName(UserName);
      
      if(user){
        setResult({
          id: user.id,
          fullname: user.profile.fullName,
          username: user.userName,
          avatarUrl: user.profile.avatarUrl,
        });
      } else {
        setResult(undefined);
      }

    };

    filterUser();
  }, [input]);

  const handleSelected = (user) => {
    const check = selectedUser.find(item => item.id === user.id);
    if (check) {
      setSelectedUser(selectedUser.filter(item => item.id !== user.id));
    } else {
      setSelectedUser([...selectedUser, user]);
    }
  };

  const handleSend = () => {
    onCancel();
  };

  const handleDeleteSelect = (user) => {
    setSelectedUser(selectedUser.filter(item => item.id !== user.id));
  };
  
  return (
    <div className='shareTo-container'>
      <div className='top-shareTo'>
        <div></div>
        <div><p><b>{t('share')}</b></p></div>
        <div>
          <img src={exit} alt='exit' onClick={onCancel} />
        </div>
      </div>
      <div className='to-shareTo'>
        <span className='to'>
          <p><b>{t('to')}</b></p>
          {
            selectedUser.length > 0 &&
            selectedUser.map((user, index) => (
              <span key={index} className='span-item'>
                <p>{user.fullname}</p>
                <img src={exit} alt='delete' onClick={() => handleDeleteSelect(user)}/>
              </span>
            ))
          }
        </span>
        <input type='text' placeholder={t('search')} onChange={(e) => setInput(e.target.value)}/>
      </div>
      <div className='suggested-user'>
        <p><b>{t('suggested')}</b></p>
        <div className='suggest'>
          {
            result === undefined ? suggestedUser.map((user) => (
              <div className='user' key={user.id}>
                <div className='info-user-suggest'>
                  <img src={user.avatarUrl !== ('string' && '') ? user.avatarUrl : account} alt='avata' />
                  <div className='name'>
                    <p><b>{user.fullname}</b></p>
                    <p className='username'>{user.username}</p>
                  </div>
                </div>
                <div className='btn-select'
                  onClick={() => handleSelected(user)}
                >
                  <div className={selectedUser.includes(user) ? 'selected' : ''}></div>
                </div>
              </div>
            ))
              : (
                <div className='user' key={result.id}>
                  <div className='info-user-suggest'>
                    <img src={result.avatarUrl !== ('string' && '') ? result.avatarUrl : account} alt='avata' />
                    <div className='name'>
                      <p><b>{result.fullname}</b></p>
                      <p className='username'>{result.username}</p>
                    </div>
                  </div>
                  <div className='btn-select'
                    onClick={() => handleSelected(result)}
                  >
                    <div className={selectedUser.includes(result) ? 'selected' : ''}></div>
                  </div>
                </div>
              )
          }
        </div>
      </div>

      <div className='btn-send'>
        <button
          className={`button ${selectedUser.length > 0 ? 'send' : ''}`}
          onClick={handleSend}
        >
          {t('send')}
        </button>
      </div>
    </div>
  )
}

export default ShareTo