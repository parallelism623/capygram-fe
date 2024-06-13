import * as Yup from 'yup';

export const registerInformationValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ!')
    .required('Số điện thoại hoặc email không được để trống!'),
  fullname: Yup.string()
    .min(5, 'Họ và tên phải có ít nhất 5 ký tự!')
    .max(30, 'Họ và tên không được vượt quá 30 ký tự!')
    .required('Họ và tên không được để trống!'),
  username: Yup.string()
    .min(5, 'Tên đăng nhập phải có ít nhất 5 ký tự!')
    .max(30, 'Tên đăng nhập không được vượt quá 30 ký tự!')
    .required('Tên đăng nhập không được để trống!'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự!')
    .max(16, 'Mật khẩu không được vượt quá 30 ký')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một kí tự đặc biệt!')
    .matches(/\d/, 'Mật khẩu phải chứa ít nhất một số')
    .matches(/[A-Za-z].*[A-Za-z]/, 'Mật khẩu phải chứa ít nhất hai chữ cái')
    .required('Mật khẩu không được để trống!')
});

export const registerBirthdayValidation = Yup.object().shape({
  day: Yup.string()
    .required('Bạn cần nhập đầy đủ ngày sinh của mình!'),
  month: Yup.string()
    .required('Bạn cần nhập đầy đủ ngày sinh của mình!'),
  year: Yup.string()
    .required('Bạn cần nhập đầy đủ ngày sinh của mình!')
});

export const registerOTPValidation = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'Mã OTP phải có 6 chữ số!')
    .required('Mã OTP không được để trống!')
});
