/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { follow, getFollowers, getFollowing, unFollow } from '@/api/authApi/graph';

import exit from '@/assets/images/exit.png';
import account from '@/assets/images/account.png';

import './ListFollowerUser.scss';

const ListFollowerUser = ({ Id, onCancel }) => {
  const { t } = useTranslation('listFollow');

  const [isRender, setIsRender] = useState(false);
  const [listFollowers, setListFollowers] = useState([]);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getListFollowers = async () => {
      try {
        const followers = await getFollowers(Id);
        const followingOfMe = await getFollowing(localStorage.getItem('userId'));

        console.log("followers", followers);
        console.log("followingOfMe", followingOfMe);
        const listFollowers = followers.map((follower) => ({
          id: follower.id,
          fullname: follower.fullName,
          avatarUrl: follower.avatarUrl,
          isFollow: followingOfMe.some((item) => item.id === follower.id) ? true : false
        }));

        setListFollowers(listFollowers);

      } catch (error) {
        console.log(error);
      }
    };

    getListFollowers();
  }, [isRender, Id]);


  useEffect(() => {
    const searchUser = () => {
      const resultUser = listFollowers.filter((follower) => {
        return follower.fullname.toLowerCase().includes(input.toLowerCase());
      });
      setResult(resultUser);
    };

    searchUser();
  }, [input]);

  const handlclickbtn = async (follower) => {
    const id = localStorage.getItem('userId');
    const did = follower.id;
    if (follower.isFollow === true) {
      await unFollow(id, did);
      follower.isFollow = false;
      setIsRender(!isRender);
    } else {
      await follow(id, did);
      follower.isFollow = true;
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
          result.length === 0 ? listFollowers.map((follower) => (
            <div className='followr-user' key={follower.id}>
              <div className='user-info'>
                <div className='avatar'>
                  <img src={follower.avatarUrl !== ('string' && '') ? follower.avatarUrl : account} alt='avatar' />
                </div>
                <div className='name'>
                  <p className='fullname'><b>{follower.fullname}</b></p>
                </div>
              </div>

              <div className='btn-status'>
                {
                  localStorage.getItem('userId') !== follower.id && (
                    <button
                      className={follower.isFollow === true ? 'following' : 'follow'}
                      onClick={() => handlclickbtn(follower)}
                    >
                      <b>{follower.isFollow === true ? t('following') : t('follow')}</b>
                    </button>
                  )
                }
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
                {
                  localStorage.getItem('userId') !== follower.id && (
                    <button
                      className={follower.isFollow === true ? 'following' : 'follow'}
                      onClick={() => handlclickbtn(follower)}
                    >
                      <b>{follower.isFollow === true ? t('following') : t('follow')}</b>
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

export default ListFollowerUser;