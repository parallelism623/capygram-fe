import './Menu.scss'
import logoCapyGram from "../../../public/images/logoCapyGram.png";
import { useNavigate } from 'react-router-dom';



const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className="menu">
            <div className="menu-container">
                <div className="menu-container-image">
                    <img src={logoCapyGram} onClick={() => navigate("/")} alt="" />
                </div>
                <div className="menu-container-content">
                    <ul>
                        <li>
                            <div className="list" onClick={() => navigate("/")}>
                                <i class="fa-solid fa-house"></i>
                                <p >Trang chủ</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <p>TÌm kiếm</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i class="fa-regular fa-compass"></i>
                                <p>Khám phá</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={() => navigate("/reel")}>
                                <i class="fa-solid fa-film"></i>
                                <p>Reels</p>
                            </div>

                        </li>
                        <li>
                            <div className="list" onClick={() => navigate("/messages")}>
                                <i class="fa-brands fa-facebook-messenger"></i>
                                <p>Tin nhắn</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={() => navigate("/notifications")}>
                                <i class="fa-regular fa-heart"></i>
                                <p>Thông báo</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i class="fa-regular fa-square-plus"></i>
                                <p>Tạo</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={() => navigate("/profile")}>
                                <i class="fa-solid fa-user"></i>
                                <p>Trang cá nhân</p>
                            </div>
                        </li>
                        <li>
                            <div className="list" onClick={() => navigate("/threads")}>
                                <i class="fa-brands fa-threads"></i>
                                <p>Threads</p>
                            </div>
                        </li>
                        <li>
                            <div className="list">
                                <i class="fa-solid fa-bars"></i>
                                <p>Xem thêm</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Menu