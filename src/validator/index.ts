import * as yup from 'yup'

export const postSchema = yup.object().shape({
    title: yup.string().required().max(80),
    description: yup.string().required().max(500),
    photo: yup.mixed(),
})


export const commentSchema = yup.object().shape({
    comment: yup.string().required().matches(/[^ \t]+/).max(200)
})
export const signUpSchema = yup.object().shape({
    username: yup.string().required().max(40),
    email: yup.string().required().email('Something seems wrong make sure your email is correct🧐'),
    password: yup.string().required('this Field is requierd').matches(/[^ \t]+/).min(8, 'password must contain at least 8 letters').max(50, 'Too long be sure that your password contains less then 50 letters')
})