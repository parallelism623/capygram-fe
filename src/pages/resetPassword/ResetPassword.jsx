/* eslint-disable*/
import React, { useState } from 'react'
import "./ResetPassword.scss"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import img from "../../assets/images/Screenshot 2024-06-13 213505.png"
import { useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const { t } = useTranslation('reset_password');

  return (
    <div className='reset-password' onSubmit={handleSubmit}>
      <div className="reset-password-container">
        <div className="rsp-header">
          <div className="rsp-header-content">
            <p style={{ cursor: "pointer" }} onClick={() => navigate("/ft/login")}>Capygram</p>
          </div>
        </div>
        <div className="rsp-content">
          <div className="rsp-form">
            <div className="rsp-form-content">
              <Formik
                initialValues={{
                  email: ''
                }}
                onSubmit={async (values) => {
                  console.log(values);
                }}
              >
                {({ handleSubmit, isSubmitting, touched, errors }) => (
                  <Form onSubmit={handleSubmit} className='Form'>
                    <img src={img} alt="" />
                    <div className="instruction">
                      <h2 >{t('text1')}</h2>
                      <p style={{ whiteSpace: "pre-line" }}>{t('text2')}</p>
                    </div>
                    <div className="form-input">
                      <Field className="field" name="email" type='text' value={inputValue} onChange={handleInputChange} placeholder={t('text3')} />
                    </div>
                    <button className={`${inputValue ? "form-button" : "form-button2"}`} type='submit' disabled={!inputValue} onClick={() => navigate("/verify-account")}>{t('button')}</button>
                    <a href="">{t('text4')} </a>
                    <div className="divider">
                      <span className='divider-text'>{t('text5')}</span>
                    </div>
                    <p className='register' onClick={() => navigate("/ft/register")}>{t('text6')}</p>
                  </Form>
                )}
              </Formik>
              <div className="login">
                <p onClick={() => navigate("/ft/login")}>{t('text7')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;