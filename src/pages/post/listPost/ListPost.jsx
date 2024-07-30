/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { getPostByUserId } from '@/api/authApi/post';
import PostItem from '../postItem/PostItem';
import heart from '@/assets/images/heart.png';

import "./ListPost.scss";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const userId = localStorage.getItem('userId');
      const response = await getPostByUserId(userId);
      setPosts(response);
    };
    getPost();
  }, []);

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
            <PostItem onCancel={handleCancel} post={selectedPost} />
          </motion.div>
        </div>

      )}
    </div>
  )
}

export default ListPost;