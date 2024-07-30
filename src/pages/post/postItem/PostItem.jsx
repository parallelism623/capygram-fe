/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import "@/i18n";
import { Carousel } from 'antd';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';

import more from '@/assets/images/more.png';
import icon from '@/assets/images/icon.png';
import ShareTo from '@/pages/explore/ShareTo';
import More from '../more/More';

import './PostItem.scss';

const PostItem = ({ post, onCancel}) => {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  const [loved, setLoved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { t } = useTranslation('explore');
  const inputRef = React.createRef();
  
  const user = useSelector(state => state.user.user);

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

    const postComments = getComments.filter(comment => comment.postId === post.id);

    setComments(postComments);
    // console.log(post);
  }, [post.id]);

  const handleSend = () => {
    if (input.trim() !== '') {
      const newComment = {
        user: user,
        comment: input.trim(),
        postId: post.id,
      };

      const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

      storedComments.push(newComment);

      const commentsPost = storedComments.filter(comment => comment.postId === post.id);

      localStorage.setItem('comments', JSON.stringify(storedComments));

      setComments(commentsPost);
      setInput('');
    }
  };

  const handleCancelShare = () => {
    setShowShare(false);
  };
  
  const handleCancelMore = () => {
    setShowMore(false);
  };

  return (
    <div className='body-item'>
      <div className='item-post'>

        <div className='image-video'>
              <div className='i'>
                <Carousel arrows infinite={false} >
                  {
                    post.imageUrls.map((url, index) => (
                      <div className='image-slider'>
                        <img src={url} alt='image' key={index} className='img-item' />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            
          
        </div>

        <div className='content-explore'>
          <div className='top-content-explore'>
            <div className='info-user'>
              <img src={user.avatarUrl} className='avatar-info' />
              <p ><b>{user.username}</b></p>
            </div>

            <div className='icon-loadMore'>
              <img src={more} alt='more' onClick={() => setShowMore(true)} />
            </div>
          </div>

          {showMore && (
            <div className='overlay' onClick={handleCancelMore}>
              <motion.div
                className='item-explore-container'
                onClick={(e) => e.stopPropagation()}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <More onCancel={handleCancelMore} />
              </motion.div>
            </div>
          )}

          <div className='comment-explore'>
            {
              Array.isArray(comments) && comments.map((comment, index) => (
                <div className='comment-item' key={index}>
                  <div className='info-user-comment'>
                    <img src={user.avatarUrl} alt='avatar-info-user-comment' />
                  </div>
                  <div className='content-comment'>
                    <p><b>{user.username}</b></p>
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
                <p>{post.likes} {t('liked')}</p>
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

export default PostItem;