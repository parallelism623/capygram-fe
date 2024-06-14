import React, { useState, useEffect } from 'react'
import "./Login.scss"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import img from "../../assets/images/image.png"
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import { useNavigate } from 'react-router-dom';
import img2 from "../../assets/images/Screenshot 2024-06-13 164302.png"
import img3 from "../../assets/images/Screenshot 2024-06-13 164310.png"

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img, img2, img3];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);


    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='login'>
      <div className="login-container">
        <div className="image">
          <ul className='slide'>
            {images.map((image, index) => (
              <li key={index} className={index === currentImageIndex ? 'active' : ''}>
                <div className="content-img">
                  <img src={image} alt={`Slide ${index}`} />
                </div>
              </li>
            ))}
          </ul>
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
                  <p onClick={() => navigate("/ft/reset-password")}>Quên mật khẩu?</p>
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