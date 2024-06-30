import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Please enter your email address'),
    fullName: yup.string().min(5, 'Must contain at least 10 characters'),
    password: yup
        .string()
        .min(10, 'Must contain at least 10 characters')
        .matches(/[0-9]/, 'Must contain at least 1 number')
        .matches(/[^\w]/, 'And finally 1 special character'),
    confirmPassword: yup
        .string()
        .label('confirm password')
        .required()
        .oneOf([yup.ref('password')], 'Both passwords must match')
});
export const signinSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Please enter your email address'),
    password: yup
        .string()
        .min(10, 'Must contain at least 10 characters')
        .matches(/[0-9]/, 'Must contain at least 1 number')
        .matches(/[^\w]/, 'And finally 1 special character'),
});