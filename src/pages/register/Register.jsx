/* eslint-disable */
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { loginValidation } from '../../utils/validation/loginValidation';

import logoCapyGram from "../../../public/images/logoCapyGram.png";

import "./Register.scss";

const Register = () => {
  const initValue = {
    phoneOrEmail: '',
    fullname: '',
    username: '',
    password: ''
  }
  return (
    <div className='div-body'>
      <div className='div-login'>
        <div className='div-form'>
          <Formik
            initialValues={initValue}
            validationSchema={loginValidation}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, isSubmitting, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <img className='logo-capygram' src={logoCapyGram} />
                <p className='sub-title'> Đăng ký để xem ảnh và video từ bạn bè.</p>

                <div className='form-field'>
                  <Field className='form-input' name='phoneOrEmail' type='text' placeholder=" " />
                  <span className='placeholder'>Số di động hoặc email</span>
                  <ErrorMessage className='form-error' name='phoneOrEmail' component='div' />
                  {touched.phoneOrEmail && !errors.phoneOrEmail && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.phoneOrEmail && errors.phoneOrEmail && (
                    <span className="invalid-icon">✘</span>
                  )}
                  <br />
                </div>

                <div className='form-field'>
                  <Field className='form-input' name='fullname' type='text' placeholder=" " />
                  <span className='placeholder'>Tên đầy đủ</span>
                  <ErrorMessage className='form-error' name='fullname' component='div' />
                  {touched.fullname && !errors.fullname && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.fullname && errors.fullname && (
                    <span className="invalid-icon">✘</span>
                  )}
                  <br />
                </div>

                <div className='form-field'>
                  <Field className='form-input' name='username' type='text' placeholder=" " />
                  <span className='placeholder'>Tên người dùng</span>
                  <ErrorMessage className='form-error' name='username' component='div' />
                  {touched.username && !errors.username && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.username && errors.username && (
                    <span className="invalid-icon">✘</span>
                  )}
                  <br />
                </div>

                <div className='form-field'>
                  <Field className='form-input' name='password' type='password' placeholder=" " />
                  <span className='placeholder'>Mật khẩu</span>
                  <ErrorMessage className='form-error' name='password' component='div' />
                  {touched.password && !errors.password && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.password && errors.password && (
                    <span className="invalid-icon">✘</span>
                  )}
                </div>

                <p className='rules'>Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram. <Link className='link' to="https://web.facebook.com/help/instagram/261704639352628?_rdc=1&_rdr">Tìm hiểu thêm</Link></p>
                <p className='rules'>Bằng cách đăng ký, bạn đồng ý với <Link className='link' to="https://help.instagram.com/581066165581870/?locale=vi_VN">Điều khoản</Link>, <Link className='link' to='https://free.facebook.com/privacy/policy/#'>Chính sách quyền riêng tư</Link> và <Link className='link' to="https://privacycenter.instagram.com/policies/cookies/">Chính sách cookie</Link> của chúng tôi.</p>

                <button className='form-button' type='submit'><b>Đăng ký</b></button>
              </Form>
            )}
          </Formik>
        </div>
        <div className='div-link-register'>
          <p>Bạn đã có tài khoản? <Link className='link-register' to='/register'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register;