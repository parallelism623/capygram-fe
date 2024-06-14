import { useNavigate } from "react-router-dom"
import "./VerifyAccount.scss"
import { useState } from "react";

const VerifyAccount = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const handleOtherLogin = () => {
        setShowLogout(true);
    }
    const handleCancelLogout = () => {
        setShowLogout(false);
    };

    return (
        <div className="verify-account">

            <div className="verify-account-container">

                <div className="va-header">
                    <div className="va-header-content">
                        <p className="p-login" onClick={() => navigate("/ft/login")}>Capygram</p>
                        <p style={{ cursor: "pointer" }} onClick={handleOtherLogin}>Đăng nhập bằng tài khoản khác</p>
                    </div>
                </div>
                <div className="va-content">
                    <div className="va-form">
                        <div className="va-form-content">
                            <div className="Form">
                                <h1>Xác nhận đúng là bạn đang <br /> đăng nhập</h1>
                                <p className="p">Chúng tôi đã đăng xuất bạn do phát hiện thấy <br /> hoạt động bất thường trên tài khoản của bạn.</p>
                                <p className="p">Trong 1 ngày tới, hãy thực hiện các bước tiếp <br /> theo để chúng tôi tìm cách giúp bạn lấy lại <br /> quyền truy cập vào tài khoản trước khi tài<br /> khoản bị vô hiệu hóa.</p>
                                <div className="capcha">
                                    <input type="checkbox" />
                                </div>
                                <p className="p1">Đây là cách để chúng tôi chống lại hành vi có hại, phát hiện <br /> và ngăn chặn spam, đồng thời duy trì tính toàn vẹn <br /> cho Sản phẩm của mình.
                                    <br /> <br />
                                    Chúng tôi đã sử dụng sản phẩm reCAPTCHA Enterprise <br /> của Google cho bước kiểm tra bảo mật này. Khi dùng <br /> reCAPTCHA Enterprise, bạn phải tuân thủ Chính sách <br /> quyền riêng tư và Điều khoản sử dụng của Google.
                                    <br /> <br />
                                    reCAPTCHA Enterprise thu thập thông tin về phần cứng <br /> và phần mềm, chẳng hạn như dữ liệu thiết bị và ứng <br /> dụng, rồi gửi cho Google để cung cấp, duy trì và cải <br /> thiện reCAPTCHA Enterprise cũng như phục vụ các mục <br /> đích bảo mật chung. Google không dùng thông tin này <br /> để cá nhân hóa quảng cáo.</p>
                            </div>
                            <div className="countinue">
                                <button>Tiếp tục</button>
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
export default VerifyAccount