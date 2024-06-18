import { useNavigate } from "react-router-dom"
import "./VerifyAccount.scss"
import { useState } from "react";
import '@/i18n';
import { useTranslation } from 'react-i18next';


const VerifyAccount = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const [isChecked, setIschecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setIschecked(e.target.checked);
    }

    const handleOtherLogin = () => {
        setShowLogout(true);
    }
    const handleCancelLogout = () => {
        setShowLogout(false);
    };


    const { t } = useTranslation('verify_account');

    return (
        <div className="verify-account">

            <div className="verify-account-container">

                <div className="va-header">
                    <div className="va-header-content">
                        <p style={{ cursor: "pointer" }} className="p-login" onClick={() => navigate("/ft/login")}>Capygram</p>
                        <p style={{ cursor: "pointer" }} onClick={handleOtherLogin}>{t('text1')}</p>
                    </div>
                </div>
                <div className="va-content">
                    <div className="va-form">
                        <div className="va-form-content">
                            <div className="Form">
                                <h1 style={{ whiteSpace: "pre-line" }}>{t('h1')}</h1>
                                <p style={{ whiteSpace: "pre-line" }} className="p">{t('text2')}</p>
                                <p style={{ whiteSpace: "pre-line" }} className="p">{t('text3')}</p>
                                <div className="capcha">
                                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                    <p>Bạn hãy tích vào ô để xác nhận</p>
                                </div>
                                <p style={{ whiteSpace: "pre-line" }} className="p1">{t('text4')}</p>
                            </div>
                            <div className="countinue">
                                <button className={`${isChecked ? "form-button" : "form-button2"}`} disabled={!isChecked} onClick={() => navigate('/sms-messages')}>{t('button')}</button>
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
                            <p>{t('text5')}</p>
                        </div>
                        <div className="Logout-button">
                            <p onClick={() => navigate("/ft/login")}>{t('text6')}</p>
                        </div>
                        <div className="Logout-button1">
                            <p onClick={handleCancelLogout}>{t('text7')}</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
export default VerifyAccount