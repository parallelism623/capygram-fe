/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import checkEmail from '../../../../public/images/checkEmail.gif';

import './RegisterOTP.scss';

const RegisterOTP = () => {
  return (
    <div className='body-register-OTP'>
      <div className='body-OTP'>
        <div className='form-OTP'>
          <Formik>
            <Form>
              <div className='img-otp'>
                <img src={checkEmail} />
              </div>
              <p className='sub-tittle'><b>Chỉ một bước nữa thôi</b></p>
              <p className='p1'>Hãy nhập mã gồm 6 chữ số mà chúng tôi đã gửi đến gmail:........</p>

              <div className='input-OTP'>
                <Field className='form-input' name='OTP' placeholder='# # # # # #' type='text'></Field>
                <ErrorMessage className='form-error' name='OTP' component='div' />
              </div>

              <button className='btn-submit' type='submit'>Xác nhận</button>

              <p className='p2'>Gửi lại mã</p>
            </Form>
          </Formik>

        </div>
        <div className='div-link-login'>
          <p>Bạn đã có tài khoản? <Link className='link-login' to='/login'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterOTP;