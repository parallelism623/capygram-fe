/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { follow, getFollowers, getFollowing, unFollow } from '@/api/authApi/graph';

import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './ListFollowingUser.scss';

const ListFollowingUser = ({ Id, onCancel }) => {
  const { t } = useTranslation('listFollow');

  const [isRender, setIsRender] = useState(false);
  const [listFollowings, setListFollowings] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getListFollowings = async () => {
      try {
        const followings = await getFollowing(Id);
        const followingOfMe = await getFollowing(localStorage.getItem('userId'));

        const listFollowings = followings.map((following) => ({
          id: following.id,
          fullname: following.fullName,
          avatarUrl: following.avatarUrl,
          isFollow: followingOfMe.some((item) => item.id === following.id) ? true : false
        }));

        setListFollowings(listFollowings);

      } catch (error) {
        console.log(error);
      }
    };

    getListFollowings();
  }, [isRender, Id]);


  useEffect(() => {
    const searchUser = () => {
      const resultUser = listFollowings.filter((following) => {
        return following.fullname.toLowerCase().includes(input.toLowerCase());
      });
      setResult(resultUser);
    };

    searchUser();
  }, [input]);

  const handlclickbtn = async (following) => {
    const id = localStorage.getItem('userId');
    const did = following.id;
    if (following.isFollow === true) {
      await unFollow(id, did);
      following.isFollow = false;
      setIsRender(!isRender);
    } else {
      await follow(id, did);
      following.isFollow = true;
      setIsRender(!isRender);
    }
  }
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
        <input type='text' placeholder={t('search')} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className='list-follower'>
        {
          result.length === 0 ? listFollowings.map((following) => (
            <div className='followr-user' key={following.id}>
              <div className='user-info'>
                <div className='avatar'>
                  <img src={following.avatarUrl !== ('string' && '') ? following.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p className='fullname'><b>{following.fullname}</b></p>
                </div>
              </div>

              <div className='btn-status'>
                {
                  localStorage.getItem('userId') !== following.id && (
                    <button
                      className={following.isFollow === true ? 'following' : 'follow'}
                      onClick={() => handlclickbtn(following)}
                    >
                      <b>{following.isFollow === true ? t('following') : t('follow')}</b>
                    </button>
                  )
                }
              </div>
            </div>
          )) : result.map((following) => (
            <div className='followr-user' key={following.id}>
              <div className='user-info'>
                <div className='avatar'>
                  <img src={following.avatarUrl !== ('string' && '') ? following.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p className='fullname'><b>{following.fullname}</b></p>
                  <p className='username'>{following.username}</p>
                </div>
              </div>

              <div className='btn-status'>
                {
                  localStorage.getItem('userId') !== following.id && (
                    <button
                      className={following.isFollow === true ? 'following' : 'follow'}
                      onClick={() => handlclickbtn(following)}
                    >
                      <b>{following.isFollow === true ? t('following') : t('follow')}</b>
                    </button>
                  )
                }
              </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default ListFollowingUser;