/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux';

import Step1_HotStory from './Step1_HotStory';
import Step2_HotStory from './Step2_HotStory';
import Step3_HotStory from './Step3_HotStory';

const HotStory = ({ onCancel }) => {
  const step = useSelector((state) => state.form.step);
  return (
    <>
      {
        step === 1 && (<Step1_HotStory onCancel={onCancel} />)
      }
      {
        step === 2 && (<Step2_HotStory onCancel={onCancel} />)
      }
      {
        step === 3 && (<Step3_HotStory onCancel={onCancel} />)
      }
    </>
  )
}

export default HotStory;