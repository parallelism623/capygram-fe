/* eslint-disable */
import React from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";
import { Carousel } from 'antd';

import more from '@/assets/images/more.png';
import heart from '@/assets/images/heart.png';
import comment from '@/assets/images/comment.png';
import sendMessage from '@/assets/images/sendMessage.png';
import saved from '@/assets/images/saved.png';
import icon from '@/assets/images/icon.png';

import './ExploreItem.scss';

const ExploreItem = ({ explore, onCancel }) => {

  const { t } = useTranslation('explore');

  return (
    <div className='body-item'>
      <div className='item-explore'>

        <div className='image-video'>
          {
            explore.media.type === 'video' ? (
              <div className='i'>
                <video src={explore.media.url} controls className='video' />
              </div>
            ) : (
              <div className='i'>
                <Carousel arrows infinite={false} >
                  {
                    explore.media.url.map((url, index) => (
                      <div className='image-slider'>
                        <img src={url} alt='image' key={index} className='img-item' />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            )
          }
        </div>

        <div className='content-explore'>
          <div className='top-content-explore'>
            <div className='info-user'>
              <img src={explore.user.avatarUrl} />
              <p><b>{explore.user.name}</b></p>
              <p className='fl'>{t('follow')}</p>
            </div>
            <div className='icon-loadMore'>
              <img src={more} alt='more' />
            </div>
          </div>

          <div className='comment-explore'></div>

          <div className='bottom-explore'>
            <div className='bottom1-explore'>
              <div className='gr-icon'>
                <div className='gr-icon1'>
                  <img src={heart} alt='heart' />
                  <img src={comment} alt='comment' />
                  <img src={sendMessage} alt='sendMessage' />
                </div>
                <div className='gr-icon2'>
                  <img src={saved} alt='saved' />
                </div>
              </div>
              <div className='count-liked'>
                <p>{explore.likes} {t('liked')}</p>
              </div>
            </div>

            <div className='bottom2-explore'>
              <img src={icon} alt='icon' />
              <textarea placeholder={t('comment')} typeof='text' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreItem;