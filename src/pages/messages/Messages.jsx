/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import ChatContainer from '@/components/chat/ChatContainer';
import Contacts from '@/components/chat/Contacts';
import Welcome from '@/components/chat/Welcome';
import { getFollowing } from '@/api/authApi/graph';

import './Messages.scss';

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const folowingUsers = await getFollowing(user.id);
        // console.log("folowingUsers", folowingUsers);
        const contacts = folowingUsers.map((user) => ({
          id: user.id,
          fullname: user.fullName,
          avatarUrl: user.avatarUrl,
        }));

        setContacts(contacts);
      } catch (error) {
        console.log(error)
      }
    }
    fetchContacts();
  }, [currentUser]);

  const changeChat = (user) => {
    setCurrentChat(user);
  }

  useEffect(() => {

    const userChat = localStorage.getItem('userChat') ? JSON.parse(localStorage.getItem('userChat')) : undefined;

    localStorage.removeItem('userChat');

    if (userChat !== undefined) {
      const isexiting = contacts.find((contact) => contact.id === userChat.id);

      if (!isexiting) {
        setContacts([...contacts, userChat]);
      }

      setCurrentChat({
        id: userChat.id,
        fullname: userChat.name,
        avatarUrl: userChat.avatarUrl,
      });
    }
  }, [contacts]);

  return (
    <div className='body-mesages' >
      <div className='message-container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat} />
        {
          currentChat === undefined ?
            (<Welcome />) :
            (<ChatContainer currentChat={currentChat} currentUser={currentUser} />)
        }
      </div>
    </div>
  )
}

export default Messages;