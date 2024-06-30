import './Comment.scss'
import avt from '../../assets/images/account.png'
import { useState } from 'react'
import Options from './Options'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

import { setPost, setStep, addComments } from '@/store/formSlice';
const Comment = () => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [describe, setDescribe] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch();

    const comments = useSelector((state) => state.form.comments)

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
        <div className='comment-container'>
            <div className="comment-image">
                <img src="https://wallpaperaccess.com/full/4175212.jpg" alt="" />
            </div>
            <div className="comment-content">
                <div className="comment-content-header">
                    <div className="comment-header-left">
                        <div className="comment-header-avt">
                            <img src={avt} alt="" />
                        </div>
                    </div>
                    <div className="comment-header-right">
                        <div className="comment-header-username">
                            <a href="/#">Hong_quan_32004</a>
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
                        <div className="list-comment">
                            <div className="cmt-up">
                                <h5>Hongquan_1103</h5>
                                <p key={index}>{comment}</p>
                            </div>
                            <div className="cmt-down">
                                <p>52 phút</p>
                                <p>365 lượt thích</p>
                                <p>Trả lời</p>
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
                                    ) :
                                        (
                                            <i className="fa-solid fa-heart" style={{ color: '#f20d0d', scale: '1.1' }} onClick={handleChangeIcons}></i>
                                        )}

                                </span>
                                <span>
                                    <i className="fa-regular fa-comment"></i>
                                </span>
                                <span>
                                    <i className="fa-regular fa-paper-plane"></i>
                                </span>
                            </div>
                            <div className="icons-right">
                                <span>
                                    {!bookmark ? (
                                        <i class="fa-regular fa-bookmark" onClick={handleChangeBookmark}></i>
                                    )
                                        : (<i class="fa-solid fa-bookmark" onClick={handleChangeBookmark}></i>)
                                    }

                                </span>
                            </div>
                        </div>
                        <div className="comment-likes">
                            <p><span>321000</span> lượt thích</p>
                        </div>
                        <p style={{ fontSize: '14px', color: 'gray' }} className="comment-caption-time">
                            <span>1</span> ngày trước
                        </p>
                    </div>
                    {/* comments */}
                    <div className="comment-post">
                        <form onSubmit={handleSubmit}>
                            <span style={{ position: 'relative' }}>
                                <i className="fa-regular fa-face-smile" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
                                {
                                    showEmojiPicker && (
                                        <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
                                    )
                                }
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
        </div>
    )
}
export default Comment;