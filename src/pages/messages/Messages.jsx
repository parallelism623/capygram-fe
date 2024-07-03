/* eslint-disable */
import React, { useEffect, useState } from 'react'

import ChatContainer from '@/components/chat/ChatContainer';
import Contacts from '@/components/chat/Contacts';
import Welcome from '@/components/chat/Welcome';

import './Messages.scss';

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //api user da login
        setCurrentUser({
          id: '1',
          fullname: 'lazy',
          avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setContacts([
          {
            id: '2',
            fullname: 'lazy 2',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '3',
            fullname: 'lazy 3',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '4',
            fullname: 'lazy 4',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '5',
            fullname: 'lazy 5',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '6',
            fullname: 'lazy 6',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '7',
            fullname: 'lazy 7',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '8',
            fullname: 'lazy 8',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '9',
            fullname: 'lazy 9',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '10',
            fullname: 'lazy 10',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '11',
            fullname: 'lazy 11',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '12',
            fullname: 'lazy 12',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '13',
            fullname: 'lazy 13',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '14',
            fullname: 'lazy 14',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '15',
            fullname: 'lazy 15',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
          {
            id: '16',
            fullname: 'lazy 16',
            avatarUrl: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/441197389_747403577551806_8731858280571738186_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGKF8mYemSFBARw9rfoOL2Kp7KkmI5BYfinsqSYjkFh-DTB1nKId38T6QqCH4sXzlw2sfKiL_s2hwmhJ753yO1d&_nc_ohc=oviHcZ2JHG4Q7kNvgFdnB8Q&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDoCVsgdYRlW4wXAVRBtokrXcVPx4gkh6cMMURW0fp83A&oe=668AEBB7',
          },
        ]);
      } catch (error) {
        console.log(error)
      }
    }
    fetchContacts();
  }, [currentUser]);

  const changeChat = (user) => {
    setCurrentChat(user);
  }
  return (
    <div className='body-mesages' >
      <div className='message-container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat} />
        {
          currentChat === undefined ? 
            (<Welcome />) : 
            (<ChatContainer/>)
        }
      </div>
    </div>
  )
}

export default Messages;