import './Post.scss'
import avt from '../../assets/images/account.png'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Options from './Options'
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { newsFeed } from '@/api/authApi/newsfeed';
import ShareTo from '../explore/ShareTo';

import { setPost, setStep, addComments } from '@/store/formSlice';

const Post = () => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [describe, setDescribe] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [post, setPost] = useState([]);
    const [iscall, setIscall] = useState(false);
    const dispatch = useDispatch();
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const data = [
                { id: 1, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 2, cmt: 230011, avatar: avt, image: "https://wallpaperaccess.com/full/4175212.jpg" },
                { id: 2, username: 'Manchesterunited', name: 'Manu', like: 3266357, cap: 'Hellooo :)))', day: 6, cmt: 230011, avatar: avt, image: "https://tse3.mm.bing.net/th?id=OIP.7jfuUFdK-1XeUG8EEGdkygHaEo&pid=Api&P=0&h=180" },
                { id: 3, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 24, cmt: 230011, avatar: avt, image: "https://i.ytimg.com/vi/9NADpKUrGkk/maxresdefault.jpg" },
                { id: 4, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 6, cmt: 230011, avatar: avt, image: "https://wallpapercave.com/wp/wp11739637.jpg" },
                { id: 5, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 1, cmt: 230011, avatar: avt, image: "https://tse2.mm.bing.net/th?id=OIP.F5fjhPnEFnf8AszqCztzegHaIQ&pid=Api&P=0&h=180" },
                { id: 6, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 5, cmt: 230011, avatar: avt, image: "https://www.aljazeera.com/wp-content/uploads/2022/12/SSS10772_1.jpg?resize=1920%2C1440" },
                { id: 7, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 7, cmt: 230011, avatar: avt, image: "https://tse3.mm.bing.net/th?id=OIP.Nt2rigkhibkJQFb2UWWSggHaE8&pid=Api&P=0&h=180" },
                { id: 8, username: 'Hongquan_1103', name: 'Quan0304', like: 326044, cap: 'Hellooo :)))', day: 8, cmt: 230011, avatar: avt, image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-12/2022-12-18t185427z_447705602_up1eici1giod5_rtrmadp_3_soccer-worldcup-arg-fra-report.jpg" }
            ]
            setPost(data);
        }
        fetchPost();
    }, [])

    const handleChange = (e) => {
        setDescribe(e.target.value);
    };

    const addEmoji = (event, emojiObject) => {
        const emoji = event.emoji;
        const newDescribe = describe + emoji;
        setDescribe(newDescribe);
        dispatch(setPost({ description: newDescribe }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (describe.trim()) {
            dispatch(addComments(describe));
            setDescribe('');
        }
    };

    const handleShowShare = () => {
        setShowShare(true);
    }

    const cancelShowShare = () => {
        setShowShare(false);
    }

    const handleShowComment = (item) => {
        setShowComment(true);
        setCurrentPost(item);
    }

    const cancelShowComment = () => {
        setShowComment(false);
    }

    const handleshowOptions = () => {
        setShowOptions(true);
    }

    const cancelShowOptions = () => {
        setShowOptions(false);
    }

    const handleChangeIcons = () => {
        setIcons(!icons);
    }

    const handleChangeBookmark = () => {
        setBookmark(!bookmark);
    }

    return (
        <div className="post">
            {post.map((item, id) => (
                <div className="post-container" key={id}>
                    {/* header */}
                    <div className="post-header">
                        <div className="post-header-left">
                            <div className="post-header-avt">
                                <img src={item.avatar} alt="" />
                            </div>
                        </div>
                        <div className="post-header-right">
                            <div className="post-header-username">
                                <a href="/#">{item.username}</a>
                            </div>
                            <div className="post-header-option">
                                <span>
                                    <i onClick={handleshowOptions} className="fa-solid fa-ellipsis"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* image */}
                    <div className="post-image">
                        <img src={item.image} alt="" />
                    </div>
                    {/* group-bottom */}
                    <div className="post-group-bottom">
                        <div className="icons">
                            <div className="icons-left">
                                <span>
                                    {!icons ? (
                                        <i className="fa-regular fa-heart" onClick={handleChangeIcons}></i>
                                    ) :
                                        (
                                            <i className="fa-solid fa-heart" style={{ color: '#f20d0d', scale: '1.1' }} onClick={handleChangeIcons}></i>
                                        )}

                                </span>
                                <span>
                                    <i onClick={() => handleShowComment(item)} className="fa-regular fa-comment"></i>
                                </span>
                                <span>
                                    <i onClick={handleShowShare} className="fa-regular fa-paper-plane"></i>
                                </span>
                            </div>
                            <div className="icons-right">
                                <span>
                                    {!bookmark ? (
                                        <i className="fa-regular fa-bookmark" onClick={handleChangeBookmark}></i>
                                    )
                                        : (<i className="fa-solid fa-bookmark" onClick={handleChangeBookmark}></i>)
                                    }

                                </span>
                            </div>
                        </div>
                        <div className="post-likes">
                            <p><span>{item.like}</span> lượt thích</p>
                        </div>
                    </div>
                    {/* caption */}
                    <div className="post-caption">
                        <div className="pos-caption-user">
                            <span className='username'>
                                <p>{item.username}</p>
                            </span>
                            <span className='caption'>
                                {item.cap}
                            </span>
                        </div>
                        <p className="post-caption-time">
                            <span>{item.day}</span> ngày trước
                        </p>
                    </div>
                    <div className="post-comment">
                        <form onSubmit={handleSubmit}>
                            <span style={{ position: 'relative' }}>
                                <i className="fa-regular fa-face-smile" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
                                {showEmojiPicker && (
                                    <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
                                )}
                            </span>
                            <input type="text" value={describe} placeholder="Thêm bình luận..." onChange={handleChange} />
                            <button type='submit' className="btn-post-comment">Đăng</button>
                        </form>
                    </div>
                </div>
            ))}
            {showComment && currentPost && (
                <div className='overlay' onClick={cancelShowComment}>
                    <motion.div
                        className='note-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Comment post={currentPost} />
                    </motion.div>
                </div>
            )}
            {showOptions && (
                <div className='overlay' onClick={cancelShowOptions}>
                    <motion.div
                        className='note-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Options oncancel={cancelShowOptions} />
                    </motion.div>
                </div>
            )}
            {showShare && (
                <div className='overlay' onClick={cancelShowShare}>
                    <motion.div
                        className='note-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ShareTo oncancel={cancelShowShare} />
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Post;
