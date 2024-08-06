/* eslint-disable */
// SuggestionsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getFollowing } from '@/api/authApi/graph';

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

            //folowing: những người mk follow
            //follower: những người follow mk
            const Id = localStorage.getItem('userId');
            //những người mk follow a[]
            const followingUsers = await getFollowing(Id);

            const fetchFollowingUsers = async () => {
                //lấy ra những người a[] follow
                const allFollowingOfFollowing = [];
                for (const user of followingUsers) {
                    const Id = user.id;
                    const followingOfFollowing = await getFollowing(Id);
                    allFollowingOfFollowing.push(...followingOfFollowing);
                }
                return allFollowingOfFollowing;
            };

            const allSussgestions = await fetchFollowingUsers();


            const uniqueSuggestions = Array.from(new Set(allSussgestions.map(user => user.id)))
                .map(id => {
                    return allSussgestions.find(user => (user.id === id));
                })
                .filter(user => user.id !== localStorage.getItem('userId'));
            setSuggestions(uniqueSuggestions);
          
            console.log("suggestions", uniqueSuggestions);
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
