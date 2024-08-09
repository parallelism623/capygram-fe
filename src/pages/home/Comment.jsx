import './Comment.scss'
import avt from '../../assets/images/account.png'
import { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import Options from './Options'
import ShareTo from '../explore/ShareTo'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import React from 'react';



const Comment = ({ post }) => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [input, setInput] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [loved, setLoved] = useState(false);
    const [user, setUser] = useState({});
    const [isRender, setIsRender] = useState(false)


    const inputRef = React.createRef();
    const me = useSelector((state) => state.user);
    const addEmoji = (event, emojiObject) => {
        const emoji = event.emoji;
        const { selectionStart, selectionEnd } = inputRef.current;
        const start = input.substring(0, selectionStart);
        const end = input.substring(selectionEnd, input.length);
        const updateInput = start + emoji + end;
        setInput(updateInput);
        inputRef.current.focus();
    };
    useEffect(() => {
        const getData = async () => {
            const getComments = JSON.parse(localStorage.getItem('comments')) || [];

            const postComments = getComments.filter(comment => comment.postId === post.id);

            setComments(postComments);

            const res = await getUserById(post.userId);
            setUser(res);
        }

        getData();
    }, [post.id, isRender]);

    const handleSend = () => {
        if (input.trim() !== '') {
            const newComment = {
                user: me,
                comment: input.trim(),
                postId: post.id,
            };

            const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

            storedComments.push(newComment);

            const commentsPost = storedComments.filter(comment => comment.postId === post.id);

            localStorage.setItem('comments', JSON.stringify(storedComments));

            setComments(commentsPost);
            setInput('');
        }
    };




    const navigate = useNavigate();

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
    const handleClickProfileUser = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <>
            <div className='comment-container'>
                <div className="comment-image">
                    <div className="i">
                        <Carousel arrows infinite={false} >
                            {post.imageUrls.map((imgSrc, imgId) => (
                                <div className="image-slider">
                                    <img key={imgId} src={imgSrc} alt="" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
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
                                <p onClick={() => handleClickProfileUser(post.userId)}>{post.userName}</p>
                            </div>
                            <div className="comment-header-option">
                                <span>
                                    <i onClick={handleshowOptions} className="fa-solid fa-ellipsis"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        {
                            Array.isArray(comments) && comments.map((comment, index) => (
                                <div className='comment-item' key={index}>
                                    <div className='info-user-comment'>
                                        <img src={comment.user.avatarUrl !== ('string' && '') ? comment.user.avatarUrl : account} alt='avatar-info-user-comment' />
                                    </div>
                                    <div className='content-comment'>
                                        <p><b>{comment.user.username}</b></p>
                                        <p style={{ padding: '0px 10px' }}>{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
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
                                <p>{post.content}</p>
                                <p><span>{post.likes}</span> lượt thích</p>
                            </div>
                            <p style={{ fontSize: '14px', color: 'gray' }} className="comment-caption-time">
                                <span>{post.day}</span> ngày trước
                            </p>
                        </div>
                        <div className="comment-post">
                            <form >
                                <span style={{ position: 'relative' }}>
                                    <i className="fa-regular fa-face-smile" onClick={() => setShowEmoji(!showEmoji)}></i>
                                    {
                                        showEmoji && (
                                            <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
                                        )
                                    }
                                </span>
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onClick={() => setShowEmoji(false)} ref={inputRef} placeholder="Thêm bình luận..." />
                                <p className="btn-post-comment" onClick={handleSend}>Đăng</p>
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
