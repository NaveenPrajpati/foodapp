import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string()
    .length(10, 'Phone number should be 10 digits')
    .required('Phone is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    // .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  // address: Yup.string().required('Address is required'),
});
