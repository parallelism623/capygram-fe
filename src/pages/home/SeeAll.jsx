import React, { useContext, useState, useEffect } from 'react';
import { SuggestionsContext, SuggestionsProvider } from './SuggestionsContext';
import './SeeAll.scss'
import { useNavigate } from 'react-router-dom';

import LayoutFooter from '@/layouts/LayoutFooter';
const SeeAll = () => {
    const {
        suggestions,
        hoveredItem,
        handleMouseEnter,
        handleMouseLeave,
        hoveredProfile,
        handleMouseProfileEnter,
        handleMouseProfileLeave,
        isfollow,
        handleFollowClick, follower, post, following
    } = useContext(SuggestionsContext);
    const navigate = useNavigate();
    const handleClickProfileUser = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className='see-all'>
            <div className="see-all-container">
                <h2>Gợi ý</h2>
                {suggestions.map((item, index) => (
                    <div className='suggestions' key={index}>
                        <div className='sgt-image'>
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
                                        <div className="profile-content">

                                        </div>
                                        <div className="profile-footer">
                                            {!isfollow[item.id] ? (<button className='button1' onClick={() => handleFollowClick(item.id)}><i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi</button>)
                                                : (<div className='profile-footer-container'>
                                                    <button className='button2'>Nhắn tin</button>
                                                    <button className='button3' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="sgt-ct">
                            <div className="sgt-ct-left">
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
                                                            <p style={{ fontWeight: 'bold' }} onClick={() => handleClickProfileUser(item.id)}>{item.displayName}</p>
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
                                                <div className="profile-content">

                                                </div>
                                                <div className="profile-footer">
                                                    {!isfollow[item.id] ? (<button className='button1' onClick={() => handleFollowClick(item.id)}><i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi</button>)
                                                        : (<div className='profile-footer-container'>
                                                            <button className='button2'>Nhắn tin</button>
                                                            <button className='button3' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                                        </div>)
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                <p style={{ fontSize: '15px', color: 'gray' }}>{item.status}</p>
                            </div>
                            <div className="sgt-ct-right">
                                {!isfollow[item.id] ? (<button className='button1' onClick={() => handleFollowClick(item.id)}>Theo dõi</button>)
                                    : (
                                        <button className='button2' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
                <LayoutFooter />
            </div>
        </div>
    )
}
export default SeeAll;