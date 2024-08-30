import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .length(10, 'Phone number should be 10 digits')
    .matches(/[0-9]/, 'Phone contain only Number')
    .required('Phone number is required'),
  password: Yup.string()
    // .min(8, 'Password should be 8 characters or less')
    // .matches(/[a-zA-Z]/, 'Password must contain both letters')
    // .matches(/[0-9]/, 'Password must contain a number')
    .required('Password is required'),
});

export const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, 'OTP should be 6 digits')
    .required('OTP is required'),
});
