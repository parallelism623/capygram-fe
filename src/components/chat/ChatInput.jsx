/* eslint-disable */
import React, { useState } from 'react'

import icon from '@/assets/images/icon.png';
import microphone from '@/assets/images/microphone.png';
import uploadImage from '@/assets/images/uploadImage.png';
import heart from '@/assets/images/heart.png';
import sendMessage from '@/assets/images/sendMessage.png';

import './ChatInput.scss';
const ChatInput = () => {
  const [input, setInput] = useState('');
  return (
    <div className='chatinput-container'>
      <form>
        <input className='input-chat' type='text' value={input} />

        <img src={icon} alt='icon' className='icon-haha'/>

        <div className='action'>
          {
            input === '' ?
              (
                <div className='icon'>
                  <img src={microphone} alt='microphone' />
                  <img src={uploadImage} alt='uploadImage' />
                  <img src={heart} alt='heart' />
                </div>
              ) :
              (
                <div className='icon'>
                  <img src={sendMessage} alt='sendMessage' />
                </div>
              )
          }
        </div>
      </form>
    </div>
  )
}

export default ChatInput;