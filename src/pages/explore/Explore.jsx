/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';

import images from '@/assets/images/images.png';
import heart from '@/assets/images/heart.png';
import comment from '@/assets/images/comment.png';

import './Explore.scss';
import ExploreItem from './ExploreItem';
import { getAllPosts } from '@/api/authApi/post';

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [page, setPage] = useState(1);
  const [showItem, setShowItem] = useState(false);
  const [item, setItem] = useState(undefined);
  const [idItem, setIdItem] = useState(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(16);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const post = await getAllPosts(page, limit);
        (page > 1) ? setExploreData(prev => [...prev, ...post.data]) : setExploreData(post.data);
        setTotal(post.total);
        setHasMore(exploreData.length + post.data.length < post.total);

      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [page, limit]);

  const fetchMoreData = () => {
    if (exploreData.length >= total) {
      setHasMore(false);
      return;
    }
    setPage(prev => prev + 1);
    setLimit(4);
    console.log("page", page);
    console.log("limit", limit);
  };

  const handleCancel = () => {
    setShowItem(false);
  };

  const handleClick = (explore) => {
    setItem(explore);
    setIdItem(explore.id);
    setShowItem(true);
  }
  return (
    <InfiniteScroll
      dataLength={exploreData.length}
      next={fetchMoreData}
      hasMore={true}
    // loader={<h4>Loading...</h4>}
    >
      <div className='body-list-explore' style={{ position: "absolute", left: "16%" }}>

        <div className='body-explore' >
          {
            (exploreData && exploreData.length > 0) && exploreData.map((explore) => (
              <>
                <div key={explore.id} className='item' onClick={() => handleClick(explore)}>
                  <div className='i'>
                    <img src={explore.imageUrls[0]} alt='explore' className='img' />
                    <img src={images} alt='images' className='icon1' />
                    <div className='hover'>
                      <div className='icon2'>
                        <img src={heart} alt='heart' />
                        <p>{explore.likes}</p>
                      </div>
                      <div className='icon3'>
                        <img src={comment} alt='comment' />
                        <p>{explore.comments ? explore.comments : 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          }

          {showItem && (
            <div className='overlay' onClick={handleCancel}>
              <motion.div
                className='item-explore-container'
                onClick={(e) => e.stopPropagation()}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <ExploreItem onCancel={handleCancel} explore={item} id={idItem} />
              </motion.div>
            </div>
          )}
        </div>
      </div >
    </InfiniteScroll>
  )
}

export default Explore;

