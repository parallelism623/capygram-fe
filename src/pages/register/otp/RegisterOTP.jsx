/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "@/i18n";

import checkEmail from "@/assets/images/checkEmail.gif";
import { setUser } from '@/store/formSlice';
import { registerOTPValidation } from '@/utils/validation/registerValidation';

import './RegisterOTP.scss';
import { register } from '@/api/authApi/auth';
import { toast } from 'react-toastify';

const RegisterOTP = () => {
  const { t } = useTranslation('step3Register');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(state => state.form.user);
  const gmail = user.email;

  const handleSubmit = async (values) => {
    dispatch(setUser(values));

    try {
      await register(values);
      console.log(values);
      navigate('/ft/login');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

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