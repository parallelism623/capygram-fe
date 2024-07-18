/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";
import { Carousel } from 'antd';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

import more from '@/assets/images/more.png';
import icon from '@/assets/images/icon.png';

import './ExploreItem.scss';
import CardUser from './CardUser';
import ShowMoreOption from './ShowMoreOption';
import ShareTo from './ShareTo';

const ExploreItem = ({ explore, onCancel, id }) => {
  const [showCardUser, setShowCardUser] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(false);
  const [loved, setLoved] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const { t } = useTranslation('explore');
  const videoRef = useRef([]);
  const inputRef = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.5 });

    videoRef.current.forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRef.current.forEach(video => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [explore]);

  const handleVideoClick = (index) => {
    const video = videoRef.current[index];
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };


  const handleMouseEnter = () => {
    setHovering(true);
    setShowCardUser(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setTimeout(() => {
      if (!hovering) {
        setShowCardUser(false);
      }
    }, 500);
  };

  const addEmoji = (event, emojiObject) => {
    const emoji = event.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;
    const start = input.substring(0, selectionStart);
    const end = input.substring(selectionEnd, input.length);
    const updateInput = start + emoji + end;
    setInput(updateInput);
    inputRef.current.focus();
  };


  useEffect(() => {
    const getComments = JSON.parse(localStorage.getItem('comments')) || [];

    const exploreComments = getComments.filter(comment => comment.exploreId === explore.id);

    setComments(exploreComments);
  }, [explore.id]);

  const handleSend = () => {
    if (input.trim() !== '') {
      const newComment = {
        user: explore.user,
        comment: input.trim(),
        exploreId: explore.id,
      };

      const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

      storedComments.push(newComment);

      const commentsExplore = storedComments.filter(comment => comment.exploreId === explore.id);

      localStorage.setItem('comments', JSON.stringify(storedComments));

      setComments(commentsExplore);
      setInput('');
    }
  };

  const handleCancelShowMore = () => {
    setShowMore(false);
  }

  const handleCancelShare = () => {
    setShowShare(false);
  }

  return (
    <div className='body-item'>
      <div className='item-explore'>

        <div className='image-video'>
          {
            explore.media.type === 'video' ? (
              <div className='i'>
                <video
                  src={explore.media.url}
                  className='video'
                  ref={el => (videoRef.current[id] = el)}
                  onClick={() => handleVideoClick(id)}
                  autoPlay
                  muted
                  loop
                />
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
              <img src={explore.user.avatarUrl} className='avatar-info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><b>{explore.user.name}</b></p>
              <p className={`fl ${isFollow ? 'isFollow' : ''}`} onClick={() => setIsFollow(true)}>{t('follow')}</p>

              {showCardUser && <div onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowCardUser(false)}>
                <CardUser user={explore.user} Follow={isFollow} />
              </div>}

              {showMore && (
                <div className='overlay' onClick={handleCancelShowMore}>
                  <motion.div
                    className='item-explore-container'
                    onClick={(e) => e.stopPropagation()}
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShowMoreOption onCancel={handleCancelShowMore} />
                  </motion.div>
                </div>
              )}
            </div>

            <div className='icon-loadMore'>
              <img src={more} alt='more' onClick={() => setShowMore(true)} />
            </div>
          </div>

          <div className='comment-explore'>
            {
              Array.isArray(comments) && comments.map((comment, index) => (
                <div className='comment-item' key={index}>
                  <div className='info-user-comment'>
                    <img src={comment.user.avatarUrl} alt='avatar-info-user-comment' />
                  </div>
                  <div className='content-comment'>
                    <p><b>{comment.user.name}</b></p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='bottom-explore'>
            <div className='bottom1-explore'>
              <div className='gr-icon'>
                <div className='gr-icon1'>
                  <span onClick={() => setLoved(!loved)}>
                    {
                      !loved ? (
                        <i className='fa-regular fa-heart'></i>
                      ) : (
                        <i className='fa-solid fa-heart'></i>
                      )
                    }
                  </span>
                  <span>
                    <i className='fa-regular fa-comment'></i>
                  </span>
                  <span onClick={() => setShowShare(true)}>
                    <i className='fa-regular fa-paper-plane'></i>
                  </span>
                </div>
                {showShare && (
                  <div className='overlay' onClick={handleCancelShare}>
                    <motion.div
                      className='item-explore-container'
                      onClick={(e) => e.stopPropagation()}
                      animate={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ShareTo onCancel={handleCancelShare} />
                    </motion.div>
                  </div>
                )}
                <div className='gr-icon2' >
                  <span onClick={() => setLike(!like)}>
                    {
                      !like ? (
                        <i className='fa-regular fa-bookmark'></i>
                      ) : (
                        <i className='fa-solid fa-bookmark'></i>
                      )
                    }
                  </span>
                </div>
              </div>
              <div className='count-liked'>
                <p>{explore.likes} {t('liked')}</p>
              </div>
            </div>

            <div className='bottom2-explore'>
              <img src={icon} alt='icon' onClick={() => setShowEmoji(!showEmoji)} />
              <textarea
                placeholder={t('comment')}
                typeof='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={() => setShowEmoji(false)}
                ref={inputRef} />
              <p className={input !== '' ? 'send' : "notSend"} onClick={handleSend}>{t('send')}</p>
            </div>

            {
              showEmoji && (
                <EmojiPicker onEmojiClick={addEmoji} className='emoji-picker-react' />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreItem;