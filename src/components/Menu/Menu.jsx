import './Menu.scss'
import logoCapyGram from "../..//assets/images/logoCapyGram.png";
import { useLocation, useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../search/Search';
import Post from '@/pages/post/Post';
import { setPost, setStep } from '@/store/formSlice';
import Confirm from '@/pages/post/confirmIdentity/Confirm';
import SeeMore from '../SeeMore/SeeMore';

const Menu = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('menu');
    const [showSearch, setShowSearch] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);

    const location = useLocation();

    const dispatch = useDispatch();
    const step = useSelector((state) => state.form.step);
    const post = useSelector((state) => state.form.post);

    const handleShowCreatePost = () => {
        setShowCreatePost(true);
        dispatch(setStep(1));
    };
    const handleCancleSeeMore = () => {
        setShowSeeMore(false);
    }

    const handleCancelCreatePost = () => {
        setShowCreatePost(false);
    };

    const handleClickOverlayCreatePost = () => {
        if ((step === 1 && post.imageOrVideo === '') || step === 3) {
            handleCancelCreatePost();
        } else {
            setShowConfirm(true);
        }
    };

    const handleCancelConfirm = (message) => {
        if (message === 'huy') {
            setShowConfirm(false);
        }

        if (message === "bo") {
            dispatch(setPost({ imageOrVideo: '', description: '' }));
            setShowConfirm(false);
            handleCancelCreatePost();
        }
    };
    const handleShowSearch = () => {
        setShowSearch(prevShowSearch => !prevShowSearch);
        console.log(showSearch);
    };

    return (
        <>
            <div className="menu">
                <div className="menu-container">
                    <div className="menu-container-image">
                        <img src={logoCapyGram} alt="" />
                    </div>
                    <div className="menu-container-content">
                        <ul>
                            <li>
                                <div className={`list ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate("/")}>
                                    <i className="fa-solid fa-house"></i>
                                    <p>{t('text1')}</p>
                                </div>
                            </li>
                            <li>
                                <div className="list none" onClick={handleShowSearch}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <p>{t('text2')}</p>
                                </div>
                            </li>
                            <li>
                                <div className={`list ${location.pathname === '/explore' ? 'active' : ''}`} onClick={() => navigate('/explore')}>
                                    <i className="fa-regular fa-compass"></i>
                                    <p>{t('text3')}</p>
                                </div>
                            </li>
                            <li>
                                <div className={`list ${location.pathname === '/reel' ? 'active' : ''}`} onClick={() => navigate("/reel")}>
                                    <i className="fa-solid fa-film"></i>
                                    <p>{t('text4')}</p>
                                </div>

                            </li>
                            <li>
                                <div className={`list ${location.pathname === '/messages' ? 'active' : ''}`} onClick={() => navigate("/messages")}>
                                    <i className="fa-brands fa-facebook-messenger"></i>
                                    <p>{t('text5')}</p>
                                </div>
                            </li>
                            <li>
                                <div className={`list none ${location.pathname === '/notifications' ? 'active' : ''}`} onClick={() => navigate("/notifications")}>
                                    <i className="fa-regular fa-heart"></i>
                                    <p>{t('text6')}</p>
                                </div>
                            </li>
                            <li>
                                <div className="list" onClick={handleShowCreatePost}>
                                    <i className="fa-regular fa-square-plus"></i>
                                    <p>{t('text7')}</p>
                                </div>
                            </li>
                            <li>
                                <div className={`list ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate("/profile")}>
                                    <i className="fa-solid fa-user"></i>
                                    <p>{t('text8')}</p>
                                </div>
                            </li>
                            <li>
                                <div className={`list none ${location.pathname === '/threads' ? 'active' : ''}`} onClick={() => navigate("/threads")}>
                                    <i className="fa-brands fa-threads"></i>
                                    <p>{t('text9')}</p>
                                </div>
                            </li>
                            <li>
                                <div className="list none" onClick={() => setShowSeeMore(true)}>
                                    <i className="fa-solid fa-bars"></i>
                                    <p>{t('text10')}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {showSearch && (
                <div className={`overlay ${showSearch ? 'show' : ''}`} onClick={() => setShowSearch(false)}>
                    <motion.div
                        className='box-search-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Search />
                    </motion.div>
                </div>
            )}

            {
                showCreatePost && (
                    <div className='overlayCreate' onClick={handleClickOverlayCreatePost}>
                        <motion.div
                            className='box-create-post'
                            onClick={(e) => e.stopPropagation()}
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Post />
                        </motion.div>
                    </div>
                )
            }

            {
                showConfirm && (
                    <div className='overlayCreate' onClick={() => setShowConfirm(false)}>
                        <motion.div
                            className='box-create-post'
                            onClick={(e) => e.stopPropagation()}
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Confirm onCancel={handleCancelConfirm} />
                        </motion.div>
                    </div>
                )
            }
            {showSeeMore && (
                <div className='overlay-more' onClick={handleCancleSeeMore}>
                    <motion.div
                        className='box-seemore-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 100 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SeeMore onCanclesm={handleCancleSeeMore} />
                    </motion.div>
                </div>
            )}
            <div className='menu2'>
                <div className="menu-container-content">
                    <ul>
                        <li>
                            <div className={`list ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate("/")}>
                                <i className="fa-solid fa-house"></i>
                                <p>{t('text1')}</p>
                            </div>
                        </li>

                        <li>
                            <div className={`list ${location.pathname === '/explore' ? 'active' : ''}`} onClick={() => navigate("/explore")}>
                                <i className="fa-regular fa-compass"></i>
                                <p>{t('text3')}</p>
                            </div>
                        </li>
                        <li>
                            <div className={`list ${location.pathname === '/reel' ? 'active' : ''}`} onClick={() => navigate("/reel")}>
                                <i className="fa-solid fa-film"></i>
                                <p>{t('text4')}</p>
                            </div>

                        </li>
                        <li>
                            <div className={`list ${location.pathname === '/messages' ? 'active' : ''}`} onClick={() => navigate("/messages")}>
                                <i className="fa-brands fa-facebook-messenger"></i>
                                <p>{t('text5')}</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={handleShowCreatePost}>
                                <i className="fa-regular fa-square-plus"></i>
                                <p>{t('text7')}</p>
                            </div>
                        </li>
                        <li>
                            <div className={`list ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate("/profile")}>
                                <i className="fa-solid fa-user"></i>
                                <p>{t('text8')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='menu2-top'>
                <img src={logoCapyGram} alt='logo' />
                <div className='box-search-top'>
                    <input placeholder={t('search')} onClick={() => setShowSearch(!showSearch)} className={showSearch ? 'not-show-search' : ''} />
                    <i className="fa-regular fa-heart"></i>
                </div>
            </div>
        </>
    )
}
export default Menu