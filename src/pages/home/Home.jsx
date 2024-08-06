/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { SuggestionsContext, SuggestionsProvider } from './SuggestionsContext';
import './SeeAll.scss';
import './Home.scss';
import Post from './Post';
import avt from '../../assets/images/account.png';
import LayoutFooter from '@/layouts/LayoutFooter';
import { motion } from 'framer-motion';
import AccountTransfer from './AccountTransfer';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '@/api/authApi/auth';


const Home = () => {
  const [showacctransfer, setshowacctransfer] = useState(false);
  const navigate = useNavigate();
  const { suggestions, setSuggestions, isfollow, handleFollowClick } = useContext(SuggestionsContext);
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = useContext(SuggestionsContext);
  const { hoveredProfile, handleMouseProfileEnter, handleMouseProfileLeave } = useContext(SuggestionsContext);
  const { follower, setFollower } = useContext(SuggestionsContext);
  const { post, setPost } = useContext(SuggestionsContext);
  const { following, setFollowing } = useContext(SuggestionsContext);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const handleshowacctransfer = () => {
    setshowacctransfer(true);
  };
  const cancleshowacctransfer = () => {
    setshowacctransfer(false);
  };
  const handleClickProfileUser = (id) => {
    navigate(`/profile/${id}`);
  };
  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem('userId');
      const data = await getUserById(userId);
      setUser(data);
      setProfile(data.profile)
      console.log('profile:', profile)
    }
    getUser();

  }, [])


  return (
    <div className='home' style={{ position: "absolute", left: "16%" }}>
      <div className="home-container">
        <div className="stories-posts">
          <div className="stories"></div>
          <div className="post-list">
            <Post />
          </div>
        </div>
        <div className="account-suggestions">
          <div className="account">
            <div className="account-container">
              <div className="account-left">
                <div className="account-image">
                  <img src={profile.avatarUrl} onClick={() => handleClickProfileUser(user.id)} alt="" />
                </div>
              </div>
              <div className="account-right">
                <div className="accout-username">
                  <p><span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleClickProfileUser(user.id)}>{profile.fullName}</span><br />
                    <span style={{ fontSize: '16px', color: 'gray' }}>{profile.displayName}</span>
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
                {suggestions.slice(0, 5).map((item, id) => (
                  <div className='suggestions-list-container' key={id}>
                    <div className="suggestions-image">
                      <img src={item.avatarUrl} alt="" onMouseEnter={() => handleMouseEnter(item.id, 'img')} onMouseLeave={handleMouseLeave} />
                      {(hoveredItem.id === item.id && hoveredItem.type === 'img') || (hoveredProfile.id === item.id && hoveredProfile.type === 'img') ? (
                        <div className='profile' onMouseEnter={() => handleMouseProfileEnter(item.id, 'img')} onMouseLeave={handleMouseProfileLeave}>
                          <div className="profile-container">
                            <div className="profile-header">
                              <div className="header-up">
                                <div className="header-up-image">
                                  <img src={item.avatarUrl} onClick={() => handleClickProfileUser(item.id)} alt="" />
                                </div>
                                <div className="header-up-right">
                                  <p style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleClickProfileUser(item.id)}>{item.displayName}</p>
                                  <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                </div>
                              </div>
                              <div className="header-down">
                                <div className="header-down-content">
                                  <p style={{ fontWeight: 'bold' }}>{post}</p>
                                  <p>bài viết</p>
                                </div>
                                <div className="header-down-content">
                                  <p style={{ fontWeight: 'bold' }}>{follower}</p>
                                  <p>người theo dõi</p>
                                </div>
                                <div className="header-down-content">
                                  <p style={{ fontWeight: 'bold' }}>{following}</p>
                                  <p>đang theo dõi</p>
                                </div>
                              </div>
                            </div>
                            <div className="profile-content"></div>
                            <div className="profile-footer">
                              {!isfollow[item.id] ? (
                                <button className='button1' onClick={() => handleFollowClick(item.id)}>
                                  <i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi
                                </button>
                              ) : (
                                <div className='profile-footer-container'>
                                  <button className='button2'>Nhắn tin</button>
                                  <button className='button3' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="suggestions-right">
                      <div className="sgt-ct">
                        <div className="p-hover">
                          <p style={{ fontWeight: 'bold', cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter(item.id, 'username')} onMouseLeave={handleMouseLeave}>{item.displayName}</p>
                          {(hoveredItem.id === item.id && hoveredItem.type === 'username') || (hoveredProfile.id === item.id && hoveredProfile.type === 'username') ? (
                            <div className='profile' onMouseEnter={() => handleMouseProfileEnter(item.id, 'username')} onMouseLeave={handleMouseProfileLeave}>
                              <div className="profile-container">
                                <div className="profile-header">
                                  <div className="header-up">
                                    <div className="header-up-image">
                                      <img src={item.avatarUrl} style={{ cursor: 'pointer' }} onClick={() => handleClickProfileUser(item.id)} alt="" />
                                    </div>
                                    <div className="header-up-right">
                                      <p style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleClickProfileUser(item.id)}>{item.displayName}</p>
                                      <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                    </div>
                                  </div>
                                  <div className="header-down">
                                    <div className="header-down-content">
                                      <p style={{ fontWeight: 'bold' }}>{post}</p>
                                      <p>bài viết</p>
                                    </div>
                                    <div className="header-down-content">
                                      <p style={{ fontWeight: 'bold' }}>{follower}</p>
                                      <p>người theo dõi</p>
                                    </div>
                                    <div className="header-down-content">
                                      <p style={{ fontWeight: 'bold' }}>{following}</p>
                                      <p>đang theo dõi</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="profile-content"></div>
                                <div className="profile-footer">
                                  {!isfollow[item.id] ? (
                                    <button className='button1' onClick={() => handleFollowClick(item.id)}>
                                      <i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi
                                    </button>
                                  ) : (
                                    <div className='profile-footer-container'>
                                      <button className='button2'>Nhắn tin</button>
                                      <button className='button3' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <p style={{ fontSize: '14px', color: 'gray' }}>{item.name}</p>
                      </div>
                      <div className="sgt-button">
                        {!isfollow[item.id] ? (
                          <p className='p1' onClick={() => handleFollowClick(item.id)}>Theo dõi</p>
                        ) : (
                          <div className='p2' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <AccountTransfer />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
