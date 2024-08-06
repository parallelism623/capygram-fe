/* eslint-disable */
import './Post.scss'
import avt from '../../assets/images/account.png'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Carousel } from 'antd';
import Options from './Options'
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { newsFeed } from '@/api/authApi/newsfeed';
import ShareTo from '../explore/ShareTo';
import { useNavigate } from 'react-router-dom';


import { setPost, setStep, addComments } from '@/store/formSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFollowing } from '@/api/authApi/graph';

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
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getPost = async () => {
            const id = localStorage.getItem('userId');
            try {
                const posts = await newsFeed(id, limit);
                // const followingUsers = await getFollowing(id);
                // console.log("following", followingUsers);

                console.log("newfeed", posts.data); // Đảm bảo post chứa dữ liệu đúng
                if (posts.data.length > 0) {
                    setPost(prev => page === 1 ? posts.data : [...prev, ...posts.data]);
                    setTotal(posts.total);
                    setHasMore(posts.data.length + post.length < posts.total);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu bài đăng", error);
            }
        }
        getPost();
    }, [page]);


    const fetchMore = () => {
        if (post.length >= total) {
            setHasMore(false);
            return;
        }
        else {
            setPage(page + 1);
        }
    }
    const navigate = useNavigate();

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
    const handleClickProfileUser = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <InfiniteScroll
            dataLength={post.length}
            next={fetchMore}
            hasMore={true}
        >
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
                                    <p onClick={() => handleClickProfileUser(post.id)}>{item.userName}</p>
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
                            <div className="i">
                                <Carousel arrows infinite={false} >
                                    {item.imageUrls.map((imgSrc, imgId) => (
                                        <div className="image-slider">
                                            <img key={imgId} src={imgSrc} alt="" />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
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
                                <p><span>{item.likes}</span> lượt thích</p>
                            </div>
                        </div>
                        {/* caption */}
                        <div className="post-caption">
                            <div className="pos-caption-user">
                                <span className='username'>
                                    <p>{item.username}</p>
                                </span>
                                <span className='caption'>
                                    {item.content}
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
        </InfiniteScroll>
    )
}

export default Post;
