/* eslint-disable */
// SuggestionsContext.js
import React, { createContext, useState, useEffect } from 'react';

import { getPostByUserId } from '@/api/authApi/post';
import { getCountFollower, getCountFollowing } from '@/api/authApi/graph';
import { follow, getFollowing, unFollow } from '@/api/authApi/graph';

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);

    const [isfollow, setIsFollow] = useState(
        // suggestions.reduce((acc, suggestion) => {
        //     acc[suggestion.id] = false;
        //     return acc;
        // }, {}) 
        {}
    );
    const [hoveredItem, sethoveredItem] = useState({ id: null, type: null });
    const [hoveredProfile, setHoveredProfile] = useState({ id: null, type: null });
    const [isDarkNight, setIsDarkNight] = useState(false);
    const [post, setPost] = useState(0);
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);
    const [isRender, setIsRender] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleToggle = () => {
        setIsDarkNight(!isDarkNight)
    }
    const handleFollowClick = async (id) => {
        const userId = localStorage.getItem('userId');

        if (isfollow[id]) {
            // Unfollow
            await unFollow(userId, id);
            setIsFollow((prev) => ({
                ...prev,
                [id]: false,
            }));
        } else {
            // Follow
            await follow(userId, id);
            setIsFollow((prev) => ({
                ...prev,
                [id]: true,
            }));
        }
        console.log(isfollow)

        setIsRender(!isRender); // Cập nhật lại render nếu cần thiết
    };
    const handleMouseEnter = (id, type) => {
        sethoveredItem({ id, type });
        console.log(id)
        setUserId(id);
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
    //follow,post
    useEffect(() => {
        if (userId) {
            const getInfo = async () => {
                try {
                    const posts = await getPostByUserId(userId);
                    setPost(posts.length);
                    const followerCount = await getCountFollower(userId);
                    setFollower(followerCount);
                    const followingCount = await getCountFollowing(userId);
                    setFollowing(followingCount);
                } catch (error) {
                    console.log(error);
                }
            };

            getInfo();
        }
    }, [userId]);




    return (
        <SuggestionsContext.Provider value={{ suggestions, setSuggestions, isfollow, handleFollowClick, handleMouseEnter, handleMouseLeave, handleMouseProfileEnter, handleMouseProfileLeave, hoveredItem, hoveredProfile, isDarkNight, handleToggle, post, setPost, follower, setFollower, following, setFollowing }}>
            {children}
        </SuggestionsContext.Provider>
    );
};
