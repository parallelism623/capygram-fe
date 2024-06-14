/* eslint-disable*/
import React, { useState } from 'react'
import "./ResetPassword.scss"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import img from "../../assets/images/Screenshot 2024-06-13 213505.png"
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div className='reset-password' onSubmit={handleSubmit}>
      <div className="reset-password-container">
        <div className="rsp-header">
          <div className="rsp-header-content">
            <p>Capygram</p>
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
                      <h2>Bạn gặp sự cố khi đăng nhập</h2>
                      <p>Nhập email, số điện thoại hoặc tên người dùng <br /> của bạn và chúng tôi sẽ gửi cho bạn một liên <br /> kết để truy cập lại vào tài khoản.</p>
                    </div>
                    <div className="form-input">
                      <Field className="field" name="email" type='text' value={inputValue} onChange={handleInputChange} placeholder="Số điện thoại, tên người dùng hoặc email " />
                    </div>
                    <button className='form-button' type='submit' disabled={!inputValue} onClick={() => navigate("/ft/login")}>Gửi liên kết đăng nhập</button>
                    <a href="">Bạn không thể đặt lại mật khẩu? </a>
                    <div className="divider">
                      <span className='divider-text'>HOẶC</span>
                    </div>
                    <p className='register' onClick={() => navigate("/ft/register")}>Tạo tài khoản mới</p>
                  </Form>
                )}
              </Formik>
              <div className="login">
                <p onClick={() => navigate("/ft/login")}>Quay lại đăng nhập</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;