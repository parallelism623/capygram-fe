/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import heart from '@/assets/images/heart.png';

import "./PostInProfileUser.scss";
import PostItemInProfile from './PostItemInProfile';

const PostInProfileUser = ({ posts, userId }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClickItem = (post) => {
    setSelectedPost(post);
  };

  const handleCancel = () => {
    setSelectedPost(null);
  };

  return (
    <div className='list-post'>
      {
        posts.map((post) => (

          <div key={post.id} className='post-item' onClick={() => handleClickItem(post)}>
            <div className='i'>
              <img src={post.imageUrls[0]} alt='post' className='img' />
              <div className='hover'>
                <div className='icon2'>
                  <img src={heart} alt='heart' />
                  <p>{post.likes}</p>
                </div>
              </div>
            </div>
          </div>

        ))
      }
      {selectedPost && (
        <div className='overlay-post' onClick={handleCancel}>
          <motion.div
            className='item-post-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <PostItemInProfile onCancel={handleCancel} post={selectedPost} userId={userId} />
          </motion.div>
        </div>

      )}
    </div>
  )
}

export default PostInProfileUser;