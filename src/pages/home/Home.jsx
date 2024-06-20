/* eslint-disable */
import React from 'react'
import './Home.scss'
import Post from './Post'
import avt from '../../assets/images/account.png'
import LayoutFooter from '@/layouts/LayoutFooter'

const Home = () => {
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
                  <p>Chuyển</p>
                </div>
              </div>
            </div>
          </div>
          <div className="suggestions">
            <div className="suggestions-container">
              <div className="suggestions-header">
                <p style={{ fontWeight: 'bold', color: 'gray' }}>Gợi ý cho bạn</p>
                <p style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Xem tất cả</p>
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
    </div>
  )
}

export default Home;