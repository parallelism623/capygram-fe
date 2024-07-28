/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { getPostByUserId } from '@/api/authApi/post';

import heart from '@/assets/images/heart.png';

import "./ListPost.scss";
const ListPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const userId = localStorage.getItem('userId');
      const response = await getPostByUserId(userId);
      setPosts(response);
    };
    getPost();
  }, []);
  return (
    <div className='list-post'>
      {
        posts.map((post) => (
          <div key={post.id} className='post-item'>
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
    </div>
  )
}

export default ListPost;