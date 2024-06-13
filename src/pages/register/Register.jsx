/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux';

import RegisterInFo from './information/RegisterInFo';
import RegisterBirthday from './birthday/RegisterBirthday';
import RegisterOTP from './otp/RegisterOTP';

const Register = () => {
  const step = useSelector(state => state.form.step);

  return (
    <div>
      {step === 1 && <RegisterInFo />}
      {step === 2 && <RegisterBirthday />}
      {step === 3 && <RegisterOTP />}
    </div>
  )
}

export default Register;