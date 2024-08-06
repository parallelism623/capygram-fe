/* eslint-disable */
// SuggestionsContext.js
import React, { createContext, useState, useEffect } from 'react';
import avt from '../../assets/images/account.png'
import { getFollowing } from '@/api/authApi/graph';
import { getUserById } from '@/api/authApi/auth';

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [suggestUser, setSuggestUser] = useState([]);

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

            //folowing: những người mk follow
            //follower: những người follow mk
            const id = localStorage.getItem('userId');
            const followingUsers = await getFollowing(id);
            setFollowingUsers(followingUsers);
            followingUsers.forEach(userId => {
                const getFollowingUsers = async () => {
                    const followingOfFollowing = await getFollowing(userId);
                    return followingOfFollowing;
                };
                setSuggestions([...suggestions, ...getFollowingUsers()]);
            });

            //log ra mảng gồm id của susggestion
            console.log("suggestions", suggestions);

            suggestions.forEach(suggestion => {
                const getInfoUserSuggestions = async () => {
                    const user = await getUserById(suggestion);
                    return user;
                };
                setSuggestUser([...suggestUser, getInfoUserSuggestions()]);
            });

            //log ra mảng gồm info user của suggestion
            console.log("suggestUser", suggestUser);
                
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
