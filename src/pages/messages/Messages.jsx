/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import ChatContainer from '@/components/chat/ChatContainer';
import Contacts from '@/components/chat/Contacts';
import Welcome from '@/components/chat/Welcome';
import { getFollowers, getFollowing } from '@/api/authApi/graph';

import './Messages.scss';

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setCurrentChat(JSON.parse(localStorage.getItem('currentChat')) ? JSON.parse(localStorage.getItem('currentChat')) : undefined);
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
        const followerUsers = await getFollowers(user.id);
        const contactList = [...folowingUsers, ...followerUsers];
        const uniqueContacts = Array.from(new Set(contactList.map(user => user.id)))
          .map(id => {
            return contactList.find(user => (user.id === id));
          })
          .filter(user => user.id !== localStorage.getItem('userId'));

        const contacts = uniqueContacts.map((user) => ({
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

    const userChat = localStorage.getItem('userChat') ? localStorage.getItem('userChat') : undefined;

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
            (<Welcome setCurrentChat={setCurrentChat} />) :
            (<ChatContainer currentChat={currentChat} currentUser={currentUser}/>)
        }
      </div>
    </div>
  )
}

export default Messages;