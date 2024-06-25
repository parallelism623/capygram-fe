import './Comment.scss'
import avt from '../../assets/images/account.png'
import { useState } from 'react'
import Options from './Options'
import { motion } from 'framer-motion';
const Comment = () => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

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
                        <form>
                            <span>
                                <i className="fa-regular fa-face-smile"></i>
                            </span>
                            <input type="text" placeholder="Thêm bình luận..." />
                            <button className="btn-post-comment">Đăng</button>
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