/* eslint-disable  */
import React from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';

import LayoutFooter from '@/layouts/LayoutFooter';

import muiTen from '@/assets/images/muiTen.png';
import loading from '@/assets/images/loading.png';
import clock from '@/assets/images/clock.png';

import './Archive.scss';

const Archive = () => {
  const { t } = useTranslation('archive_profile');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/profile');
  };

  const stories = [];
  return (
    <div className='body-archive'>
      <div className='archive'>
        <div className='top-archive'>

          <div className='title-archive' onClick={handleBack}>
            <img src={muiTen} alt='muiTen' />
            <p className='title'>{t('archive')}</p>
          </div>

          <div className='menu-archive'>
            <div className='group'>
              <img src={loading} alt='loading' />
              <p className='tt-menu'>{t('stories')}</p>
            </div>
          </div>
        </div>

        <div className='body-archive-profile'>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <div className='story' key={index}>
                <img src={story.image} alt='story' />
              </div>
            ))
          ) : (
            <div className='content-archive'>
              <img src={clock} alt='clock' />
              <p className='p1'>{t('addStory')}</p>
              <p className='p2'>{t('title')}</p>
            </div>
          )

          }
        </div>
      </div>

      <LayoutFooter/>
    </div>
  )
}

export default Archive;