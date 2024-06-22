import './Menu.scss'
import logoCapyGram from "../..//assets/images/logoCapyGram.png";
import { useLocation, useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';



const Menu = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('menu');

    const location = useLocation();

    return (
        <div className="menu">
            <div className="menu-container">
                <div className="menu-container-image">
                    <img src={logoCapyGram} onClick={() => navigate("/")} alt="" />
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
                            <div className="list">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <p>{t('text2')}</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
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
                            <div className={`list ${location.pathname === '/notifications' ? 'active' : ''}`} onClick={() => navigate("/notifications")}>
                                <i className="fa-regular fa-heart"></i>
                                <p>{t('text6')}</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
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
                            <div className={`list ${location.pathname === '/threads' ? 'active' : ''}`} onClick={() => navigate("/threads")}>
                                <i className="fa-brands fa-threads"></i>
                                <p>{t('text9')}</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i className="fa-solid fa-bars"></i>
                                <p>{t('text10')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Menu