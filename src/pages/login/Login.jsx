/* eslint-disable */
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { loginValidation } from '../../utils/validation/loginValidation';

import logoCapyGram from "../../../public/images/logoCapyGram.png";

import "./Login.scss";

const Login = () => {
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
            <Form>
              <img className='logo-capygram' src={logoCapyGram} />
              <p className='sub-title'> Đăng ký để xem ảnh và video từ bạn bè.</p>

              <Field className='form-input' name='phoneOrEmail' type='text' placeholder="Số di động hoặc email" />
              <ErrorMessage className='form-error' name='phoneOrEmail' component='div' style={{ color: 'red' }} />
              <br />

              <Field className='form-input' name='fullname' type='text' placeholder="Tên đầy đủ" />
              <ErrorMessage className='form-error' name='fullname' component='div' style={{ color: 'red' }} />
              <br />

              <Field className='form-input' name='username' type='text' placeholder="Tên người dùng" />
              <ErrorMessage className='form-error' name='username' component='div' style={{ color: 'red' }} />
              <br />
              <Field className='form-input' name='password' type='password' placeholder="Mật khẩu" />
              <ErrorMessage className='form-error' name='password' component='div' style={{ color: 'red' }} />

              <p className='rules'>Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram. <Link className='link' to="https://web.facebook.com/help/instagram/261704639352628?_rdc=1&_rdr">Tìm hiểu thêm</Link></p>
              <p className='rules'>Bằng cách đăng ký, bạn đồng ý với <Link className='link' to="https://help.instagram.com/581066165581870/?locale=vi_VN">Điều khoản</Link>, <Link className='link' to='https://free.facebook.com/privacy/policy/#'>Chính sách quyền riêng tư</Link> và <Link className='link'  to="https://privacycenter.instagram.com/policies/cookies/">Chính sách cookie</Link> của chúng tôi.</p>

              <button className='form-button' type='submit'><b>Đăng ký</b></button>
            </Form>

          </Formik>
        </div>
        <div className='div-link-register'>
          <p>Bạn đã có tài khoản? <Link className='link-register' to='/register'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login;