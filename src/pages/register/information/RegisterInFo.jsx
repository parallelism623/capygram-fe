/* eslint-disable */
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "@/i18n";

import { registerInformationValidation } from "@/utils/validation/registerValidation";
import { nextStep, setUser } from '@/store/formSlice';

import logoCapyGram from "@/assets/images/logoCapyGram.png";

import "./RegisterInFo.scss";

const RegisterInFo = () => {
  const { t } = useTranslation('step1Register');

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
                <p className='sub-title'> {t('title')}</p>

                <div className='form-field'>
                  <Field className='form-input' name='email' type='text' placeholder=" " />
                  <span className='placeholder'>{t('input1') }</span>
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
                  <span className='placeholder'>{t('input2')}</span>
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
                  <span className='placeholder'>{t('input3')}</span>
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
                  <span className='placeholder'>{t('input4')}</span>
                  <i className={`eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
                  <ErrorMessage className='form-error' name='password' component='div' />
                  {touched.password && !errors.password && (
                    <span className="valid-icon">✔</span>
                  )}
                  {touched.password && errors.password && (
                    <span className="invalid-icon">✘</span>
                  )}
                </div>

                <p className='rules'>{t('des1')}<Link className='link' to="https://web.facebook.com/help/instagram/261704639352628?_rdc=1&_rdr">{t('des2')}</Link></p>
                <p className='rules'>{t('des3')}<Link className='link' to="https://help.instagram.com/581066165581870/?locale=vi_VN">{t('des4')}</Link>, <Link className='link' to='https://free.facebook.com/privacy/policy/#'>{t('des5')}</Link>{t('des6')}<Link className='link' to="https://privacycenter.instagram.com/policies/cookies/">{t('des7')}</Link></p>

                <button className='form-button' type='submit'><b>{t('button')}</b></button>
              </Form>
            )}
          </Formik>
        </div>
        <div className='div-link-login'>
          <p>{t('haveAccount')}<Link className='link-login' to='/login'>{t('login')}</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterInFo;