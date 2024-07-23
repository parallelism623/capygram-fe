/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import EmojiPicker from 'emoji-picker-react';

import icon from '@/assets/images/icon.png';
import microphone from '@/assets/images/microphone.png';
import uploadImage from '@/assets/images/uploadImage.png';
import heart from '@/assets/images/heart.png';
import sendMessage from '@/assets/images/sendMessage.png';
import exit from '@/assets/images/exit.png';

import './ChatInput.scss';

const ChatInput = ({ handleSendMsg }) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { t } = useTranslation('messages');

  const inputRef = React.createRef();

  const addEmoji = (event, emojiObject) => {
    const emoji = event.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;//lay vi tri con tro
    const start = input.substring(0, selectionStart);//phan dau cua chuoi truoc con tro
    const end = input.substring(selectionEnd, input.length);//phan cuoi cua chuoi sau con tro
    const updateInput = start + emoji + end;
    setInput(updateInput);
    inputRef.current.focus();
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const fileReaders = filesArray.map((file) => {
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = () => {
          resolve({ file, data: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((results) => {
      setFiles(prevFiles => [...prevFiles, ...results]);
    });
  };


  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (input.trim() === '' && files.length === 0) return;

    const messageToSend = [{
      type: 'text',
      content: input
    }, ...files.map((file) => ({
      type: file.file.type.startsWith('video/') ? 'video' : 'image',
      content: file.data
    }))];

    messageToSend.forEach((msg) => handleSendMsg(msg));

    setInput('');
    setFiles([]);
  };

  return (
    <div className='chatinput-container'>
      <form onSubmit={(e) => sendChat(e)}>
        {
          files.length > 0 && (
            <div className='preview-files'>
              {
                files.map((file, index) => (
                  <div key={index} className='preview-file'>
                    {
                      file.file.type.startsWith('video/') ?
                      (
                      <div className='preview-item'>
                        <video src={file.data} controls className='it' />
                        <img src={exit} alt='exit' className='exit' onClick={() => handleDelete(index)} />
                      </div>
                      ) :
                      file.file.type.startsWith('image/') ?
                      (
                      <div className='preview-item'>
                        <img src={file.data} alt='preview' className='it' />
                        <img src={exit} alt='exit' className='exit' onClick={() => handleDelete(index)} />
                      </div>
                      ) : null
                    }
                    
                  </div>
                ))
              }

              <div className='upload-image'>
                <label>
                  <img src={uploadImage} alt='uploadImage' />
                  <input
                    type='file'
                    accept='image/*, video/*'
                    className='imageUpload'
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
              </div>
            </div>
          )
        }
        <div className='input-chat'>
          <textarea
            placeholder={t('message')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            onClick={() => setShowEmojiPicker(false)}
            typeof='text'
          />
        </div>
        <img
          src={icon}
          alt='icon'
          className='icon-haha'
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />


        <div className='action'>
          {
            input === '' && files.length === 0 ?
              (
                <div className='icon'>
                  <img src={microphone} alt='microphone' />
                  <div className='upload-image'>
                    <label>
                      <img src={uploadImage} alt='uploadImage' />
                      <input
                        type='file'
                        accept='image/*, video/*'
                        className='imageUpload'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                  </div>
                  <img src={heart} alt='heart' />
                </div>
              ) :
              (
                <div className='icon'>
                  <button type='submit'>
                    <img src={sendMessage} alt='sendMessage' />
                  </button>
                </div>
              )
          }
        </div>

        {
          showEmojiPicker && (
            <EmojiPicker onEmojiClick={addEmoji} className='emoj' />
          )
        }
      </form>

    </div>
  )
}

export default ChatInput;