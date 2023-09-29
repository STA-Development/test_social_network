import axios, {AxiosResponse} from "axios";
import {User, UserPost} from "../../types/typeSection";
import {AxiosError} from "axios/index";

export const getAllPosts = async ():Promise<UserPost[]> => {
    const { data } = await axios.get('http://localhost:3000/post/getAllPosts')
    console.log(data)
    return data;
}

export const getCurrentUserPosts = async (user: User | null):Promise<UserPost[]> => {
    const {data}= await axios.get(`http://localhost:3000/post/userPosts/${user?.uId}`)
    console.log(data)
    return data
}
export const createPost = async (postFormData: FormData):Promise<UserPost[]> => {
    const {data} = await axios.post('http://localhost:3000/post/createPost', postFormData,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}