import './Comment.scss'
import avt from '../../assets/images/account.png'
import { useState, useEffect } from 'react'
import Options from './Options'
import ShareTo from '../explore/ShareTo'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { setPost, addComments } from '@/store/formSlice';


const Comment = ({ post }) => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [describe, setDescribe] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const dispatch = useDispatch();

    const comments = useSelector((state) => state.form.comments);

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

    const handleshowOptions = () => {
        setShowOptions(true);
    };

    const cancelShowOptions = () => {
        setShowOptions(false);
    };

    const handleChangeIcons = () => {
        setIcons(!icons);
    };

    const handleChangeBookmark = () => {
        setBookmark(!bookmark);
    };

    return (
        <>
            <div className='comment-container'>
                <div className="comment-image">
                    <img src={post.image} alt="" />
                </div>
                <div className="comment-content">
                    <div className="comment-content-header">
                        <div className="comment-header-left">
                            <div className="comment-header-avt">
                                <img src={post.avatar} alt="" />
                            </div>
                        </div>
                        <div className="comment-header-right">
                            <div className="comment-header-username">
                                <a href="/#">{post.username}</a>
                            </div>
                            <div className="comment-header-option">
                                <span>
                                    <i onClick={handleshowOptions} className="fa-solid fa-ellipsis"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        {comments.map((comment, index) => (
                            <div className="list-comment" key={index}>
                                <div className="cmt-right">
                                    <div className="cmt-image">
                                        <img src={avt} alt="" />
                                    </div>
                                    <div className="cmt">
                                        <div className="cmt-up">
                                            <h5>Hongquan_1103</h5>
                                            <p>{comment}</p>
                                        </div>
                                        <div className="cmt-down">
                                            <p>52 phút</p>
                                            <p>365 lượt thích</p>
                                            <p style={{ cursor: 'pointer' }}>Trả lời</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cmt-left">
                                    <i className="fa-regular fa-heart"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="comment-content-footer">
                        <div className="comment-group-bottom">
                            <div className="icons">
                                <div className="icons-left">
                                    <span>
                                        {!icons ? (
                                            <i className="fa-regular fa-heart" onClick={handleChangeIcons}></i>
                                        ) : (
                                            <i className="fa-solid fa-heart" style={{ color: '#f20d0d', scale: '1.1' }} onClick={handleChangeIcons}></i>
                                        )}
                                    </span>
                                    <span>
                                        <i className="fa-regular fa-comment"></i>
                                    </span>
                                    <span>
                                        <i className="fa-regular fa-paper-plane" onClick={() => setShowShare(true)}></i>
                                    </span>
                                </div>
                                <div className="icons-right">
                                    <span>
                                        {!bookmark ? (
                                            <i className="fa-regular fa-bookmark" onClick={handleChangeBookmark}></i>
                                        ) : (
                                            <i className="fa-solid fa-bookmark" onClick={handleChangeBookmark}></i>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="comment-likes">
                                <p><span>{post.like}</span> lượt thích</p>
                            </div>
                            <p style={{ fontSize: '14px', color: 'gray' }} className="comment-caption-time">
                                <span>{post.day}</span> ngày trước
                            </p>
                        </div>
                        <div className="comment-post">
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
                </div>
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
                    <div className='overlay' onClick={() => setShowShare(false)}>
                        <motion.div
                            className='note-container'
                            onClick={(e) => e.stopPropagation()}
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ShareTo />
                        </motion.div>
                    </div>
                )}

            </div>
        </>
    );
};

export default Comment;
