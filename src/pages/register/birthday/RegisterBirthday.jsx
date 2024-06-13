/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { registerBirthdayValidation } from '@/utils/validation/registerValidation';
import { nextStep, prevStep, setUser } from '@/store/formSlice';

import birthday_cake from "@/assets/images/birthday_cake.png";

import './RegisterBirthday.scss';

const RegisterBirthday = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.form.user);

  const handleSubmit = (values) => {
    dispatch(setUser(values));
    dispatch(nextStep());
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
                <p className='title-form'><b>Thêm ngày sinh</b></p>
                <p className='p1'>Thông tin này sẽ không hiển thị trên trang cá nhân công khai của bạn</p>

                <div className='form-birthday'>
                  <Field as='select' name='month' className='form-input'>
                    <option value=''>Tháng</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>Tháng {i + 1}</option>
                    ))}
                  </Field>

                  <Field as='select' name='day' className='form-input'>
                    <option value=''>Ngày</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}>Ngày {i + 1}</option>
                    ))}
                  </Field>

                  <Field as='select' name='year' className='form-input'>
                    <option value=''>Năm</option>
                    {Array.from({ length: 120 }, (_, i) => (
                      <option key={i} value={2022 - i}>Năm {2022 - i}</option>
                    ))}
                  </Field>
                </div>
                {(errors.day || errors.month || errors.year) ? <p className='form-error'>Bạn cần nhập đầy đủ ngày sinh của mình!</p> : null}

                <p className='p2'>Bạn cần nhập ngày sinh của mình</p>
                <p className='p3'>Hãy thêm ngày sinh của chính bạn, dù đây là tài khoản dành cho doanh nghiệp, thú cưng hay bất cứ điều gì khác</p>
                <button className='btn-next' type='submit'>Tiếp</button>
                <p className='p4' onClick={() => dispatch(prevStep())}>Quay lại</p>

              </Form>
            )}
          </Formik>
        </div>
        <div className='div-link-login'>
          <p>Bạn đã có tài khoản? <Link className='link-login' to='/login'>Đăng Nhập</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterBirthday;