import React, { useState, useEffect } from 'react'
import "./Login.scss"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import img from "../../assets/images/image.png"
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import { useNavigate } from 'react-router-dom';
import img2 from "../../assets/images/Screenshot 2024-06-13 164302.png"
import img3 from "../../assets/images/Screenshot 2024-06-13 164310.png"
import '@/i18n';
import { useTranslation } from 'react-i18next';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img, img2, img3];
  const { t } = useTranslation('login');

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
                username: '',
                password: ''
              }}
              onSubmit={async (values) => {
                try {
                  const { data } = await axios.post(
                    "https://localhost:7284/api/Users/login", values
                  );
                  localStorage.setItem("access_token", data.token);
                  navigate("/")
                }
                catch (errors) {
                  console.error(errors);
                }
              }}
            >
              {({ handleSubmit, isSubmitting, touched, errors }) => (
                <Form onSubmit={handleSubmit} className='Form' >
                  <img src={logoCapyGram} alt="" />
                  <div className="form-input">
                    <Field className='field' name='username' type='text' placeholder={t("placeholder")} />
                  </div>
                  <div className="form-input">
                    <Field className='field' name='password' type={showPassword ? 'text' : 'password'} placeholder={t("password")} />
                    <i className={`eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
                  </div>
                  <button className='form-button' type='submit'><b>{t('login')}</b></button>
                  <p onClick={() => navigate("/ft/reset-password")}>{t('resetpassword')}</p>
                </Form>
              )}
            </Formik>
          </div>
          <div className="register">
            <p onClick={() => navigate("/ft/register")}>{t('register')}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;