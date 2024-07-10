import './SwitchMode.scss'
import React, { useState } from 'react';
const SwitchMode = ({ onBack }) => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
        <div className={`switch-mode ${toggle ? 'swm' : ''}`} >
            <div className="switch-mode-header">
                <div className="back" onClick={onBack}>
                    <i className="fa-solid fa-chevron-left" ></i>
                </div>
                <div className="content-header">
                    <p>Chuyển chế độ</p>
                    {!toggle ? (<i className="fa-regular fa-sun"></i>) :
                        (<i className="fa-regular fa-moon" style={{ color: 'white' }}></i>)
                    }

                </div>
            </div>
            <div className={`switch-mode-content`}>
                <p>Chế độ tối</p>
                <div className={`toggle ${toggle ? "tg" : ''}`} onClick={handleToggle}>
                    <div className={`toggle-btn ${toggle ? "disable" : ''}`} ></div>
                </div>
            </div>
        </div>
    )
}
export default SwitchMode;