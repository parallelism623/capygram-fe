/* eslint-disable */
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerInformationValidation } from "@/utils/validation/registerValidation";
import { nextStep, setUser } from '@/store/formSlice';

import logoCapyGram from "@/assets/images/logoCapyGram.png";

import "./RegisterInFo.scss";

const RegisterInFo = () => {

  const user = useSelector((state) => state.form.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    dispatch(setUser(values));
    dispatch(nextStep());
  };

  return (
    <div className='div-body'>
      <div className='div-register'>
        <div className='div-form'>
          <Formik
            initialValues={user}
            validationSchema={registerInformationValidation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <img className='logo-capygram' src={logoCapyGram} />
                <p className='sub-title'> Đăng ký để xem ảnh và video từ bạn bè.</p>

                <div className='form-field'>
                  <Field className='form-input' name='email' type='text' placeholder=" " />
                  <span className='placeholder'>Email</span>
                  <ErrorMessage className='form-error' name='email' component='div' />
                  {touched.email && !errors.email && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.email && errors.email && (
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
                  <Field className='form-input' name='password' type={showPassword ? 'text' : 'password'} placeholder=" " />
                  <span className='placeholder'>Mật khẩu</span>
                  <i className={`eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
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
        <div className='div-link-login'>
          <p>Bạn đã có tài khoản? <Link className='link-login' to='/ft/login'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterInFo;