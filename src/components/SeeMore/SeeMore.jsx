import './SeeMore.scss'
import React, { useState } from 'react';
import AccountTransfer from '@/pages/home/AccountTransfer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SwitchMode from './SwitchMode';

const SeeMore = ({ onCanclesm }) => {
    const [showacctransfer, setshowacctransfer] = useState(false);
    const [showSwitchMode, setShowSwitchMode] = useState(false);
    const handleshowacctransfer = () => {
        setshowacctransfer(true);
    }
    const cancleshowacctransfer = () => {
        setshowacctransfer(false);
    }
    const handleShowSwitchMode = () => {
        setShowSwitchMode(true);

    }
    const cancleShowSwitchMode = () => {
        setShowSwitchMode(false);
        onCanclesm();
    }
    const navigate = useNavigate();
    return (
        <>
            {!showSwitchMode && (
                <div className='see-more'>
                    <ul>
                        <li>
                            <div className='list' onClick={() => navigate('/edit-profile')}>
                                <i className="fa-solid fa-gear"></i>
                                <p>Cài đặt</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i className="fa-regular fa-clock"></i>
                                <p>Hoạt động của bạn</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i className="fa-regular fa-bookmark"></i>
                                <p>Đã lưu</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={handleShowSwitchMode} >
                                <i className="fa-solid fa-circle-half-stroke"></i>
                                <p>Chuyển chế độ</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i class="fa-solid fa-circle-exclamation"></i>
                                <p>Báo cáo sự cố</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={handleshowacctransfer}>
                                <p>Chuyển tài khoản</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <p>Đăng xuất</p>
                            </div>
                        </li>
                    </ul>
                    {showacctransfer && (
                        <div className='overlay' onClick={cancleshowacctransfer}>
                            <motion.div
                                className='note-container'
                                onClick={(e) => e.stopPropagation()}
                                animate={{ opacity: 1, scale: 1 }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AccountTransfer oncancel={cancleshowacctransfer} />
                            </motion.div>
                        </div>
                    )}

                </div>
            )}
            {showSwitchMode && (
                <div className='overlay-sm' onClick={cancleShowSwitchMode}>
                    <motion.div
                        className='sm-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SwitchMode onBack={() => setShowSwitchMode(false)} />
                    </motion.div>
                </div>
            )}
        </>
    )
}
export default SeeMore;