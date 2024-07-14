/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';

import explores from "./fakeExplore.json";

import video from '@/assets/images/video.png';
import images from '@/assets/images/images.png';
import heart from '@/assets/images/heart.png';
import comment from '@/assets/images/comment.png';

import './Explore.scss';
import ExploreItem from './ExploreItem';

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [page, setPage] = useState(1);
  const [showItem, setShowItem] = useState(false);
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    //api
    const loadData = () => {
      const exploreData = explores.explores;
      setExploreData(exploreData);
    };

    loadData();
  }, [page]);


  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleCancel = () => {
    setShowItem(false);
  };

  const handleClick = (explore) => {
    setItem(explore);
    setShowItem(true);
  }
  return (
    <InfiniteScroll
      dataLength={exploreData.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className='body-explore'>
        {
          (exploreData && exploreData.length > 0) && exploreData.map((explore, index) => (
            <>
              <div key={index} className='item' onClick={() => handleClick(explore)}>
                {
                  explore.media.type === 'video' ? (
                    <div className='i'>
                      <video src={explore.media.url} controls className='video' />
                      <img src={video} alt='video' className='icon1' />
                      <div className='hover'>
                        <div className='icon2'>
                          <img src={heart} alt='heart' />
                          <p>{explore.likes}</p>
                        </div>
                        <div className='icon3'>
                          <img src={comment} alt='comment' />
                          <p>{explore.comments}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='i'>
                      <img src={explore.media.url[0]} alt='explore' className='img' />
                      <img src={images} alt='images' className='icon1' />
                      <div className='hover'>
                        <div className='icon2'>
                          <img src={heart} alt='heart' />
                          <p>{explore.likes}</p>
                        </div>
                        <div className='icon3'>
                          <img src={comment} alt='comment' />
                          <p>{explore.comments}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>

              {showItem && (
                <div className='overlay' onClick={handleCancel}>
                  <motion.div
                    className='item-explore-container'
                    onClick={(e) => e.stopPropagation()}
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExploreItem onCancel={handleCancel} explore={item} />
                  </motion.div>
                </div>
              )}
            </>
          ))
        }
      </div>
    </InfiniteScroll>
  )
}

export default Explore;
