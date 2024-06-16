import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SMSMessages.scss";
import '@/i18n';
import { useTranslation } from 'react-i18next';

const SMSMessages = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const handleOtherLogin = () => {
        setShowLogout(true);
    }
    const handleCancelLogout = () => {
        setShowLogout(false);
    };
    const { t } = useTranslation('sms_messages');

    return (
        <div className="SMSMessages">
            <div className="SMSMessages-container">
                <div className="sms-header">
                    <div className="sms-header-content">
                        <p style={{ cursor: "pointer" }} className="p-login" onClick={() => navigate("/ft/login")}>Capygram</p>
                        <p style={{ cursor: "pointer" }} onClick={handleOtherLogin}>{t('text1')}</p>
                    </div>
                </div>
                <div className="sms-content">
                    <div className="sms-form">
                        <div className="sms-form-content">
                            <div className="Form">
                                <h3>{t('h3-1')}</h3>
                                <p style={{ whiteSpace: "pre-line" }}>{t('text2')}</p>
                                <p className="ok" onClick={() => navigate("/ft/reset-password")}>OK</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {showLogout && (
                <div className="Logout">
                    <div className="Logout-container">
                        <div className="Logout-container-header">
                            <h3>{t('h3')}</h3>
                            <p>{t('text3')}</p>
                        </div>
                        <div className="Logout-button">
                            <p onClick={() => navigate("/ft/login")}>{t('text4')}</p>
                        </div>
                        <div className="Logout-button1">
                            <p onClick={handleCancelLogout}>{t('text5')}</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
export default SMSMessages;