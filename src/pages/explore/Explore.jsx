/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'

import explores from "./fakeExplore.json";

import './Explore.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    //api
    const loadData = () => {
      const exploreData = explores.explores;
      setExploreData(prevData => [...prevData, ...exploreData]);
    };

    loadData();
  }, [page]);


  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

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
            <div key={index} className='item'>
              {
                explore.media.type === 'video' ? (
                  <video src={explore.media.url} controls/>
                ) : (
                  <img src={explore.media.url[0]} alt='explore' />
                )
              }
            </div>
          ))
        }
      </div>
    </InfiniteScroll>
  )
}

export default Explore;

