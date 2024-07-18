/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";

import exit from '@/assets/images/exit.png';

import './ShareTo.scss';

const ShareTo = ({ onCancel }) => {
  const { t } = useTranslation('explore');
  const [suggestedUser, setSuggestedUser] = useState([]);

  useEffect(() => {
    const fakeSuggestedUser = [
      {
        id: 1,
        fullname: 'Nguyen Van A',
        username: 'nguyenvana',
        avatarUrl: 'https://i.pinimg.com/236x/7e/28/ae/7e28aeab637ddd393c0d10f23aca2271.jpg'
      },
      {
        id: 2,
        fullname: 'Lương Thị Phượng',
        username: 'ng.foxglove',
        avatarUrl: 'https://i.pinimg.com/236x/25/e9/16/25e916edacc1f8fbddc8dc20670b8bb2.jpg'
      },
      {
        id: 3,
        fullname: 'Nguyễn Mỹ Ninh',
        username: 'Ninh2@3',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhfzfmt3bc5vSy1ubEFtk5w1mYUaOrUc6SbQ&s'
      },
      {
        id: 4,
        fullname: 'Đặng Thu Trang',
        username: 'TrangDang',
        avatarUrl: 'https://i.pinimg.com/236x/99/ac/c0/99acc02e84e01f9e565a637257da38d6.jpg'
      },
      {
        id: 5,
        fullname: 'Nguyễn Thị Ngọc Anh',
        username: 'anhhngoc@12',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQftQd9YCV31UWW8kd-XOL804vUx7LpepaiHA&s'
      },
      {
        id: 6,
        fullname: 'Đồng Niên',
        username: 'ngocbich@nien',
        avatarUrl: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/avatar-dep-10-1.jpg'
      },
      {
        id: 7,
        fullname: 'Nguyễn Thị Thanh Tú',
        username: 'tucute',
        avatarUrl: 'https://codaio.imgix.net/docs/KfVGD9VeU6/blobs/bl-RpEeQErrjo/fb991ee2f37d04ad653b063d7c0305983995e8425dec216b956181107f747c4dfd934a8e0146c89fe36da845625d04409915093ffe2ba2d22d276c437dfefc2120f9a0ec6101a7c5d3756250f361e72680907f5cda7dd782f04f3f0f9e33227666b5c8bf?auto=format%2Ccompress&fit=max'
      },
      {
        id: 8,
        fullname: 'Mai Thanh Nga',
        username: 'ngamai',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz66Z9BMeTqhepfiz0zCKP1YyVURTFqB76Ow&s'
      }
    ]
    setSuggestedUser(fakeSuggestedUser);
  }, []);

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
        <span>
          <p><b>{t('to')}</b></p>
        </span>
        <input type='text' placeholder={t('search')} />
      </div>
      <div className='suggested-user'>
        <p><b>{t('suggested')}</b></p>
        <div className='suggest'>
          {
            suggestedUser.map((user) => (
              <div className='user' key={user.id}>
                <div className='info-user-suggest'>
                  <img src={user.avatarUrl} alt='avata' />
                  <div className='name'>
                    <p><b>{user.fullname}</b></p>
                    <p className='username'>{user.username}</p>
                  </div>
                </div>
                <div className='btn-select'>
                  <div></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ShareTo