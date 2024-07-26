/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "@/i18n";
import { toast } from 'react-toastify';

import { registerBirthdayValidation } from '@/utils/validation/registerValidation';
import { nextStep, prevStep, setUser } from '@/store/formSlice';
import { register } from '@/api/authApi/auth';

import birthday_cake from "@/assets/images/birthday_cake.png";

import './RegisterBirthday.scss';

const RegisterBirthday = () => {
  const { t } = useTranslation('step2Register');

  const dispatch = useDispatch();

  const user = useSelector(state => state.form.user);

  const handleSubmit = async (values) => {
    dispatch(setUser(values));

    // console.log(values);
    try {
      await register(values);
      dispatch(nextStep());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='body-birthday-register'>
      <div className='body-form'>
        <div className='form-birthday-register'>
          <Formik
            initialValues={user}
            validationSchema={registerBirthdayValidation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className='img-birthday-register'>
                  <img className='img' src={birthday_cake} />
                </div>
                <p className='title-form'><b>{t('addYourBirthday')}</b></p>
                <p className='p1'>{t('subTitle')} </p>

                <div className='form-birthday'>
                  <Field as='select' name='month' className='form-input'>
                    <option value=''>{t('input1')}</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}> {i + 1}</option>
                    ))}
                  </Field>

                  <Field as='select' name='day' className='form-input'>
                    <option value=''>{t('input2')}</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}> {i + 1}</option>
                    ))}
                  </Field>

                  <Field as='select' name='year' className='form-input'>
                    <option value=''>{t('input3')}</option>
                    {Array.from({ length: 120 }, (_, i) => (
                      <option key={i} value={2022 - i}> {2022 - i}</option>
                    ))}
                  </Field>
                </div>
                {(errors.day || errors.month || errors.year) ? <p className='form-error'>Bạn cần nhập đầy đủ ngày sinh của mình!</p> : null}

                <p className='p2'>{t('title2')}</p>
                <p className='p3'>{t('title3')}</p>
                <button className='btn-next' type='submit'>{t('button')}</button>
                <p className='p4' onClick={() => dispatch(prevStep())}>{t('link')}</p>

              </Form>
            )}
          </Formik>
        </div>
        <div className='div-link-login'>
          <p>{t('haveAccount')}<Link className='link-login' to='/ft/login'>{t('login')}</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterBirthday;