import { useEffect, useState } from 'react';
import './SeeAll.scss'
import avt from '../../assets/images/account.png'
import LayoutFooter from '@/layouts/LayoutFooter';
const SeeAll = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [hoveredItem, sethoveredItem] = useState({ id: null, type: null });
    const [hoveredProfile, setHoveredProfile] = useState({ id: null, type: null });
    const [follow, setFollow] = useState(
        suggestions.reduce((acc, suggestion) => {
            acc[suggestion.id] = false;
            return acc;
        }, {})
    );
    const handleFollowClick = (id) => {
        setFollow({
            ...follow,
            [id]: !follow[id]
        }
        )
        console.log(follow)
    };
    const handleMouseEnter = (id, type) => {
        sethoveredItem({ id, type })
    };
    const handleMouseLeave = (id, type) => {
        sethoveredItem({ id: null, type: null });
    };
    const handleMouseProfileEnter = (id, type) => {
        setHoveredProfile({ id, type });
    };

    const handleMouseProfileLeave = () => {
        setHoveredProfile({ id: null, type: null });
    };





    useEffect(() => {
        const fetchSuggestions = async () => {
            const data = [
                { id: 1, username: 'feewwer28', name: 'Huong Thanh', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 2, username: '_n.m.cng_', name: 'nmcuong', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 3, username: 'swt.dt26', name: 'swt.dt26', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 4, username: 'ptlinnnn', name: 'ptlinnnn', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 5, username: 'truongyenhi1711', name: 'Nhi Trương', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 6, username: '_trancaocuong_', name: 'Trần Cường ©', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 7, username: 'trungkienp_29', name: 'Phạm Trung Kiên', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 8, username: '20pta', name: 'Thuy An', status: 'Gợi ý cho bạn', avatar: avt },
                { id: 9, username: 'sunni_1709', name: 'Bông', status: 'Mới tham gia Instagram', avatar: avt },
            ];

            setSuggestions(data);
        };

        fetchSuggestions();
    }, []);
    return (
        <div className='see-all'>
            <div className="see-all-container">
                <h2>Gợi ý</h2>
                {suggestions.map((item, index) => (
                    <div className='suggestions' key={index}>
                        <div className='sgt-image'>
                            <img src={item.avatar} alt="" onMouseEnter={() => handleMouseEnter(item.id, 'img')} onMouseLeave={handleMouseLeave} />
                            {(hoveredItem.id === item.id && hoveredItem.type === 'img') || (hoveredProfile.id === item.id && hoveredProfile.type === 'img') ? (
                                <div className='profile' onMouseEnter={() => handleMouseProfileEnter(item.id, 'img')} onMouseLeave={handleMouseProfileLeave}>
                                    <div className="profile-container">
                                        <div className="profile-header">
                                            <div className="header-up">
                                                <div className="header-up-image">
                                                    <img src={avt} alt="" />
                                                </div>
                                                <div className="header-up-right">
                                                    <p style={{ fontWeight: 'bold' }}>{item.username}</p>
                                                    <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                                </div>
                                            </div>
                                            <div className="header-down">
                                                <div className="header-down-content">
                                                    <p style={{ fontWeight: 'bold' }}>0</p>
                                                    <p>bài viết</p>
                                                </div>
                                                <div className="header-down-content">
                                                    <p style={{ fontWeight: 'bold' }}>63</p>
                                                    <p>người theo dõi</p>
                                                </div>
                                                <div className="header-down-content">
                                                    <p style={{ fontWeight: 'bold' }}>30</p>
                                                    <p>đang theo dõi</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-content">

                                        </div>
                                        <div className="profile-footer">
                                            <button><i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi</button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="sgt-ct">
                            <div className="sgt-ct-left">
                                <div className="p-hover">
                                    <p style={{ fontWeight: 'bold', cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter(item.id, 'username')} onMouseLeave={handleMouseLeave}>{item.username}</p>
                                    {(hoveredItem.id === item.id && hoveredItem.type === 'username') || (hoveredProfile.id === item.id && hoveredProfile.type === 'username') ? (
                                        <div className='profile' onMouseEnter={() => handleMouseProfileEnter(item.id, 'username')} onMouseLeave={handleMouseProfileLeave}>
                                            <div className="profile-container">
                                                <div className="profile-header">
                                                    <div className="header-up">
                                                        <div className="header-up-image">
                                                            <img src={item.avatar} alt="" />
                                                        </div>
                                                        <div className="header-up-right">
                                                            <p style={{ fontWeight: 'bold' }}>{item.username}</p>
                                                            <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="header-down">
                                                        <div className="header-down-content">
                                                            <p style={{ fontWeight: 'bold' }}>0</p>
                                                            <p>bài viết</p>
                                                        </div>
                                                        <div className="header-down-content">
                                                            <p style={{ fontWeight: 'bold' }}>63</p>
                                                            <p>người theo dõi</p>
                                                        </div>
                                                        <div className="header-down-content">
                                                            <p style={{ fontWeight: 'bold' }}>30</p>
                                                            <p>đang theo dõi</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="profile-content">

                                                </div>
                                                <div className="profile-footer">
                                                    {!follow[item.id] ? (<button className='button1' onClick={() => handleFollowClick(item.id)}><i className="fa-solid fa-user-plus" style={{ color: 'white' }}></i> Theo dõi</button>)
                                                        : (<div className='profile-footer-container'>
                                                            <button className='button2'>Nhắn tin</button>
                                                            <button className='button3' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                                        </div>)
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <p style={{ fontSize: '15px', color: 'gray' }}>{item.name}</p>
                                <p style={{ fontSize: '15px', color: 'gray' }}>{item.status}</p>
                            </div>
                            <div className="sgt-ct-right">
                                {!follow[item.id] ? (<button className='button1' onClick={() => handleFollowClick(item.id)}>Theo dõi</button>)
                                    : (
                                        <button className='button2' onClick={() => handleFollowClick(item.id)}>Đang theo dõi</button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))}
                <LayoutFooter />
            </div>
        </div>
    )
}
export default SeeAll;