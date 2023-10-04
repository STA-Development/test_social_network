import * as yup from 'yup'

export const postSchema = yup.object().shape({
    title: yup.string().required().max(80),
    description: yup.string().required().max(500),
    photo: yup.mixed(),
})