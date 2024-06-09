import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  phoneOrEmail: Yup.string()
    .matches(/^(?:\d+|[\w.-]+@[\w.-]+\.[a-zA-Z]{2,})$/, "Phải là số điện thoại hoặc email hợp lệ!")
    .test('phoneOrEmail', 'Số điện thoại hoặc email không được để trống', function(value) {
      if (/^\d+$/.test(value) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return true;
      }
      return false;
    })
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
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một kí tự đặc biệt!')
    .matches(/\d/, 'Mật khẩu phải chứa ít nhất một số')
    .matches(/[A-Za-z].*[A-Za-z]/, 'Mật khẩu phải chứa ít nhất hai chữ cái')
    .required('Mật khẩu không được để trống!')
});