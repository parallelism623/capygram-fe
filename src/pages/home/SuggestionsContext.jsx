// SuggestionsContext.js
import React, { createContext, useState, useEffect } from 'react';
import avt from '../../assets/images/account.png'

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [follow, setFollow] = useState(
        suggestions.reduce((acc, suggestion) => {
            acc[suggestion.id] = false;
            return acc;
        }, {})
    );
    const [hoveredItem, sethoveredItem] = useState({ id: null, type: null });
    const [hoveredProfile, setHoveredProfile] = useState({ id: null, type: null });
    const [isDarkNight, setIsDarkNight] = useState(false);

    const handleToggle = () => {
        setIsDarkNight(!isDarkNight)
    }
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
    useEffect(() => {
        document.body.className = isDarkNight ? 'dark-mode' : 'light-mode';
    }, [isDarkNight]);

    return (
        <SuggestionsContext.Provider value={{ suggestions, setSuggestions, follow, handleFollowClick, handleMouseEnter, handleMouseLeave, handleMouseProfileEnter, handleMouseProfileLeave, hoveredItem, hoveredProfile, isDarkNight, handleToggle }}>
            {children}
        </SuggestionsContext.Provider>
    );
};
