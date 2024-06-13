import { useTranslation } from "react-i18next";
import "./FooterLogin.scss"
import '@/i18n';

const FooterLogin = () => {
    const { i18n } = useTranslation();
    
    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="FooterLogin">
            <div className="select-language">
                <select onChange={changeLanguage}>
                    <option value="vi">Tiếng việt</option>
                    <option value="en">Tiếng anh</option>
                </select>
            </div>
            <div className="c-capygram">
                <i className="fa-regular fa-copyright"></i>
                <p>2024 Capygram from HIT</p>
            </div>
        </div>
    )
}
export default FooterLogin