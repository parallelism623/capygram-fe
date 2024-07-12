/* eslint-disable */
import React, { useRef, useState } from 'react'

import explores from "./fakeExplore.json";

import './Explore.scss';

const Explore = () => {
  const exploreData = explores.explores;


  return (
      <div className='body-explore'>
        {
          (exploreData && exploreData.length > 0) && exploreData.map((explore, index) => (
            <div key={index} className='item'>
              {
                explore.media.type === 'video' ? (
                  <video src={explore.media.url} controls></video>
                ) : (
                  <img src={explore.media.url[0]} alt='explore' />
                )
              }
            </div>
          ))
        }
      </div>
    )
}

export default Explore;

