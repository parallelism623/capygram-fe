/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "@/i18n";

import checkEmail from "@/assets/images/checkEmail.gif";
import { setUser, submitForm } from '@/store/formSlice';
import { registerOTPValidation } from '@/utils/validation/registerValidation';

import './RegisterOTP.scss';

const RegisterOTP = () => {
  const { t } = useTranslation('step3Register');

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
                <p className='sub-tittle'><b>{ t('title1')}</b></p>
                <p className='p1'>{t('title2')} {gmail}</p>

                <div className='input-OTP'>
                  <Field className='form-input' name='otp' placeholder='# # # # # #' type='text'></Field>
                  <ErrorMessage className='form-error' name='otp' component='div' />
                </div>

                <button className='btn-submit' type='submit'>{t('button')}</button>

                <p className='p2'>{t('link')}</p>
              </Form>
            )}
          </Formik>

        </div>
        <div className='div-link-login'>
          <p>{t('haveAccount')} <Link className='link-login' to='/ft/login'>{t('login')}</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterOTP;