import './Login2.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import logoCapyGram from "../../assets/images/logoCapyGram.png"
import { useNavigate } from 'react-router-dom';

const Login2 = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    return (
        <div className="login2">
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={async (values) => {
                    try {

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
                            <Field className='field' name='username' type='text' placeholder="Số điện thoại, tên người dùng hoặc email." />
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
    )
}
export default Login2;