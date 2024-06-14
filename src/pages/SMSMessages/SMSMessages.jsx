import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SMSMessages.scss"

const SMSMessages = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const handleOtherLogin = () => {
        setShowLogout(true);
    }
    const handleCancelLogout = () => {
        setShowLogout(false);
    };
    return (
        <div className="SMSMessages">
            <div className="SMSMessages-container">
                <div className="sms-header">
                    <div className="sms-header-content">
                        <p style={{ cursor: "pointer" }} className="p-login" onClick={() => navigate("/ft/login")}>Capygram</p>
                        <p style={{ cursor: "pointer" }} onClick={handleOtherLogin}>Đăng nhập bằng tài khoản khác</p>
                    </div>
                </div>
                <div className="sms-content">
                    <div className="sms-form">
                        <div className="sms-form-content">
                            <div className="Form">
                                <h3>Đã gửi SMS</h3>
                                <p>Chúng tôi đã gửi SMS đến số +84 ** *** ** <br /> 60 kèm theo liên kết để đăng nhập lại <br /> tài khoản của bạn.</p>
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
                            <h3>Đăng xuất?</h3>
                            <p>Bạn có chắc chắn muốn đăng xuất tài khoản không?</p>
                        </div>
                        <div className="Logout-button">
                            <p onClick={() => navigate("/ft/login")}>Đăng xuất</p>
                        </div>
                        <div className="Logout-button1">
                            <p onClick={handleCancelLogout}>Hủy</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
export default SMSMessages;