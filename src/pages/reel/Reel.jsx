/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react'
import './Reel.scss'
import avt from '../../assets/images/account.png'
import { motion } from 'framer-motion';
import CommentReel from './CommentReel';

const Reel = () => {
  const [reel, setReel] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const videoRefs = useRef([]);
  useEffect(() => {
    const fakeReel = async () => {
      const data = [
        { id: 1, username: 'nguyenhuy26_6', like: '23N', cmt: 320, cap: "Yummy!!!", img_url: avt, video_url: "https://videos.pexels.com/video-files/6138826/6138826-uhd_2560_1440_25fps.mp4" },
        { id: 2, username: 'Hongquan_0304', like: '35N', cmt: 200, cap: "Beautiful day!!!", img_url: avt, video_url: "https://videos.pexels.com/video-files/4875313/4875313-uhd_1922_1440_30fps.mp4" },
        { id: 3, username: 'DuyHiep_1710', like: '50N', cmt: 250, cap: "Goalllll", img_url: avt, video_url: "https://videos.pexels.com/video-files/6078261/6078261-hd_1080_1920_25fps.mp4" },
        { id: 4, username: 'HaiDang_1805', like: '43N', cmt: 100, cap: "Football", img_url: avt, video_url: "https://videos.pexels.com/video-files/2932301/2932301-uhd_2732_1440_24fps.mp4" },
      ]
      setReel(data);
    };
    fakeReel();
  }, []);
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.play();
      }
    });
  }, [reel]);

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <>
      <div className='reel' style={{ position: "absolute", left: "16%" }}>
        {reel.map((item, id) => (
          <div className="reel-container" key={id}>
            <div className="reel-video">
              <video ref={el => (videoRefs.current[id] = el)}
                onClick={() => handleVideoClick(id)}
                src={item.video_url}>
                autoPlay
                muted
              </video>
              <div className="info">
                <div className="info-img">
                  <img src={item.img_url} alt="" />
                  <div className="info-img-content">
                    <p style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>{item.username}</p>
                    <button>Theo dõi</button>
                  </div>
                </div>
                <div className="info-caption">
                  <p style={{ color: 'white' }}>{item.cap}</p>
                </div>
              </div>
            </div>
            <div className="reel-action">
              <ul>
                <li className='action-list'>
                  <i className="fa-regular fa-heart"  ></i>
                  <p>{item.like}</p>
                </li>
                <li className='action-list' >
                  <i className="fa-regular fa-comment" onClick={() => { console.log("ksadsd"); setShowComment(true); }} ></i>
                  <p>{item.cmt}</p>
                </li>
                <li className='action-list'>
                  <i className="fa-regular fa-paper-plane"></i>
                </li>
                <li className='action-list'>
                  <i className="fa-regular fa-bookmark"></i>
                </li>
                <li className='action-list'>
                  <i className="fa-solid fa-ellipsis"></i>
                </li>
                <li className='action-list'></li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      {showComment && (
        <div className='overlay' onClick={() => setShowComment(false)}>
          <motion.div
            className='note-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <CommentReel />
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Reel;