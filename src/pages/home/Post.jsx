import './Post.scss'
import avt from '../../assets/images/account.png'
import { useState } from 'react'
const Post = () => {
    const [icons, setIcons] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const handleChangeIcons = () => {
        setIcons(!icons);
    }
    const handleChangeBookmark = () => {
        setBookmark(!bookmark);
    }
    return (
        <div className="post-container">
            {/* header */}
            <div className="post-header">
                <div className="post-header-left">
                    <div className="post-header-avt">
                        <img src={avt} alt="" />
                    </div>
                </div>
                <div className="post-header-right">
                    <div className="post-header-username">
                        <a href="/#">Hong_quan_32004</a>
                    </div>
                    <div className="post-header-option">
                        <span>
                            <i className="fa-solid fa-ellipsis"></i>
                        </span>
                    </div>
                </div>
            </div>
            {/* image */}
            <div className="post-image">
                <img src="https://wallpaperaccess.com/full/4175212.jpg" alt="" />
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
                                    <i className="fa-solid fa-heart" style={{ color: '#f20d0d' }} onClick={handleChangeIcons}></i>
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
                <div className="post-likes">
                    <p><span>321000</span> lượt thích</p>
                </div>
            </div>
            {/* caption */}
            <div className="post-caption">
                <div className="pos-caption-user">
                    <span className='username'>
                        <p>Hong_quan_32004</p>
                    </span>
                    <span className='caption'>
                        Strongest squad you've ever known?
                    </span>
                </div>
                <p className="post-caption-time">
                    <span>1</span> ngày trước
                </p>
            </div>
            {/* comments */}
            <div className="post-comment">
                <form>
                    <span>
                        <i className="fa-regular fa-face-smile"></i>
                    </span>
                    <input type="text" placeholder="Thêm bình luận..." />
                    <button className="btn-post-comment">Đăng</button>
                </form>
            </div>

        </div>
    )
}
export default Post