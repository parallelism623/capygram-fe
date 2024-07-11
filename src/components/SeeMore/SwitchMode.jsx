import './SwitchMode.scss'
import React, { useContext, useState } from 'react';
import { SuggestionsContext } from '@/pages/home/SuggestionsContext';
const SwitchMode = ({ onBack }) => {

    const { isDarkNight, handleToggle } = useContext(SuggestionsContext);


    return (
        <div className={`switch-mode ${isDarkNight ? 'swm' : ''}`} >
            <div className="switch-mode-header">
                <div className="back" onClick={onBack}>
                    <i className="fa-solid fa-chevron-left" ></i>
                </div>
                <div className="content-header">
                    <p>Chuyển chế độ</p>
                    {!isDarkNight ? (<i className="fa-regular fa-sun"></i>) :
                        (<i className="fa-regular fa-moon" style={{ color: 'white' }}></i>)
                    }

                </div>
            </div>
            <div className={`switch-mode-content`}>
                <p>Chế độ tối</p>
                <div className={`toggle ${isDarkNight ? "tg" : ''}`} onClick={handleToggle}>
                    <div className={`toggle-btn ${isDarkNight ? "disable" : ''}`} ></div>
                </div>
            </div>
        </div>
    )
}
export default SwitchMode;