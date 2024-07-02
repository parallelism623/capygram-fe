import './AccountTransfer.scss'
import avt from '../../assets/images/account.png'
import Login2 from './Login2'
import { useState } from 'react'
import { motion } from 'framer-motion';

const AccountTransfer = ({ oncancel }) => {
    const [showLogin2, setShowLogin2] = useState(false);

    const handleShowlogin2 = () => {
        setShowLogin2(true);
    }
    const cancelLogin2 = () => {
        setShowLogin2(false);
    }
    return (
        <div className="account-transfer">
            <div className="header">
                <h3>Chuyển tài khoản</h3>
                <i className="fa-solid fa-xmark" onClick={oncancel}></i>
            </div>
            <div className="content">
                <div className="content-list">
                    <div className="ctl-image">
                        <img src={avt} alt="" />
                    </div>
                    <div className="ctl">
                        <p><h4>hongquan03_04</h4></p>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                </div>
            </div>
            <div className="footer">
                <h4 onClick={handleShowlogin2}>Đăng nhập vào tài khoản hiện có</h4>
            </div>
            {showLogin2 && (
                <div className='overlay' onClick={cancelLogin2}>
                    <motion.div
                        className='note-container'
                        onClick={(e) => e.stopPropagation()}
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Login2 oncancel={cancelLogin2} />
                    </motion.div>
                </div>
            )}
        </div>
    )
}
export default AccountTransfer;