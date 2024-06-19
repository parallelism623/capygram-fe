/* eslint-disable */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import exit from '@/assets/images/exit.png';
import muiTen from '@/assets/images/muiTen.png';

import './Step2_HotStory.scss';

const Step2_HotStory = ({ onCancel }) => {
  const { t } = useTranslation('hotStory');
  const [selectedStory, setSelectedStory] = useState([]);

  //fake data
  const stories = [
    { id: 1, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 2, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 3, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 4, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 5, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 6, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 7, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 8, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 9, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
    { id: 10, date: '2024-06-01', imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.eNTbt8Ia7HdQ21CvFe31pgHaF7&pid=Api&P=0&h=220' },
  ];

  const toogleStorySelection = (id) => {
    const index = selectedStory.indexOf(id);
    if (index === -1) {
      setSelectedStory([...selectedStory, id]);
    } else {
      setSelectedStory(selectedStory.filter((item) => item !== id));
    }
  };

  const handleSubmit = () => {
    console.log(selectedStory);
  };

  return (
    <div className='list-story'>
      <div className='top-list-story'>
        <img src={muiTen} alt='back' />
        <p>{t('story')}</p>
        <img src={exit} alt='cancel' onClick={onCancel} />
      </div>

      <div className='story-container'>
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-item"
          >
            <img src={story.imgUrl} alt='story' />
            <div className='story-date'>{story.date}</div>
            <div className='circle' onClick={() => toogleStorySelection(story.id)}>
              <div className={selectedStory.includes(story.id) ? 'selected' : ''}></div>
            </div>
          </div>
        ))}
      </div>

      <div className='bottom-story'>
        <p className={selectedStory.length > 0 ? 'btn-Next' : 'btn'} onClick={handleSubmit}>{t('next')}</p>
      </div>
    </div>
  )
}

export default Step2_HotStory;