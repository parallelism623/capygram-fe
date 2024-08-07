/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { getFollowers } from '@/api/authApi/graph';

import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './ListFollowerUser.scss';

const ListFollowerUser = ({ Id, onCancel }) => {
  const { t } = useTranslation('listFollow');

  const [isRender, setIsRender] = useState(false);
  const [listFollowers, setListFollowers] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followers = await getFollowers(Id);
        const followerOfMe = await getFollowers(localStorage.getItem('userId'));

        console.log("followers", followers);
        const listFollowers = followers.map((follower) => ({
          id: follower.id,
          fullname: follower.profile.fullName,
          username: follower.userName,
          avatarUrl: follower.profile.avatarUrl,
          isFollow: followerOfMe.some((item) => item.id === follower.id)
        }));

        setListFollowers(listFollowers);

      } catch (error) {
        console.log(error);
      }
    };

    getFollowers();
  }, [isRender]);

  return (
    <div className='list-follower-container'>
      <div className='top-list'>
        <div></div>
        <div className='item-top'>
          <p><b>{t('followers')}</b></p>
        </div>
        <div className='icon-top'>
          <img src={exit} alt='exit' onClick={onCancel} />
        </div>
      </div>
      <div className='box-search'>
        <input type='text' placeholder={t('search')} />
      </div>
      <div className='list-follower'>
        {
          result.length === 0 ? listFollowers.map((follower) => (
            <div className='followr-user' key={follower.id}>
              <div className='user-info'>
                <div className='avatar'>
                  <img src={follower.avatarUrl !== ('string' && '') ? follower.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p className='fullname'><b>{follower.fullname}</b></p>
                  <p className='username'>{follower.username}</p>
                </div>
              </div>

              <div className='btn-status'>
                <button>{follower.isFollow}</button>
              </div>
            </div>
          )) : result.map((follower) => (
            <div className='followr-user' key={follower.id}>
              <div className='user-info'>
                <div className='avatar'>
                  <img src={follower.avatarUrl !== ('string' && '') ? follower.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p className='fullname'><b>{follower.fullname}</b></p>
                  <p className='username'>{follower.username}</p>
                </div>
              </div>

              <div className='btn-status'>
                <button>{follower.isFollow}</button>
              </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default ListFollowerUser;