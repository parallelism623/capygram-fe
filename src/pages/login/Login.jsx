import React, { useState } from 'react'
import "./Login.scss"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import img from "../../assets/images/image.png"
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className='login'>
      <div className="login-container">
        <div className="content-img">
          <img src={img} alt="" />
        </div>
        <div className="content-form">
          <div className="form">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, isSubmitting, touched, errors }) => (
                <Form onSubmit={handleSubmit} className='Form' >
                  <img src={logoCapyGram} alt="" />
                  <div className="form-input">
                    <Field className='field' name='email' type='text' placeholder="Số điện thoại, tên người dùng hoặc email " />
                  </div>
                  <div className="form-input">
                    <Field className='field' name='password' type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" />
                    <i className={`eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
                  </div>
                  <button className='form-button' type='submit'><b>Đăng nhập</b></button>
                  <p onClick={() => navigate("/ft/resetpassword")}>Quên mật khẩu?</p>
                </Form>
              )}
            </Formik>
          </div>
          <div className="register">
            <p onClick={() => navigate("/ft/register")}>Tạo tài khoản mới</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;