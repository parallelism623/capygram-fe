/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux';

import Step1 from './step1/Step1';
import Step2 from './step2/Step2';
import Step3 from './step3/Step3';

const Post = () => {
  const step = useSelector((state) => state.form.step);

  return (
    <>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </>
  )
}

export default Post;