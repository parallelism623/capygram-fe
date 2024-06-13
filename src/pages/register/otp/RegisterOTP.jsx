/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import checkEmail from "@/assets/images/checkEmail.gif";
import { setUser, submitForm } from '@/store/formSlice';
import { registerOTPValidation } from '@/utils/validation/registerValidation';

import './RegisterOTP.scss';

const RegisterOTP = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.form.user);
  const gmail = user.email;

  const handleSubmit = (values) => {
    dispatch(setUser(values));

    // Call API
    console.log(values);
  };

  return (
    <div className='body-register-OTP'>
      <div className='body-OTP'>
        <div className='form-OTP'>
          <Formik
            initialValues={user}
            validationSchema={registerOTPValidation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className='img-otp'>
                  <img src={checkEmail} />
                </div>
                <p className='sub-tittle'><b>Chỉ một bước nữa thôi</b></p>
                <p className='p1'>Hãy nhập mã gồm 6 chữ số mà chúng tôi đã gửi đến gmail: {gmail}</p>

                <div className='input-OTP'>
                  <Field className='form-input' name='otp' placeholder='# # # # # #' type='text'></Field>
                  <ErrorMessage className='form-error' name='otp' component='div' />
                </div>

                <button className='btn-submit' type='submit'>Xác nhận</button>

                <p className='p2'>Gửi lại mã</p>
              </Form>
            )}
          </Formik>

        </div>
        <div className='div-link-login'>
          <p>Bạn đã có tài khoản? <Link className='link-login' to='/ft/login'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterOTP;