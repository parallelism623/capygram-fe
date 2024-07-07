/* eslint-disable */
import React, { useState } from 'react'
import './Home.scss'
import Post from './Post'
import avt from '../../assets/images/account.png'
import LayoutFooter from '@/layouts/LayoutFooter'
import { motion } from 'framer-motion';
import AccountTransfer from './AccountTransfer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [showacctransfer, setshowacctransfer] = useState(false);
  const navigate = useNavigate();

  const handleshowacctransfer = () => {
    setshowacctransfer(true);
  }
  const cancleshowacctransfer = () => {
    setshowacctransfer(false);
  }
  return (
    <div className='home' style={{ position: "absolute", left: "16%" }}>
      <div className="home-container">
        <div className="stories-posts">
          <div className="stories">

          </div>
          <div className="post-list">
            <Post />
          </div>

        </div>
        <div className="account-suggestions">
          <div className="account">
            <div className="account-container">
              <div className="account-left">
                <div className="account-image">
                  <img src={avt} alt="" />
                </div>
              </div>
              <div className="account-right">
                <div className="accout-username">
                  <p><span style={{ fontWeight: 'bold', cursor: 'pointer' }}>Hong_quan_32004</span><br />
                    <span style={{ fontSize: '16px', color: 'gray' }}>Quân Trần</span>
                  </p>
                </div>
                <div className="switch-account">
                  <p onClick={handleshowacctransfer}>Chuyển</p>
                </div>
              </div>
            </div>
          </div>
          <div className="suggestions">
            <div className="suggestions-container">
              <div className="suggestions-header">
                <p style={{ fontWeight: 'bold', color: 'gray' }}>Gợi ý cho bạn</p>
                <p style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }} onClick={() => navigate('/see-all')}>Xem tất cả</p>
              </div>
              <div className="suggestions-list">

              </div>
              <div className="suggestions-footer">
                <LayoutFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showacctransfer && (
        <div className='overlay' onClick={cancleshowacctransfer}>
          <motion.div
            className='note-container'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <AccountTransfer oncancel={cancleshowacctransfer} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Home;